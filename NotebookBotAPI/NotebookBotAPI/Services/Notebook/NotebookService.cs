using System;
using System.Collections.Generic;
using System.Linq;
using NotebookBotAPI.Helpers;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels;
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
        public void CreateNote(Note addNote)
        {
            _dbcontext.Notes.Add(addNote);
            _dbcontext.SaveChanges();
        }

        public NoteExportModel GetNote(int id, string userId)
        {
            var note = _dbcontext.Notes
                    .FirstOrDefault(x => x.Id == id);

            if(note == null)
            {
                return null;
            }

            if (note.UserId != userId)
            {
                throw new ArgumentException("User does not have access to this note!");
            }

            return new NoteExportModel()
            {
                Content = note.Content,
                DateCreated = note.DateCreated,
                Id = note.Id
            };
        }

        public void DeleteNote(int id, string userId)
        {
            var note = _dbcontext.Notes
                            .FirstOrDefault(x => x.Id == id);

            if (note.UserId != userId)
            {
                throw new ArgumentException("User does not have access to this note!");
            }

            _dbcontext.Notes.Remove(note);
            _dbcontext.SaveChanges();
        }

        [Authorize]
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
        public Notebook GetById(int Id)
        {
            return _dbcontext.Notebooks
                .FirstOrDefault(x => x.Id == Id);
        }



        public ICollection<NoteExportModel> GetAllUserNotes(string userId)
        {
            return _dbcontext.Notes
                .Where(x => x.UserId == userId)
                .Select(x => new NoteExportModel()
                {
                    Id = x.Id,
                    Content = x.Content,
                    DateCreated = x.DateCreated
                })
                .ToList();
        }
    }
}
