using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio_Site.Shared.Models
{
    public class Slide
    {
        public string ImageUrl { get; set; }

        public static List<Slide> GetSlides()
        {
            return new()
            {
                new() { ImageUrl = "https://loremflickr.com/1280/720" },
                new() { ImageUrl = "https://loremflickr.com/1000/1000" },
                new() { ImageUrl = "https://loremflickr.com/800/1200" },
                new() { ImageUrl = "https://loremflickr.com/720/1280" },
                new() { ImageUrl = "https://loremflickr.com/1920/1080" },

            };
        }
    }
}
