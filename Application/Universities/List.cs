using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Universities
{
    public class List
    {
        public class Query : IRequest<Result<List<University>>>{}
        

            public class Handler : IRequestHandler<Query, Result<List<University>>>
            {
                private readonly DataContext _context;

            public Handler(DataContext context)
                {
                    _context = context;
            }

                public async Task<Result<List<University>>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return Result<List<University>>.Success(await _context.Universities.ToListAsync());
                }
            }
        
    }
}