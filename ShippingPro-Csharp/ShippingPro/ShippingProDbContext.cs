using Microsoft.EntityFrameworkCore;
using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class ShippingProDbContext
       : DbContext
    {
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }

        public ShippingProDbContext(
            DbContextOptions<ShippingProDbContext> options)
            : base(options)
        {

        }

        public ShippingProDbContext()
        {

        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Author>().ToTable("Author");
        //}


        protected override void OnConfiguring(
                    DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=.;Database=ShippingProject;Integrated Security=true;";
            optionsBuilder.UseSqlServer(connectionString);
        }

    }
}
