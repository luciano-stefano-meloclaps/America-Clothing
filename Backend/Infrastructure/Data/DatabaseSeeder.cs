using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace Infrastructure.Data;

public static class DatabaseSeeder
{
    public static void Initialize(IServiceProvider serviceProvider, string seedFilePath)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<Infrastructure.ApplicationDbContext.VintageDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Infrastructure.ApplicationDbContext.VintageDbContext>>();

        try
        {
            logger.LogInformation("🚀 Iniciando verificación de base de datos...");
            context.Database.EnsureCreated();

            if (context.Products.Any())
            {
                logger.LogInformation("ℹ️ La base de datos ya contiene productos. Saltando seeding.");
                return;
            }

            if (!File.Exists(seedFilePath))
            {
                logger.LogWarning("⚠️ Archivo de semillas no encontrado en: {Path}", seedFilePath);
                return;
            }

            logger.LogInformation("🔍 Iniciando proceso de seeding desde: {Path}", seedFilePath);

            context.Database.OpenConnection();
            context.Database.ExecuteSqlRaw("PRAGMA foreign_keys = OFF;");

            using var transaction = context.Database.BeginTransaction();
            try
            {
                var rawSql = File.ReadAllText(seedFilePath);
                
                // Limpieza profesional usando Regex para ser inmunes a espacios/tabs
                var sql = CleanSqlForSqlite(rawSql);

                // Limpieza manual de tablas en orden jerárquico
                context.Database.ExecuteSqlRaw("DELETE FROM saleorderline;");
                context.Database.ExecuteSqlRaw("DELETE FROM saleorder;");
                context.Database.ExecuteSqlRaw("DELETE FROM product;");
                context.Database.ExecuteSqlRaw("DELETE FROM user WHERE id NOT IN (9998, 9999);");

                context.Database.ExecuteSqlRaw(sql);
                
                transaction.Commit();
                logger.LogInformation("✅ Base de datos SQLite inicializada y poblada con éxito.");
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                logger.LogError(ex, "❌ Error crítico durante la transacción de seeding.");
                throw;
            }
            finally
            {
                context.Database.ExecuteSqlRaw("PRAGMA foreign_keys = ON;");
            }
        }
        catch (Exception ex)
        {
            logger.LogCritical(ex, "❌ Fallo fatal en la inicialización de la base de datos.");
        }
    }

    private static string CleanSqlForSqlite(string sql)
    {
        // Eliminar líneas de MySQL (SET, USE, ALTER) usando Regex insensible a mayúsculas
        var pattern = @"(?i)^\s*(SET|USE|ALTER)\s+.*$";
        var lines = sql.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
        var cleanLines = lines.Where(l => !Regex.IsMatch(l, pattern)).ToList();

        var cleanedSql = string.Join("\n", cleanLines);
        
        // Reemplazar TRUNCATE por DELETE con Regex
        cleanedSql = Regex.Replace(cleanedSql, @"(?i)TRUNCATE\s+TABLE\s+\w+;", "");
        
        return cleanedSql;
    }
}
