'use client'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const VERT_MEDIUM = '#2ECC71'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

export default function Home() {
  return (
    <div style={{minHeight:'100vh',background:'white',fontFamily:'sans-serif',color:TEXTE,overflowX:'hidden'}}>

      {/* NAVBAR */}
      <nav style={{background:'rgba(255,255,255,0.95)',backdropFilter:'blur(10px)',borderBottom:'1px solid #E8F0E8',padding:'0 clamp(16px,5vw,40px)',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(26,122,74,0.06)',flexWrap:'wrap',gap:'8px'}}>
        <div style={{fontWeight:'900',fontSize:'clamp(1.1rem,4vw,1.5rem)'}}>
          Clean<span style={{color:VERT}}>Urgence</span>
        </div>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <a href="/connexion" style={{padding:'8px clamp(10px,3vw,20px)',color:VERT,textDecoration:'none',fontWeight:'700',fontSize:'clamp(0.72rem,2.5vw,0.88rem)',borderRadius:'10px',border:`1.5px solid ${VERT}`,whiteSpace:'nowrap'}}>
            Se connecter
          </a>
          <a href="/inscription" style={{padding:'8px clamp(10px,3vw,20px)',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',fontSize:'clamp(0.72rem,2.5vw,0.88rem)',borderRadius:'10px',boxShadow:'0 4px 12px rgba(26,122,74,0.3)',whiteSpace:'nowrap'}}>
            S'inscrire
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{background:`linear-gradient(160deg, #0D5C35 0%, #1A7A4A 40%, #2ECC71 100%)`,padding:'clamp(50px,12vw,100px) clamp(16px,5vw,40px) clamp(50px,10vw,80px)',textAlign:'center',color:'white',position:'relative',overflow:'hidden'}}>
        
        <div style={{position:'absolute',top:'-80px',right:'-80px',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(255,255,255,0.04)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-60px',left:'-60px',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(255,255,255,0.04)',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',fontSize:'clamp(0.65rem,2.2vw,0.78rem)',fontWeight:'700',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.9)',background:'rgba(255,255,255,0.15)',padding:'8px 16px',borderRadius:'30px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.2)'}}>
            ⚡ Disponible 24h/24
          </div>

          <h1 style={{fontWeight:'900',fontSize:'clamp(2rem,8vw,3.8rem)',marginBottom:'20px',lineHeight:'1.1',letterSpacing:'-0.02em'}}>
            Trouvez un prestataire<br/>
            <span style={{color:'#A8F0C6'}}>en moins de 15 minutes</span>
          </h1>

          <p style={{fontSize:'clamp(0.95rem,3vw,1.15rem)',marginBottom:'12px',opacity:0.9,fontWeight:'500',maxWidth:'560px',margin:'0 auto 12px'}}>
            CleanUrgence connecte les entreprises avec des prestataires de nettoyage qualifiés, disponibles immédiatement.
          </p>
          <p style={{fontSize:'clamp(0.78rem,2.5vw,0.88rem)',marginBottom:'40px',opacity:0.7,maxWidth:'400px',margin:'0 auto 40px'}}>
            Hôtels, conciergeries, agences immobilières · Sans engagement
          </p>

          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginBottom:'56px'}}>
            <a href="/inscription" style={{padding:'14px 28px',background:'white',color:VERT,textDecoration:'none',fontWeight:'800',fontSize:'clamp(0.85rem,2.8vw,1rem)',borderRadius:'14px',boxShadow:'0 8px 24px rgba(0,0,0,0.15)',display:'flex',alignItems:'center',gap:'8px'}}>
              🏢 Publier une urgence
            </a>
            <a href="/inscription" style={{padding:'14px 28px',background:'rgba(255,255,255,0.15)',color:'white',textDecoration:'none',fontWeight:'700',fontSize:'clamp(0.85rem,2.8vw,1rem)',borderRadius:'14px',border:'2px solid rgba(255,255,255,0.35)',display:'flex',alignItems:'center',gap:'8px'}}>
              🧹 Trouver des missions
            </a>
          </div>

          <div style={{display:'flex',gap:'0',background:'rgba(0,0,0,0.15)',borderRadius:'20px',overflow:'hidden',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',flexWrap:'wrap',justifyContent:'center'}}>
            {[{value:'500+',label:'Prestataires actifs'},{value:'<15 min',label:'Temps de réponse'},{value:'24h/24',label:'Disponibilité'},{value:'98%',label:'Satisfaction'}].map((s,i)=>(
              <div key={i} style={{padding:'16px clamp(14px,4vw,32px)',textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,0.1)':'none',flex:'1 1 auto',minWidth:'110px'}}>
                <div style={{fontWeight:'900',fontSize:'clamp(1.1rem,3.5vw,1.6rem)',marginBottom:'4px'}}>{s.value}</div>
                <div style={{fontSize:'clamp(0.62rem,2vw,0.72rem)',opacity:0.75,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BANDEAU DE CONFIANCE */}
      <div style={{background:'white',padding:'18px clamp(16px,5vw,40px)',borderBottom:'1px solid #E8F0E8',display:'flex',alignItems:'center',justifyContent:'center',gap:'clamp(16px,4vw,40px)',flexWrap:'wrap'}}>
        {['🏨 Hôtels','🏢 Conciergeries','🏥 Cabinets médicaux','🏬 Commerces','🏠 Agences immobilières'].map((item,i)=>(
          <span key={i} style={{fontSize:'clamp(0.7rem,2.2vw,0.82rem)',color:'#888',fontWeight:'600'}}>{item}</span>
        ))}
      </div>

      {/* CARTES */}
      <div style={{padding:'clamp(50px,10vw,80px) clamp(16px,5vw,40px)',background:GRIS}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{display:'inline-block',background:VERT_LIGHT,color:VERT,padding:'6px 16px',borderRadius:'20px',fontSize:'0.78rem',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'16px'}}>
            Pour qui ?
          </div>
          <h2 style={{fontWeight:'800',fontSize:'clamp(1.5rem,5vw,2rem)',marginBottom:'8px',color:TEXTE}}>Une solution pour chaque profil</h2>
          <p style={{color:'#888',fontSize:'0.92rem'}}>Que vous ayez besoin de prestataires ou de missions, CleanUrgence est fait pour vous</p>
        </div>

        <div style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap',maxWidth:'960px',margin:'0 auto'}}>
          <div style={{background:'white',border:`2px solid #E8F0E8`,borderRadius:'24px',padding:'32px clamp(20px,5vw,32px)',width:'100%',maxWidth:'420px',boxShadow:'0 4px 20px rgba(26,122,74,0.06)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:`linear-gradient(90deg, ${VERT}, ${VERT_MEDIUM})`}}/>
            <div style={{width:'56px',height:'56px',background:VERT_LIGHT,borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:'18px'}}>🏢</div>
            <div style={{fontWeight:'800',fontSize:'1.2rem',marginBottom:'10px',color:TEXTE}}>Entreprise & Conciergerie</div>
            <div style={{fontSize:'0.87rem',color:'#888',lineHeight:'1.7',marginBottom:'22px'}}>
              Publiez une mission urgente et trouvez un prestataire qualifié en moins de 15 minutes. Idéal pour les hôtels, agences, commerces.
            </div>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',marginBottom:'26px'}}>
              {['✓ Publiez en 2 minutes chrono','✓ Prestataires disponibles immédiatement','✓ Suivi en temps réel','✓ Sans engagement'].map((item,i)=>(
                <div key={i} style={{fontSize:'0.84rem',color:VERT,fontWeight:'600',display:'flex',alignItems:'center',gap:'6px'}}>{item}</div>
              ))}
            </div>
            <a href="/inscription" style={{display:'block',textAlign:'center',padding:'14px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',borderRadius:'12px',fontSize:'0.92rem',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
              Publier une urgence →
            </a>
          </div>

          <div style={{background:'white',border:`2px solid #E8F0E8`,borderRadius:'24px',padding:'32px clamp(20px,5vw,32px)',width:'100%',maxWidth:'420px',boxShadow:'0 4px 20px rgba(26,122,74,0.06)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:`linear-gradient(90deg, ${VERT_MEDIUM}, ${VERT})`}}/>
            <div style={{width:'56px',height:'56px',background:VERT_LIGHT,borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:'18px'}}>🧹</div>
            <div style={{fontWeight:'800',fontSize:'1.2rem',marginBottom:'10px',color:TEXTE}}>Prestataire indépendant</div>
            <div style={{fontSize:'0.87rem',color:'#888',lineHeight:'1.7',marginBottom:'22px'}}>
              Trouvez des missions urgentes près de chez vous et augmentez vos revenus. Indiquez votre disponibilité en un clic.
            </div>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',marginBottom:'26px'}}>
              {['✓ Missions urgentes près de vous','✓ Revenus complémentaires immédiats','✓ Liberté totale d\'organisation','✓ Inscription gratuite'].map((item,i)=>(
                <div key={i} style={{fontSize:'0.84rem',color:VERT,fontWeight:'600',display:'flex',alignItems:'center',gap:'6px'}}>{item}</div>
              ))}
            </div>
            <a href="/inscription" style={{display:'block',textAlign:'center',padding:'14px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',borderRadius:'12px',fontSize:'0.92rem',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
              Voir les missions →
            </a>
          </div>
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div style={{padding:'clamp(50px,10vw,80px) clamp(16px,5vw,40px)',background:'white'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{display:'inline-block',background:VERT_LIGHT,color:VERT,padding:'6px 16px',borderRadius:'20px',fontSize:'0.78rem',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'16px'}}>
            Simple & Rapide
          </div>
          <h2 style={{fontWeight:'800',fontSize:'clamp(1.5rem,5vw,2rem)',marginBottom:'8px',color:TEXTE}}>En 3 étapes simples</h2>
          <p style={{color:'#888',fontSize:'0.92rem'}}>De la publication à la mission en quelques minutes</p>
        </div>
        <div style={{display:'flex',gap:'28px',justifyContent:'center',flexWrap:'wrap',maxWidth:'800px',margin:'0 auto',position:'relative'}}>
          {[
            {num:'1',titre:'Publiez',desc:'Décrivez votre besoin en 2 minutes chrono',icon:'📝',color:'#0D5C35'},
            {num:'2',titre:'Recevez',desc:'Les prestataires disponibles répondent instantanément',icon:'📩',color:VERT},
            {num:'3',titre:'Choisissez',desc:'Sélectionnez le meilleur prestataire et c\'est parti',icon:'✅',color:VERT_MEDIUM},
          ].map((step,i)=>(
            <div key={i} style={{textAlign:'center',width:'200px'}}>
              <div style={{width:'64px',height:'64px',background:`linear-gradient(135deg, ${step.color}, ${VERT_MEDIUM})`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',color:'white',fontWeight:'900',fontSize:'1.4rem',boxShadow:`0 8px 24px rgba(26,122,74,0.25)`}}>
                {step.num}
              </div>
              <div style={{fontWeight:'800',fontSize:'1.02rem',marginBottom:'8px',color:TEXTE}}>{step.titre}</div>
              <div style={{fontSize:'0.84rem',color:'#888',lineHeight:'1.6'}}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TÉMOIGNAGES */}
      <div style={{padding:'clamp(50px,10vw,80px) clamp(16px,5vw,40px)',background:GRIS}}>
        <div style={{textAlign:'center',marginBottom:'44px'}}>
          <h2 style={{fontWeight:'800',fontSize:'clamp(1.5rem,5vw,2rem)',marginBottom:'8px',color:TEXTE}}>Ils nous font confiance</h2>
          <p style={{color:'#888',fontSize:'0.92rem'}}>Des centaines d'entreprises et prestataires satisfaits</p>
        </div>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',maxWidth:'960px',margin:'0 auto'}}>
          {[
            {nom:'Sophie M.',role:'Conciergerie Azur · Cannes',texte:'En 10 minutes j\'avais 3 prestataires disponibles. Service incroyable !',note:'⭐⭐⭐⭐⭐'},
            {nom:'Thomas B.',role:'Prestataire indépendant · Nice',texte:'Grâce à CleanUrgence j\'ai doublé mes revenus en 2 mois.',note:'⭐⭐⭐⭐⭐'},
            {nom:'Marina K.',role:'Hôtel Lumière · Lyon',texte:'La solution parfaite pour gérer les urgences de nettoyage.',note:'⭐⭐⭐⭐⭐'},
          ].map((t,i)=>(
            <div key={i} style={{background:'white',borderRadius:'20px',padding:'26px',width:'100%',maxWidth:'280px',boxShadow:'0 4px 16px rgba(26,122,74,0.06)',border:'1px solid #E8F0E8'}}>
              <div style={{fontSize:'1.05rem',marginBottom:'12px'}}>{t.note}</div>
              <div style={{fontSize:'0.88rem',color:'#555',lineHeight:'1.6',marginBottom:'20px',fontStyle:'italic'}}>"{t.texte}"</div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'36px',height:'36px',background:`linear-gradient(135deg, ${VERT}, ${VERT_MEDIUM})`,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.82rem',flexShrink:0}}>
                  {t.nom.substring(0,2)}
                </div>
                <div>
                  <div style={{fontWeight:'700',fontSize:'0.88rem',color:TEXTE}}>{t.nom}</div>
                  <div style={{fontSize:'0.75rem',color:'#888'}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{background:`linear-gradient(160deg, #0D5C35 0%, #1A7A4A 60%, #2ECC71 100%)`,padding:'clamp(50px,10vw,80px) clamp(16px,5vw,40px)',textAlign:'center',color:'white',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'300px',height:'300px',borderRadius:'50%',background:'rgba(255,255,255,0.04)',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <h2 style={{fontWeight:'900',fontSize:'clamp(1.7rem,6vw,2.4rem)',marginBottom:'12px',lineHeight:'1.2'}}>Prêt à commencer ?</h2>
          <p style={{opacity:0.85,marginBottom:'32px',fontSize:'0.95rem',maxWidth:'500px',margin:'0 auto 32px'}}>
            Rejoignez des centaines d'entreprises et prestataires qui nous font confiance chaque jour
          </p>
          <a href="/inscription" style={{display:'inline-block',padding:'16px clamp(28px,8vw,48px)',background:'white',color:VERT,textDecoration:'none',fontWeight:'800',fontSize:'clamp(0.92rem,3vw,1.05rem)',borderRadius:'14px',boxShadow:'0 8px 24px rgba(0,0,0,0.15)'}}>
            Créer mon compte gratuitement →
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#0D1A0D',padding:'28px clamp(16px,5vw,40px)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px'}}>
        <div style={{fontWeight:'900',fontSize:'1.1rem',color:'white'}}>Clean<span style={{color:VERT_MEDIUM}}>Urgence</span></div>
        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'0.78rem',textAlign:'center'}}>© 2026 CleanUrgence · Plateforme d'urgence de nettoyage professionnel</div>
        <div style={{display:'flex',gap:'18px'}}>
          <a href="/connexion" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:'0.8rem'}}>Se connecter</a>
          <a href="/inscription" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none',fontSize:'0.8rem'}}>S'inscrire</a>
        </div>
      </div>

    </div>
  )
}