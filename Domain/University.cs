namespace Domain
{
    public class University
    {
        public Guid Id {get; set;}
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<Department> Departments { get; set; }

    }
}