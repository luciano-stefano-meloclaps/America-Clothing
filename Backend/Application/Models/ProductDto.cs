using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class ProductDto
    {
        public int Code { get; set; }
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public int? Stock { get; set; }

        public string Size { get; set; } = null!;

        public string Category { get; set; } = null!;

        public string? Image { get; set; }
        public sbyte State { get; set; }
        public bool Sold { get; set; }


    }
}
