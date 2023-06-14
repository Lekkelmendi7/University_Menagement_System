using Application.Universities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    
    public class UniversitiesController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<University>>> GetUniversities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<University>> GetUniversity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUniversity(University university)
        {
            return HandleResult(await Mediator.Send(new Create.Command { University = university }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUniversity(Guid id, University university)
        {
            university.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { University = university }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}