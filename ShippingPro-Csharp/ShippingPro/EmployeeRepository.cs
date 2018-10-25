using ShippingPro.EFCore.Domain;
using ShippingPro.EFCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShippingPro.EFCore.Infra
{
   public class EmployeeRepository:RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ShippingProDbContext context):base(context)
        {

        }

       /* public IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId)
        {
            return base.context.Employees
                       .Where(e => e.DepartmentID == departmentId)
                       .ToList();
        }
        */
    }
}
