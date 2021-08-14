using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.InputModels
{
    public class TaskInput
    {
        public string  Text { get; set; }
        public string TargetDate { get; set; }
    }
}
