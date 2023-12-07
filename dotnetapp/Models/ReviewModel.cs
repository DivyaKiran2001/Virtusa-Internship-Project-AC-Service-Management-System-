using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ReviewModel
    {
        [Key]
        public int Id { get; set; }
        public string Review { get; set; }
        public int Rating { get; set; }
        
        public string UserEmailId { get; set; }

        
        public int ServiceCenterId { get; set; }
    }
}