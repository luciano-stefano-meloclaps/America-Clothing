using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public List<User> GetAllUsers()
        {
            return _repository.Get();
        }

        public User? Get(int id)
        {
            return _repository.Get(id);
        }

        public User? Get(string name)
        {
            return _repository.Get(name);
        }

        /* public int AddUser(UserDto request)
         {
             var user = new User()
             {
                 Name = request.Name,
                 LastName = request.LastName,
                 Username = request.Username,
                 Email = request.Email,
                 Password = request.Password,
                 Usertype = "Client",
                 State = true,
                 Address = request.Address,
                 PhoneNumber = request.PhoneNumber,
             };
             return _repository.Add(user).Id;
         }
        */
        public int AddUser(UserDto request, string userType = "Client") 
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

        public int AddAdminUser(UserDto request, string userType = "Admin")
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

        public void DeleteUser(int id)
        {
            var userToDelete = _repository.Get(id);
            if (userToDelete != null)
            {
                _repository.Delete(userToDelete);
            }
        }

        public void UpdateUser(int id, User request)
        {
            var userToUpdate = _repository.Get(id);
            if (userToUpdate != null)
            {
                userToUpdate.Name = request.Name;
                userToUpdate.LastName = request.LastName;
                userToUpdate.Username = request.Username;
                userToUpdate.Email = request.Email;
                userToUpdate.Password = request.Password;
                userToUpdate.Usertype = request.Usertype;
                userToUpdate.Address = request.Address;
                userToUpdate.PhoneNumber = request.PhoneNumber;

                _repository.Update(userToUpdate);
            }
        }
    }
}
