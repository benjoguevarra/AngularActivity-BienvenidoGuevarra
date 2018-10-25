using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;

namespace ShippingPro.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private IAuthorRepository authorRepo;
        public AuthorController(IAuthorRepository authorRepo)
        {
            this.authorRepo = authorRepo;
        }
        // GET: api/Category
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Author>))]
        public ActionResult<IEnumerable<Author>> Get()
        {

            return Ok(authorRepo.Retrieve().ToList());
        }

        // GET: api/Book/5
        [HttpGet("{pagex}/{itemsPerPage}", Name = "GetAuthorWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Author>))]
        public ActionResult<PaginationResult<Author>> Get(int page, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Author>();
                result = authorRepo.RetrieveAuthorWithPagination(page, itemsPerPage, filter);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Category/5
        [HttpGet("{id}", Name = "GetAuthorByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Author))]
        public async Task<ActionResult<Author>> Get(Guid id)
        {
            try
            {
                var result = await authorRepo.RetrieveAsync(id);
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

        // POST: api/Category
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Category))]
        public async Task<ActionResult<Author>> Post([FromBody] Author author)
        {
            try
            {
                author.AuthorID = Guid.NewGuid();
                await authorRepo.CreateAsync(author);
                return CreatedAtRoute("GetAuthorByID",
                    new
                    {
                        id = author.AuthorID
                    },
                   author);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Author))]
        public async Task<ActionResult<Category>> Put(Guid id, [FromBody] Author author)
        {
            try
            {
                var result = authorRepo.Retrieve().FirstOrDefault(x => x.AuthorID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await authorRepo.UpdateAsync(id, author);

                return Ok(author);

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
                var result = authorRepo.Retrieve().FirstOrDefault(x => x.AuthorID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await authorRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
