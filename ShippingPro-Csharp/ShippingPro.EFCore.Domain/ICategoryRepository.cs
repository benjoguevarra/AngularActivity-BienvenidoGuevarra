using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;

namespace ShippingPro.EFCore.Domain
{
    public interface ICategoryRepository : IRepository<Category>
    {
        PaginationResult<Category> RetrieveCategoryWithPagination(int pageX, int itemsPerPage, string filter);
    }
}
