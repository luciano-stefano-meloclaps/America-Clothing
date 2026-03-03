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
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
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
options.UseMySql(builder.Configuration.GetConnectionString("connection"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.15-mysql")));

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

app.UseHttpsRedirection();

// Usar la pol�tica CORS antes de los otros middlewares
app.UseCors("AllowReactApp"); // Aplica la pol�tica de CORS

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
        context.Database.Migrate();

        // Manual Data Seeding for Demo (Senior Architect Approach: Read from SQL file)
        if (!context.Products.Any())
        {
            var seedFilePath = Path.Combine(AppContext.BaseDirectory, "SeedData", "_seed_data.sql");
            
            // In Docker, it's mapped to /app/SeedData/_seed_data.sql
            // Fallback for local development or if AppContext.BaseDirectory is different
            if (!File.Exists(seedFilePath)) 
            {
                seedFilePath = "/app/SeedData/_seed_data.sql";
            }

            if (File.Exists(seedFilePath))
            {
                var sql = File.ReadAllText(seedFilePath);
                
                // Split by ';' to execute in chunks if needed, or just execute raw if the driver supports it
                // For MySQL, multiple statements are usually allowed if configured in connection string
                context.Database.ExecuteSqlRaw(sql);
            }
        }
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

app.Run();
