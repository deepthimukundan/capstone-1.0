using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public LeavesController(MyDbContext context)
        {
            _context = context;
        }

        // 1. Add New Leave
        [HttpPost]
        public async Task<ActionResult<Leaves>> AddLeave(Leaves leave)
        {
            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLeavesByEmployeeID), new { employeeID = leave.EmployeeID }, leave);
        }

        // 2. Cancel/Delete Leave
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeave(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);
            if (leave == null)
            {
                return NotFound();
            }

            _context.Leaves.Remove(leave);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 3. Get Leaves by EmployeeID
        [HttpGet("Employee/{employeeID}")]
        public async Task<ActionResult<IEnumerable<Leaves>>> GetLeavesByEmployeeID(int employeeID)
        {
            var leaves = await _context.Leaves.Where(l => l.EmployeeID == employeeID).ToListAsync();
            return Ok(leaves);
        }

        // 4. Get Leaves by ManagerID
        [HttpGet("Manager/{managerID}")]
        public async Task<ActionResult<IEnumerable<Leaves>>> GetLeavesByManagerID(int managerID)
        {
            var employees = await _context.EmployeeInformation
                                          .Where(e => e.ManagerID == managerID)
                                          .ToListAsync();

            if (employees.Any())
            {
                var employeeIds = employees.Select(e => e.EmployeeID).ToList();

                var leaves = await _context.Leaves
                                           .Where(l => employeeIds.Contains(l.EmployeeID))
                                           .ToListAsync();
                return Ok(leaves);
            }
            return NotFound();
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, string Status)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            Leaves leave = _context.Leaves.Where(x => x.LeaveID == id).FirstOrDefault();
            if (leave != null)
            {
                leave.LeaveID = id;
                leave.Status = Status;
                _context.Entry(leave).State = EntityState.Modified;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return NoContent();
        }
    }
}
