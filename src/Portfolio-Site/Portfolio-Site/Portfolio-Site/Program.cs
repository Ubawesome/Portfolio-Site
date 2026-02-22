using Microsoft.AspNetCore.HttpOverrides;
using Portfolio_Site;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddAuthentication();

if (builder.Environment.IsDevelopment())
{
    builder.WebHost.UseStaticWebAssets();
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
    //app.UseBlazorFrameworkFiles();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);
app.UseHttpsRedirection();
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseBlazorFrameworkFiles();
app.UseStaticFiles();
//app.UseStaticFiles(new StaticFileOptions
//{
//    OnPrepareResponse = ctx =>
//    {
//        // Optional: Add caching headers for framework files
//        if (ctx.File.Name.EndsWith(".js") || ctx.File.Name.EndsWith(".wasm"))
//        {
//            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000");
//        }
//    }
//});

app.UseAuthentication();
app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(Portfolio_Site.Client._Imports).Assembly);

app.Run();
