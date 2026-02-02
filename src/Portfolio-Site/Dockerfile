# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
# For more information, please see https://aka.ms/containercompat

# This stage is used when running from VS in fast mode (Default for Debug configuration)
# FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base

# WORKDIR /app
# EXPOSE 80
# EXPOSE 443


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG TARGETARCH
ARG BUILD_CONFIGURATION=Release



WORKDIR /src

COPY *.sln ./
COPY src/Portfolio-Site/Portfolio-Site/Server/*.csproj ./Server/
COPY src/Portfolio-Site/Portfolio-Site/Client/*.csproj ./Client/
COPY src/Portfolio-Site/Portfolio-Site/Shared/*.csproj ./Shared/
RUN dotnet restore
RUN ls /app

COPY . .
WORKDIR /src/Server
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=https://0.0.0.0:8080

ENTRYPOINT [ "dotnet", "Portfolio-Site.Server.dll" ]

# COPY . ./
# WORKDIR /app/src/Portfolio-Site

# COPY ["Portfolio-Site/Server/Portfolio-Site.Server.csproj", "./Portfolio-Site/Server/"]
# # COPY ["/src/Portfolio-Site/Server/Portfolio-Site.Server.csproj", "Portfolio-Site/Server/"]
# COPY ["Client/Portfolio-Site.Client.csproj", "./Portfolio-Site/Client/"]
# COPY ["Shared/Portfolio-Site.Shared.csproj", "./Portfolio-Site/Shared/"]
# RUN dotnet restore "./Portfolio-Site/Server/Portfolio-Site.Server.csproj"
# COPY . .
# WORKDIR /src/Portfolio-Site/Server
# RUN dotnet build "./Portfolio-Site.Server.csproj" -c %BUILD_CONFIGURATION -o /app/build

# # This stage is used to publish the service project to be copied to the final stage
# FROM build AS publish
# ARG BUILD_CONFIGURATION=Release
# RUN dotnet publish "./Portfolio-Site.Server.csproj" -c %BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# # This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
# FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "Portfolio-Site.Server.dll"]