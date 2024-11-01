using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class SaleOrderWithLinesDto
    {
        public int SaleOrderId { get; set; }
        public DateTime? Date { get; set; }
        public int UserId { get; set; }
        public List<SaleOrderLineDto> Lines { get; set; }
    }
}
