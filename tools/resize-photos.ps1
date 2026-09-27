# Thu nho va nen anh hang loat cho web.
# Dung thu vien System.Drawing co san cua Windows, khong can cai them gi.
#
# Cach dung:
#   .\tools\resize-photos.ps1 -Source "D:\anh-goc" -Dest "src\assets\album"
#   .\tools\resize-photos.ps1 -Source "anh.jpg" -Dest "public\zodiac" -MaxWidth 600
#
# Anh goc KHONG bi sua. Script chi ghi ban da nen sang thu muc Dest.

param(
    [Parameter(Mandatory = $true)][string]$Source,
    [Parameter(Mandatory = $true)][string]$Dest,
    [int]$MaxWidth = 1200,
    [int]$Quality = 82
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $Dest)) {
    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
}

# Nhan ca mot file le lan ca mot thu muc
if (Test-Path $Source -PathType Leaf) {
    $files = @(Get-Item $Source)
}
else {
    $files = Get-ChildItem $Source -File |
        Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp|bmp)$' }
}

if ($files.Count -eq 0) {
    Write-Output "Khong tim thay anh nao trong: $Source"
    exit 0
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }

$totalBefore = 0
$totalAfter = 0

foreach ($file in $files) {
    $img = $null
    $bmp = $null
    $graphics = $null

    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)

        # Anh nho hon nguong thi giu nguyen kich thuoc, chi nen lai
        if ($img.Width -le $MaxWidth) {
            $newW = $img.Width
            $newH = $img.Height
        }
        else {
            $newW = $MaxWidth
            $newH = [int][Math]::Round($img.Height * ($MaxWidth / $img.Width))
        }

        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $graphics = [System.Drawing.Graphics]::FromImage($bmp)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.DrawImage($img, 0, 0, $newW, $newH)

        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

        $outPath = Join-Path $Dest ($file.BaseName + '.jpg')

        $sizeBefore = $file.Length
        $dimBefore = "$($img.Width)x$($img.Height)"

        # Giai phong anh goc truoc khi ghi, phong truong hop ghi de chinh no
        $graphics.Dispose(); $graphics = $null
        $img.Dispose(); $img = $null

        $bmp.Save($outPath, $jpegCodec, $encoderParams)
        $bmp.Dispose(); $bmp = $null

        $sizeAfter = (Get-Item $outPath).Length
        $totalBefore += $sizeBefore
        $totalAfter += $sizeAfter

        $mbBefore = [Math]::Round($sizeBefore / 1MB, 2)
        $kbAfter = [Math]::Round($sizeAfter / 1KB, 0)
        Write-Output "$($file.Name)  $dimBefore ${mbBefore}MB  ->  ${newW}x${newH} ${kbAfter}KB"
    }
    catch {
        Write-Output "LOI voi $($file.Name): $($_.Exception.Message)"
    }
    finally {
        if ($graphics) { $graphics.Dispose() }
        if ($bmp) { $bmp.Dispose() }
        if ($img) { $img.Dispose() }
    }
}

$mbB = [Math]::Round($totalBefore / 1MB, 2)
$mbA = [Math]::Round($totalAfter / 1MB, 2)
Write-Output ""
Write-Output "Xong $($files.Count) anh:  ${mbB}MB  ->  ${mbA}MB"
