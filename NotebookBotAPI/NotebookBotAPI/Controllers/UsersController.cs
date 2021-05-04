using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotebookBotAPI.Helpers;

namespace NotebookBotAPI.Controllers
{
    public class UsersController : ApiController
    {
        public UsersController()
        {
        }

        [Helpers.Authorize]
        [Route(nameof(Get))]
        public IActionResult Get()
        {
            return Ok("Works");
        }
    }
}
