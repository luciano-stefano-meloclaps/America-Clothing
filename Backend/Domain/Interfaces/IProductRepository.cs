using Domain.Entities;
using Infrastructure.ApplicationDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Product? GetProductsByName(string name);
    }
}
