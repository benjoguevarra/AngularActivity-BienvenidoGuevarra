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
    public class ShipperController : ControllerBase
    {
        private IShipperRepository shipperRepo;

        public ShipperController(IShipperRepository shipperRepo)
        {
            this.shipperRepo = shipperRepo;
        }
        // GET: api/Shipper
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Shipper>))]
        public ActionResult<IEnumerable<Shipper>> Get()
        {

            return Ok(shipperRepo.Retrieve().ToList());
        }

        // GET: api/Shipper/5
        [HttpGet("{id}", Name = "GetShipperByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Shipper))]
        public async Task<ActionResult<Shipper>> Get(Guid id)
        {
            try
            {
                var result = await shipperRepo.RetrieveAsync(id);
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

        // POST: api/Shipper
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Shipper))]
        public async Task<ActionResult<Shipper>> Post([FromBody] Shipper shipper)
        {
            try
            {
                shipper.ShipperID = Guid.NewGuid();
                await shipperRepo.CreateAsync(shipper);
                return CreatedAtRoute("GetShipperByID",
                    new
                    {
                        id = shipper.ShipperID
                    },
                    shipper);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Shipper/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Shipper))]
        public async Task<ActionResult<Shipper>> Put(Guid id, [FromBody] Shipper shipper)
        {
            try
            {
                var result = shipperRepo.Retrieve().FirstOrDefault(x => x.ShipperID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await shipperRepo.UpdateAsync(id, shipper);

                return Ok(shipper);

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
                var result = shipperRepo.Retrieve().FirstOrDefault(x => x.ShipperID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await shipperRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
