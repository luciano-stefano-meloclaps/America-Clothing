using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public List<Product> GetAllProducts()
        {
            return _repository.Get();
        }

        public Product? Get(int code)
        {
            return _repository.Get(code);
        }

        public Product? GetProductsByName(string name)
        {
            return _repository.GetProductsByName(name);
        }

        public int AddProduct(ProductDto request)
        {
            var product = new Product()
            {
                Code = request.Code,
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Stock = request.Stock,
                Size = request.Size,
               
            };
            return _repository.Add(product).Code;
        }

        public void DeleteProduct(int id)
        {
            var userToDelete = _repository.Get(id);
            if (userToDelete != null)
            {
                _repository.Delete(userToDelete);
            }
        }

        public void UpdateProduct(int code, Product request)
        {
            var productToUpdate = _repository.Get(code);
            if (productToUpdate != null)
            {
                productToUpdate.Name = request.Name;
                productToUpdate.Description = request.Description;
                productToUpdate.Price = request.Price;
                productToUpdate.Stock = request.Stock;
                productToUpdate.Size = request.Size;
                
                _repository.Update(productToUpdate);
            }
        }
    }
}
