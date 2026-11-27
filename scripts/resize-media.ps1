Add-Type -AssemblyName System.Drawing
$destDir = Join-Path (Get-Location) "public\media"
New-Item -ItemType Directory -Force -Path $destDir | Out-Null
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoder = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoder.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]78)

Get-ChildItem "public\mock\image-*" | ForEach-Object {
  $image = [System.Drawing.Image]::FromFile($_.FullName)
  $max = 900
  $scale = [Math]::Min($max / $image.Width, $max / $image.Height)
  if ($scale -gt 1) { $scale = 1 }
  $width = [Math]::Max(1, [int]($image.Width * $scale))
  $height = [Math]::Max(1, [int]($image.Height * $scale))
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.DrawImage($image, 0, 0, $width, $height)
  $out = Join-Path $destDir ($_.BaseName + ".jpg")
  $bitmap.Save($out, $codec, $encoder)
  $graphics.Dispose()
  $bitmap.Dispose()
  $image.Dispose()
  Write-Output $out
}
