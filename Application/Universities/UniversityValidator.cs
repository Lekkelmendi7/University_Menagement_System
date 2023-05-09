using Domain;
using FluentValidation;

namespace Application.Universities
{
    public class UniversityValidator : AbstractValidator<University>
    {
        public UniversityValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
        }
    }
}