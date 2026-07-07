'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

export default function Connexion() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motdepasse, setMotdepasse] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/dashboard')
    }
    checkUser()
  }, [])

  const handleConnexion = async () => {
    setLoading(true)
    setErreur('')
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: motdepasse,
      })
      if (error) throw error
      router.push('/dashboard')
    } catch (err: unknown) {
      if (err instanceof Error) setErreur(err.message)
      else setErreur('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh',background:GRIS,fontFamily:'sans-serif',display:'flex',flexDirection:'column'}}>
      
      {/* Navbar */}
      <nav style={{background:'white',borderBottom:'1px solid #E8F0E8',padding:'0 40px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 1px 8px rgba(26,122,74,0.06)'}}>
        <a href="/" style={{fontWeight:'900',fontSize:'1.5rem',textDecoration:'none',color:TEXTE}}>
          Clean<span style={{color:VERT}}>Urgence</span>
        </a>
        <a href="/inscription" style={{padding:'9px 20px',background:VERT,color:'white',textDecoration:'none',fontWeight:'700',fontSize:'0.88rem',borderRadius:'10px'}}>
          S'inscrire gratuitement
        </a>
      </nav>

      {/* Formulaire */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
        <div style={{background:'white',borderRadius:'24px',padding:'48px 40px',width:'100%',maxWidth:'440px',boxShadow:'0 4px 24px rgba(26,122,74,0.08)',border:'1px solid #E8F0E8'}}>
          
          <div style={{width:'56px',height:'56px',background:VERT_LIGHT,borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem',marginBottom:'24px'}}>🔐</div>
          
          <h1 style={{fontWeight:'900',fontSize:'1.8rem',marginBottom:'4px',color:TEXTE}}>
            Clean<span style={{color:VERT}}>Urgence</span>
          </h1>
          <p style={{color:'#888',fontSize:'0.9rem',marginBottom:'32px'}}>Connectez-vous à votre compte</p>

          {erreur && (
            <div style={{background:'rgba(232,51,74,0.08)',color:'#E8334A',padding:'12px 16px',borderRadius:'10px',marginBottom:'20px',fontSize:'0.85rem',fontWeight:'600'}}>
              ⚠️ {erreur}
            </div>
          )}

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'8px'}}>Email</label>
            <input
              value={email}
              onChange={e=>setEmail(e.target.value)}
              type="email"
              placeholder="votre@email.com"
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #E8F0E8',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',background:GRIS}}
            />
          </div>

          <div style={{marginBottom:'28px'}}>
            <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'8px'}}>Mot de passe</label>
            <input
              value={motdepasse}
              onChange={e=>setMotdepasse(e.target.value)}
              type="password"
              placeholder="Votre mot de passe"
              style={{width:'100%',padding:'13px 16px',borderRadius:'10px',border:'1.5px solid #E8F0E8',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box',background:GRIS}}
            />
          </div>

          <button
            onClick={handleConnexion}
            disabled={loading}
            style={{width:'100%',padding:'14px',background:loading?'#ccc':VERT,color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'1rem',cursor:loading?'not-allowed':'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)',marginBottom:'20px'}}
          >
            {loading ? '⏳ Connexion...' : 'Se connecter →'}
          </button>

          <p style={{textAlign:'center',fontSize:'0.85rem',color:'#888'}}>
            Pas encore de compte ?{' '}
            <a href="/inscription" style={{color:VERT,fontWeight:'700',textDecoration:'none'}}>S'inscrire gratuitement</a>
          </p>

        </div>
      </div>
    </div>
  )
}
