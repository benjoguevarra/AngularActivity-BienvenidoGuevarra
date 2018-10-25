using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;

namespace ShippingPro.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository employeeRepo;

        public EmployeeController(IEmployeeRepository employeeRepo)
        {
            this.employeeRepo = employeeRepo;
        }
        // GET: api/Employee
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Employee>))]
        public ActionResult<IEnumerable<Employee>> Get()
        {

            return Ok(employeeRepo.Retrieve().ToList());
        }

        // GET: api/Employee/5
        [HttpGet("{id}", Name = "GetEmployeeByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Employee))]
        public async Task<ActionResult<Employee>> Get(Guid id)
        {
            try
            {
                var result = await employeeRepo.RetrieveAsync(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // POST: api/Employee
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Employee))]
        public async Task<ActionResult<Employee>> Post([FromBody] Employee employee)
        {
            try
            {
                employee.EmployeeID = Guid.NewGuid();
                await employeeRepo.CreateAsync(employee);
                return CreatedAtRoute("GetEmployeeByID",
                    new
                    {
                        id = employee.EmployeeID
                    },
                    employee);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Employee))]
        public async Task<ActionResult<Employee>> Put(Guid id, [FromBody] Employee employee)
        {
            try
            {
                var result = employeeRepo.Retrieve().FirstOrDefault(x => x.EmployeeID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await employeeRepo.UpdateAsync(id, employee);

                return Ok(employee);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var result = employeeRepo.Retrieve().FirstOrDefault(x => x.EmployeeID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await employeeRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
