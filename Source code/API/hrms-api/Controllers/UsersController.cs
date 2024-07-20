using Azure;
using hrms_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UsersController(MyDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _context.Employees.SingleOrDefaultAsync(u => u.Email == loginUserDto.Email && u.Password == loginUserDto.Password);
            if (user == null)
            {
                return BadRequest("Invalid email or password.");
            }
            return Ok( new { User = user, Message = "Login successful." });
        }

        [HttpPost]
        [Route("managerlogin")]
        public async Task<IActionResult> ManagerLogin(LoginUserDto loginUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _context.Managers.SingleOrDefaultAsync(u => u.Email == loginUserDto.Email && u.Password == loginUserDto.Password);
            if (user == null)
            {
                return BadRequest("Invalid email or password.");
            }
            return Ok(new { User = user, Message = "Login successful." });
        }
    }
}
