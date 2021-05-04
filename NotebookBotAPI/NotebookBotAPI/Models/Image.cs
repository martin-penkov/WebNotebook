using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public byte[] ImageData { get; set; }
        public DateTime DateSent { get; set; }
    }
}
