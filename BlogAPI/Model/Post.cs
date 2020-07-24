using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAPI.Model
{
    public class Post
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Content { get; set; }
        public string Date { get; set; }
        public string Preview { get; set; }
    }
}
