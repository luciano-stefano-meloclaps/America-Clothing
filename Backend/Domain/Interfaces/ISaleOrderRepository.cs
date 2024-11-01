using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ISaleOrderRepository : IBaseRepository<Saleorder>
    {
        List<Saleorder> GetAllByClient(int clientId);
        Saleorder? GetById(int id);

        Task<IEnumerable<Saleorder>> GetSaleOrdersWithLinesAsync();
    }
}
