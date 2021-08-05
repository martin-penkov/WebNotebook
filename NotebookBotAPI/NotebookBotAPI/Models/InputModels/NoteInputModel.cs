using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.InputModels
{
    public class NoteInputModel
    {
        public string? Title { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
