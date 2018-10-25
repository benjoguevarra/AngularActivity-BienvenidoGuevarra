using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShippingPro.EFCore.Domain.Model
{
    [Table("Book")]
    public class Book
    {
        [Key]
        public Guid BookID  { get; set; }
        public Guid AuthorID  { get; set; }

        [Required]
        public string BookTitle  { get; set; }
        public string BookSypnosis  { get; set; }
        public string BookGenre  { get; set; }
        public DateTime? BookPublished { get; set; }
        public bool BookIsAvailable  { get; set; }
    }

}
