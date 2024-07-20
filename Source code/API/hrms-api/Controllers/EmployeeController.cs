using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EmployeeController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetUsers()
        {
            return await _context.Employees.Where(x => x.Role != 2).ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetUser(int id)
        {
            var user = await _context.Employees.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Employee user)
        {
            if (id != user.EmployeeID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<ActionResult<Employee>> PostUser(Employee user)
        {
            if (EmailExists(user.Email))
            {
                return Conflict(new { message = "Email already exists" });
            }

            if (PhoneExists(user.PhoneNo))
            {
                return Conflict(new { message = "Phone number already exists" });
            }

            _context.Employees.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.EmployeeID }, user);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Employees.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeID == id);
        }

        private bool EmailExists(string email)
        {
            return _context.Employees.Any(e => e.Email == email);
        }

        private bool PhoneExists(string phoneNo)
        {
            return _context.Employees.Any(e => e.PhoneNo == phoneNo);
        }
    }
}
    