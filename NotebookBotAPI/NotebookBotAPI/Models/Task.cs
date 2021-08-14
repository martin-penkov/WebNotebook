using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Text { get; set; }
        public DateTime TargetDate { get; set; }

    }
}
