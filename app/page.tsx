'use client'
import { useState } from 'react'

export default function Home() {
  const [role, setRole] = useState(null)
  const [typeEntreprise, setTypeEntreprise] = useState('')

  if (!role) return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif'}}>

      {/* HERO */}
      <div style={{textAlign:'center',padding:'60px 20px 40px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'0.75rem',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#FF4D00',background:'rgba(255,77,0,0.08)',border:'1px solid rgba(255,77,0,0.2)',padding:'5px 14px',borderRadius:'30px',marginBottom:'20px'}}>⚡ Plateforme d'urgence</div>
        <h1 style={{fontWeight:'900',fontSize:'2.8rem',color:'#1A1A1A',marginBottom:'12px',lineHeight:'1.1'}}>
          Clean<span style={{color:'#FF4D00'}}>Urgence</span>
        </h1>
        <p style={{color:'#555',fontSize:'1.05rem',marginBottom:'8px',fontWeight:'500'}}>La plateforme N°1 des urgences de nettoyage professionnel</p>
        <p style={{color:'#888',fontSize:'0.88rem',marginBottom:'36px'}}>Trouvez un prestataire qualifié en moins de 15 minutes · Disponible 24h/24</p>

        {/* STATS */}
        <div style={{display:'flex',justifyContent:'center',gap:'32px',marginBottom:'48px',flexWrap:'wrap'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>500+</div>
            <div style={{fontSize:'0.78rem',color:'#888'}}>Prestataires actifs</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>&lt;15 min</div>
            <div style={{fontSize:'0.78rem',color:'#888'}}>Temps de réponse</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>24h/24</div>
            <div style={{fontSize:'0.78rem',color:'#888'}}>Disponibilité</div>
          </div>
        </div>

        {/* CARDS */}
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px',padding:'0 20px'}}>
          
          {/* ENTREPRISE */}
          <div onClick={()=>setRole('entreprise')} style={{background:'white',border:'2px solid #eee',borderRadius:'20px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'260px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',transition:'all 0.2s'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#FF4D00';e.currentTarget.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='#eee';e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🏢</div>
            <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'8px',color:'#1A1A1A'}}>Entreprise & Conciergerie</div>
            <div style={{fontSize:'0.82rem',color:'#888',lineHeight:'1.6',marginBottom:'16px'}}>Hôtel, agence immobilière, cabinet médical, commerce, restaurant et plus encore</div>
            <div style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',padding:'8px 16px',borderRadius:'8px',fontSize:'0.8rem',fontWeight:'600'}}>Publier une urgence →</div>
          </div>

          {/* PRESTATAIRE */}
          <div onClick={()=>setRole('prestataire')} style={{background:'white',border:'2px solid #eee',borderRadius:'20px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'260px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',transition:'all 0.2s'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#FF4D00';e.currentTarget.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='#eee';e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🧹</div>
            <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'8px',color:'#1A1A1A'}}>Prestataire indépendant</div>
            <div style={{fontSize:'0.82rem',color:'#888',lineHeight:'1.6',marginBottom:'16px'}}>Trouvez des missions urgentes près de chez vous et augmentez vos revenus</div>
            <div style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',padding:'8px 16px',borderRadius:'8px',fontSize:'0.8rem',fontWeight:'600'}}>Voir les missions →</div>
          </div>
        </div>

        {/* COMMENT CA MARCHE */}
        <div style={{background:'white',borderRadius:'20px',padding:'32px',maxWidth:'700px',margin:'0 auto',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'24px',color:'#1A1A1A'}}>Comment ça marche ?</div>
          <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}>
              <div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>1</div>
              <div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Publiez</div>
              <div style={{fontSize:'0.78rem',color:'#888'}}>Décrivez votre besoin en 2 minutes</div>
            </div>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}>
              <div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>2</div>
              <div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Recevez</div>
              <div style={{fontSize:'0.78rem',color:'#888'}}>Les prestataires disponibles répondent</div>
            </div>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}>
              <div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>3</div>
              <div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Choisissez</div>
              <div style={{fontSize:'0.78rem',color:'#888'}}>Sélectionnez le meilleur prestataire</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'32px 24px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <button onClick={()=>setRole(null)} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'0.85rem',marginBottom:'24px'}}>← Retour</button>
        {role === 'entreprise' ? (
          <div>
            <h2 style={{fontWeight:'800',fontSize:'1.8rem',marginBottom:'8px'}}>Mes annonces urgentes</h2>
            <p style={{color:'#888',marginBottom:'24px'}}>Publiez une mission et trouvez un prestataire en minutes</p>
            <a href="/inscription" style={{display:'inline-block',background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontWeight:'700',fontSize:'1rem',textDecoration:'none',marginBottom:'32px'}}>+ Publier une urgence</a>
            <div style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>🏠 Appartement</div>
                  <div style={{fontWeight:'700',fontSize:'1.1rem'}}>Villa Marbella — Remise en état urgente</div>
                  <div style={{fontSize:'0.8rem',color:'#888',marginTop:'2px'}}>Conciergerie Azur · Cannes</div>
                </div>
                <span style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',border:'1px solid rgba(255,77,0,0.2)',padding:'4px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600'}}>🔴 Urgent</span>
              </div>
              <div style={{display:'flex',gap:'16px',fontSize:'0.82rem',color:'#555',marginBottom:'14px'}}>
                <span>📍 14 bd de la Croisette, Cannes</span>
                <span>🕐 Aujourd'hui avant 18h</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid #f0f0f0'}}>
                <span style={{fontWeight:'800',fontSize:'1.3rem'}}>95 €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                <span style={{fontSize:'0.75rem',color:'#FF4D00',fontWeight:'600'}}>⚡ il y a 12 min · 1 dispo</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{fontWeight:'800',fontSize:'1.8rem',marginBottom:'8px'}}>Missions disponibles</h2>
            <p style={{color:'#888',marginBottom:'24px'}}>3 annonces près de vous</p>
            <div style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>🏠 Appartement · Conciergerie Azur</div>
                  <div style={{fontWeight:'700',fontSize:'1.1rem'}}>Villa Marbella — Remise en état urgente</div>
                  <div style={{fontSize:'0.8rem',color:'#888',marginTop:'2px'}}>📍 2,3 km · Cannes</div>
                </div>
                <span style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',border:'1px solid rgba(255,77,0,0.2)',padding:'4px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600'}}>🔴 Urgent</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid #f0f0f0',marginBottom:'12px'}}>
                <span style={{fontWeight:'800',fontSize:'1.3rem'}}>95 €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                <span style={{fontSize:'0.75rem',color:'#FF4D00',fontWeight:'600'}}>⚡ il y a 12 min</span>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button style={{flex:1,padding:'11px',borderRadius:'10px',border:'2px solid #0CB86A',background:'rgba(12,184,106,0.08)',color:'#0CB86A',fontWeight:'700',cursor:'pointer',fontSize:'0.95rem'}}>✓ Disponible</button>
                <button style={{flex:1,padding:'11px',borderRadius:'10px',border:'2px solid #E8334A',background:'rgba(232,51,74,0.08)',color:'#E8334A',fontWeight:'700',cursor:'pointer',fontSize:'0.95rem'}}>✗ Pas disponible</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}