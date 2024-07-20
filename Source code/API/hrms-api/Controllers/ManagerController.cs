using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ManagerController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Manager>>> GetUsers()
        {
            return await _context.Managers.Where(x => x.Role != 2).ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Manager>> GetUser(int id)
        {
            var manager = await _context.Managers.FindAsync(id);

            if (manager == null)
            {
                return NotFound();
            }

            return manager;
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Manager manager)
        {
            if (id != manager.ManagerID)
            {
                return BadRequest();
            }

            _context.Entry(manager).State = EntityState.Modified;

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
        public async Task<ActionResult<Employee>> PostUser(Manager manager)
        {
            if (EmailExists(manager.Email))
            {
                return Conflict(new { message = "Email already exists" });
            }

            if (PhoneExists(manager.PhoneNo))
            {
                return Conflict(new { message = "Phone number already exists" });
            }

            _context.Managers.Add(manager);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = manager.ManagerID }, manager);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Managers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Managers.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Managers.Any(e => e.ManagerID == id);
        }

        private bool EmailExists(string email)
        {
            return _context.Managers.Any(e => e.Email == email);
        }

        private bool PhoneExists(string phoneNo)
        {
            return _context.Managers.Any(e => e.PhoneNo == phoneNo);
        }
    }
}
    