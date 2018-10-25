using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
    public class OrderDetailRepository : RepositoryBase<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(ShippingProDbContext context) : base(context)
        {

        }

        public OrderDetail GetOrderDetailsWithForeignKey(Guid id)
        {
            OrderDetail result = new OrderDetail();
            result = context.Set<OrderDetail>().Where(x => x.OrderID == id).FirstOrDefault();
            return result;
        }
    }
}
