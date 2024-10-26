using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ISaleOrderLineService
    {
        List<Saleorderline> GetAllByClient(int clientId);
        List<Saleorderline> GetAllByProduct(int productId);
        List<Saleorderline> GetAllBySaleOrder(int orderId);
        Saleorderline? GetById(int id);
        int AddSaleOrderLine(SaleOrderLineDto dto);
        void DeleteSaleOrderLine(int id);
        void UpdateSaleOrderLine(int id, SaleOrderLineDto dto);
    }
}
