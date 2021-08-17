using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.ExportModels
{
    public class TaskExportModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime TargetDate { get; set; }
    }
}
