using Microsoft.AspNetCore.Mvc;
using NotebookBotAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Controllers
{
    [Route("[controller]")]
    public class NotebookController : ApiController
    {
        private readonly NotebookDbContext _context;

        public NotebookController(NotebookDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<Notebook>> Create(NotebookJsonInput inputJson)
        {
            var userid = _context.Users.FirstOrDefault(x => x.UserName == inputJson.Username).Id;
            if(userid == null)
            {
                throw new ArgumentException("No user could be found with given username!");
            }

            _context.Notebooks.Add(new Notebook
            {
                Name = inputJson.Title,
                DateCreated = DateTime.Now,
                UserId = userid
            });
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
