using Application.Core;
using MediatR;
using Persistence;

namespace Application.Subjects
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id{get; set;}
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var subject= await _context.Subjects.FindAsync(request.Id);
                if(subject == null) return null;
                _context.Remove(subject);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to delete the subject!");
                return Result<Unit>.Success(Unit.Value);
            }

        }
        
    }
}