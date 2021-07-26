using Microsoft.AspNetCore.Mvc;
using NotebookBotAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotebookBotAPI.Models.InputModels;
using NotebookBotAPI.Helpers;
using NotebookBotAPI.Services.NotebookService;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace NotebookBotAPI.Controllers
{
    [Route("[controller]")]
    public class NotebookController : ApiController
    {
        private readonly NotebookDbContext _context;
        private readonly UserManager<User> _manager;
        //private readonly NotebookService _nbservice;

        public NotebookController(NotebookDbContext context, UserManager<User> manager)
        {
            _context = context;
            _manager = manager;
            //_nbservice = nbservice;
        }

        [Authorize]
        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<Notebook>> Create(NotebookJsonInput inputJson)
        {
            var usId = await _manager.GetUserAsync(HttpContext.User);
            //var userid = _context.Users.FirstOrDefault(x => x.UserName == inputJson.Username).Id;
            //if (userid == null)
            //{
            //    throw new ArgumentException("No user could be found with given username!");
            //}

            //_context.Notebooks.Add(new Notebook
            //{
            //    Name = inputJson.Title,
            //    DateCreated = DateTime.Now,
            //    UserId = userid
            //});
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize]
        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<ActionResult<Notebook>> GetAll()
        {
            
            //get user id from jwt token claims


            //get data from db
            //var neshto = _nbservice.GetAllByOwnerId("asdfasdfsadf");
            return NoContent();
        }
    }
}
