using Application.Core;
using Application.Faculties;
using Application.Universities;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Faculties
{
    public class Create
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Faculty Faculty { get; set; }
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
                    RuleFor(x => x.Faculty).SetValidator(new FacultyValidator());
                }
            }

            public async Task<Result<Unit>> Handle (Command request, CancellationToken cancellationToken)
            {
                _context.Faculties.Add(request.Faculty);
                var result = await _context.SaveChangesAsync() > 0 ;
                if (!result) return Result<Unit>.Failure("Failed to create a department!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}