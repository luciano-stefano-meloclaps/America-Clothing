using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.ApplicationDbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private readonly VintageDbContext _context;
        public ProductRepository(VintageDbContext context) : base(context)
        {
            _context = context;
        }

        public Product? GetProductsByName(string name)
        {
            return _context.Products.SingleOrDefault(x => x.Name == name);
        }
    }
}
