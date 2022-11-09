﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio_Site.Shared.Helpers
{
    public enum Size
    {
        None,
        Small,
        Medium,
        Large
    }

    public enum Orientation
    {
        None,
        Vertical,
        Horizontal
    }
    
    public enum TabStyle
    {
        Container,
        Card
    }

    public static class Helpers
    {
        public static string EnumToClass(this Size size)
        {
            switch (size)
            {
                case Size.Small: return "sm";
                case Size.Medium: return "md";
                case Size.Large: return "lg";
                default: return "";
            }
        }

        public static string EnumToClass(this Orientation orientation)
        {
            switch (orientation)
            {
                case Orientation.Vertical: return "vertical";
                case Orientation.Horizontal: return "horizontal";
                default: return "";
            }
        }
    }
}