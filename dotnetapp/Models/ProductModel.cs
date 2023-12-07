using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ProductModel
    {
         [Key]
        public int Id { get; set; }


        public string productName { get; set; }
        public string productModelNo { get; set; }

        public string dateOfPurchase { get; set; }
        public string contactNumber { get; set; }
        public string problemDescription { get; set; }

        public string time { get; set; }
        public string date { get; set; }
        public string UserEmailId { get; set; }

       
        public int ServiceCenterId { get; set; }
        
    }
}