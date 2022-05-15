using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace PortfolioSite.Client.Helpers
{
    public static class JSInterop
    {
    public static async Task SetFocus(this IJSRuntime js, ElementReference element) => await js.InvokeVoidAsync("setFocus", element);
    }
}
