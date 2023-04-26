using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class UniversitiesController:BaseApiController
    {
         private readonly DataContext _context;

        public UniversitiesController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<University>>> GetUniversities()
        {   
            return await _context.Universities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<University>> GetUniversity(int id)
        {
            return await _context.Universities.FindAsync(id);
        }

    }
}