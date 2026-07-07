'use client'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const VERT_MEDIUM = '#2ECC71'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

export default function Home() {
  return (
    <div style={{minHeight:'100vh',background:'white',fontFamily:'sans-serif',color:TEXTE}}>

      {/* NAVBAR */}
      <nav style={{background:'white',borderBottom:'1px solid #E8F0E8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(26,122,74,0.06)'}}>
        <div style={{fontWeight:'900',fontSize:'1.5rem'}}>
          Clean<span style={{color:VERT}}>Urgence</span>
        </div>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <a href="/connexion" style={{padding:'9px 20px',color:VERT,textDecoration:'none',fontWeight:'700',fontSize:'0.88rem',borderRadius:'10px',border:`1.5px solid ${VERT}`}}>
            Se connecter
          </a>
          <a href="/inscription" style={{padding:'9px 20px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',fontSize:'0.88rem',borderRadius:'10px',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
            S'inscrire gratuitement
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:`linear-gradient(135deg, ${VERT} 0%, #2ECC71 100%)`,padding:'80px 40px',textAlign:'center',color:'white'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'0.75rem',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'white',background:'rgba(255,255,255,0.2)',padding:'6px 16px',borderRadius:'30px',marginBottom:'24px'}}>
          ⚡ Plateforme d'urgence de nettoyage
        </div>
        <h1 style={{fontWeight:'900',fontSize:'3.2rem',marginBottom:'16px',lineHeight:'1.1'}}>
          Clean<span style={{color:'#A8F0C6'}}>Urgence</span>
        </h1>
        <p style={{fontSize:'1.15rem',marginBottom:'8px',opacity:0.95,fontWeight:'500'}}>
          La plateforme N°1 des urgences de nettoyage professionnel
        </p>
        <p style={{fontSize:'0.9rem',marginBottom:'40px',opacity:0.8}}>
          Trouvez un prestataire qualifié en moins de 15 minutes · Disponible 24h/24
        </p>

        <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
          <a href="/inscription" style={{padding:'14px 32px',background:'white',color:VERT,textDecoration:'none',fontWeight:'800',fontSize:'1rem',borderRadius:'12px',boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
            Publier une urgence →
          </a>
          <a href="/inscription" style={{padding:'14px 32px',background:'rgba(255,255,255,0.15)',color:'white',textDecoration:'none',fontWeight:'700',fontSize:'1rem',borderRadius:'12px',border:'2px solid rgba(255,255,255,0.4)'}}>
            Voir les missions →
          </a>
        </div>

        {/* Stats */}
        <div style={{display:'flex',gap:'0',justifyContent:'center',background:'rgba(255,255,255,0.15)',borderRadius:'16px',padding:'0',maxWidth:'500px',margin:'0 auto',overflow:'hidden'}}>
          {[{value:'500+',label:'Prestataires actifs'},{value:'<15 min',label:'Temps de réponse'},{value:'24h/24',label:'Disponibilité'}].map((s,i)=>(
            <div key={i} style={{flex:1,padding:'20px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.2)':'none'}}>
              <div style={{fontWeight:'900',fontSize:'1.6rem',marginBottom:'4px'}}>{s.value}</div>
              <div style={{fontSize:'0.75rem',opacity:0.8}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CARTES */}
      <div style={{padding:'64px 40px',background:GRIS}}>
        <h2 style={{textAlign:'center',fontWeight:'800',fontSize:'1.8rem',marginBottom:'8px',color:TEXTE}}>Comment ça fonctionne ?</h2>
        <p style={{textAlign:'center',color:'#888',fontSize:'0.9rem',marginBottom:'48px'}}>Une solution adaptée à chaque profil</p>

        <div style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap',maxWidth:'900px',margin:'0 auto'}}>
          {/* Carte Entreprise */}
          <div style={{background:'white',border:`2px solid #E8F0E8`,borderRadius:'24px',padding:'36px 32px',width:'380px',boxShadow:'0 4px 16px rgba(26,122,74,0.06)'}}>
            <div style={{width:'56px',height:'56px',background:VERT_LIGHT,borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:'20px'}}>🏢</div>
            <div style={{fontWeight:'800',fontSize:'1.2rem',marginBottom:'8px',color:TEXTE}}>Entreprise & Conciergerie</div>
            <div style={{fontSize:'0.85rem',color:'#888',lineHeight:'1.7',marginBottom:'24px'}}>
              Hôtel, agence immobilière, cabinet médical, commerce, restaurant et plus encore. Publiez une mission en 2 minutes.
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
              {['✓ Publiez une urgence en 2 min','✓ Prestataires disponibles immédiatement','✓ Suivi en temps réel'].map((item,i)=>(
                <div key={i} style={{fontSize:'0.83rem',color:VERT,fontWeight:'600'}}>{item}</div>
              ))}
            </div>
            <a href="/inscription" style={{display:'block',textAlign:'center',padding:'13px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',borderRadius:'12px',fontSize:'0.9rem',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
              Publier une urgence →
            </a>
          </div>

          {/* Carte Prestataire */}
          <div style={{background:'white',border:`2px solid #E8F0E8`,borderRadius:'24px',padding:'36px 32px',width:'380px',boxShadow:'0 4px 16px rgba(26,122,74,0.06)'}}>
            <div style={{width:'56px',height:'56px',background:VERT_LIGHT,borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:'20px'}}>🧹</div>
            <div style={{fontWeight:'800',fontSize:'1.2rem',marginBottom:'8px',color:TEXTE}}>Prestataire indépendant</div>
            <div style={{fontSize:'0.85rem',color:'#888',lineHeight:'1.7',marginBottom:'24px'}}>
              Trouvez des missions urgentes près de chez vous et augmentez vos revenus. Indiquez votre disponibilité en un clic.
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'28px'}}>
              {['✓ Missions urgentes près de vous','✓ Revenus complémentaires','✓ Liberté totale d\'organisation'].map((item,i)=>(
                <div key={i} style={{fontSize:'0.83rem',color:VERT,fontWeight:'600'}}>{item}</div>
              ))}
            </div>
            <a href="/inscription" style={{display:'block',textAlign:'center',padding:'13px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',borderRadius:'12px',fontSize:'0.9rem',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
              Voir les missions →
            </a>
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div style={{padding:'64px 40px',background:'white'}}>
        <h2 style={{textAlign:'center',fontWeight:'800',fontSize:'1.8rem',marginBottom:'48px',color:TEXTE}}>En 3 étapes simples</h2>
        <div style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap',maxWidth:'800px',margin:'0 auto'}}>
          {[
            {num:'1',titre:'Publiez',desc:'Décrivez votre besoin en 2 minutes',icon:'📝'},
            {num:'2',titre:'Recevez',desc:'Les prestataires disponibles répondent',icon:'📩'},
            {num:'3',titre:'Choisissez',desc:'Sélectionnez le meilleur prestataire',icon:'✅'},
          ].map((step,i)=>(
            <div key={i} style={{textAlign:'center',width:'200px'}}>
              <div style={{width:'64px',height:'64px',background:`linear-gradient(135deg, ${VERT}, ${VERT_MEDIUM})`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'white',fontWeight:'800',fontSize:'1.4rem',boxShadow:'0 4px 16px rgba(26,122,74,0.3)'}}>
                {step.num}
              </div>
              <div style={{fontWeight:'700',fontSize:'1rem',marginBottom:'8px',color:TEXTE}}>{step.titre}</div>
              <div style={{fontSize:'0.82rem',color:'#888',lineHeight:'1.6'}}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{background:`linear-gradient(135deg, ${VERT} 0%, #2ECC71 100%)`,padding:'64px 40px',textAlign:'center',color:'white'}}>
        <h2 style={{fontWeight:'900',fontSize:'2rem',marginBottom:'12px'}}>Prêt à commencer ?</h2>
        <p style={{opacity:0.85,marginBottom:'32px',fontSize:'0.95rem'}}>Rejoignez des centaines d'entreprises et prestataires qui nous font confiance</p>
        <a href="/inscription" style={{display:'inline-block',padding:'16px 40px',background:'white',color:VERT,textDecoration:'none',fontWeight:'800',fontSize:'1rem',borderRadius:'12px',boxShadow:'0 4px 16px rgba(0,0,0,0.15)'}}>
          Créer mon compte gratuitement →
        </a>
      </div>

      {/* FOOTER */}
      <div style={{background:TEXTE,padding:'24px 40px',textAlign:'center',color:'rgba(255,255,255,0.5)',fontSize:'0.8rem'}}>
        © 2026 CleanUrgence · Plateforme d'urgence de nettoyage professionnel
      </div>

    </div>
  )
}
