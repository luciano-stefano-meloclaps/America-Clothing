using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISaleOrderService
    {
       // List<Saleorder> GetAll();
        List<Saleorder> GetAllByClient(int UserId);
        Saleorder? GetById(int id);
        Saleorder AddSaleOrder(SaleOrderDto saleOrderDto);
        void DeleteSaleOrder(int id);
        void UpdateSaleOrder(int id, SaleOrderDto dto);

        Task<IEnumerable<SaleOrderWithLinesDto>> GetSaleOrdersWithLinesAsync();


    }
}
