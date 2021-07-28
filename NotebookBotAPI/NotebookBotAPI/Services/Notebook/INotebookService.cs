using System;
using System.Collections.Generic;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels.NotebooksByUserId;

namespace NotebookBotAPI.Services.NotebookService
{
    public interface INotebookService
    {
        Notebook GetById(int Id);
        ICollection<UserIdNotebook> GetAllByOwnerId(string Id);

        void CreateNotebook(Notebook addNotebook);
    }
}
