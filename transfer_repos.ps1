# Устанавливаем рабочую директорию — текущая
$repoPath = Get-Location
$rootFolder = "root"
$fullRootPath = Join-Path $repoPath $rootFolder

# Проверка, что это Git-репозиторий
if (-not (Test-Path ".git")) {
    Write-Host "❌ Текущая директория не является Git-репозиторием!" -ForegroundColor Red
    exit
}

# Создаем папку 'root', если её ещё нет
if (-not (Test-Path $fullRootPath)) {
    New-Item -ItemType Directory -Path $fullRootPath | Out-Null
    Write-Host "📁 Папка 'root' создана." -ForegroundColor Cyan
}

# Переносим всё содержимое, кроме .git и root
$itemsToMove = Get-ChildItem -Path $repoPath -Exclude ".git", $rootFolder

foreach ($item in $itemsToMove) {
    Move-Item -Path $item.FullName -Destination $fullRootPath -Force
    Write-Host "📦 Перемещено: $($item.Name)" -ForegroundColor Gray
}

# Добавляем изменения в Git
git add .
git commit -m "🏗️ Обернул содержимое репозитория в папку 'root'"
git push

Write-Host "✅ Репозиторий обновлён: всё содержимое теперь в 'root' и запушено на GitHub." -ForegroundColor Green
