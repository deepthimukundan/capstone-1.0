using System.ComponentModel.DataAnnotations;

namespace hrms_api.Models
{
    public class RegisterUserDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(15)]
        public string PhoneNo { get; set; }
    }
}
