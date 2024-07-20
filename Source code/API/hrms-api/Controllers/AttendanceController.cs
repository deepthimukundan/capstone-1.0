using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AttendanceController(MyDbContext context)
        {
            _context = context;
        }

        // 1. Add Attendance
        [HttpPost]
        [Route("AddAttendance")]
        public async Task<IActionResult> AddAttendance([FromBody] Attendance attendance)
        {
            if (attendance == null)
            {
                return BadRequest("Attendance is null");
            }

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return Ok("Attendance added successfully");
        }

        // 2. Get Attendance by Employee
        [HttpGet]
        [Route("GetAttendanceByEmployee/{employeeId}")]
        public async Task<IActionResult> GetAttendanceByEmployee(int employeeId)
        {
            var attendances = await _context.Attendances
                                             .Where(a => a.EmployeeID == employeeId)
                                             .ToListAsync();

            if (attendances == null || !attendances.Any())
            {
                return NotFound("No attendance records found for the specified employee");
            }

            return Ok(attendances);
        }

        // 3. Get Attendance by ManagerID
        [HttpGet]
        [Route("GetAttendanceByManager/{managerId}")]
        public async Task<IActionResult> GetAttendanceByManager(int managerId)
        {
            var employeeIds = await _context.EmployeeInformation
                                             .Where(info => info.ManagerID == managerId)
                                             .Select(info => info.EmployeeID)
                                             .ToListAsync();

            if (employeeIds == null || !employeeIds.Any())
            {
                return NotFound("No employees found for the specified manager");
            }

            var attendances = await _context.Attendances
                                             .Where(a => employeeIds.Contains(a.EmployeeID))
                                             .ToListAsync();

            if (attendances == null || !attendances.Any())
            {
                return NotFound("No attendance records found for the employees under the specified manager");
            }

            return Ok(attendances);
        }

        // 4. Update Attendance
        [HttpPut]
        [Route("UpdateAttendance/{attendanceId}")]
        public async Task<IActionResult> UpdateAttendance(int attendanceId, [FromBody] Attendance updatedAttendance)
        {
            var attendance = await _context.Attendances.FindAsync(attendanceId);

            if (attendance == null)
            {
                return NotFound("Attendance record not found");
            }

            attendance.LoginTime = updatedAttendance.LoginTime;
            attendance.LogoutTime = updatedAttendance.LogoutTime;
            // Update other fields if necessary

            _context.Attendances.Update(attendance);
            await _context.SaveChangesAsync();

            return Ok("Attendance updated successfully");
        }

    }
}
