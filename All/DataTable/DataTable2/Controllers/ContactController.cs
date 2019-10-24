using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DataTable2.Controllers
{
    public class ContactController : ApiController
    {

        public object Get ()
        {
            var ret = new string [,] { { "Sean", "1991/01/01", "3345678", "123@email", "台北市" },
                { "Sean", "1991/01/01", "3345678", "123@email", "台北市" },
                { "Sean", "1991/01/01", "3345678", "123@email", "台北市" },
            };
            return ret;
        }
    }
}
