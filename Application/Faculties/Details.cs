

using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Faculties
{
    public class Details
    {
         public class Query : IRequest<Result<Faculty>>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<Faculty>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Faculty>> Handle(Query request, CancellationToken cancellationToken)
            {
                var faculty = await _context.Faculties.FindAsync(request.Id);
                return Result<Faculty>.Success(faculty);
            }
        }
    }
}