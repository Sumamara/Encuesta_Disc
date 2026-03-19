# 🧠 Test de Personalidad DISC

Una aplicación interactiva basada en el modelo **DISC** (Dominancia, Influencia, Estabilidad y Conciencia) para identificar perfiles de personalidad a través de 24 grupos de palabras.

## 🎯 Los 4 Estilos DISC

| Estilo | Descripción | Enfoque |
|---|---|---|
| **🔴 Dominancia (D)** | Directo, decidido, orientado a resultados | Acción y Control |
| **🟡 Influencia (I)** | Optimista, entusiasta, persuasivo | Personas e Interacción |
| **🟢 Estabilidad (S)** | Leal, paciente, colaborador | Procesos y Equipo |
| **🔵 Conciencia (C)** | Analítico, preciso, metódico | Calidad y Datos |

## 🌟 Características

- **Evaluación MÁS/MENOS** — Formato profesional donde eliges la palabra que más y menos te describe.
- **Gráfico de Perfil** — Visualización radial (Rose Chart) con los 4 cuadrantes DISC.
- **Resultados Detallados** — Identificación de estilo Primario y Secundario (ej. D/I, S/C).
- **Plan de Crecimiento** — Acciones concretas basadas en tu estilo dominante.
- **Animaciones Premium** — Transiciones tipo carrusel y feedback visual dinámico.
- **Persistencia con Supabase** — Almacenamiento seguro de resultados.

## 🛠️ Tecnologías

- **Frontend**: React, Vite, TypeScript
- **Estilos**: Tailwind CSS, Shadcn UI, Lucide React
- **Gráficos**: Recharts
- **Backend**: Supabase
- **Animaciones**: TailwindCSS Animate (Custom Carousel Logic)

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Sumamara/Encuesta_productividad.git
cd Encuesta_productividad

# Instalar dependencias
npm install

# Configurar variables de entorno (.env)
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key

# Ejecutar en desarrollo
npm run dev
```

## 📊 Mapeo de Base de Datos

Para compatibilidad con el esquema existente, los puntajes DISC se mapean así:
- `D_score` -> `agotado_score`
- `I_score` -> `saturado_score`
- `S_score` -> `improvisador_score`
- `C_score` -> `distraido_score`
