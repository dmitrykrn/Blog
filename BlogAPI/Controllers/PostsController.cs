using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BlogAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private static int _id = 0;
        private static List<Post> _posts = new List<Post>();

        [HttpPost]
        public ActionResult<Post> Post([FromBody] Post post)
        {
            _id++;
            post.ID = _id.ToString();
            _posts.Add(post);
            return post;
        }

        [HttpPut]
        public ActionResult<Post> Put([FromBody] Post updatedPost)
        {
            _posts.RemoveAll(post => post.ID == updatedPost.ID);
            _posts.Add(updatedPost);
            return updatedPost;
        }


        [HttpGet]
        public ActionResult<Post[]> Get()
        {
            return _posts.ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<Post> Get(string id)
        {
            var post = _posts.FirstOrDefault(post => post.ID == id);
            if (post != null)
                return this.Ok(post);
            else
                throw new Exception($"Post id={id} doesn't exist");
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var post = _posts.FirstOrDefault(post => post.ID == id);
            if (post != null)
            {
                _posts.Remove(post);
                return this.Ok();
            }
            throw new Exception($"Post id={id} doesn't exist");
        }
    }
}
