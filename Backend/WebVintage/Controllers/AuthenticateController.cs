using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenticateService _authenticationService;

        public AuthenticateController(IConfiguration config, IAuthenticateService authenticateService)
        {
            _config = config;
            _authenticationService = authenticateService;
        }

        [HttpPost("authenticate")] //Vamos a usar un POST ya que debemos enviar los datos para hacer el login
        public ActionResult<string> Authenticate([FromBody] CredentialsDto credentials)
        {
            try
            {
                string token = _authenticationService.Authenticate(credentials); // Llamar a una función que valide los parámetros que enviamos.
                return Ok(token);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Credenciales inválidas. Por favor, verifica tu email y contraseña." });
            }
        }
    }
}
