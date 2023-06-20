using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.StudyHalls
{
    public class List
    {
        public class Query : IRequest<Result<List<StudyHall>>> { }


        public class Handler : IRequestHandler<Query, Result<List<StudyHall>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<StudyHall>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<StudyHall>>.Success(await _context.StudyHalls.ToListAsync());
            }
        }

    }
}