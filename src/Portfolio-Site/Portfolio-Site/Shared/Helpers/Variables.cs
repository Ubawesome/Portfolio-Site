using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portfolio_Site.Shared.Helpers
{
    public enum Color
    {
        Primary,
        Secondary,
        Accent1,
        Accent2,
        Accent3,
        Success,
        Danger,
        Grey
    }

    public enum Size
    {
        None,
        Small,
        Medium,
        Large,
        Full
    }

    public enum Orientation
    {
        None,
        Vertical,
        Horizontal
    }

    public enum ImagePosition
    {
        Left,
        Right
    }

    public enum ButtonStyle
    {
        Filled,
        Outline
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
                case Size.Full: return "full";
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

        public static string EnumToClass(this ImagePosition imagePosition)
        {
            switch (imagePosition)
            {
                case ImagePosition.Left: return "image-left";
                case ImagePosition.Right: return "image-right";
                default: return "";
            }
        }

        public static string EnumToClass(this Color color)
        {
            switch (color)
            {
                case Color.Primary: return "primary";
                case Color.Secondary: return "secondary";
                case Color.Accent1: return "accent-1";
                case Color.Accent2: return "accent-2";
                case Color.Accent3: return "accent-3";
                case Color.Success: return "success";
                case Color.Danger: return "danger";
                case Color.Grey: return "grey";
                default: return "";
            }
        }
        public static string EnumToClass(this ButtonStyle buttonStyle)
        {
            switch (buttonStyle)
            {
                case ButtonStyle.Filled: return "filled";
                case ButtonStyle.Outline: return "outline";
                default: return "";
            }
        }
    }
}
