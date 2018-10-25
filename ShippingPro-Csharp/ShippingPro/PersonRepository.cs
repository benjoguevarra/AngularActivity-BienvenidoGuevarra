using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class PersonRepository : RepositoryBase<Person>, IPersonRepository
    {
        public PersonRepository(ShippingProDbContext context) : base(context)
        {

        }
        public PaginationResult<Person> RetrievePersonWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Person> result = new PaginationResult<Person>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Person>().OrderBy(x => x.FirstName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Person>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Person>()
                  .Where(x => x.FirstName.ToLower().Contains(filter.ToLower()) || x.LastName.ToLower().Contains(filter.ToLower())
                  || x.FullName.ToLower().Contains(filter.ToLower()) || x.FullNameWithMiddleName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.FirstName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Person>()
                        .Where(x => x.FirstName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }

}
