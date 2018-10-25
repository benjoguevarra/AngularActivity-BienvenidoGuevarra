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
    public class SupplierController : ControllerBase
    {
        private ISupplierRepository supplierRepo;

        public SupplierController(ISupplierRepository supplierRepo)
        {
            this.supplierRepo = supplierRepo;
        }
        // GET: api/Supplier
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Supplier>))]
        public ActionResult<IEnumerable<Supplier>> Get()
        {

            return Ok(supplierRepo.Retrieve().ToList());
        }

        // GET: api/Supplier/5
        [HttpGet("{id}", Name = "GetSupplierByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Get(Guid id)
        {
            try
            {
                var result = await supplierRepo.RetrieveAsync(id);
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

        // POST: api/Supplier
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Post([FromBody] Supplier supplier)
        {
            try
            {
                supplier.SupplierID = Guid.NewGuid();
                await supplierRepo.CreateAsync(supplier);
                return CreatedAtRoute("GetSupplierByID",
                    new
                    {
                        id = supplier.SupplierID
                    },
                    supplier);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Supplier/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Supplier))]
        public async Task<ActionResult<Supplier>> Put(Guid id, [FromBody] Supplier supplier)
        {
            try
            {
                var result = supplierRepo.Retrieve().FirstOrDefault(x => x.SupplierID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await supplierRepo.UpdateAsync(id, supplier);

                return Ok(supplier);

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
                var result = supplierRepo.Retrieve().FirstOrDefault(x => x.SupplierID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await supplierRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
