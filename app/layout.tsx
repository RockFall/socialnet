import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rede Social - Uma rede para humanos socializarem",
  description: "Um lugar para encontrar suas pessoas, combinar coisas e guardar o que vocês viveram juntos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
