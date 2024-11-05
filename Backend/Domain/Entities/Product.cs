using Domain.Entities;
using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Product
{
    public int Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int? Stock { get; set; } = 1; //Stock predeterminado

    public string? Size { get; set; }

    public sbyte State { get; set; } = 1; // 1 = Disponible. 0 = No disponible

    public string Category { get; set; } = null!;

    public string? Image { get; set; }
    public bool Sold { get; set; } = false; // False = no vendido. True = vendido

    public virtual ICollection<Saleorderline> Saleorderlines { get; set; } = new List<Saleorderline>();
}
