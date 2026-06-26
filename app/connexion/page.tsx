'use client'
import { useState } from 'react'

export default function Inscription() {
  const [role, setRole] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motdepasse, setMotdepasse] = useState('')
  const [confirme, setConfirme] = useState(false)

  const handleSubmit = () => {
    if (!role || !nom || !email || !motdepasse) {
      alert('Veuillez remplir tous les champs')
      return
    }
    alert(`Compte ${role} créé pour ${nom} ! (base de données à connecter)`)
  }

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'40px',width:'100%',maxWidth:'460px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <a href="/" style={{fontSize:'0.82rem',color:'#888',textDecoration:'none',display:'block',marginBottom:'24px'}}>← Retour</a>
        <h1 style={{fontWeight:'900',fontSize:'1.8rem',marginBottom:'4px'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
        <p style={{color:'#888',fontSize:'0.9rem',marginBottom:'28px'}}>Créez votre compte gratuitement</p>

        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px'}}>Je suis...</div>
          <div style={{display:'flex',gap:'10px'}}>
            <div onClick={()=>setRole('Conciergerie')} style={{flex:1,padding:'14px',borderRadius:'12px',border:`2px solid ${role==='Conciergerie'?'#FF4D00':'#eee'}`,background:role==='Conciergerie'?'rgba(255,77,0,0.05)':'white',cursor:'pointer',textAlign:'center',transition:'all 0.2s'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'4px'}}>🏢</div>
              <div style={{fontWeight:'600',fontSize:'0.85rem'}}>Conciergerie</div>
            </div>
            <div onClick={()=>setRole('Prestataire')} style={{flex:1,padding:'14px',borderRadius:'12px',border:`2px solid ${role==='Prestataire'?'#FF4D00':'#eee'}`,background:role==='Prestataire'?'rgba(255,77,0,0.05)':'white',cursor:'pointer',textAlign:'center',transition:'all 0.2s'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'4px'}}>🧹</div>
              <div style={{fontWeight:'600',fontSize:'0.85rem'}}>Prestataire</div>
            </div>
          </div>
        </div>

        <div style={{marginBottom:'14px'}}>
          <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>
            {role==='Conciergerie'?'Nom de la société':'Prénom et nom'}
          </label>
          <input value={nom} onChange={e=>setNom(e.target.value)} placeholder={role==='Conciergerie'?'Ex: Conciergerie Azur':'Ex: Sophie Bertrand'} style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}} onFocus={e=>e.target.style.borderColor='#FF4D00'} onBlur={e=>e.target.style.borderColor='#eee'}/>
        </div>

        <div style={{marginBottom:'14px'}}>
          <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="votre@email.com" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}} onFocus={e=>e.target.style.borderColor='#FF4D00'} onBlur={e=>e.target.style.borderColor='#eee'}/>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Mot de passe</label>
          <input value={motdepasse} onChange={e=>setMotdepasse(e.target.value)} type="password" placeholder="Minimum 8 caractères" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}} onFocus={e=>e.target.style.borderColor='#FF4D00'} onBlur={e=>e.target.style.borderColor='#eee'}/>
        </div>

        <button onClick={handleSubmit} style={{width:'100%',padding:'14px',background:'#FF4D00',color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'1rem',cursor:'pointer',marginBottom:'16px'}}>
          Créer mon compte {role && `— ${role}`}
        </button>

        <p style={{textAlign:'center',fontSize:'0.85rem',color:'#888'}}>
          Déjà un compte ? <a href="/connexion" style={{color:'#FF4D00',fontWeight:'600',textDecoration:'none'}}>Se connecter</a>
        </p>
      </div>
    </div>
  )
}