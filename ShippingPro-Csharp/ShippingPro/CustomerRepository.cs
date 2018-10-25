using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;


namespace ShippingPro.EFCore.Infra
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(ShippingProDbContext context) : base(context)
        {

        }
    }
}
