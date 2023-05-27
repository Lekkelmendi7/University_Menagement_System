namespace Domain
{
    public class Department
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public int PostalCode { get; set; }
        public string Street { get; set; }
        public Guid UniversityId {get; set;}
        public University University {get; set;}


    }
}