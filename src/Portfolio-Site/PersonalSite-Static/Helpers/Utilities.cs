using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;

namespace PersonalSite_Static.Helpers
{
    public static class Utilities
    {
        public static string GetDisplayName<T>(Expression<Func<T>> property)
        {
            var expression = (MemberExpression)property.Body;
            var value = expression.Member.GetCustomAttribute(typeof(DisplayAttribute)) as DisplayAttribute;
            return value?.Name ?? expression.Member.Name ?? "";
        }
    }
}
