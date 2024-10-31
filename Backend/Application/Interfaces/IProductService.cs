using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IProductService
    {
        List<ProductDto> GetAllProducts(); 
        ProductDto? Get(int code); 
        ProductDto? GetProductsByName(string name); 
        int AddProduct(ProductDto request);
        void DeleteProduct(int code);
        void UpdateProduct(int code, ProductDto request); 
    }
}
