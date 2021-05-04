using Microsoft.AspNetCore.Mvc;

namespace NotebookBotAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class ApiController : ControllerBase
    {
    }
}
