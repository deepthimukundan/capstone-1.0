using Microsoft.EntityFrameworkCore;

namespace hrms_api.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Information> EmployeeInformation { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Leaves> Leaves { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
    }
}
