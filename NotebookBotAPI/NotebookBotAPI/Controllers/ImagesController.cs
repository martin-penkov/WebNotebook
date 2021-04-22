﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
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
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return new FileContentResult(image.ImageData, "image/png");
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Image>> PostImage(ImageJSON imgData)
        {
            byte[] data;
            using (WebClient webClient = new WebClient())
            {
                data = webClient.DownloadData(imgData.ImageURL);
            }
            
            if (_context.Users.FirstOrDefault(x => x.Username == imgData.Username) == null)
            {
                _context.Users.Add(new User()
                {
                    Username = imgData.Username
                });
            }

            _context.SaveChanges();
            var image = new Image()
            {
                DateSent = imgData.DateSent,
                ImageData = data,
                UserId = _context.Users.FirstOrDefault(x => x.Username == imgData.Username).Id
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
    }
}
