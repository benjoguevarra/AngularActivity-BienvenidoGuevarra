using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ShippingPro.EFCore.Domain.Model
{
    public class Person

        //stepper 1
    {
        [Key]
        public Guid PersonID { get; set; }

        [Required]
        public string FirstName  { get; set; }

        public string MiddleName { get; set; }

        public string FullName
        {
            get
            {
                return string.Format($"{FirstName} {LastName}");
            }
        }

        public string FullNameWithMiddleName
        {
            get
            {
                return string.Format($"{FirstName} {MiddleName} {LastName}");
            }
        }


        [Required]
        public string LastName  { get; set; }

        //public int Age { get; set; }
        public int Age
        {
            get
            {
                var age = DateTime.Today.Year - Birthday.Date.Year;
                if (Birthday.Date > DateTime.Today.Date)
                {
                    return age - 1;
                }
                return age;
            }
        }

        [Required]
        public DateTime Birthday { get; set; }

        public byte[]  Photo { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string RelationshipStatus { get; set; }

        [Required]
        public string Nationality { get; set; }

        [Required]
        public string PhoneNumber  { get; set; }

        [Required]
        public string Religion { get; set; }

        //stepper 2

        [Required]
        public string StreetHouseBuilding  { get; set; }
            
        public string BaranggaySubdivision { get; set; }

        [Required]
        public string City  { get; set; }

        [Required]
        public string Region { get; set; }

        [Required]
        public string Country  { get; set; }

        [Required]
        public int PostalCode  { get; set; }

        [Required]
        public int Latitude { get; set; }

        [Required]
        public int Longtitude  { get; set; }


    }
}
