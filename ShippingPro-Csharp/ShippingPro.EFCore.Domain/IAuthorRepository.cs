using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Domain
{
    public interface IAuthorRepository : IRepository<Author>
    {
        PaginationResult<Author> RetrieveAuthorWithPagination(int page, int itemsPerPage, string filter);
    }
}
