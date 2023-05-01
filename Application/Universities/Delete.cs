using MediatR;
using Persistence;

namespace Application.Universities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var university = await _context.Universities.FindAsync(request.Id);
                _context.Remove(university);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}