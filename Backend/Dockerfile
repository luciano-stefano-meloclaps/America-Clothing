# Etapa de construcción (Usamos SDK 7.0)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# 1. Copiamos todos los archivos .csproj de todas las capas
# Esto permite que Docker cachee las dependencias y sea más rápido
COPY ["WebVintage/WebVintage.csproj", "WebVintage/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]

# 2. Restauramos las dependencias
RUN dotnet restore "WebVintage/WebVintage.csproj"

# 3. Copiamos todo el código fuente de la carpeta Backend
COPY . .

# 4. Compilamos y publicamos el proyecto
WORKDIR "/src/WebVintage"
RUN dotnet publish "WebVintage.csproj" -c Release -o /app/publish

# Etapa de ejecución (Runtime 7.0)
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80

# Comando para arrancar la API
ENTRYPOINT ["dotnet", "WebVintage.dll"]