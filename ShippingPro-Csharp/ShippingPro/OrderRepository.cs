using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(ShippingProDbContext context) : base(context)
        {

        }
    }
}
