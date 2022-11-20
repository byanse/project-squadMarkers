# PokeSquad (pokesquad)

SquadMaker's Pokemon Challenge

Tecnologías utilizadas:
yarn => 1.22.19
node => v16.18.1
quasar-cli => 1.3.2
android-studio => Android Studio Doplhin | 2021.3.1 Patch 1

## Instalar las dependencias

```bash
yarn
```

### Iniciar el proyecto en modo desarrollo (Android)

```bash
yarn dev # Este comando abrirá la aplicación de Android Studio
clic en "Run 'App'" # Esto abrirá el emulador seleccionado y correrá la app
```

### Lint los archivos

```bash
yarn lint
```

### Dar formato a los archivos

```bash
yarn format
```

### Compilar APK para producción

```bash
quasar build -m capacitor -T android
```
