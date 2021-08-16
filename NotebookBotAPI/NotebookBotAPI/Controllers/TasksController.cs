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
    public class TasksController : ApiController
    {
        private readonly NotebookDbContext _context;

        public TasksController(NotebookDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route(nameof(GetUserTasks))]
        public async Task<ActionResult<List<TaskExportModel>>> GetUserTasks()
        {
            var userId = GetUserContext().Id;
            var userTasks = _context.Tasks
                .Where(x => x.UserId == userId)
                .Select(x => new TaskExportModel()
                {
                    Id = x.Id,
                    Text = x.Text,
                    TargetDate = x.TargetDate
                })
                .ToList();

            return userTasks;
        }

        [Authorize]
        [HttpPost]
        [Route(nameof(AddUserTask))]
        public async Task<ActionResult<Models.Task>> AddUserTask(TaskInput taskData)
        {
            DateTime parsedDate = DateTime.Parse(taskData.TargetDate);

            var task = new Models.Task()
            {
                UserId = GetUserContext().Id,
                Text = taskData.Text,
                TargetDate = parsedDate
            };

            _context.Tasks.Add(task);
            _context.SaveChanges();
            return Ok();
        }

        [Authorize]
        [HttpDelete]
        [Route("RemoveById/{id}")]
        public ActionResult RemoveById(int id)
        {
            if (id <= 0)
            {
                return BadRequest(new ArgumentException("No task could be found with given id!"));
            }
            
            var task = _context.Tasks
                    .Where(s => s.Id == id)
                    .FirstOrDefault();
            //check if task has been created by same user
            if (task.UserId != GetUserContext().Id)
                return BadRequest(new ArgumentException("Selected task does not belong to same user"));

            _context.Tasks.Remove(task);
            _context.SaveChanges();

            return Ok();
        }


        private User GetUserContext() => (User)HttpContext.Items["User"];
    }
}
