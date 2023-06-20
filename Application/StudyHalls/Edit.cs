using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.StudyHalls
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
            public StudyHall Studyhall {get; set;}
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Studyhall).SetValidator(new StudyHallValidator());
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
                var studyHall = await _context.StudyHalls.FindAsync(request.Studyhall.Id);
                if (studyHall == null) return null;
                _mapper.Map(request.Studyhall, studyHall);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to edit the study hall!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}