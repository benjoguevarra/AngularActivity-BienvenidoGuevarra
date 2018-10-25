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
    public class ProductController : ControllerBase
    {
        private IProductRepository productRepo;

        public ProductController(IProductRepository productRepo)
        {
            this.productRepo = productRepo;
        }
        // GET: api/Product
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Product>))]
        public ActionResult<IEnumerable<Product>> Get()
        {

            return Ok(productRepo.Retrieve().ToList());
        }

        // GET: api/Product/5
        [HttpGet("{id}", Name = "GetProductByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Product))]
        public async Task<ActionResult<Product>> Get(Guid id)
        {
            try
            {
                var result = await productRepo.RetrieveAsync(id);
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

        // POST: api/Product
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Product))]
        public async Task<ActionResult<Product>> Post([FromBody] Product product)
        {
            try
            {
                product.ProductID = Guid.NewGuid();
                await productRepo.CreateAsync(product);
                return CreatedAtRoute("GetProductByID",
                    new
                    {
                        id = product.ProductID
                    },
                    product);

            }
            catch (Exception)
            {
                return BadRequest(product);
            }
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Product))]
        public async Task<ActionResult<Product>> Put(Guid id, [FromBody] Product product)
        {
            try
            {
                var result = productRepo.Retrieve().FirstOrDefault(x => x.ProductID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await productRepo.UpdateAsync(id, product);

                return Ok(product);

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
                var result = productRepo.Retrieve().FirstOrDefault(x => x.ProductID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await productRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
