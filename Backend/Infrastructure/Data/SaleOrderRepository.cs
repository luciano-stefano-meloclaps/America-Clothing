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
    public class SaleOrderRepository : BaseRepository<Saleorder>, ISaleOrderRepository
    {
        private readonly VintageDbContext _context;
        public SaleOrderRepository(VintageDbContext context) : base(context)
        {
            _context = context;
        }

        public List<Saleorder> GetAllByClient(int clientId) //todas por cliente
        {
            return _context.Saleorders
                .Include(so => so.User)
                .Include(so => so.Saleorderlines)
                .ThenInclude(so => so.ProductCode)
                .Where(r => r.UserId == clientId)
                .ToList();
        }

        public Saleorder? GetById(int id)
        {
            return _context.Saleorders
                .Include(r => r.User)
                .Include(r => r.Saleorderlines)
                .ThenInclude(so => so.ProductCode)
                .SingleOrDefault(x => x.Id == id);
        }
    }
}
