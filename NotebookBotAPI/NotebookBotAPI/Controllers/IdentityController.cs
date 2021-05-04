using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NotebookBotAPI.Models;
using NotebookBotAPI.Models.ExportModels;
using NotebookBotAPI.Models.InputModels;

namespace NotebookBotAPI.Controllers
{
    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appsettings;

        public IdentityController(UserManager<User> _usermanager, IOptions<AppSettings> _appsettings)
        {
            userManager = _usermanager;
            appsettings = _appsettings.Value;
        }

        [Route(nameof(Register))]
        public async Task<IActionResult> Register(AuthenticateRequest model)
        {
            var User = new User()
            {
                UserName = model.Username
            };
            var result = await this.userManager.CreateAsync(User, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        public async Task<ActionResult<AuthenticateResponse>> Login(AuthenticateRequest model)
        {
            var user = await this.userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (passwordValid)
            {
                string authToken = generateJwtToken(user);
                var response = new AuthenticateResponse(user, authToken);
                return response;
            }

            return Unauthorized();
        }



        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appsettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
