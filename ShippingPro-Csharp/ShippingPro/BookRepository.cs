using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class BookRepository:RepositoryBase<Book>,IBookRepository
    {
        public BookRepository(ShippingProDbContext context):base(context)
        {

        }
        public PaginationResult<Book> RetrieveBookWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Book> result = new PaginationResult<Book>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Book>().OrderBy(x => x.BookTitle).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Book>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Book>()
                  .Where(x => x.BookTitle.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.BookTitle)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Book>()
                        .Where(x => x.BookTitle.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
}
