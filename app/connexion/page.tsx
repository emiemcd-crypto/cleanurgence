'use client'
import { useState } from 'react'

export default function Home() {
  const [role, setRole] = useState(null)

  if (!role) return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif',padding:'20px'}}>
      <div style={{fontSize:'0.75rem',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#FF4D00',background:'rgba(255,77,0,0.08)',border:'1px solid rgba(255,77,0,0.2)',padding:'5px 14px',borderRadius:'30px',marginBottom:'20px'}}>⚡ Plateforme d'urgence</div>
      <h1 style={{fontFamily:'sans-serif',fontWeight:'900',fontSize:'3rem',color:'#1A1A1A',marginBottom:'8px',letterSpacing:'-0.02em'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
      <p style={{color:'#888',marginBottom:'32px',fontSize:'0.95rem'}}>Trouvez un prestataire disponible · Immédiatement</p>

      <div style={{display:'flex',gap:'10px',marginBottom:'40px'}}>
        <a href="/inscription" style={{padding:'11px 24px',background:'#FF4D00',color:'white',borderRadius:'10px',textDecoration:'none',fontWeight:'700',fontSize:'0.9rem'}}>S'inscrire gratuitement</a>
        <a href="/connexion" style={{padding:'11px 24px',background:'white',color:'#FF4D00',border:'2px solid #FF4D00',borderRadius:'10px',textDecoration:'none',fontWeight:'700',fontSize:'0.9rem'}}>Se connecter</a>
      </div>

      <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center'}}>
        <div onClick={()=>setRole('conciergerie')} style={{background:'white',border:'2px solid #eee',borderRadius:'16px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'220px'}} onMouseOver={e=>e.currentTarget.style.borderColor='#FF4D00'} onMouseOut={e=>e.currentTarget.style.borderColor='#eee'}>
          <div style={{fontSize:'3rem',marginBottom:'12px'}}>🏢</div>
          <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'6px'}}>Conciergerie</div>
          <div style={{fontSize:'0.8rem',color:'#888',lineHeight:'1.5'}}>Publiez une annonce et trouvez un prestataire en minutes</div>
        </div>
        <div onClick={()=>setRole('prestataire')} style={{background:'white',border:'2px solid #eee',borderRadius:'16px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'220px'}} onMouseOver={e=>e.currentTarget.style.borderColor='#FF4D00'} onMouseOut={e=>e.currentTarget.style.borderColor='#eee'}>
          <div style={{fontSize:'3rem',marginBottom:'12px'}}>🧹</div>
          <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'6px'}}>Prestataire</div>
          <div style={{fontSize:'0.8rem',color:'#888',lineHeight:'1.5'}}>Consultez les missions et indiquez votre disponibilité</div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'32px 24px'}}>
      <div style={{maxWidth:'800px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px'}}>
          <h1 style={{fontWeight:'900',fontSize:'1.6rem',color:'#1A1A1A'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
          <div style={{display:'flex',gap:'10px'}}>
            <a href="/inscription" style={{padding:'8px 16px',background:'#FF4D00',color:'white',borderRadius:'8px',textDecoration:'none',fontWeight:'600',fontSize:'0.82rem'}}>S'inscrire</a>
            <button onClick={()=>setRole(null)} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'0.85rem'}}>← Retour</button>
          </div>
        </div>
        {role === 'conciergerie' ? (
          <div>
            <h2 style={{fontWeight:'800',fontSize:'1.8rem',marginBottom:'8px'}}>Mes annonces</h2>
            <p style={{color:'#888',marginBottom:'24px'}}>Publiez une mission urgente</p>
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