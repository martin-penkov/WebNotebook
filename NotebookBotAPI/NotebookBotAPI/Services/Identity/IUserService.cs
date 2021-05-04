using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<User> GetAll();
        User GetById(string id);
    }
}
