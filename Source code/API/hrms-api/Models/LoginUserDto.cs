using System.ComponentModel.DataAnnotations;

namespace hrms_api.Models
{
    public class LoginUserDto
    {
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
