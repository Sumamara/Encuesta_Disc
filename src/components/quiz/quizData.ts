
export interface DiscWordGroup {
    id: number;
    words: {
        text: string;
        category: 'D' | 'I' | 'S' | 'C';
    }[];
}

export interface DiscCategory {
    id: string;
    title: string;
    tagline: string;
    advantage: string;
    focus: string;
    whyImportant: string;
    description: string;
    actionPlan: { title: string; desc: string }[];
}

export const discCategories: Record<string, DiscCategory> = {
    D: {
        id: "D",
        title: "Dominancia (D)",
        tagline: "Enfocado en resultados, directo y decidido.",
        advantage: "Determinación y Resultados",
        focus: "Lograr objetivos y superar retos.",
        description: "Las personas con un estilo D alto son directas, decididas y tienen una gran fuerza de voluntad. Son competitivas y se enfocan en los resultados finales.",
        whyImportant: "Tu capacidad para tomar decisiones rápidas y enfrentar desafíos es tu mayor activo. Sin embargo, a veces puedes parecer impaciente o poco sensible a las necesidades de los demás.",
        actionPlan: [
            { title: "Escucha Activa", desc: "Practica escuchar las opiniones de los demás antes de tomar una decisión final." },
            { title: "Empatía", desc: "Considera cómo tus acciones y palabras afectan el clima emocional del equipo." },
            { title: "Paciencia", desc: "Acepta que no todo el mundo se mueve a tu misma velocidad." }
        ]
    },
    I: {
        id: "I",
        title: "Influencia (I)",
        tagline: "Entusiasta, sociable y persuasivo.",
        advantage: "Comunicación e Inspiración",
        focus: "Construir relaciones e influir en los demás.",
        description: "Las personas con un estilo I alto son optimistas, entusiastas y muy sociables. Les encanta colaborar y motivar a los demás.",
        whyImportant: "Tu energía y carisma son contagiosos. Tienes un talento natural para la persuasión, pero podrías tener dificultades para enfocarte en los detalles o seguir rutinas estrictas.",
        actionPlan: [
            { title: "Enfoque en Detalles", desc: "Dedica tiempo a revisar los hechos y datos antes de lanzarte a una idea." },
            { title: "Seguimiento", desc: "Asegúrate de completar las tareas que inicias antes de pasar a la siguiente novedad." },
            { title: "Escucha", desc: "Permite que otros hablen y compartan sus ideas sin interrumpir." }
        ]
    },
    S: {
        id: "S",
        title: "Estabilidad (S)",
        tagline: "Paciente, leal y colaborador.",
        advantage: "Lealtad y Trabajo en Equipo",
        focus: "Mantener la armonía y la consistencia.",
        description: "Las personas con un estilo S alto son calmadas, pacientes y confiables. Valoran la seguridad, la cooperación y las relaciones a largo plazo.",
        whyImportant: "Eres el pegamento que mantiene unido al equipo. Tu estabilidad y lealtad son invaluables, aunque a veces podrías resistirte al cambio por miedo a la inestabilidad.",
        actionPlan: [
            { title: "Adaptabilidad", desc: "Trata de ver el cambio como una oportunidad de crecimiento en lugar de una amenaza." },
            { title: "Asertividad", desc: "Expresa tus necesidades y opiniones de forma clara, incluso si eso genera un pequeño conflicto." },
            { title: "Iniciativa", desc: "No esperes a que otros te digan qué hacer; propón tus propias ideas." }
        ]
    },
    C: {
        id: "C",
        title: "Conciencia (C)",
        tagline: "Analítico, preciso y detallista.",
        advantage: "Precisión y Calidad",
        focus: "Asegurar la exactitud y cumplir estándares.",
        description: "Las personas con un estilo C alto son analíticas, reservadas y muy precisas. Buscan la perfección y se guían por hechos y datos.",
        whyImportant: "Tu atención al detalle garantiza la calidad excepcional de cualquier proyecto. Sin embargo, tu búsqueda de la perfección puede llevarte a la parálisis por análisis o a ser demasiado crítico.",
        actionPlan: [
            { title: "Flexibilidad", desc: "Acepta que 'lo hecho es mejor que lo perfecto' en situaciones de urgencia." },
            { title: "Comunicación Abierta", desc: "Trata de compartir tus procesos de pensamiento en lugar de solo los resultados finales." },
            { title: "Delegación", desc: "Confía en que otros también pueden hacer un buen trabajo, aunque sigan métodos diferentes." }
        ]
    }
};

export const discQuestions: DiscWordGroup[] = [
    { id: 1, words: [{ text: "Decidido", category: "D" }, { text: "Entusiasta", category: "I" }, { text: "Paciente", category: "S" }, { text: "Preciso", category: "C" }] },
    { id: 2, words: [{ text: "Directo", category: "D" }, { text: "Persuasivo", category: "I" }, { text: "Leal", category: "S" }, { text: "Analítico", category: "C" }] },
    { id: 3, words: [{ text: "Competitivo", category: "D" }, { text: "Sociable", category: "I" }, { text: "Tranquilo", category: "S" }, { text: "Detallista", category: "C" }] },
    { id: 4, words: [{ text: "Exigente", category: "D" }, { text: "Optimista", category: "I" }, { text: "Colaborador", category: "S" }, { text: "Cuidadoso", category: "C" }] },
    { id: 5, words: [{ text: "Determinado", category: "D" }, { text: "Expresivo", category: "I" }, { text: "Constante", category: "S" }, { text: "Metódico", category: "C" }] },
    { id: 6, words: [{ text: "Dominante", category: "D" }, { text: "Inspirador", category: "I" }, { text: "Amable", category: "S" }, { text: "Sistemático", category: "C" }] },
    { id: 7, words: [{ text: "Rápido", category: "D" }, { text: "Carismático", category: "I" }, { text: "Estable", category: "S" }, { text: "Lógico", category: "C" }] },
    { id: 8, words: [{ text: "Firme", category: "D" }, { text: "Comunicativo", category: "I" }, { text: "Comprensivo", category: "S" }, { text: "Perfeccionista", category: "C" }] },
    { id: 9, words: [{ text: "Retador", category: "D" }, { text: "Energético", category: "I" }, { text: "Calmado", category: "S" }, { text: "Ordenado", category: "C" }] },
    { id: 10, words: [{ text: "Independiente", category: "D" }, { text: "Convincente", category: "I" }, { text: "Apoyo", category: "S" }, { text: "Exacto", category: "C" }] },
    { id: 11, words: [{ text: "Audaz", category: "D" }, { text: "Divertido", category: "I" }, { text: "Pacífico", category: "S" }, { text: "Formal", category: "C" }] },
    { id: 12, words: [{ text: "Resolutivo", category: "D" }, { text: "Motivador", category: "I" }, { text: "Confiable", category: "S" }, { text: "Precavido", category: "C" }] },
    { id: 13, words: [{ text: "Fuerte", category: "D" }, { text: "Sociable", category: "I" }, { text: "Tolerante", category: "S" }, { text: "Estructurado", category: "C" }] },
    { id: 14, words: [{ text: "Controlador", category: "D" }, { text: "Inspirador", category: "I" }, { text: "Servicial", category: "S" }, { text: "Analítico", category: "C" }] },
    { id: 15, words: [{ text: "Ambicioso", category: "D" }, { text: "Espontáneo", category: "I" }, { text: "Estable", category: "S" }, { text: "Detallista", category: "C" }] },
    { id: 16, words: [{ text: "Decisivo", category: "D" }, { text: "Agradable", category: "I" }, { text: "Paciente", category: "S" }, { text: "Riguros@", category: "C" }] },
    { id: 17, words: [{ text: "Directivo", category: "D" }, { text: "Entusiasta", category: "I" }, { text: "Calmado", category: "S" }, { text: "Meticuloso", category: "C" }] },
    { id: 18, words: [{ text: "Competidor", category: "D" }, { text: "Expresivo", category: "I" }, { text: "Leal", category: "S" }, { text: "Lógico", category: "C" }] },
    { id: 19, words: [{ text: "Enfocado en resultados", category: "D" }, { text: "Persuasivo", category: "I" }, { text: "Cooperativo", category: "S" }, { text: "Cuidadoso", category: "C" }] },
    { id: 20, words: [{ text: "Determinado", category: "D" }, { text: "Comunicativo", category: "I" }, { text: "Apoyo", category: "S" }, { text: "Preciso", category: "C" }] },
    { id: 21, words: [{ text: "Firme", category: "D" }, { text: "Optimista", category: "I" }, { text: "Tranquilo", category: "S" }, { text: "Sistemático", category: "C" }] },
    { id: 22, words: [{ text: "Dominante", category: "D" }, { text: "Inspirador", category: "I" }, { text: "Paciente", category: "S" }, { text: "Analítico", category: "C" }] },
    { id: 23, words: [{ text: "Retador", category: "D" }, { text: "Sociable", category: "I" }, { text: "Estable", category: "S" }, { text: "Perfeccionista", category: "C" }] },
    { id: 24, words: [{ text: "Decidido", category: "D" }, { text: "Carismático", category: "I" }, { text: "Comprensivo", category: "S" }, { text: "Ordenado", category: "C" }] },
];

export const getDiscProfile = (scores: Record<string, number>) => {
    const sorted = Object.entries(scores)
        .sort(([, a], [, b]) => b - a);
    
    const primary = sorted[0][0];
    const secondary = sorted[1][0];
    
    return {
        primary: discCategories[primary],
        secondary: discCategories[secondary],
        profileCode: `${primary}/${secondary}`
    };
};
