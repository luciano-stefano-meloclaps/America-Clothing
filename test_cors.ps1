# ============================================================
# CORS Test Suite - America Clothing API
# ============================================================

$BASE_URL = "http://localhost:5010"
$VERCEL_ORIGIN = "https://america-clothing.vercel.app"
$LOCAL_ORIGIN = "http://localhost:3000"
$BLOCKED_ORIGIN = "https://hacker.evil.com"

$passed = 0
$failed = 0

function Test-CORS {
    param(
        [string]$TestName,
        [string]$Origin,
        [string]$Method,
        [string]$Endpoint,
        [string]$ExpectedOriginHeader,
        [bool]$ShouldHaveCORS
    )

    Write-Host "`n--- $TestName ---" -ForegroundColor Cyan

    $headers = @{
        "Origin" = $Origin
        "Access-Control-Request-Method" = $Method
        "Access-Control-Request-Headers" = "Content-Type,Authorization"
    }

    try {
        $response = Invoke-WebRequest -Uri "$BASE_URL$Endpoint" -Method OPTIONS -Headers $headers -UseBasicParsing -ErrorAction Stop
        $acao = $response.Headers["Access-Control-Allow-Origin"]
        $acac = $response.Headers["Access-Control-Allow-Credentials"]
        $acam = $response.Headers["Access-Control-Allow-Methods"]

        Write-Host "  HTTP Status            : $($response.StatusCode)" -ForegroundColor White
        Write-Host "  Allow-Origin           : $acao" -ForegroundColor White
        Write-Host "  Allow-Credentials      : $acac" -ForegroundColor White
        Write-Host "  Allow-Methods          : $acam" -ForegroundColor White

        if ($ShouldHaveCORS -and ($acao -eq $Origin)) {
            Write-Host "  RESULTADO: PASS - CORS permitido correctamente" -ForegroundColor Green
            $global:passed++
        } elseif (-not $ShouldHaveCORS -and ($null -eq $acao -or $acao -eq "")) {
            Write-Host "  RESULTADO: PASS - Origen bloqueado correctamente" -ForegroundColor Green
            $global:passed++
        } else {
            Write-Host "  RESULTADO: FAIL - Se esperaba '$ExpectedOriginHeader', se obtuvo '$acao'" -ForegroundColor Red
            $global:failed++
        }
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $acao = $_.Exception.Response.Headers["Access-Control-Allow-Origin"]
        Write-Host "  HTTP Status            : $statusCode" -ForegroundColor White
        Write-Host "  Allow-Origin           : $acao" -ForegroundColor White

        if (-not $ShouldHaveCORS) {
            Write-Host "  RESULTADO: PASS - Origen bloqueado (no vino header)" -ForegroundColor Green
            $global:passed++
        } else {
            Write-Host "  RESULTADO: FAIL - Se esperaba CORS pero vino error" -ForegroundColor Red
            $global:failed++
        }
    }
}

Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "  CORS Test Suite - America Clothing API" -ForegroundColor Yellow
Write-Host "  Target: $BASE_URL" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow

# TEST 1: Preflight desde Vercel (DEBE pasar)
Test-CORS `
    -TestName "TEST 1: Preflight OPTIONS desde Vercel (produccion)" `
    -Origin $VERCEL_ORIGIN `
    -Method "POST" `
    -Endpoint "/api/SaleOrder" `
    -ExpectedOriginHeader $VERCEL_ORIGIN `
    -ShouldHaveCORS $true

# TEST 2: Preflight desde localhost (DEBE pasar)
Test-CORS `
    -TestName "TEST 2: Preflight OPTIONS desde localhost (desarrollo)" `
    -Origin $LOCAL_ORIGIN `
    -Method "POST" `
    -Endpoint "/api/SaleOrder" `
    -ExpectedOriginHeader $LOCAL_ORIGIN `
    -ShouldHaveCORS $true

# TEST 3: Preflight desde origen desconocido (DEBE ser bloqueado)
Test-CORS `
    -TestName "TEST 3: Preflight OPTIONS desde origen no autorizado (debe bloquearse)" `
    -Origin $BLOCKED_ORIGIN `
    -Method "POST" `
    -Endpoint "/api/SaleOrder" `
    -ExpectedOriginHeader "" `
    -ShouldHaveCORS $false

# TEST 4: Preflight en endpoint de autenticacion
Test-CORS `
    -TestName "TEST 4: Preflight OPTIONS en /api/Authenticate desde Vercel" `
    -Origin $VERCEL_ORIGIN `
    -Method "POST" `
    -Endpoint "/api/Authenticate" `
    -ExpectedOriginHeader $VERCEL_ORIGIN `
    -ShouldHaveCORS $true

# TEST 5: Preflight en endpoint de productos
Test-CORS `
    -TestName "TEST 5: Preflight OPTIONS en /api/Product desde Vercel" `
    -Origin $VERCEL_ORIGIN `
    -Method "GET" `
    -Endpoint "/api/Product" `
    -ExpectedOriginHeader $VERCEL_ORIGIN `
    -ShouldHaveCORS $true

Write-Host "`n============================================================" -ForegroundColor Yellow
Write-Host "  RESULTADOS FINALES" -ForegroundColor Yellow
Write-Host "  Pasados : $passed" -ForegroundColor Green
Write-Host "  Fallidos: $failed" -ForegroundColor Red
Write-Host "============================================================`n" -ForegroundColor Yellow
