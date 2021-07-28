using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NotebookBotAPI.Helpers;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels.NotebooksByUserId;

namespace NotebookBotAPI.Services.NotebookService
{
    public class NotebookService : INotebookService
    {
        private NotebookDbContext _dbcontext;
        public NotebookService(NotebookDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public void CreateNotebook(Notebook addNotebook)
        {
            _dbcontext.Notebooks.Add(addNotebook);
            _dbcontext.SaveChanges();
        }

        [Authorize]
        [HttpGet]
        public ICollection<UserIdNotebook> GetAllByOwnerId(string Id)
        {
            return _dbcontext.Notebooks
                .Where(x => x.UserId == Id)
                .Select(x => new UserIdNotebook
                    {
                        DateCreated = x.DateCreated,
                        Name = x.Name
                    }).ToList();
                  
        }
        [Authorize]
        [HttpGet]
        public Notebook GetById(int Id)
        {
            return _dbcontext.Notebooks
                .FirstOrDefault(x => x.Id == Id);
        }
    }
}
