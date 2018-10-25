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
    public class MonsterController : ControllerBase
    {
        private IMonsterRepository monsterRepo;

        public MonsterController(IMonsterRepository monsterRepo)
        {
            this.monsterRepo = monsterRepo;
        }
        // GET: api/Monster
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(List<Monster>))]
        public ActionResult<IEnumerable<Monster>> Get()
        {
            return Ok(monsterRepo.Retrieve().ToList());
        }

        // GET: api/Monster/5
        [HttpGet("{id}", Name = "GetMonsterByID")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Monster))]
        public async Task<ActionResult<Monster>> Get(Guid id)
        {
            try
            {
                var result = await monsterRepo.RetrieveAsync(id);
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

        // POST: api/Monster
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(201, Type = typeof(Monster))]
        public async Task<ActionResult<Monster>> Post([FromBody] Monster monster)
        {
            try
            {
                monster.MonsterID = Guid.NewGuid();
                await monsterRepo.CreateAsync(monster);
                return CreatedAtRoute("GetMonsterByID",
                    new
                    {
                        id = monster.MonsterID
                    },
                    monster);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Monster/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(Monster))]
        public async Task<ActionResult<Monster>> Put(Guid id, [FromBody] Monster monster)
        {
            try
            {
                var result = monsterRepo.Retrieve().FirstOrDefault(x => x.MonsterID == id);
                if (result == null)
                {
                    return NotFound();
                }
                await monsterRepo.UpdateAsync(id, monster);

                return Ok(monster);

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
                var result = monsterRepo.Retrieve().FirstOrDefault(x => x.MonsterID == id);
                if (result == null)
                {
                    return NotFound();
                }

                await monsterRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET: api/Monster/5
        [HttpGet("{pagex}/{itemsPerPage}", Name = "GetMonsterWithPagination")]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(200, Type = typeof(PaginationResult<Monster>))]
        public ActionResult<PaginationResult<Monster>> Get(int pagex, int itemsPerPage, string filter)
        {
            try
            {
                var result = new PaginationResult<Monster>();
                result = monsterRepo.RetrieveMonsterWithPagination(pagex, itemsPerPage, filter);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}