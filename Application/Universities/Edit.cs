using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Universities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public University University { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;

                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var university = await _context.Universities.FindAsync(request.University.Id);
                _mapper.Map(request.University, university);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}