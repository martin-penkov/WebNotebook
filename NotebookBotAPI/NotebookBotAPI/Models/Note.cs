using System;
using System.ComponentModel.DataAnnotations;

namespace NotebookBotAPI.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int? NotebookId { get; set; }
        public Notebook? Notebook { get; set; }
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public string? Title { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

    }
}
