using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class SupplierRepository : RepositoryBase<Supplier>, ISupplierRepository
    {
        public SupplierRepository(ShippingProDbContext context) : base(context)
        {

        }
    }
}
