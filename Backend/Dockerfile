FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copiar csproj y restaurar dependencias
COPY ["WebVintage/WebVintage.csproj", "WebVintage/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

RUN dotnet restore "WebVintage/WebVintage.csproj"

# Copiar el resto del código y compilar
COPY . .
WORKDIR "/src/WebVintage"
RUN dotnet publish "WebVintage.csproj" -c Release -o /app/publish

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/WebVintage/SeedData ./SeedData

# Exponer el puerto 80
EXPOSE 80

ENTRYPOINT ["dotnet", "WebVintage.dll"]
