import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Cabrera | Ingeniero de Software",
  description:
    "Portafolio profesional de David Andrés Cabrera, estudiante de Ingeniería de Software y desarrollador web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      className="scroll-smooth"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-theme', 'light'); document.documentElement.classList.remove('dark');`,
          }}
        />
      </head>
      <body className="bg-[#f6f7f9] text-[#0f172a]">{children}</body>
    </html>
  );
}
