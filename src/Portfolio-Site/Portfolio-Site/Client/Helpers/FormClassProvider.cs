using Microsoft.AspNetCore.Components.Forms;

namespace Portfolio_Site.Client.Helpers
{
    public class FormClassProvider : FieldCssClassProvider
    {
        public override string GetFieldCssClass(EditContext editContext, in FieldIdentifier fieldIdentifier)
        {
            var isValid = !editContext.GetValidationMessages(fieldIdentifier).Any();

            return isValid ? "valid" : "invalid";
        }
    }
}
