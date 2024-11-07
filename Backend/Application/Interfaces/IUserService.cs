using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        User? Get(int id);
        User? Get(string name);
        int AddUser(UserDto request, string userType = "Client");
        int AddAdminUser(UserAdminDto request);

        void DeleteUser(int id);
        void UpdateUser(int id, UserAdminDto request);
    }
}
