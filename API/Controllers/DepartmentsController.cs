using Microsoft.AspNetCore.Mvc;
using Domain;

namespace API.Controllers
{
    public class DepartmentController : BaseApiController
    {
        [HttpGet]
        public async Task <ActionResult<List<Department>> GetDepartments()
        {
            return HandleResult(await Medaitor.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query {Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment (Department department)
        {   
            return HandleResult(await Mediator.Send(new Create.Command { Department= department }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDepartment (Guid id, Department department)
        {
            return HandleResult(await Mediator.Send(new Edit.Command{Department = department}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment (Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}