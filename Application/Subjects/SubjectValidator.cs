using Domain;
using FluentValidation;

namespace Application.Subjects
{
    public class SubjectValidator : AbstractValidator<Subject>
    {
        public SubjectValidator(){
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.ECTS).NotEmpty();
        }
    }
}