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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setupAction =>
{
    setupAction.AddSecurityDefinition("Ecommerce-VintageApiBearerAuth", new OpenApiSecurityScheme() //Esto va a permitir usar swagger con el token.
    {
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Ac� pegar el token generado al loguearse."
    });

    setupAction.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Ecommerce-VintageApiBearerAuth" } //Tiene que coincidir con el id seteado arriba en la definici�n
                }, new List<string>() }
    });
});

builder.Services.AddDbContext<VintageDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("connection") ?? "Data Source=vintage.db"));

builder.Services.AddAuthentication("Bearer") //"Bearer" es el tipo de auntenticaci�n que tenemos que elegir despu�s en PostMan para pasarle el token
    .AddJwtBearer(options => //Ac� definimos la configuraci�n de la autenticaci�n. Le decimos qu� cosas queremos comprobar. La fecha de expiraci�n se valida por defecto.
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

var cloudinaryConfig = builder.Configuration.GetSection("Cloudinary");

var cloudinary = new Cloudinary(new Account(
    cloudinaryConfig["CloudName"],
    cloudinaryConfig["ApiKey"],
    cloudinaryConfig["ApiSecret"]
    ));

builder.Services.AddSingleton(cloudinary);
#region
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ISaleOrderService, SaleOrderService>();
builder.Services.AddScoped<ISaleOrderLineService, SaleOrderLineService>();
builder.Services.AddScoped<IAdminService, AdminService>();

builder.Services.Configure<AuthenticateServiceOptions>(
    builder.Configuration.GetSection(AuthenticateServiceOptions.AuthenticateService));
builder.Services.AddScoped<IAuthenticateService, AuthenticateService>();
#endregion

#endregion

// Database Configuration (Lead Architect Choice: SQLite for portability and low-cost demo)
var connectionString = builder.Configuration.GetConnectionString("connection");

// Ensure Data directory exists for persistence
var dataFolder = Path.Combine(AppContext.BaseDirectory, "Data");
if (!Directory.Exists(dataFolder)) Directory.CreateDirectory(dataFolder);

if (string.IsNullOrEmpty(connectionString) || connectionString.Contains("Server="))
{
    // Path robusto para Docker y Local
    var dbPath = Path.Combine(dataFolder, "vintage.db");
    connectionString = $"Data Source={dbPath}";
    Console.WriteLine($"ℹ️ Using SQLite database at: {dbPath}");
}

builder.Services.AddDbContext<VintageDbContext>(options =>
    options.UseSqlite(connectionString));

#region Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ISaleOrderRepository, SaleOrderRepository>();
builder.Services.AddScoped<ISaleOrderLineRepository, SaleOrderLineRepository>();
#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
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

// Apply migrations automatically
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<VintageDbContext>();
        context.Database.EnsureCreated(); 

        if (!context.Products.Any())
        {
            Console.WriteLine("🔍 No products found. Starting seeding process...");
            var seedFilePath = Path.Combine(AppContext.BaseDirectory, "SeedData", "02-seed-data.sql");
            if (!File.Exists(seedFilePath)) seedFilePath = "/app/SeedData/02-seed-data.sql";

            if (File.Exists(seedFilePath))
            {
                Console.WriteLine($"📖 Reading seed file from: {seedFilePath}");
                using var transaction = context.Database.BeginTransaction();
                try
                {
                    var sql = File.ReadAllText(seedFilePath);
                    sql = sql.Replace("SET FOREIGN_KEY_CHECKS = 0;", "PRAGMA foreign_keys = OFF;");
                    sql = sql.Replace("SET FOREIGN_KEY_CHECKS = 1;", "PRAGMA foreign_keys = ON;");
                    sql = sql.Replace("TRUNCATE TABLE", "DELETE FROM");
                    
                    context.Database.ExecuteSqlRaw("PRAGMA foreign_keys = OFF;");
                    context.Database.ExecuteSqlRaw(sql);
                    context.Database.ExecuteSqlRaw("PRAGMA foreign_keys = ON;");
                    
                    transaction.Commit();
                    Console.WriteLine("✅ Database seeded successfully into SQLite");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"❌ ERROR during seeding: {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine($"⚠️ Seed file NOT FOUND at: {seedFilePath}");
            }
        }
        else 
        {
            Console.WriteLine("ℹ️ Products already exist in database. Skipping seed.");
        }
    }
    catch (Exception ex)
    {

app.Run();
