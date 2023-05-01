using MediatR;
using Persistence;
using Domain;

namespace Application.Universities
{
    public class Create
    {
        public class Command : IRequest {
            public University University {get; set;}
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
                _context.Universities.Add(request.University);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}