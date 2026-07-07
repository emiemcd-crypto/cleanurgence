import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleanUrgence",
  description: "Plateforme d'urgence de nettoyage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{margin:0,padding:0,fontFamily:'sans-serif'}}>
        {children}
      </body>
    </html>
  );
}
