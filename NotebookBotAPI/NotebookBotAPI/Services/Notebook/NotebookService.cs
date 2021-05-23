using System;
using System.Collections.Generic;
using NotebookBotAPI.Services.NotebookService;
using NotebookBotAPI.Models

namespace NotebookBotAPI.Services.NotebookService
{
    public class NotebookService : INotebookService
    {
        public ICollection<Notebook> GetAllByOwnerId(string Id)
        {
            throw new NotImplementedException();
        }

        public Notebook GetById(int Id)
        {
            throw new NotImplementedException();
        }
    }
}
