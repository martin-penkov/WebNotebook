using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotebookBotAPI.Models.InputModels
{
    public class ImageRawDataInput
    {
        public string ImageBase64String { get; set; }
        public string DateSent { get; set; }
    }
}
