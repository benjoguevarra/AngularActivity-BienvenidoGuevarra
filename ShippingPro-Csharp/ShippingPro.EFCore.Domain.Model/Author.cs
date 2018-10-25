using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShippingPro.EFCore.Domain.Model
{
    [Table("Author")]
    public class Author
    {   [Key]
        public Guid AuthorID { get; set; }
        [Required]
        public string AuthorFirstname { get; set; }
        public string AuthorLastname { get; set; }
        public string AuthorGender { get; set; }
        public bool AuthorIsAlive { get; set; }
        public DateTime? AuthorBirthday { get; set; }
    }
}
