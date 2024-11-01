using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class SaleOrderService : ISaleOrderService
    {
        private readonly ISaleOrderRepository _repository;
        private readonly IProductRepository _productRepository;

        public SaleOrderService(ISaleOrderRepository repository, IProductRepository productRepository)
        {
            _repository = repository;
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<SaleOrderWithLinesDto>> GetSaleOrdersWithLinesAsync()
        {
            var saleOrders = await _repository.GetSaleOrdersWithLinesAsync();

            return saleOrders.Select(so => new SaleOrderWithLinesDto
            {
                SaleOrderId = so.Id,
                Date = so.Date,
                UserId = so.UserId,
                Lines = so.Saleorderlines.Select(line => new SaleOrderLineDto
                {
                    SaleOrderLineId = line.Id,
                    Amount = line.Amount,
                    UnitPrice = line.UnitPrice,
                    ProductId = line.ProductCode,
                    SaleOrderId = line.SaleorderId
                }).ToList()
            });
        }


        public List<Saleorder> GetAllByClient(int UserId)
        {
            return _repository.GetAllByClient(UserId);
        }

        public Saleorder? GetById(int id)
        {
            return _repository.GetById(id);
        }

        public Saleorder AddSaleOrder(SaleOrderDto saleOrderDto)
        {
            var saleOrder = new Saleorder
            {
                UserId = saleOrderDto.UserId,
                Saleorderlines = saleOrderDto.OrderLines.Select(line =>
                {
                    // Obtener el precio del producto usando el repositorio
                    var product = _productRepository.Get(line.ProductId);
                    if (product == null)
                    {
                        throw new Exception($"Producto con ID {line.ProductId} no encontrado.");
                    }

                    return new Saleorderline // Retorna el objeto Saleorderline
                    {
                        ProductCode = line.ProductId,
                        Amount = line.Amount,
                        UnitPrice = product.Price
                    };
                }).ToList()
            };

            // Agregar la orden de venta al repositorio
            _repository.Add(saleOrder);

            return saleOrder; // Retorna el objeto Saleorder completo
        }

        public void DeleteSaleOrder(int id)
        {
            var saleOrderToDelete = _repository.Get(id);
            if (saleOrderToDelete != null)
            {
                _repository.Delete(saleOrderToDelete);
            }
        }

        public void UpdateSaleOrder(int id, SaleOrderDto dto)
        {
            var saleOrderToUpdate = _repository.Get(id);
            if (saleOrderToUpdate != null)
            {
                saleOrderToUpdate.UserId = dto.UserId;
                _repository.Update(saleOrderToUpdate);
            }
        }
    }
}
