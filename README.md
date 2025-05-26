# FrontEnd TFG DAW | CPIFP Pirámide

Este repositorio contiene el frontend desarrollado para el Trabajo de Fin de Grado (TFG) del ciclo formativo **Desarrollo de Aplicaciones Web (DAW)** en el **CPIFP Pirámide**.

---

## Tecnologías utilizadas

- **Lenguajes**:
    - TypeScript
    - JavaScript
    - HTML
    - CSS

- **Frameworks y librerías**:
    - React
    - Vite


---

## Estructura del proyecto

```
├── public/ # Archivos estáticos y recursos públicos
├─┬ src/ # Código fuente principal
│ ├── components/ # Componentes reutilizables
│ ├── services/ # Lógica de conexión con APIs
│ ├── styles/ # Estilos pagina
│ ├── hooks/ # Custom hooks
│ └── App.tsx # Componente raíz de la aplicación
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

---

## Dependencias

### Generales

- `react` — Librería principal de UI  
- `react-dom` — Renderizado en el DOM  
- `react-router-dom` — Ruteo de la aplicación  

### Escaner

- `html5-qrcode` — Lector Codigos Codigos de barras

### Mapa

- `Leaflet` - Generacion de mapas

### Herramientas de desarrollo

- `vite` — Bundler y herramientas de desarrollo  
- `eslint` — Linter  
- `prettier` — Formateador de código  

---

## API Externas

- `api.zippopotam.us` — Para obtner la localidad y comunidad mediante URL

## Instalación y ejecución

### Instalación local

```bash
# Clona el repositorio
git clone https://github.com/AlexisPiramide/frontend-tfg.git .

# Instala las dependencias
npm install


# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```