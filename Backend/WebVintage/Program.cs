using Application.Interfaces;
using Application.Services;
using Domain.Interfaces;
using Infrastructure.ApplicationDbContext;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<VintageDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("connection"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.15-mysql")));

#region
builder.Services.AddScoped<IUserService, UserService>();
#endregion

#region Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
