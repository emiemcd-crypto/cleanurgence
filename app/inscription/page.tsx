'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

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

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/dashboard')
    }
    checkUser()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    setErreur('')
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: motdepasse,
        options: {
          data: { nom, role: role.toLowerCase(), siret: siret || null }
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

  const inputStyle = {width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #E8F0E8',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box' as const,background:GRIS}
  const labelStyle = {fontSize:'0.75rem',fontWeight:'700' as const,color:'#555',textTransform:'uppercase' as const,letterSpacing:'0.06em',display:'block' as const,marginBottom:'8px'}

  return (
    <div style={{minHeight:'100vh',background:GRIS,fontFamily:'sans-serif',display:'flex',flexDirection:'column' as const}}>

      {/* Navbar */}
      <nav style={{background:'white',borderBottom:'1px solid #E8F0E8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(26,122,74,0.06)'}}>
        <a href="/" style={{fontWeight:'900',fontSize:'1.5rem',textDecoration:'none',color:TEXTE}}>
          Clean<span style={{color:VERT}}>Urgence</span>
        </a>
        <a href="/connexion" style={{padding:'9px 20px',color:VERT,textDecoration:'none',fontWeight:'700',fontSize:'0.88rem',borderRadius:'10px',border:`1.5px solid ${VERT}`}}>
          Se connecter
        </a>
      </nav>

      {/* Formulaire */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{background:'white',borderRadius:'24px',padding:'48px 40px',width:'100%',maxWidth:'520px',boxShadow:'0 4px 24px rgba(26,122,74,0.08)',border:'1px solid #E8F0E8'}}>

          <h1 style={{fontWeight:'900',fontSize:'1.8rem',marginBottom:'4px',color:TEXTE}}>
            Clean<span style={{color:VERT}}>Urgence</span>
          </h1>
          <p style={{color:'#888',fontSize:'0.9rem',marginBottom:'32px'}}>Créez votre compte gratuitement</p>

          {/* Étapes */}
          <div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
            {[1,2,role==='Prestataire'?3:null,4].filter(Boolean).map((s,i)=>(
              <div key={i} style={{flex:1,height:'4px',borderRadius:'4px',background:step>=Number(s)?VERT:'#E8F0E8'}}/>
            ))}
          </div>

          {erreur && (
            <div style={{background:'rgba(232,51,74,0.08)',color:'#E8334A',padding:'12px 16px',borderRadius:'10px',marginBottom:'20px',fontSize:'0.85rem',fontWeight:'600'}}>
              ⚠️ {erreur}
            </div>
          )}

          {step === 1 && (
            <>
              <div style={{fontSize:'0.85rem',fontWeight:'700',color:'#555',marginBottom:'16px'}}>Je suis...</div>
              <div style={{display:'flex',gap:'12px',marginBottom:'28px'}}>
                <div onClick={()=>setRole('Entreprise')} style={{flex:1,padding:'20px 16px',borderRadius:'16px',border:`2px solid ${role==='Entreprise'?VERT:'#E8F0E8'}`,background:role==='Entreprise'?VERT_LIGHT:'white',cursor:'pointer',textAlign:'center' as const,transition:'all 0.2s'}}>
                  <div style={{fontSize:'2rem',marginBottom:'8px'}}>🏢</div>
                  <div style={{fontWeight:'700',fontSize:'0.9rem',color:TEXTE}}>Entreprise</div>
                  <div style={{fontSize:'0.72rem',color:'#888',marginTop:'4px'}}>Conciergerie, hôtel, agence...</div>
                </div>
                <div onClick={()=>setRole('Prestataire')} style={{flex:1,padding:'20px 16px',borderRadius:'16px',border:`2px solid ${role==='Prestataire'?VERT:'#E8F0E8'}`,background:role==='Prestataire'?VERT_LIGHT:'white',cursor:'pointer',textAlign:'center' as const,transition:'all 0.2s'}}>
                  <div style={{fontSize:'2rem',marginBottom:'8px'}}>🧹</div>
                  <div style={{fontWeight:'700',fontSize:'0.9rem',color:TEXTE}}>Prestataire</div>
                  <div style={{fontSize:'0.72rem',color:'#888',marginTop:'4px'}}>Indépendant, auto-entrepreneur...</div>
                </div>
              </div>
              <button onClick={()=>role && setStep(2)} style={{width:'100%',padding:'14px',background:role?VERT:'#ddd',color:'white',border:'none',borderRadius:'12px',fontWeight:'700',fontSize:'1rem',cursor:role?'pointer':'not-allowed',fontFamily:'sans-serif'}}>
                Continuer →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}>
                <div style={{width:'32px',height:'32px',background:VERT,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.85rem'}}>2</div>
                <span style={{fontSize:'0.9rem',color:TEXTE,fontWeight:'700'}}>Informations de compte</span>
              </div>
              <div style={{marginBottom:'16px'}}>
                <label style={labelStyle}>{role==='Entreprise'?'Nom de la société':'Prénom et nom'}</label>
                <input value={nom} onChange={e=>setNom(e.target.value)} placeholder={role==='Entreprise'?'Ex: Conciergerie Azur':'Ex: Sophie Bertrand'} style={inputStyle}/>
              </div>
              <div style={{marginBottom:'16px'}}>
                <label style={labelStyle}>Email professionnel</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="votre@email.com" style={inputStyle}/>
              </div>
              <div style={{marginBottom:'24px'}}>
                <label style={labelStyle}>Mot de passe</label>
                <input value={motdepasse} onChange={e=>setMotdepasse(e.target.value)} type="password" placeholder="Minimum 6 caractères" style={inputStyle}/>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(1)} style={{flex:1,padding:'13px',background:'none',border:'1.5px solid #E8F0E8',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',color:'#888'}}>← Retour</button>
                <button onClick={()=>setStep(role==='Prestataire'?3:4)} style={{flex:2,padding:'13px',background:VERT,color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>Continuer →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}>
                <div style={{width:'32px',height:'32px',background:VERT,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.85rem'}}>3</div>
                <span style={{fontSize:'0.9rem',color:TEXTE,fontWeight:'700'}}>Documents professionnels</span>
              </div>
              <div style={{background:VERT_LIGHT,border:`1px solid ${VERT}22`,borderRadius:'10px',padding:'12px 16px',marginBottom:'20px',fontSize:'0.82rem',color:VERT,fontWeight:'600'}}>
                ℹ️ Ces documents garantissent la confiance sur la plateforme
              </div>
              <div style={{marginBottom:'16px'}}>
                <label style={labelStyle}>Numéro SIRET</label>
                <input value={siret} onChange={e=>setSiret(e.target.value)} placeholder="Ex: 123 456 789 00012" style={inputStyle}/>
              </div>
              <div style={{marginBottom:'24px'}}>
                <label style={labelStyle}>Attestation de vigilance Urssaf</label>
                <div style={{border:'2px dashed #E8F0E8',borderRadius:'12px',padding:'24px',textAlign:'center' as const,cursor:'pointer',background:GRIS}} onClick={()=>document.getElementById('upload-attestation')!.click()}>
                  <div style={{fontSize:'1.5rem',marginBottom:'6px'}}>📄</div>
                  <div style={{fontSize:'0.85rem',fontWeight:'600',color:'#555'}}>Cliquez pour uploader</div>
                  <div style={{fontSize:'0.75rem',color:'#888',marginTop:'3px'}}>PDF · Max 5 Mo</div>
                </div>
                <input id="upload-attestation" type="file" accept=".pdf" style={{display:'none'}} onChange={e=>e.target.files?.[0] && alert(`✅ "${e.target.files[0].name}" sélectionné`)}/>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setStep(2)} style={{flex:1,padding:'13px',background:'none',border:'1.5px solid #E8F0E8',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',color:'#888'}}>← Retour</button>
                <button onClick={()=>setStep(4)} style={{flex:2,padding:'13px',background:VERT,color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>Continuer →</button>
              </div>
            </>
          )}

          {step === 4 && (
            <div style={{textAlign:'center' as const}}>
              <div style={{fontSize:'3rem',marginBottom:'16px'}}>🎉</div>
              <div style={{fontWeight:'800',fontSize:'1.3rem',marginBottom:'8px',color:TEXTE}}>Presque terminé !</div>
              <div style={{color:'#888',fontSize:'0.88rem',lineHeight:'1.6',marginBottom:'24px'}}>
                Votre compte <strong style={{color:VERT}}>{role}</strong> pour <strong>{nom}</strong> est prêt.
              </div>
              <div style={{background:GRIS,borderRadius:'12px',padding:'16px',textAlign:'left' as const,marginBottom:'24px',border:'1px solid #E8F0E8'}}>
                <div style={{fontSize:'0.82rem',color:'#888',marginBottom:'6px'}}>📧 {email}</div>
                {siret && <div style={{fontSize:'0.82rem',color:'#888'}}>🏢 SIRET : {siret}</div>}
              </div>
              <button onClick={handleSubmit} disabled={loading} style={{width:'100%',padding:'14px',background:loading?'#ccc':VERT,color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'1rem',cursor:loading?'not-allowed':'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)',marginBottom:'12px'}}>
                {loading ? '⏳ Création en cours...' : '✅ Créer mon compte'}
              </button>
              <button onClick={()=>setStep(role==='Prestataire'?3:2)} style={{width:'100%',padding:'12px',background:'none',border:'1.5px solid #E8F0E8',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',fontSize:'0.9rem',color:'#888'}}>
                ← Modifier mes informations
              </button>
            </div>
          )}

          {step < 4 && (
            <p style={{textAlign:'center' as const,fontSize:'0.85rem',color:'#888',marginTop:'20px'}}>
              Déjà un compte ?{' '}
              <a href="/connexion" style={{color:VERT,fontWeight:'700',textDecoration:'none'}}>Se connecter</a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
