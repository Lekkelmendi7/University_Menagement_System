using Domain;
using FluentValidation;

namespace Application.Faculties
{
    public class FacultyValidator : AbstractValidator<Faculty>
    {
        public FacultyValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.PostalCode).NotEmpty();
            RuleFor(x => x.Street).NotEmpty();
            RuleFor(x => x.UniversityId).NotEmpty();
        }
    }
}