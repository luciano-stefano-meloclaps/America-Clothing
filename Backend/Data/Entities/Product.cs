using System;
using System.Collections.Generic;

namespace ecommerce.Data.Entities
{
    public partial class Product
    {
        public Product()
        {
            Saleorderlines = new HashSet<Saleorderline>();
        }

        public int Code { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int? Stock { get; set; }
        public string? Size { get; set; }

        public virtual ICollection<Saleorderline> Saleorderlines { get; set; }
    }
}
