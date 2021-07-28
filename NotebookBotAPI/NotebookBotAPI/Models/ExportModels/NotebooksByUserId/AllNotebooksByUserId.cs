using NotebookBotAPI.Models.ExportModels.NotebooksByUserId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.ExportModels
{
    public class AllNotebooksByUserId
    {
        public List<UserIdNotebook> Notebooks { get; set; }
    }
}
