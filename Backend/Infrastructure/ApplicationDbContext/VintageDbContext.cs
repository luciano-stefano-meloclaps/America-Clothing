using System;
using System.Collections.Generic;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.ApplicationDbContext;

public partial class VintageDbContext : DbContext
{
    public VintageDbContext()
    {
    }

    public VintageDbContext(DbContextOptions<VintageDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Saleorder> Saleorders { get; set; }
    public virtual DbSet<Saleorderline> Saleorderlines { get; set; }
    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Vacío para que Docker inyecte la conexión.
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("PRIMARY");
            entity.ToTable("product");
            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.Category).HasMaxLength(45).HasColumnName("category");
            entity.Property(e => e.Description).HasMaxLength(1000).HasColumnName("description");
            entity.Property(e => e.Image).HasMaxLength(500).HasColumnName("image");
            entity.Property(e => e.Name).HasMaxLength(100).HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Size).HasMaxLength(45).HasColumnName("size");
            entity.Property(e => e.State).HasColumnName("state");
            entity.Property(e => e.Stock).HasColumnName("stock");
            entity.Property(e => e.Sold).HasDefaultValue(false).HasColumnName("sold");
        });

        modelBuilder.Entity<Saleorder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.ToTable("saleorder");
            entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
            entity.Property(e => e.Date).HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("date");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.HasOne(d => d.User).WithMany(p => p.Saleorders).HasForeignKey(d => d.UserId).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("saleorder_user_useridfk");
        });

        modelBuilder.Entity<Saleorderline>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.ToTable("saleorderline");
            entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.ProductCode).HasColumnName("product_code");
            entity.Property(e => e.SaleorderId).HasColumnName("saleorder_id");
            entity.Property(e => e.UnitPrice).HasColumnName("unit_price");
            entity.HasOne(d => d.ProductCodeNavigation).WithMany(p => p.Saleorderlines).HasForeignKey(d => d.ProductCode).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("saleorderline_product_productcodefk");
            entity.HasOne(d => d.Saleorder).WithMany(p => p.Saleorderlines).HasForeignKey(d => d.SaleorderId).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("saleorderline_saleorder_saleorderidfk");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");
            entity.ToTable("user");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasMaxLength(90).HasColumnName("address");
            entity.Property(e => e.Email).HasMaxLength(45).HasColumnName("email");
            entity.Property(e => e.LastName).HasMaxLength(45).HasColumnName("last_name");
            entity.Property(e => e.Name).HasMaxLength(45).HasColumnName("name");
            entity.Property(e => e.Password).HasMaxLength(45).HasColumnName("password");
            entity.Property(e => e.PhoneNumber).HasMaxLength(45).HasColumnName("phone_number");
            entity.Property(e => e.State).HasColumnName("state");
            entity.Property(e => e.Usertype).HasColumnName("usertype");

            entity.HasData(
                new User
                {
                    Id = 9998,
                    Name = "Demo",
                    LastName = "Admin",
                    Email = "admin@demo.com",
                    Password = "admin123",
                    Username = "demoadmin",
                    Address = "Demo Address",
                    PhoneNumber = "1234567890",
                    State = true,
                    Usertype = "admin"
                },
                new User
                {
                    Id = 9999,
                    Name = "Demo",
                    LastName = "Client",
                    Email = "client@demo.com",
                    Password = "client123",
                    Username = "democlient",
                    Address = "Demo Address",
                    PhoneNumber = "1234567890",
                    State = true,
                    Usertype = "client"
                }
            );
        });
    }
}