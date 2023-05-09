using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Universities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public University University { get; set; }
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;

                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var university = await _context.Universities.FindAsync(request.University.Id);
                if (university == null) return null;
                _mapper.Map(request.University, university);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to edit the University");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}