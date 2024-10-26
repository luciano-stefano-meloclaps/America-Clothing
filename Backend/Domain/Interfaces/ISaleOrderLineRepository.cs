using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ISaleOrderLineRepository : IBaseRepository<Saleorderline>
    {
        Saleorderline? GetById(int id);
        List<Saleorderline> GetAllBySaleOrder(int orderId);
        List<Saleorderline> GetAllByProduct(int productId);
        List<Saleorderline> GetAllByClient(int clientId);
        bool SaleOrderExists(int saleOrderId);
        Product? GetProduct(int productId);
    }
}
