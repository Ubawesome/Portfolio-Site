
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace Portfolio_Site.Helpers
{
    public class RenderModeInteractiveAuto : RenderModeAttribute
    {
        public override IComponentRenderMode Mode => RenderMode.InteractiveAuto;
    }
}
