using Microsoft.AspNetCore.Mvc;
using dotnetapp.DataDbContext;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AcServiceDbContext _context;

        public AuthController(AcServiceDbContext ac_DbContext)
        {
            _context = ac_DbContext;
        }


        [HttpPost("admin/login")]
        public async Task<IActionResult> isAdminPresent([FromBody] LoginModel adminobj)
        {
            if (adminobj == null)
            {
                return BadRequest();
            }
            var admin = await _context.Admins.FirstOrDefaultAsync(x => x.Email == adminobj.Email && x.Password == adminobj.Password);
            if (admin == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
           

            return Created("", true);
        }


        [HttpPost("user/login")]
        public async Task<IActionResult> isUserPresent([FromBody] LoginModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            if (user == null)
            {
                return NotFound(new { Message = "Account not found" });
            }
            var pwd = await _context.Users.FirstOrDefaultAsync(x => x.Email == userobj.Email && x.Password == userobj.Password);
            if (pwd == null)
            {
                return NotFound(new { Message = "Wrong Password" });
            }
           

            return Created("", new
            {
                Message = "Login Success",
                user.UserRole
            });
        }



        [HttpPost("admin/signup")]
        public async Task<IActionResult> saveAdmin([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }
            if(userobj.UserRole != "demo"){
                var email = await _context.Admins.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            if (email != null)
            {
                return BadRequest(new
                {
                    Message = "Email already exists"
                });
            }
            }
            
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            
            var admin = new AdminModel
                {
                    Email = userobj.Email,
                    Password = userobj.Password,
                    MobileNumber = userobj.MobileNumber,
                    UserRole = userobj.UserRole
                };
                await _context.Admins.AddAsync(admin);
                await _context.SaveChangesAsync();
            

            

            return Created("", true);
        }

        [HttpPost("user/signup")]
        public async Task<IActionResult> saveUser([FromBody] UserModel userobj)
        {
            if (userobj == null)
            {
                return BadRequest();
            }

            if(userobj.UserRole != "demo"){
                 var email = await _context.LoginModels.FirstOrDefaultAsync(x => x.Email == userobj.Email);
            if (email != null)
            {
                return BadRequest(new
                {
                    Message = "Email already exists"
                });
            }
            }
           
            await _context.Users.AddAsync(userobj);
            await _context.SaveChangesAsync();
            var loginObj = new LoginModel
            {
                Email = userobj.Email,
                Password = userobj.Password
            };
            await _context.LoginModels.AddAsync(loginObj);
            await _context.SaveChangesAsync();
            

            return Created("", true);
        }
    }
}