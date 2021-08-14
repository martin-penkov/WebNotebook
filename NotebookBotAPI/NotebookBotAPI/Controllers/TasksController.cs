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
        public async Task<ActionResult<List<Models.Task>>> GetUserTasks()
        {
            var userId = GetUserContext().Id;
            var userTasks = _context.Tasks
                .Where(x => x.UserId == userId)
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
            _context.SaveChangesAsync();
            return Ok();
        }



        private User GetUserContext() => (User)HttpContext.Items["User"];
    }
}
