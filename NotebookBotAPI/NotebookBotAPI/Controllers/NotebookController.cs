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
using NotebookBotAPI.Models.ExportModels;

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

        [Authorize]
        [HttpPost]
        [Route(nameof(CreateNote))]
        public async Task<ActionResult<Note>> CreateNote(NoteInputModel input)
        {
            var user = GetUserContext();
            if (user.Id == null)
            {
                return BadRequest(new ArgumentException("No user could be found with given username!"));
            }

            nbService.CreateNote(new Note
            {
                Title = input.Title,
                Content = input.Content,
                DateCreated = DateTime.Now,
                UserId = user.Id
            });

            return Ok();
        }


        [Authorize]
        [HttpGet]
        [Route(nameof(GetUserNotes))]
        public async Task<ActionResult<ICollection<NoteExportModel>>> GetUserNotes()
        {
            var userId = GetUserContext().Id;

            var data = nbService.GetAllUserNotes(userId);

            return new JsonResult(data);
        }

        [Authorize]
        [HttpGet]
        [Route("GetNoteById/{id}")]
        public async Task<ActionResult<NoteExportModel>> GetNoteById(int id)
        {
            var userId = GetUserContext().Id;
            var data = nbService.GetNote(id, userId);

            return new JsonResult(data);
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
