using ShippingPro.EFCore.Domain.Model;
using ShippingPro.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Domain
{
    public interface IMonsterRepository : IRepository<Monster>
    {
        PaginationResult<Monster> RetrieveMonsterWithPagination(int page, int itemsPerPage, string filter);
    }
}
