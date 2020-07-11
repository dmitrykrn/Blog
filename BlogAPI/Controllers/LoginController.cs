using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using BlogAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public ActionResult<UserToken> Post([FromBody] LoginRequest request)
        {
            if (request.Email != "ironman@gmail.com")
                return Unauthorized(LoginError.WrongMail);

            if (request.Password != "111111")
                return Unauthorized(LoginError.WrongPassword);

            var loginRes = new UserToken
            {
                ID = $"{request.Email}.{request.Password}",
                DisplayName = "John Smith",
                ExpiresIn = 3600
            };
            return loginRes;
        }
    }
}
