using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebVintage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleOrderLineController : ControllerBase
    {
        private readonly ISaleOrderLineService _saleOrderLineService;
        private readonly ISaleOrderService _saleOrderService;
        private readonly IProductService _productService;

        public SaleOrderLineController(ISaleOrderLineService saleOrderLineService, ISaleOrderService saleOrderService, IProductService productService)
        {
            _saleOrderLineService = saleOrderLineService;
            _saleOrderService = saleOrderService;
            _productService = productService;
        }

        private bool IsUserInRole(string role)
        {
            var roleClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role); // Obtener el claim de rol, si existe
            return roleClaim != null && roleClaim.Value == role; //Verificar si el claim existe y su valor es "role"
        }
        private int? GetUserId() //Funcion para obtener el userId de las claims del usuario autenticado en el contexto de la solicitud actual.
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
            {
                return userId;
            }
            return null;
        }

        [HttpGet("by-id/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Forbid();
            }

            var saleOrderLine = _saleOrderLineService.GetById(id);
            if (saleOrderLine == null)
            {
                return NotFound($"No se encontró ningun detalle de venta con el ID: {id}");
            }

            var saleOrder = _saleOrderService.GetById(saleOrderLine.SaleorderId);
            if (saleOrder == null)
            {
                return NotFound($"No se encontró ninguna venta con el ID: {saleOrderLine.SaleorderId}");
            }

            if (IsUserInRole("Admin") || (IsUserInRole("Client") && userId == saleOrder.UserId))
            {
                return Ok(saleOrderLine);
            }

            return Forbid();
        }

        [HttpGet("by-product/{productId}")]
        public IActionResult GetAllByProduct([FromRoute] int productId)
        {
            if (IsUserInRole("Admin"))
            {
                var product = _productService.Get(productId);
                if (product == null)
                {
                    return NotFound($"No se encontró ningún producto con el ID: {productId}");
                }

                var saleOrderLines = _saleOrderLineService.GetAllByProduct(productId);
                return Ok(saleOrderLines);
            }
            return Forbid();
        }

        [HttpGet("by-saleorder/{orderId}")]
        public IActionResult GetAllBySaleOrder([FromRoute] int orderId)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Forbid();
            }

            var saleOrder = _saleOrderService.GetById(orderId);
            if (saleOrder == null)
            {
                return NotFound($"No se encontró ninguna venta con el ID: {orderId}");
            }

            if (IsUserInRole("Admin") || (IsUserInRole("Client") && userId == saleOrder.UserId))
            {
                var saleOrderDetails = _saleOrderLineService.GetAllBySaleOrder(orderId);
                return Ok(saleOrderDetails);
            }

            return Forbid();
        }
        
        [HttpPost]
        public IActionResult Add([FromBody] SaleOrderLineDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Forbid();
            }

            var existingSaleOrder = _saleOrderService.GetById(dto.SaleOrderId);
            if (existingSaleOrder == null)
            {
                return NotFound($"No se encontró ninguna venta con el ID: {dto.SaleOrderId}");
            }

            if (IsUserInRole("Admin") || (IsUserInRole("Client") && userId == existingSaleOrder.UserId))
            {
                var saleOrderLineId = _saleOrderLineService.AddSaleOrderLine(dto);
                return CreatedAtAction(nameof(GetById), new { id = saleOrderLineId }, $"Creado el Detalle de Venta con el ID: {saleOrderLineId}");
            }
            return Forbid();
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteSaleOrderLine([FromRoute] int id)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Forbid();
            }

            var existingSaleOrderLine = _saleOrderLineService.GetById(id);
            if (existingSaleOrderLine == null)
            {
                return NotFound($"No se encontró ningun detalle de venta con el ID: {id}");
            }

            var existingSaleOrder = _saleOrderService.GetById(existingSaleOrderLine.SaleorderId);
            if (existingSaleOrder == null)
            {
                return NotFound($"No se encontró ninguna venta con el ID: {existingSaleOrderLine.SaleorderId}");
            }

            if (IsUserInRole("Admin") || (IsUserInRole("Client") && userId == existingSaleOrder.UserId))
            {
                _saleOrderLineService.DeleteSaleOrderLine(id);
                return Ok($"Detalle de venta con ID: {id} eliminado");
            }

            return Forbid();
        }


        [HttpPut("{id}")]
        public IActionResult UpdateSaleOrderDetail([FromRoute] int id, [FromBody] SaleOrderLineDto dto)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                return Forbid();
            }

            var existingSaleOrderLine = _saleOrderLineService.GetById(id);
            if (existingSaleOrderLine == null)
            {
                return NotFound($"No se encontró ningun Detalle de Venta con el ID: {id}");
            }

            var existingSaleOrder = _saleOrderService.GetById(existingSaleOrderLine.SaleorderId);
            if (existingSaleOrder == null)
            {
                return NotFound($"No se encontró ninguna venta con el ID: {existingSaleOrderLine.SaleorderId}");
            }

            if (IsUserInRole("Admin") || (IsUserInRole("Client") && userId == existingSaleOrder.UserId))
            {
                try
                {
                    _saleOrderLineService.UpdateSaleOrderLine(id, dto);
                    return Ok($"Detalle de Venta con ID: {id} actualizado correctamente");
                }
                catch (NotAllowedException ex)
                {
                    return NotFound(ex.Message);
                }
            }

            return Forbid();
        }
    }
}
