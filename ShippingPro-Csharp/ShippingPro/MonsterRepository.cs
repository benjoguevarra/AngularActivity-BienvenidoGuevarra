using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class MonsterRepository : RepositoryBase<Monster>, IMonsterRepository
    {
        public MonsterRepository(ShippingProDbContext context) : base(context)
        {

        }
        public PaginationResult<Monster> RetrieveMonsterWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Monster> result = new PaginationResult<Monster>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Monster>().OrderBy(x => x.MonsterName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Monster>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Monster>()
                  .Where(x => x.MonsterName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.MonsterName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Monster>()
                        .Where(x => x.MonsterName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}
