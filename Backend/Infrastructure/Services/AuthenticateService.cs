using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Application.Interfaces;
using Application.Models;

namespace Infrastructure.Services
{
    public class AuthenticateService : IAuthenticateService
    {
        private readonly IUserRepository _userRepository;
        private readonly AuthenticateServiceOptions _options;

        public AuthenticateService(IUserRepository userRepository, IOptions<AuthenticateServiceOptions> options)
        {
            _userRepository = userRepository;
            _options = options.Value;
        }

        private User? ValidateUser(CredentialsDto credentialsRequest)
        {
            if (string.IsNullOrEmpty(credentialsRequest.Email) || string.IsNullOrEmpty(credentialsRequest.Password))
                return null;

            var user = _userRepository.GetUserByEmail(credentialsRequest.Email);

            if (user == null) return null;

            if (user.Password == credentialsRequest.Password) return user;
            return null;
        }

        public string Authenticate(CredentialsDto credentialsRequest)
        {
            //Paso 1: Validamos las credenciales
            var user = ValidateUser(credentialsRequest); //Lo primero que hacemos es llamar a una función que valide los parámetros que enviamos.

            if (user == null)
            {
                throw new UnauthorizedAccessException("User authentication failed");
            }


            //Paso 2: Crear el token
            var securityPassword = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.SecretForKey)); //Traemos la SecretKey del Json. agregar antes: using Microsoft.IdentityModel.Tokens;

            var credentials = new SigningCredentials(securityPassword, SecurityAlgorithms.HmacSha256);

            //Los claims son datos en clave->valor que nos permite guardar data del usuario.
            var claimsForToken = new List<Claim>
            {
                new Claim("sub", user.Id.ToString()), // ID del usuario
                new Claim("email", user.Email),       // Email del usuario
                new Claim("username", user.Username), // Username
                new Claim("role", user.Usertype),     // Rol del usuario
                new Claim("name", user.Name) // Nombre de pila del usuario
            };

            var jwtSecurityToken = new JwtSecurityToken( //agregar using System.IdentityModel.Tokens.Jwt; Acá es donde se crea el token con toda la data que le pasamos antes.
              _options.Issuer,
              _options.Audience,
              claimsForToken,
              DateTime.UtcNow,
              DateTime.UtcNow.AddHours(1),
              credentials);

            var tokenToReturn = new JwtSecurityTokenHandler() //Pasamos el token a string
                .WriteToken(jwtSecurityToken);

            return tokenToReturn.ToString();

        }

        public class AuthenticateServiceOptions
        {
            public const string AuthenticateService = "AuthenticateService";

            public string Issuer { get; set; }
            public string Audience { get; set; }
            public string SecretForKey { get; set; }
        }
    }
}
