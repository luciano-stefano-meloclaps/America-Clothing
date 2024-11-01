using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.ApplicationDbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class SaleOrderLineRepository : BaseRepository<Saleorderline>, ISaleOrderLineRepository
    {
        private readonly VintageDbContext _context;
        public SaleOrderLineRepository(VintageDbContext context) : base(context)
        {
            _context = context;
        }


        public Saleorderline? GetById(int id)
        {
            return _context.Saleorderlines
                //.Include(sol => sol.ProductCodeNavigation)
                //.Include(sol => sol.Saleorder)
                //.ThenInclude(so => so.User)
                .SingleOrDefault(x => x.Id == id);
        }
        public List<Saleorderline> GetAllBySaleOrder(int orderId)
        {
            return _context.Saleorderlines
                //.Include(sol => sol.ProductCodeNavigation)
                //.Include(sol => sol.Saleorder)
                //.ThenInclude(so => so.User)
                .Where(sol => sol.SaleorderId == orderId)
                .ToList();
        }

        public List<Saleorderline> GetAllByProduct(int productId)
        {
            return _context.Saleorderlines
                //.Include(sol => sol.ProductCodeNavigation)
                .Where(sol => sol.ProductCode == productId)
                //.Include(sol => sol.Saleorder)
                //.ThenInclude(so => so.User)
                .ToList();
        }

        public List<Saleorderline> GetAllByClient(int clientId)
        {
            return _context.Saleorderlines
                //.Include(sol => sol.ProductCodeNavigation)
                //.Include(sol => sol.Saleorder)
                //.ThenInclude(so => so.User)
                .Where(sol => sol.Saleorder.User.Id == clientId)
                .ToList();
        }

        public bool SaleOrderExists(int saleOrderId)
        {
            return _context.Saleorders.Any(s => s.Id == saleOrderId);
        }
        public Product? GetProduct(int productId)
        {
            return _context.Products.Find(productId);
        }
    }
}
