#!/bin/bash
if [ -z "$1" ]; then
  echo "Uso: ./push.sh <https://github.com/alexandreedantas-cloud/Estoque-app.git>"
  exit 1
fi

git init
git branch -M main
git add .
git commit -m "Deploy Estoque App"
git remote add origin $1
git push -u origin main --force
