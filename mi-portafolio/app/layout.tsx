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
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
