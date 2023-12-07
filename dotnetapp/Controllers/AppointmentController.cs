using Microsoft.AspNetCore.Mvc;
using dotnetapp.DataDbContext;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PdfSharpCore.Pdf;
using PdfSharpCore;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("user")]
    public class AppointmentController : ControllerBase
    {
        private readonly AcServiceDbContext _context;

        public AppointmentController(AcServiceDbContext ac_DbContext)
        {
            _context = ac_DbContext;
        }
        [HttpPost("appointment")]
        public async Task<IActionResult> saveAppointment([FromBody] ProductModel productModel)
        {
            //var appointments = await _context.Products.ToListAsync();

            if (productModel == null)
            {
                return BadRequest();
            }
            await _context.Products.AddAsync(productModel);
            await _context.SaveChangesAsync();
            var appointments = await _context.Products.ToListAsync();
            return Ok(appointments);

        }

        [HttpDelete("cancelappointment/{id}")]
        public async Task<IActionResult> deleteAppointment(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(id);
        }
        [HttpPut("editappointment/{id}")]
        public async Task<IActionResult> EditAppointment(int id, [FromBody] ProductModel productModel)
        {
            if (productModel == null || id != productModel.Id)
            {
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.productName = productModel.productName;
            product.productModelNo = productModel.productModelNo;
            product.dateOfPurchase = productModel.dateOfPurchase;
            product.contactNumber = productModel.contactNumber;
            product.problemDescription = productModel.problemDescription;
            product.date = productModel.date;
            product.time = productModel.time;


            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [HttpGet("appointments/{id}")]
        public async Task<IActionResult> getAppointment(string id)
        {
            var appointments = await _context.Products
         .Where(p => p.UserEmailId == id)
         .Join(
             _context.Services,
             product => product.ServiceCenterId,
             serviceCenter => serviceCenter.serviceCenterID,
             (product, serviceCenter) => new { Product = product, ServiceCenterName = serviceCenter.serviceCenterName }
         )
         .ToListAsync();

            if (appointments == null || appointments.Count == 0)
            {
                return Ok();
            }

            return Ok(appointments);
        }
        [HttpGet("appointments")]
        public async Task<IActionResult> getAppointment()
        {
            var appointments = await _context.Products.ToListAsync();

            if (appointments == null || appointments.Count == 0)
            {
                return NotFound(new
                {
                    Message = "No Appointments Found"
                });
            }

            return Ok(appointments);
        }
        [HttpPost("review")]
        public async Task<IActionResult> savereview([FromBody] ReviewModel review)
        {
            //var appointments = await _context.Products.ToListAsync();

            if (review == null)
            {
                return BadRequest();
            }
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            var reviews = await _context.Reviews.ToListAsync();
            return Created("",new { 
                Message="review Posted SuccessFully",reviews });
        }


        [HttpGet("getreview/{id}")]
        public async Task<IActionResult> getReview(int id)
        {
            var reviews = await _context.Reviews.Where(p => p.ServiceCenterId == id).ToListAsync();

            if (reviews == null || reviews.Count == 0)
            {
                return Ok(0); // Return 0 if there are no reviews
            }

            // Calculate the average rating
            double averageRating = reviews.Average(r => r.Rating);

            return Ok(averageRating);
        }
        [HttpGet("getreviews/{id}")]
        public async Task<IActionResult> GetReviews(int id)
        {

            var appointments = await _context.Reviews
         .Where(p => p.ServiceCenterId == id)
         .Join(
             _context.Users,
             review => review.UserEmailId,
             user => user.Email,
             (review, user) => new { Review = review, user = user.UserName }
         )
         .ToListAsync();

            if (appointments == null || appointments.Count == 0)
            {
                return NotFound(); // Return 404 if there are no reviews
            }

            return Ok(appointments);
        }


        [HttpGet("generatebill/{pid}/{uid}/{sid}")]
        public async Task<IActionResult> generateBill(int pid, string uid, int sid)
        {
            var sd = await _context.Services.FirstOrDefaultAsync(s => s.serviceCenterID == sid);
            var pd = await _context.Products.FirstOrDefaultAsync(s => s.Id == pid);
            var ud = await _context.Users.FirstOrDefaultAsync(s => s.Email == uid);
            var doc = new PdfDocument();
            string htmlcontent = "<div style='width:100%; text-align:center'>";
            htmlcontent += "<h2>Welcome to Cooling Management</h2>";
            htmlcontent += "<h2>" + sd.serviceCenterName + "</h2>";
            htmlcontent += "<img style='width:80px;height:80%' src='" + sd.serviceCenterImageUrl + "'   />";





            if (sd != null && pd != null && ud != null)
            {
                htmlcontent += "<h2 style='text-align:right'>Invoice No:" + pd.Id + "</h2> ";
                htmlcontent += "<h2 style='text-align:right'>Invoice Date:" + pd.date + "</h2>";

                htmlcontent += "<h3 style='text-align:left>Customer : " + ud.UserName + "</h3>";
                // htmlcontent += "<h3 style='text-align:left>Contact : " + ud.mobileNumber + " </h3>";
                htmlcontent += "<h3 style='text-align:left>Email :" + ud.Email + "</h3>";
                htmlcontent += "<h3 style='text-align:left>Contact Number :" + ud.MobileNumber + "</h3>";
                htmlcontent += "<div>";
            }



            htmlcontent += "<table style ='width:100%; border: 1px solid #000'>";
            htmlcontent += "<thead style='font-weight:bold'>";
            htmlcontent += "<tr>";
            htmlcontent += "<td style='border:1px solid #000'> Problem </td>";
            htmlcontent += "<td style='border:1px solid #000'>Price</td >";
            htmlcontent += "</tr>";
            htmlcontent += "</thead >";

            htmlcontent += "<tbody>";
            if (pd != null)
            {
                htmlcontent += "<tr>";
                htmlcontent += "<td>" + pd.problemDescription + "</td>";
                htmlcontent += "<td>Rs:200</td>";
                htmlcontent += "</tr>";

            }
            htmlcontent += "</tbody>";

            htmlcontent += "</table>";
            htmlcontent += "</div>";

            htmlcontent += "<div style='text-align:right'>";
            htmlcontent += "<h1> Summary Info </h1>";
            htmlcontent += "<table style='border:1px solid #000;float:right' >";
            htmlcontent += "<tr>";
            htmlcontent += "<td style='border:1px solid #000'> Summary Total </td>";
            htmlcontent += "<td style='border:1px solid #000'> Summary Tax (10%)</td>";
            htmlcontent += "<td style='border:1px solid #000'> Summary NetTotal </td>";
            htmlcontent += "</tr>";
            if (pd != null)
            {
                htmlcontent += "<tr>";
                htmlcontent += "<td style='border: 1px solid #000'>Rs:200 </td>";
                htmlcontent += "<td style='border: 1px solid #000'>Rs:20</td>";
                htmlcontent += "<td style='border: 1px solid #000'>Rs:220</td>";
                htmlcontent += "</tr>";
            }
            htmlcontent += "</table>";
            htmlcontent += "</div>";

            htmlcontent += "</div>";

            PdfGenerator.AddPdfPages(doc, htmlcontent, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                doc.Save(ms);
                response = ms.ToArray();
            }
            string base64Pdf = Convert.ToBase64String(response);
            // Assuming you have a "Bill" model with a "PdfContent" field to store the PDF
            var bill = new BillModel
            {
                //id=pid,
                Billpdf = base64Pdf,
                
            };
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            string FileName = "Invoice_" + pid + ".pdf";
            return File(response, "application/pdf", FileName);
        }
        
    }
}