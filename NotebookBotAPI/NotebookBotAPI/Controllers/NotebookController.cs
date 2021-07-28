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
        private readonly INotebookService nbService;

        public NotebookController(INotebookService _nbservice)
        {
            nbService = _nbservice;
        }

        [Authorize]
        [HttpPost]
        [Route(nameof(Create))]
        public async Task<ActionResult<Notebook>> Create(NotebookJsonInput inputJson)
        {
            var user = GetUserContext();
            if (user.Id == null)
            {
                throw new ArgumentException("No user could be found with given username!");
            }

            nbService.CreateNotebook(new Notebook
            {
                Name = inputJson.Title,
                DateCreated = DateTime.Now,
                UserId = user.Id
            });
            return Ok();
        }

        
        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<ActionResult<ICollection<Notebook>>> GetAll()
        {
            //get user id from jwt token claims
            var user = GetUserContext();
            if (user.Id == null)
            {
                throw new ArgumentException("No user could be found with given username!");
            }
            
            //get data from db
            return new JsonResult(nbService.GetAllByOwnerId(user.Id));
        }

        private User GetUserContext() => (User)HttpContext.Items["User"];
    }
}
