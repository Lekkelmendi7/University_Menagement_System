using MediatR;
using Persistence;
using Domain;
using FluentValidation;
using Application.Core;

namespace Application.Universities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> {
            public University University {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.University).SetValidator(new UniversityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Universities.Add(request.University);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create an University");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}