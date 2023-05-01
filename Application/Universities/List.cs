using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Universities
{
    public class List
    {
        public class Query : IRequest<List<University>>{}
        

            public class Handler : IRequestHandler<Query, List<University>>
            {
                private readonly DataContext _context;

            public Handler(DataContext context)
                {
                    _context = context;
            }

                public async Task<List<University>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return await _context.Universities.ToListAsync();
                }
            }
        
    }
}