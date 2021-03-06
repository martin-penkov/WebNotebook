using System;

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
