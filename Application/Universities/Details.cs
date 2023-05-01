using Domain;
using MediatR;
using Persistence;

namespace Application.Universities
{
    public class Details
    {
        public class Query : IRequest<University>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, University>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<University> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Universities.FindAsync(request.Id);
            }
        }
    }
}