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
        <nav style={{background:'white',borderBottom:'1px solid #eee',padding:'0 24px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
          <a href="/" style={{fontWeight:'900',fontSize:'1.3rem',textDecoration:'none',color:'#1A1A1A'}}>
            Clean<span style={{color:'#FF4D00'}}>Urgence</span>
          </a>
          <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
            <a href="/connexion" style={{padding:'8px 16px',color:'#1A1A1A',textDecoration:'none',fontWeight:'600',fontSize:'0.85rem',borderRadius:'8px',border:'1px solid #eee'}}>
              Se connecter
            </a>
            <a href="/inscription" style={{padding:'8px 16px',background:'#FF4D00',color:'white',textDecoration:'none',fontWeight:'600',fontSize:'0.85rem',borderRadius:'8px'}}>
              S'inscrire
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}