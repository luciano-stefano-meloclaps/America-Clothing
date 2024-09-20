using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
                var user = _service.Get(id);
                if (user == null)
                {
                    return NotFound($"No se encontró ningún cliente con el ID: {id}");
                }
                return Ok(user);
        }

        //[HttpGet("{name}")]
        //public IActionResult GetByName([FromRoute] string name)
        //{
        //        var client = _service.Get(name);
        //        if (client == null)
        //        {
        //            return NotFound($"No se encontró ningún cliente con el nombre: {name}");
        //        }
        //        return Ok(client);
        //}

        [HttpPost]
        public IActionResult Add([FromBody] UserDto body)
        {
            var newClient = _service.AddUser(body);
            return CreatedAtAction(nameof(GetById), new { id = newClient }, $"Creado el Cliente con el ID: {newClient}");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser([FromRoute] int id)
        {

            var existingUser = _service.Get(id);
            if (existingUser == null)
            {
                return NotFound($"No se encontró ningún Cliente con el ID: {id}");
            }

            _service.DeleteUser(id);
            return Ok($"Cliente con ID: {id} eliminado");



        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromRoute] int id, [FromBody] User request)
        {

            var existingUser = _service.Get(id);
            if (existingUser == null)
            {
                return NotFound($"No se encontró ningún Cliente con el ID: {id}");
            }

            _service.UpdateUser(id, request);
            return Ok($"Cliente con ID: {id} actualizado correctamente");

        }
    }
}
