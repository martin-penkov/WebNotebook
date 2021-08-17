using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.ExportModels
{
    public class NoteExportModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime? DateCreated { get; set; }
    }
}
