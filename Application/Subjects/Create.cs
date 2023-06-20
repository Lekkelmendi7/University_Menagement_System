using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Subject Subject {get; set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context=context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x=> x.Subject).SetValidator(new SubjectValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Subjects.Add(request.Subject);
                var result= await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create a subject");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}