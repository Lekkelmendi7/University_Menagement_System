namespace Domain
{
    public class StudyHall
    {
        public Guid Id {get; set;}
        public string Name {get; set;}
        public int Capacity {get; set;}
        public int Surface {get; set;}
        public Faculty Faculty {get; set;}
        public Guid FacultyId {get; set;}
    }
}