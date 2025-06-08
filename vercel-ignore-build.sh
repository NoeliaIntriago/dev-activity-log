#!/bin/bash

# Detecta si hubo cambios en archivos que NO sean .md, LICENSE, o archivos dentro de .github/
if git diff --name-only $VERCEL_GIT_COMMIT_REF^ $VERCEL_GIT_COMMIT_REF | grep -Ev '\.md$|^LICENSE$|^\.github/' > /dev/null; then
  echo "Cambios relevantes detectados. Procediendo con build."
  exit 1  # build necesario
else
  echo "Solo cambios en documentación o archivos ignorados. Omitiendo build."
  exit 0  # no construir
fi
