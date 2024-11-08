using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        private readonly Cloudinary _cloudinary;

        public ProductController(IProductService service, Cloudinary cloudinary)
        {
            _service = service;
            _cloudinary = cloudinary;

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
        /*
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
        */
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] ProductDto body, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                AssetFolder = "VintageImagen"
            };

            try
            {
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                if (uploadResult == null || string.IsNullOrEmpty(uploadResult.SecureUrl.ToString()))
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading file to Cloudinary");
                }
                body.Image = uploadResult.SecureUrl.ToString();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Cloudinary error: {ex.Message}");
            }

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
        public async Task<IActionResult> UpdateProduct([FromRoute] int code, [FromForm] ProductDto request, IFormFile file)
        {
            var existingProduct = _service.Get(code);
            if (existingProduct == null)
            {
                return NotFound($"No se encontró ningún producto con el código: {code}");
            }

            
            if (file != null && file.Length > 0)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    AssetFolder = "VintageImagen"
                };

                try
                {
                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    if (uploadResult == null || string.IsNullOrEmpty(uploadResult.SecureUrl.ToString()))
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading file to Cloudinary");
                    }
                    
                    request.Image = uploadResult.SecureUrl.ToString();
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Cloudinary error: {ex.Message}");
                }
            }

            
            _service.UpdateProduct(code, request);
            return Ok($"Producto con código: {code} actualizado correctamente");
        }

    }

}
