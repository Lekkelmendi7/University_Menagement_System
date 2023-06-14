using Application.Core;
using Application.Faculties;
using Application.Universities;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Faculties
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Faculty Faculty {get; set;}
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Faculty).SetValidator(new FacultyValidator());
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
                var faculty = await _context.Faculties.FindAsync(request.Faculty.Id);
                if (faculty == null) return null;
                _mapper.Map(request.Faculty, faculty);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to edit the University");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}