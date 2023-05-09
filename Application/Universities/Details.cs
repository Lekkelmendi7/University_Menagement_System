using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Universities
{
    public class Details
    {
        public class Query : IRequest<Result<University>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<University>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<University>> Handle(Query request, CancellationToken cancellationToken)
            {
                var university = await _context.Universities.FindAsync(request.Id);
                return Result<University>.Success(university);
            }
        }
    }
}