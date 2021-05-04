using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.ExportModels
{
    public class ImageUrlJSON
    {
        [Required] 
        public string imageUrl { get; set; }
        [Required] public string Username { get; set; }
        [Required] public DateTime dateSent { get; set; }

    }
}
