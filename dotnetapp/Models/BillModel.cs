using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class BillModel
    {
        [Key]
        public int Id { get; set; }
        public string Billpdf { get; set; }
        public string UserEmailId { get; set; }
    }
}