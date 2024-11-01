using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class SaleOrderLineDto
    {
         public int ProductId { get; set; }
        // public int SaleOrderId { get; set; }
        // public int SaleOrderLineId { get; set; }

        ////public int Amount { get; set; }
        ///
        public int SaleOrderLineId { get; set; }
        public int Amount { get; set; }
        public decimal UnitPrice { get; set; }
     //   public int ProductCode { get; set; }
        public int SaleOrderId { get; set; }
    }
}
