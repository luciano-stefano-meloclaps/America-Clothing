using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class AdminDto
    {
        public string Name { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
        public string Usertype { get; set; } = null!;

        public bool State { get; set; }

        public string? Address { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
