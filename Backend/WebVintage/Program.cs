using Application.Interfaces;
using Application.Services;
using CloudinaryDotNet;
using Domain.Interfaces;
using Domain.Entities;
using Infrastructure.ApplicationDbContext;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.IO;
using static Infrastructure.Services.AuthenticateService;

var builder = WebApplication.CreateBuilder(args);

// --- CORS Configuration ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("https://america-clothing.vercel.app", "https://america-clothing.vercel.app/", "http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// --- Swagger Configuration ---
builder.Services.AddSwaggerGen(setupAction =>
{
    setupAction.AddSecurityDefinition("Ecommerce-VintageApiBearerAuth", new OpenApiSecurityScheme()
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Acá pegar el token generado al loguearse."
    });

    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Ecommerce-VintageApiBearerAuth" } 
                }, new List<string>() }
    });
});

// --- Database Configuration (SQLite) ---
var connectionString = builder.Configuration.GetConnectionString("connection");
var dataFolder = Path.Combine(AppContext.BaseDirectory, "Data");
if (!Directory.Exists(dataFolder)) Directory.CreateDirectory(dataFolder);

if (string.IsNullOrEmpty(connectionString) || connectionString.Contains("Server="))
{
    var dbPath = Path.Combine(dataFolder, "vintage.db");
    connectionString = $"Data Source={dbPath}";
    Console.WriteLine($"ℹ️ Using SQLite database at: {dbPath}");
}

builder.Services.AddDbContext<VintageDbContext>(options =>
    options.UseSqlite(connectionString));

// --- Authentication ---
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["AuthenticateService:Issuer"],
            ValidAudience = builder.Configuration["AuthenticateService:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AuthenticateService:SecretForKey"]))
        };
    });

// --- External Services ---
var cloudinaryConfig = builder.Configuration.GetSection("Cloudinary");
var cloudinary = new Cloudinary(new Account(
    cloudinaryConfig["CloudName"],
    cloudinaryConfig["ApiKey"],
    cloudinaryConfig["ApiSecret"]
    ));
builder.Services.AddSingleton(cloudinary);

// --- Dependency Injection ---
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISaleOrderService, SaleOrderService>();
builder.Services.AddScoped<ISaleOrderLineService, SaleOrderLineService>();
builder.Services.AddScoped<IAdminService, AdminService>();

builder.Services.Configure<AuthenticateServiceOptions>(
    builder.Configuration.GetSection(AuthenticateServiceOptions.AuthenticateService));
builder.Services.AddScoped<IAuthenticateService, AuthenticateService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ISaleOrderRepository, SaleOrderRepository>();
builder.Services.AddScoped<ISaleOrderLineRepository, SaleOrderLineRepository>();

var app = builder.Build();

// --- Middleware Pipeline ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// --- Database Initialization & Seeding (Senior Architect Implementation) ---
var seedFilePath = Path.Combine(AppContext.BaseDirectory, "SeedData", "02-seed-data.sql");
if (!File.Exists(seedFilePath)) seedFilePath = "/app/SeedData/02-seed-data.sql";

DatabaseSeeder.Initialize(app.Services, seedFilePath);

app.Run();
