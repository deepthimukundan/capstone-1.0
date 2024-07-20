using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeInformationController : ControllerBase
    {
        private readonly MyDbContext _context;

        public EmployeeInformationController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeInformation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Information>>> GetEmployeeInformation()
        {
            return await _context.EmployeeInformation.ToListAsync();
        }

        // GET: api/EmployeeInformation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Information>> GetInformation(int id)
        {
            var information = await _context.EmployeeInformation.FindAsync(id);

            if (information == null)
            {
                return NotFound();
            }

            return information;
        }

        // PUT: api/EmployeeInformation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInformation(int id, Information information)
        {
            if (id != information.ID)
            {
                return BadRequest();
            }

            _context.Entry(information).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InformationExists(id))
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

        // POST: api/EmployeeInformation
        [HttpPost]
        public async Task<ActionResult<Information>> PostInformation(Information information)
        {
            if (UserIdExists(information.EmployeeID))
            {
                return Conflict(new { message = "User ID already exists" });
            }

            _context.EmployeeInformation.Add(information);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInformation), new { id = information.ID }, information);
        }

        // DELETE: api/EmployeeInformation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInformation(int id)
        {
            var information = await _context.EmployeeInformation.FindAsync(id);
            if (information == null)
            {
                return NotFound();
            }

            _context.EmployeeInformation.Remove(information);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InformationExists(int id)
        {
            return _context.EmployeeInformation.Any(e => e.ID == id);
        }

        private bool UserIdExists(int userId)
        {
            return _context.EmployeeInformation.Any(e => e.EmployeeID == userId);
        }
                
        [HttpGet]
        [Route("GetUserInfo")]
        public async Task<IActionResult> GetUserInfo([FromQuery] string name, [FromQuery] string department, [FromQuery] string designation)
        {
            var query = from user in _context.Employees
                        join info in _context.EmployeeInformation on user.EmployeeID equals info.EmployeeID
                        join manager in _context.Managers on info.ManagerID equals manager.ManagerID
                        select new
                        {
                            user.EmployeeID,
                            user.Name,
                            user.Email,
                            user.PhoneNo,
                            info.JoiningDate,
                            info.Designation,
                            info.Department,
                            manager.ManagerName
                        };

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(x => x.Name == name);
            }

            if (!string.IsNullOrEmpty(department))
            {
                query = query.Where(x => x.Department.Contains(department));
            }

            if (!string.IsNullOrEmpty(designation))
            {
                query = query.Where(x => x.Designation.Contains(designation));
            }

            var result = await query.ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetUsersInfo")]
        public async Task<IActionResult> GetUsersInfo()
        {
            var query = from user in _context.Employees
                        join info in _context.EmployeeInformation on user.EmployeeID equals info.EmployeeID
                        join manager in _context.Managers on info.ManagerID equals manager.ManagerID
                        select new
                        {
                            user.EmployeeID,
                            user.Name,
                            user.Email,
                            user.PhoneNo,
                            info.JoiningDate,
                            info.Designation,
                            info.Department,
                            manager.ManagerName
                        };

            var result = await query.ToListAsync();
            return Ok(result);
        }
    }
}
