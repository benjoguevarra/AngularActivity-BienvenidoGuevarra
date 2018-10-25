using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Domain
{
    public interface IBookRepository:IRepository<Book>
    {
        PaginationResult<Book> RetrieveBookWithPagination(int page, int itemsPerPage, string filter);
    }
}
