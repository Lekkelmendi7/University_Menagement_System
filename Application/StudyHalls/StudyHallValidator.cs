using Domain;
using FluentValidation;

namespace Application.StudyHalls
{
    public class StudyHallValidator : AbstractValidator<StudyHall>
    {
        public StudyHallValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Capacity).NotEmpty();
            RuleFor(x => x.Surface).NotEmpty();
            RuleFor(x => x.FacultyId).NotEmpty();
        }
    }
}