'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

export default function Inscription() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motdepasse, setMotdepasse] = useState('')
  const [siret, setSiret] = useState('')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setErreur('')
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: motdepasse,
        options: {
          data: {
            nom,
            role: role.toLowerCase(),
            siret: siret || null,
          }
        }
      })
    if (error) throw error

if (data.user) {
  const { error: profileError } = await supabase.from('profiles').insert({
    id: data.user.id,
    role: role.toLowerCase(),
    nom,
    siret: siret || null,
  })
  if (profileError) throw profileError
}

router.push('/connexion')
    } catch (err: unknown) {
      if (err instanceof Error) setErreur(err.message)
      else setErreur('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'40px',width:'100%',maxWidth:'500px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        
        <a href="/" style={{fontSize:'0.82rem',color:'#888',textDecoration:'none',display:'block',marginBottom:'24px'}}>← Retour</a>
        <h1 style={{fontWeight:'900',fontSize:'1.8rem',marginBottom:'4px'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
        <p style={{color:'#888',fontSize:'0.9rem',marginBottom:'28px'}}>Créez votre compte gratuitement</p>

        {erreur && <div style={{background:'rgba(232,51,74,0.1)',color:'#E8334A',padding:'12px',borderRadius:'10px',marginBottom:'16px',fontSize:'0.85rem'}}>{erreur}</div>}

        {step === 1 && (
          <>
            <div style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px'}}>Je suis...</div>
            <div style={{display:'flex',gap:'10px',marginBottom:'24px'}}>
              <div onClick={()=>setRole('Entreprise')} style={{flex:1,padding:'16px',borderRadius:'12px',border:`2px solid ${role==='Entreprise'?'#FF4D00':'#eee'}`,background:role==='Entreprise'?'rgba(255,77,0,0.05)':'white',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontSize:'1.8rem',marginBottom:'6px'}}>🏢</div>
                <div style={{fontWeight:'700',fontSize:'0.85rem'}}>Entreprise</div>
                <div style={{fontSize:'0.72rem',color:'#888',marginTop:'3px'}}>Conciergerie, hôtel, agence...</div>
              </div>
              <div onClick={()=>setRole('Prestataire')} style={{flex:1,padding:'16px',borderRadius:'12px',border:`2px solid ${role==='Prestataire'?'#FF4D00':'#eee'}`,background:role==='Prestataire'?'rgba(255,77,0,0.05)':'white',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontSize:'1.8rem',marginBottom:'6px'}}>🧹</div>
                <div style={{fontWeight:'700',fontSize:'0.85rem'}}>Prestataire</div>
                <div style={{fontSize:'0.72rem',color:'#888',marginTop:'3px'}}>Indépendant, auto-entrepreneur...</div>
              </div>
            </div>
            <button onClick={()=>role && setStep(2)} style={{width:'100%',padding:'14px',background:role?'#FF4D00':'#ddd',color:'white',border:'none',borderRadius:'12px',fontWeight:'700',fontSize:'1rem',cursor:role?'pointer':'not-allowed'}}>
              Continuer →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
              <div style={{width:'28px',height:'28px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.8rem'}}>2</div>
              <span style={{fontSize:'0.85rem',color:'#555',fontWeight:'600'}}>Informations de compte</span>
            </div>
            <div style={{marginBottom:'14px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>{role==='Entreprise'?'Nom de la société':'Prénom et nom'}</label>
              <input value={nom} onChange={e=>setNom(e.target.value)} placeholder={role==='Entreprise'?'Ex: Conciergerie Azur':'Ex: Sophie Bertrand'} style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:'14px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Email professionnel</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="votre@email.com" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:'20px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Mot de passe</label>
              <input value={motdepasse} onChange={e=>setMotdepasse(e.target.value)} type="password" placeholder="Minimum 6 caractères" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setStep(1)} style={{flex:1,padding:'12px',background:'none',border:'1.5px solid #eee',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer'}}>← Retour</button>
              <button onClick={()=>setStep(role==='Prestataire'?3:4)} style={{flex:2,padding:'12px',background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',cursor:'pointer'}}>Continuer →</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'20px'}}>
              <div style={{width:'28px',height:'28px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.8rem'}}>3</div>
              <span style={{fontSize:'0.85rem',color:'#555',fontWeight:'600'}}>Documents professionnels</span>
            </div>
            <div style={{background:'rgba(255,77,0,0.05)',border:'1px solid rgba(255,77,0,0.15)',borderRadius:'10px',padding:'12px 14px',marginBottom:'20px',fontSize:'0.82rem',color:'#FF4D00'}}>
              ℹ️ Ces documents garantissent la confiance sur la plateforme
            </div>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Numéro SIRET</label>
              <input value={siret} onChange={e=>setSiret(e.target.value)} placeholder="Ex: 123 456 789 00012" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Attestation de vigilance Urssaf</label>
              <div style={{border:'2px dashed #ddd',borderRadius:'10px',padding:'20px',textAlign:'center',cursor:'pointer',background:'#FAFAF7'}} onClick={()=>document.getElementById('upload-attestation')!.click()}>
                <div style={{fontSize:'1.5rem',marginBottom:'6px'}}>📄</div>
                <div style={{fontSize:'0.85rem',fontWeight:'600',color:'#555'}}>Cliquez pour uploader</div>
                <div style={{fontSize:'0.75rem',color:'#888',marginTop:'3px'}}>PDF · Max 5 Mo</div>
              </div>
              <input id="upload-attestation" type="file" accept=".pdf" style={{display:'none'}} onChange={e=>e.target.files?.[0] && alert(`✅ "${e.target.files[0].name}" sélectionné`)}/>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setStep(2)} style={{flex:1,padding:'12px',background:'none',border:'1.5px solid #eee',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer'}}>← Retour</button>
              <button onClick={()=>setStep(4)} style={{flex:2,padding:'12px',background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',cursor:'pointer'}}>Continuer →</button>
            </div>
          </>
        )}

        {step === 4 && (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={{fontSize:'3rem',marginBottom:'16px'}}>🎉</div>
            <div style={{fontWeight:'800',fontSize:'1.3rem',marginBottom:'8px'}}>Presque terminé !</div>
            <div style={{color:'#888',fontSize:'0.88rem',lineHeight:'1.6',marginBottom:'24px'}}>
              Votre compte <strong>{role}</strong> pour <strong>{nom}</strong> est prêt.
            </div>
            <div style={{background:'#FAFAF7',borderRadius:'12px',padding:'16px',textAlign:'left',marginBottom:'24px'}}>
              <div style={{fontSize:'0.78rem',color:'#888',marginBottom:'6px'}}>📧 {email}</div>
              {siret && <div style={{fontSize:'0.78rem',color:'#888',marginBottom:'6px'}}>🏢 SIRET : {siret}</div>}
            </div>
            <button onClick={handleSubmit} disabled={loading} style={{width:'100%',padding:'14px',background:loading?'#ddd':'#FF4D00',color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'1rem',cursor:loading?'not-allowed':'pointer',marginBottom:'12px'}}>
              {loading ? '⏳ Création en cours...' : '✅ Créer mon compte'}
            </button>
            <button onClick={()=>setStep(role==='Prestataire'?3:2)} style={{width:'100%',padding:'12px',background:'none',border:'1.5px solid #eee',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',fontSize:'0.9rem'}}>
              ← Modifier mes informations
            </button>
          </div>
        )}

        {step < 4 && (
          <p style={{textAlign:'center',fontSize:'0.82rem',color:'#888',marginTop:'16px'}}>
            Déjà un compte ? <a href="/connexion" style={{color:'#FF4D00',fontWeight:'600',textDecoration:'none'}}>Se connecter</a>
          </p>
        )}
      </div>
    </div>
  )
}