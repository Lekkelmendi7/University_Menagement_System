

using System.Collections.Generic;
using Application.StudyHalls;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StudyHallController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<StudyHall>>> GetStudyHalls()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StudyHall>> GetStudyHall(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudyHall(StudyHall studyHall)
        {
            return HandleResult(await Mediator.Send(new Create.Command { StudyHall = studyHall }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditStudyHall(Guid id, StudyHall studyHall)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Studyhall = studyHall }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudyHall(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}