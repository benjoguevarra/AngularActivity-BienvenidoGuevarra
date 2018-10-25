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

namespace Shipping.EFCore.WebApi.Controllers
{
    [EnableCors("OnlineStoreAngular6")]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private IBookRepository bookRepo;

        public BookController(IBookRepository bookRepo)
        {
            this.bookRepo = bookRepo;
        }
        // GET: api/Book
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Book>))]
        public ActionResult<IEnumerable<Book>> Get()
        {
            return Ok(bookRepo.Retrieve().ToList());
        }

        // GET: api/Book/5
        [HttpGet("{id}", Name = "GetBookByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Book))]
        public async Task<ActionResult<Book>> Get(Guid id)
        {
            try
            {
                var result = await bookRepo.RetrieveAsync(id);
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

        // POST: api/Book
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Book))]
        public async Task<ActionResult<Book>> Post([FromBody] Book book)
        {
            try
            {
                book.BookID = Guid.NewGuid();
                await bookRepo.CreateAsync(book);
                return CreatedAtRoute("GetBookByID",
                    new
                    {
                        id = book.BookID
                    },
                    book);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Book/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Book))]
        public async Task<ActionResult<Book>> Put(Guid id, [FromBody] Book book)
        {
            try
            {
                var result = bookRepo.Retrieve().FirstOrDefault(x => x.BookID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await bookRepo.UpdateAsync(id, book);

                return Ok(book);

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
                var result = bookRepo.Retrieve().FirstOrDefault(x => x.BookID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await bookRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Book/5
        [HttpGet("{pagex}/{itemsPerPage}", Name = "GetBookWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Book>))]
        public ActionResult<PaginationResult<Book>> Get(int pagex, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Book>();
                result = bookRepo.RetrieveBookWithPagination(pagex, itemsPerPage, filter);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}