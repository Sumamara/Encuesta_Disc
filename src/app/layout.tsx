import { Providers } from "@/components/Providers";
import "../index.css";

export const metadata = {
    metadataBase: new URL('https://Sumamara.github.io'),
    title: "Test de Personalidad DISC",
    description: "Descubre tu perfil de personalidad DISC en solo 7 minutos con esta evaluación práctica de 24 preguntas.",
    icons: {
        icon: [
            { url: '/Encuesta_productividad/favicon.ico' },
            { url: '/Encuesta_productividad/favicon.png', type: 'image/png' }
        ],
        shortcut: '/Encuesta_productividad/favicon.png',
        apple: '/Encuesta_productividad/favicon.png',
    },
    openGraph: {
        title: "Quiz: ¿Cuál es tu Bloqueo de Productividad?",
        description: "Descubre en 5 minutos que bloquea tu productividad. Identifica tu tipo de bloqueo.",
        images: [
            {
                url: 'https://Sumamara.github.io/Encuesta_productividad/og_image_1771229641740.png',
                width: 1200,
                height: 630,
                alt: 'Quiz: ¿Cuál es tu Bloqueo de Productividad? Preview',
            }
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
