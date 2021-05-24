using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NotebookBotAPI.Models.InputModels
{
    public class NotebookJsonInput
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Username { get; set; }

    }
}
