using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        // ACA NECESITO EL POST DE CLIENTE
        private readonly IAdminService _adminService;
        private readonly IUserService _userService;

        public AdminController(IAdminService admin, IUserService userService)
        {
            _adminService = admin;
            _userService = userService;
        }

        //[HttpGet("{id}")]
        //public IActionResult GetById([FromRoute] int id)
        //{
        //    var user = _userService.Get(id);
        //    if (user == null)
        //    {
        //        return NotFound($"No se encontró ningún cliente con el ID: {id}");
        //    }
        //    return Ok(user);
        //}

        [HttpPost]

        public IActionResult AdddEmployee([FromBody] AdminDto body) 
        {
            if (body == null)
            {
                return BadRequest("El cuerpo de la solicitud no puede ser nulo.");
            }
            var newAdminId = _adminService.AddEmployee(body); // Usa el método con el tipo de usuario predeterminado
            return Ok("Salio Bien");
        }
    }
    
}
