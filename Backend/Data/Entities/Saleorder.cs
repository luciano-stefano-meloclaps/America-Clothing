using System;
using System.Collections.Generic;

namespace ecommerce.Data.Entities
{
    public partial class Saleorder
    {
        public Saleorder()
        {
            Saleorderlines = new HashSet<Saleorderline>();
        }

        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Saleorderline> Saleorderlines { get; set; }
    }
}
