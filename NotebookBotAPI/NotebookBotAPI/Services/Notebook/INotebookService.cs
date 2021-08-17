using System;
using System.Collections.Generic;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels;
using NotebookBotAPI.Models.ExportModels.NotebooksByUserId;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Services.NotebookService
{
    public interface INotebookService
    {
        Notebook GetById(int Id);
        ICollection<UserIdNotebook> GetAllByOwnerId(string Id);
        void CreateNote(Note addNote);
        void CreateNotebook(Notebook addNotebook);

        ICollection<NoteExportModel> GetAllUserNotes(string userId);
        NoteExportModel GetNote(int id, string userId);
    }
}
