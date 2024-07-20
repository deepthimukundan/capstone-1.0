using System.ComponentModel.DataAnnotations;

namespace hrms_api.Models
{
    public class Attendance
    {
        [Key]
        public int AttendanceID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime Date {  get; set; }
        public string LoginTime {  get; set; }
        public string LogoutTime { get; set; }
    }
}