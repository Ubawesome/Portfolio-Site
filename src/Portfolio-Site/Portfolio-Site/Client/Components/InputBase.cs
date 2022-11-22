using Microsoft.AspNetCore.Components;

public abstract class InputBase : ComponentBase {
    [Parameter]
    public string Id { get; set; } = new Guid().ToString();

    [Parameter]
    public string? Label { get; set; }
}