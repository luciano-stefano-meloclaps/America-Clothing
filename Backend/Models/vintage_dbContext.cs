using System;
using System.Collections.Generic;
using ecommerce.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ecommerce.Models
{
    public partial class vintage_dbContext : DbContext
    {
        public vintage_dbContext()
        {
        }

        public vintage_dbContext(DbContextOptions<vintage_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Saleorder> Saleorders { get; set; } = null!;
        public virtual DbSet<Saleorderline> Saleorderlines { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;database=vintage_db;uid=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.15-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Code)
                    .HasName("PRIMARY");

                entity.ToTable("product");

                entity.Property(e => e.Code)
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever()
                    .HasColumnName("code");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Size)
                    .HasMaxLength(45)
                    .HasColumnName("size");

                entity.Property(e => e.Stock)
                    .HasColumnType("int(11)")
                    .HasColumnName("stock");
            });

            modelBuilder.Entity<Saleorder>(entity =>
            {
                entity.ToTable("saleorder");

                entity.HasIndex(e => e.UserId, "saleorder_user_userid_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.UserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Saleorders)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("saleorder_user_useridfk");
            });

            modelBuilder.Entity<Saleorderline>(entity =>
            {
                entity.ToTable("saleorderline");

                entity.HasIndex(e => e.ProductCode, "saleorderline_product_productcodefk_idx");

                entity.HasIndex(e => e.SaleorderId, "saleorderline_saleorder_saleorderidfk_idx");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("int(11)")
                    .HasColumnName("amount");

                entity.Property(e => e.ProductCode)
                    .HasColumnType("int(11)")
                    .HasColumnName("product_code");

                entity.Property(e => e.SaleorderId)
                    .HasColumnType("int(11)")
                    .HasColumnName("saleorder_id");

                entity.Property(e => e.UnitPrice)
                    .HasPrecision(10, 2)
                    .HasColumnName("unit_price");

                entity.HasOne(d => d.ProductCodeNavigation)
                    .WithMany(p => p.Saleorderlines)
                    .HasForeignKey(d => d.ProductCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("saleorderline_product_productcodefk");

                entity.HasOne(d => d.Saleorder)
                    .WithMany(p => p.Saleorderlines)
                    .HasForeignKey(d => d.SaleorderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("saleorderline_saleorder_saleorderidfk");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(90)
                    .HasColumnName("address");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.LastName)
                    .HasMaxLength(45)
                    .HasColumnName("last_name");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(45)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(45)
                    .HasColumnName("phone_number");

                entity.Property(e => e.State).HasColumnName("state");

                entity.Property(e => e.Username)
                    .HasMaxLength(45)
                    .HasColumnName("username");

                entity.Property(e => e.Usertype)
                    .HasColumnType("enum('admin','employee','client','cadet')")
                    .HasColumnName("usertype");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
