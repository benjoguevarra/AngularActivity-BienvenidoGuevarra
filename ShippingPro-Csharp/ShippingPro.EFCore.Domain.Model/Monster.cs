using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShippingPro.EFCore.Domain.Model
{
    [Table("Monster")]
    public class Monster
    {
        [Key]
        public Guid MonsterID { get; set; }
        [Required]
        public string MonsterName { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }

    }
}
