using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using NotebookBotAPI.Helpers;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImagesController : ApiController
    {
        private readonly NotebookDbContext _context;

        public ImagesController(NotebookDbContext context)
        {
            _context = context;
        }

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImageById(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return new FileContentResult(image.ImageData, "image/png");
        }

        // GET: api/Images/username/date
        [HttpGet]
        [Route("GetUserImages/{username}/{date}")]
        public async Task<ActionResult<IEnumerable<ImageUrlJSON>>> GetImageByUsernameDate(string username, string date)
        {
            var requestUrl = $"{Request.Scheme}://{Request.Host.Value}";
            DateTime parsedDate = DateTime.Parse(date);

            var images = _context.Images
                .Include(x => x.User)
                .Where(x => x.User.UserName == username)
                .Where(x => x.DateSent > parsedDate)
                .Select(x => new ImageUrlJSON()
                {
                    dateSent = x.DateSent,
                    imageUrl = $"{requestUrl}/api/Images/{x.Id}",
                    Username = x.User.UserName
                })
                .ToList();

            if (!images.Any())
            {
                return NotFound();
            }
            
            return images;
        }

        [Authorize]
        [HttpGet]
        [Route(nameof(GetImageIDsUser))]
        public async Task<ActionResult<List<int>>> GetImageIDsUser()
        {
            var userId = GetUserContext().Id;
            var listIds = _context.Images
                .Where(x => x.UserId == userId)
                .Select(x => (int)x.Id)
                .ToList();

            return listIds;
        }

        [Authorize]
        [HttpPost]
        [Route(nameof(PostImageRaw))]
        public async Task<ActionResult<Image>> PostImageRaw(ImageRawDataInput imgData)
        {
            DateTime parsedDate = DateTime.Parse(imgData.DateSent);
            //convert base64 image to byte array
            byte[] imageBytes = Convert.FromBase64String(imgData.ImageBase64String);
            //create new image in DB
            var image = new Image()
            {
                DateSent = parsedDate,
                ImageData = imageBytes,
                UserId = GetUserContext().Id
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return Ok();
        }

            [HttpPost]
        public async Task<ActionResult<Image>> PostImage(ImageJSON imgData)
        {
            DateTime parsedDate = DateTime.Parse(imgData.DateSent);
            byte[] data;
            using (WebClient webClient = new WebClient())
            {
                data = webClient.DownloadData(imgData.ImageURL);
            }
            
            if (_context.Users.FirstOrDefault(x => x.UserName == imgData.Username) == null)
            {
                _context.Users.Add(new User()
                {
                    UserName = imgData.Username
                });
            }

            _context.SaveChanges();
            var image = new Image()
            {
                DateSent = parsedDate,
                ImageData = data,
                UserId = _context.Users.FirstOrDefault(x => x.UserName == imgData.Username).Id
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetImage", new { id = image.Id }, image);
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }

        private User GetUserContext() => (User)HttpContext.Items["User"];
    }
}
