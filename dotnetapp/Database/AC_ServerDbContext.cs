using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.DataDbContext
{
    public class AcServiceDbContext:DbContext
    {
      public AcServiceDbContext(DbContextOptions<AcServiceDbContext>options):base(options)
        {
            
        }
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<UserModel> Users { get; set; } 
        public DbSet<ServiceCenterModel> Services { get; set; }
        public DbSet<AdminModel> Admins { get; set; }
        public DbSet<LoginModel> LoginModels { get; set; }
        public DbSet<ReviewModel> Reviews{get;set;}
        public DbSet<BillModel> Bills {get;set;}
    }
}