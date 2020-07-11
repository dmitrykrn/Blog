using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAPI.Model
{
    public class UserToken
    {
        public string ID { get; set; }
        public string DisplayName { get; set; }
        public int ExpiresIn { get; internal set; }
    }
}
