using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.InputModels
{
    public class ImageJSON
    {
        [Required]
        public string Username { get; set; }

        public string ImageURL { get; set; }
        public DateTime DateSent { get; set; }

    }
}
