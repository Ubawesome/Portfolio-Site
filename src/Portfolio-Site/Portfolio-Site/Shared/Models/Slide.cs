﻿using System;
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
                new() { ImageUrl = "https://unsplash.it/1280/720" },
                new() { ImageUrl = "https://unsplash.it/1000/1000" },
                new() { ImageUrl = "https://unsplash.it/800/1200" },
                new() { ImageUrl = "https://unsplash.it/720/1280" },
                new() { ImageUrl = "https://unsplash.it/1600/900" },
                new() { ImageUrl = "https://unsplash.it/1680/1080" },
                new() { ImageUrl = "https://unsplash.it/1920/1080" },
                new() { ImageUrl = "https://unsplash.it/1090/1800" },
                new() { ImageUrl = "https://unsplash.it/1290/1200" },

            };
        }
    }
}
