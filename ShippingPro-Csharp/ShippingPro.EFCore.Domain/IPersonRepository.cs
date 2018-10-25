using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Domain
{
    public interface IPersonRepository : IRepository<Person>
    {
        PaginationResult<Person> RetrievePersonWithPagination(int page, int itemsPerPage, string filter);
    }
}

