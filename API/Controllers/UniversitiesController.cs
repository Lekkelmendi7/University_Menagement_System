using Application.Universities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class UniversitiesController : BaseApiController
    {

  
        [HttpGet]
        public async Task<ActionResult<List<University>>> GetUniversities(CancellationToken ct)
        {
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<University>> GetUniversity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateUniversity(University university){
            return Ok(await Mediator.Send(new Create.Command {University = university}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUniversity(Guid id, University university)
        {
            university.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{University = university}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversity(Guid id){
            return  Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}