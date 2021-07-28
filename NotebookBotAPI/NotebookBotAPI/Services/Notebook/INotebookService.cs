using System;
using System.Collections.Generic;
using NotebookBotAPI.Models;

namespace NotebookBotAPI.Services.NotebookService
{
    public interface INotebookService
    {
        Notebook GetById(int Id);
        ICollection<Notebook> GetAllByOwnerId(string Id);
    }
}
