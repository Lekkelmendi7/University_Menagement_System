using Application.Subjects;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SubjectsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Subject>>> GetSubjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubject(Subject subject)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Subject = subject }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSubject(Guid id, Subject subject)
        {
            subject.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Subject = subject }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }


    }
}