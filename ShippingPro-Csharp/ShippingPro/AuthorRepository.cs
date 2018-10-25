using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class AuthorRepository : RepositoryBase<Author> , IAuthorRepository
    {
        public AuthorRepository(ShippingProDbContext context) : base (context)
        {


        }


        public PaginationResult<Author> RetrieveAuthorWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Author> result = new PaginationResult<Author>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Author>().OrderBy(x => x.AuthorFirstname).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Author>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Author>()
                  .Where(x => x.AuthorFirstname.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.AuthorFirstname)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Author>()
                        .Where(x => x.AuthorFirstname.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }

    }
}
