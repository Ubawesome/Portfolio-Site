using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace PortfolioSite.Client.Helpers
{
    public static class JSInterop
    {
        public static Task SetFocus(this IJSRuntime js, ElementReference element) => js.InvokeVoidAsync("setFocus", element).AsTask();
        public static Task ScrollToElement(this IJSRuntime js, string elementId) => js.InvokeVoidAsync("scrollToElement", elementId).AsTask();
    }
}
