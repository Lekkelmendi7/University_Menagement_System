using System.Collections.Generic;
using Application.Faculties;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class FacultiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Faculty>>> GetFaculties()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFaculty(Faculty faculty)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Faculty = faculty }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditFaculty(Guid id, Faculty faculty)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Faculty = faculty }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaculty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}