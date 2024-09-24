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
        List<Product> GetAllProducts();
        Product? Get(int code);
        Product? GetProductsByName(string name);
        int AddProduct(ProductDto request);
        void DeleteProduct(int id);
        void UpdateProduct(int id, Product request);
    }
}
