using System.ComponentModel.DataAnnotations;

namespace hrms_api.Models
{
    public class Leaves
    {
        [Key]
        public int LeaveID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime Date {  get; set; }
        public string Status {  get; set; }
    }
}