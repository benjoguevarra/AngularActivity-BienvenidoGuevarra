using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System.Linq;

namespace ShippingPro.EFCore.Infra
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(ShippingProDbContext context) : base(context)
        {

        }

        public PaginationResult<Category> RetrieveCategoryWithPagination(int page, int itemsPerPage, string filter)
        {
            PaginationResult<Category> result = new PaginationResult<Category>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Category>().OrderBy(x => x.CategoryName).Skip(page).Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Category>().Count();
                }
            }
            else
            {
                result.Results = context.Set<Category>()
                  .Where(x => x.CategoryName.ToLower().Contains(filter.ToLower()))
                  .OrderBy(x => x.CategoryName)
                  .Skip(page)
                  .Take(itemsPerPage).ToList();

                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Category>()
                        .Where(x => x.CategoryName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }

    }
}

