using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using Application.StudyHalls;

namespace Application.StudyHalls
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public StudyHall StudyHall { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.StudyHall).SetValidator(new StudyHallValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.StudyHalls.Add(request.StudyHall);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create a study hall!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}