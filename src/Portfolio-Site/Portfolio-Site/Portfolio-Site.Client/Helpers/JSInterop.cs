using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Portfolio_Site.Helpers
{
    public static class JSInterop
    {
        public static Task ToggleClass(this IJSRuntime js, ElementReference element, string className) => js.InvokeVoidAsync("toggleElementClass", element, className).AsTask();
        public static Task AddClass(this IJSRuntime js, ElementReference element, string className) => js.InvokeVoidAsync("addElementClass", element, className).AsTask();
        public static Task RemoveClass(this IJSRuntime js, ElementReference element, string className) => js.InvokeVoidAsync("removeElementClass", element, className).AsTask();
        public static Task RestartAnimation(this IJSRuntime js, ElementReference element, string className) => js.InvokeVoidAsync("restartAnimation", element, className).AsTask();
        public static Task ExecuteAnimationOnce(this IJSRuntime js, ElementReference element, string className) => js.InvokeVoidAsync("executeAnimationOnce", element, className).AsTask();
        public static Task ExecuteAnimationOnce(this IJSRuntime js, ElementReference[] elements, string[] classes) => js.InvokeVoidAsync("executeAnimationOnce", elements, classes).AsTask();
        public static Task SetFocus(this IJSRuntime js, ElementReference element) => js.InvokeVoidAsync("setFocus", element).AsTask();
        public static Task ScrollToElement(this IJSRuntime js, string elementId) => js.InvokeVoidAsync("scrollToElement", elementId).AsTask();
        public static Task ScrollToElementInContainer(this IJSRuntime js, ElementReference element, ElementReference container, string direction = "y") => js.InvokeVoidAsync("scrollToElementInContainer", element, container, direction).AsTask();

        public static async Task UpdateScroll(this IJSRuntime js)
        {
            await js.InvokeVoidAsync("updateNavScroll");
            await js.InvokeVoidAsync("updateSectionScroll");
            await js.InvokeVoidAsync("updateScroll");
        }

        public static async Task UpdateNavDrag(this IJSRuntime js, ElementReference element, double dragX, double dragY)
        {
            await js.InvokeVoidAsync("navDrag", element, dragX, dragY);
        }
        public static async Task EndNavDrag(this IJSRuntime js, ElementReference element)
        {
            await js.InvokeVoidAsync("navDragEnd", element);
        }

        public static Task RegisterCursor(this IJSRuntime js, ElementReference element, float duration) => js.InvokeVoidAsync("registerCursor", element, duration).AsTask();
    }
}
