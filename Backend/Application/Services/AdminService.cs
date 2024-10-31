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
    public class AdminService : IAdminService
    {
        private readonly IUserRepository _repository;
        public AdminService(IUserRepository repository) 
        {
            _repository = repository;
        }

        public int AddEmployee(AdminDto request, string userType = "Employee")
        {
            var user = new User()
            {
                Name = request.Name,
                LastName = request.LastName,
                Username = request.Username,
                Email = request.Email,
                Password = request.Password,
                Usertype = userType,
                State = true,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber,
            };
            return _repository.Add(user).Id;
        }
    }
}
