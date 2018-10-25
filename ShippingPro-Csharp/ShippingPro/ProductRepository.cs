using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(ShippingProDbContext context) : base(context)
        {

        }
    }
}
