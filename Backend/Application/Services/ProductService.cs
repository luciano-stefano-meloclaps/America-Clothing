using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public List<ProductDto> GetAllProducts()
        {
            return _repository.Get().Select(product => new ProductDto
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Size = product.Size,
                State = product.State,
                Sold = product.Sold,
                Category = product.Category,
                Image = product.Image
            }).ToList();
        }

        public ProductDto? Get(int code)
        {
            var product = _repository.Get(code);
            if (product == null) return null;
            return new ProductDto
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Size = product.Size,
                State = product.State,
                Sold = product.Sold,
                Category = product.Category,
                Image = product.Image
            };

        }

        public ProductDto? GetProductsByName(string name)
        {
            var product = _repository.GetProductsByName(name);
            if (product == null) return null;

            return new ProductDto
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Size = product.Size,
                State = product.State,
                Sold = product.Sold,
                Category = product.Category,
                Image = product.Image
            };
        }

        public int AddProduct(ProductDto request)
        {
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                Stock = request.Stock,
                Size = request.Size,
                State = request.State,
                Sold = request.Sold,
                Category = request.Category,
                Image = request.Image,

            };
            return _repository.Add(product).Code;
        }

        public void DeleteProduct(int code)
        {
            var productToDelete = _repository.Get(code);
            if (productToDelete != null)
            {
                _repository.Delete(productToDelete);
            }
        }

        public void UpdateProduct(int code, ProductDto request)
        {
            var productToUpdate = _repository.Get(code);
            if (productToUpdate != null)
            {
                productToUpdate.Name = request.Name;
                productToUpdate.Description = request.Description;
                productToUpdate.Price = request.Price;
                productToUpdate.Stock = request.Stock;
                productToUpdate.State = request.State;
                productToUpdate.Sold = request.Sold;
                productToUpdate.Category = request.Category;
                productToUpdate.Image = request.Image;

                _repository.Update(productToUpdate);
            }
        }
    }
}
