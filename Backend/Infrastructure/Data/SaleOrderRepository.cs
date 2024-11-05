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


        /// /////////////

        public async Task<IEnumerable<Saleorder>> GetSaleOrdersWithLinesAsync()
        {
            return await _context.Saleorders
                .Include(so => so.Saleorderlines)
                //.ThenInclude(sol => sol.ProductCodeNavigation) // Incluir la relación con el producto aquí
                .ToListAsync();
        }

        /// ////////////////////
   
        public List<Saleorder> GetAllByClient(int clientId)
        {
            return _context.Saleorders
                //.Include(so => so.User) // Incluye la relación con el usuario
                //.Include(so => so.Saleorderlines) // Incluye la colección de líneas de pedido
                //.ThenInclude(sol => sol.ProductCodeNavigation) // Incluye la relación con el producto a través de la propiedad de navegación correcta
                .Where(r => r.UserId == clientId)
                .ToList();
        }

        public Saleorder? GetById(int id)
        {
            return _context.Saleorders
                //.Include(r => r.User)
                //.Include(r => r.Saleorderlines)
                //.ThenInclude(sol => sol.ProductCodeNavigation)
                .SingleOrDefault(x => x.Id == id);
        }

    }
}
