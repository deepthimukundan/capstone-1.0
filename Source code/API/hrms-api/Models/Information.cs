using System.ComponentModel.DataAnnotations;

namespace hrms_api.Models
{
    public class Information
    {
        public int ID { get; set; }

        [Required]
        public int EmployeeID { get; set; }

        [Required]
        public int ManagerID { get; set; }

        [Required]
        public DateTime JoiningDate { get; set; }

        [Required]
        public string Designation { get; set; }

        [Required]
        public string Department { get; set; }
    }
}