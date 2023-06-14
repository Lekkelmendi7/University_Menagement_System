using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Faculties
{
    public class List
    {
        public class Query : IRequest<Result<List<Faculty>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Faculty>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
                {
                    _context = context;
            }
            public async Task<Result<List<Faculty>>> Handle(Query request, CancellationToken cancellationToken)
                {
                    return Result<List<Faculty>>.Success(await _context.Faculties.ToListAsync());
                }
        }
    }
}