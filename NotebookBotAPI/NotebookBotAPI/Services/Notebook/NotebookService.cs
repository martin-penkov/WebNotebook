using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NotebookBotAPI.Helpers;
using NotebookBotAPI.Models;

namespace NotebookBotAPI.Services.NotebookService
{
    public class NotebookService : INotebookService
    {
        private NotebookDbContext _dbcontext;
        public NotebookService(NotebookDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        [Authorize]
        [HttpGet]
        public ICollection<Notebook> GetAllByOwnerId(string Id)
        {
            return _dbcontext.Notebooks
                .Where(x => x.UserId == Id)
                .ToList();
        }
        [Authorize]
        public Notebook GetById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
