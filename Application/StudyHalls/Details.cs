using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.StudyHalls
{
    public class Details
    {
        public class Query : IRequest<Result<StudyHall>>{
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<StudyHall>>    
        {
            private readonly DataContext _context;

            public Handler (DataContext context)
            {
                _context = context;
            }

            public async Task<Result<StudyHall>> Handle (Query request, CancellationToken cancellationToken)
            {
                var studyHall = await _context.StudyHalls.FindAsync(request.Id);
                return Result<StudyHall>.Success(studyHall);
            }
        }

    }
}