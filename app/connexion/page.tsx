'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

export default function Connexion() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [motdepasse, setMotdepasse] = useState('')
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

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
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{background:'white',borderRadius:'20px',padding:'40px',width:'100%',maxWidth:'440px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>

        <a href="/" style={{fontSize:'0.82rem',color:'#888',textDecoration:'none',display:'block',marginBottom:'24px'}}>← Retour</a>
        <h1 style={{fontWeight:'900',fontSize:'1.8rem',marginBottom:'4px'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
        <p style={{color:'#888',fontSize:'0.9rem',marginBottom:'28px'}}>Connectez-vous à votre compte</p>

        {erreur && (
          <div style={{background:'rgba(232,51,74,0.1)',color:'#E8334A',padding:'12px',borderRadius:'10px',marginBottom:'16px',fontSize:'0.85rem'}}>
            {erreur}
          </div>
        )}

        <div style={{marginBottom:'14px'}}>
          <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="votre@email.com"
            style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}
          />
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Mot de passe</label>
          <input
            value={motdepasse}
            onChange={e => setMotdepasse(e.target.value)}
            type="password"
            placeholder="Votre mot de passe"
            style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}
          />
        </div>

        <button
          onClick={handleConnexion}
          disabled={loading}
          style={{width:'100%',padding:'14px',background:loading?'#ddd':'#FF4D00',color:'white',border:'none',borderRadius:'12px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'1rem',cursor:loading?'not-allowed':'pointer',marginBottom:'12px'}}
        >
          {loading ? '⏳ Connexion...' : 'Se connecter'}
        </button>

        <p style={{textAlign:'center',fontSize:'0.82rem',color:'#888',marginTop:'16px'}}>
          Pas encore de compte ? <a href="/inscription" style={{color:'#FF4D00',fontWeight:'600',textDecoration:'none'}}>S'inscrire gratuitement</a>
        </p>

      </div>
    </div>
  )
}