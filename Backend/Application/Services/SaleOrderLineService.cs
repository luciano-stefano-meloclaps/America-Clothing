using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Exceptions;
using Domain.Interfaces;
using Infrastructure.ApplicationDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SaleOrderLineService : ISaleOrderLineService
    {
        private readonly ISaleOrderLineRepository _repository;
        private readonly IProductService _productService;
        public SaleOrderLineService(ISaleOrderLineRepository repository, IProductService productService)
        {
            _repository = repository;
            _productService = productService;
        }

        public List<Saleorderline> GetAllByClient(int clientId)
        {
            return _repository.GetAllByClient(clientId);
        }

        public List<Saleorderline> GetAllByProduct(int productId)
        {
            return _repository.GetAllByProduct(productId);
        }

        public List<Saleorderline> GetAllBySaleOrder(int orderId)
        {
            return _repository.GetAllBySaleOrder(orderId); ; // Método actualizado
        }

        public Saleorderline? GetById(int id)
        {
            return _repository.GetById(id);
        }

        public int AddSaleOrderLine(SaleOrderLineDto dto)
        {
            // Validar que Amount sea mayor que cero
            if (dto.Amount <= 0)
            {
                throw new NotAllowedException("La cantidad debe ser mayor que cero.");
            }
            // Obtén el producto para asegurarte de que no sea nulo
            var product = _repository.GetProduct(dto.ProductId);
            if (product == null)
            {
                throw new NotAllowedException("El producto no se pudo encontrar.");
            }

            // Verifica que el SaleOrderId exista en la tabla de órdenes de venta
            if (!_repository.SaleOrderExists(dto.SaleOrderId))
            {
                throw new NotAllowedException("SaleOrderId no existe.");
            }

            // Verifica el stock del producto
            if (product.Stock <= 0)
            {
                throw new NotAllowedException("El producto no está disponible en stock.");
            }

            if (product.Stock < dto.Amount)
            {
                throw new NotAllowedException("No hay suficiente stock para el producto.");
            }

            var saleOrderLine = new Saleorderline()
            {
                ProductCode = dto.ProductId,
                SaleorderId = dto.SaleOrderId,
                Amount = dto.Amount,
                UnitPrice = product.Price, // Asigna el precio unitario del producto
                ProductCodeNavigation = product // Asigna el producto para evitar referencias nulas
            };

            // Actualiza el stock del producto
            var updatedProduct = new Product
            {
                Code = dto.ProductId,
                Price = product.Price,
                Stock = product.Stock - dto.Amount
            };

            // Pasar el id y el producto
            _productService.UpdateProduct(dto.ProductId, updatedProduct);

            // Verificar y actualizar el estado del stock
            product.Stock = updatedProduct.Stock;
            //var stockStatus = product.StockStatus;

            return _repository.Add(saleOrderLine).Id;
        }


        public void DeleteSaleOrderLine(int id)
        {
            var saleOrderLineToDelete = _repository.Get(id);
            if (saleOrderLineToDelete != null)
            {
                _repository.Delete(saleOrderLineToDelete);
            }
        }

        public void UpdateSaleOrderLine(int id, SaleOrderLineDto dto)
        {
            var saleOrderLineToUpdate = _repository.Get(id);
            if (saleOrderLineToUpdate == null)
            {
                throw new NotAllowedException($"No se encontró ningun Detalle de Venta con el ID: {id}");
            }

            var product = _productService.Get(dto.ProductId);
            if (product == null)
            {
                throw new NotAllowedException($"No se encontró ningun Producto con el ID: {dto.ProductId}");
            }

            // Validar que Amount sea mayor que cero
            if (dto.Amount <= 0)
            {
                throw new NotAllowedException("La cantidad debe ser mayor que cero.");
            }

            // Calcular la diferencia de cantidad
            int amountDifference = dto.Amount - saleOrderLineToUpdate.Amount;

            // Verificar que haya suficiente stock
            if (product.Stock < amountDifference)
            {
                throw new NotAllowedException("No hay suficiente stock para el producto.");
            }

            // Actualizar el stock del producto
            var updatedProduct = new Product
            {
                Price = product.Price,
                Stock = product.Stock - amountDifference
            };
            _productService.UpdateProduct(dto.ProductId, updatedProduct);

            // Actualizar el detalle de la orden de venta
            saleOrderLineToUpdate.Amount = dto.Amount;
            saleOrderLineToUpdate.ProductCode = dto.ProductId;

            _repository.Update(saleOrderLineToUpdate);
        }

    }
}
