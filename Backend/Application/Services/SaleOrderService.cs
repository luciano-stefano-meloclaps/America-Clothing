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

        public SaleOrderService(ISaleOrderRepository repository)
        {
            _repository = repository;
        }
        public List<Saleorder> GetAllByClient(int UserId)
        {
            return _repository.GetAllByClient(UserId);
        }

        public Saleorder? GetById(int id)
        {
            return _repository.GetById(id);
        }

        public int AddSaleOrder(SaleOrderDto dto)
        {
            var saleOrder = new Saleorder()
            {
                UserId = dto.UserId,
            };
            return _repository.Add(saleOrder).Id;
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
