using System;
using System.ComponentModel.DataAnnotations;

namespace NotebookBotAPI.Models
{
    public class Note
    {
        public int Id { get; set; }
        [Required]
        public int NotebookId { get; set; }
        public Notebook Notebook { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

    }
}
