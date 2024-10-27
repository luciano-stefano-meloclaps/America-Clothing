using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Infrastructure.ApplicationDbContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllProducts());
        }

        [HttpGet("{code}")]
        public IActionResult GetByCode([FromRoute] int code)
        {
            var product = _service.Get(code);
            if (product == null)
            {
                return NotFound($"No se encontró ningún producto con el código: {code}");
            }
            return Ok(product);
        }

        [HttpGet("{name}")]
        public IActionResult GetProductsByName([FromRoute] string name)
        {
            var product = _service.GetProductsByName(name);
            if (product == null)
            {
                return NotFound($"No se encontraron productos con el nombre: {name}");
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult Add([FromBody] ProductDto body)
        {
            var newProduct = _service.AddProduct(body);
            return CreatedAtAction(nameof(GetByCode), new { code = newProduct }, $"Creado el Producto con el código: {newProduct}");
        }

        [HttpDelete("{code}")]
        public IActionResult DeleteProduct([FromRoute] int code)
        {

            var existingProduct = _service.Get(code);
            if (existingProduct == null)
            {
                return NotFound($"No se encontró ningún Producto con el código: {code}");
            }

            _service.DeleteProduct(code);
            return Ok($"Producto con código: {code} eliminado");



        }

        [HttpPut("{code}")]
        public IActionResult UpdateProduct([FromRoute] int code, [FromBody] Product request)
        {

            var existingProduct = _service.Get(code);
            if (existingProduct == null)
            {
                return NotFound($"No se encontró ningún producto con el código: {code}");
            }

            _service.UpdateProduct(code, request);
            return Ok($"Producto con código: {code} actualizado correctamente");

        }
    }

}
