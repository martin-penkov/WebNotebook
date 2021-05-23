using System;
using System.ComponentModel.DataAnnotations;

namespace NotebookBotAPI.Models
{
    public class Notebook
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        public DateTime DateCreated { get; set; }
        public string Name { get; set; }
    }
}
