'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const VERT_MEDIUM = '#2ECC71'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

export default function Profil() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [role, setRole] = useState('')

  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [ville, setVille] = useState('')
  const [siret, setSiret] = useState('')
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/connexion'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setRole(profile.role || '')
        setNom(profile.nom || '')
        setTelephone(profile.telephone || '')
        setVille(profile.ville || '')
        setSiret(profile.siret || '')
        setDescription(profile.description || '')
        setPhotoUrl(profile.photo_url || '')
      }
      setLoading(false)
    }
    load()
  }, [])

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      const ext = file.name.split('.').pop()
      const path = `${user.id}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true })
      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(path)

      setPhotoUrl(publicUrlData.publicUrl)
    } catch (err: unknown) {
      if (err instanceof Error) setMessage('❌ ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      const { error } = await supabase
        .from('profiles')
        .update({
          nom, telephone, ville, siret, description,
          photo_url: photoUrl,
        })
        .eq('id', user.id)

      if (error) throw error
      setMessage('✅ Profil mis à jour avec succès')
    } catch (err: unknown) {
      if (err instanceof Error) setMessage('❌ ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:GRIS,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🌿</div>
        <div style={{color:'#888',fontWeight:'600'}}>Chargement...</div>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:GRIS,fontFamily:'sans-serif'}}>

      {/* NAVBAR */}
      <div style={{background:'white',borderBottom:'1px solid #E8F0E8',padding:'0 clamp(16px,5vw,32px)',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(26,122,74,0.06)'}}>
        <div style={{fontWeight:'900',fontSize:'1.3rem',color:TEXTE}}>Clean<span style={{color:VERT}}>Urgence</span></div>
        <button onClick={()=>router.push('/dashboard')} style={{background:'none',border:`1.5px solid #ddd`,borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'0.82rem',color:'#555',fontFamily:'sans-serif',fontWeight:'600'}}>
          ← Retour au dashboard
        </button>
      </div>

      <div style={{maxWidth:'640px',margin:'0 auto',padding:'clamp(24px,5vw,40px) clamp(16px,5vw,24px)'}}>

        <h1 style={{fontWeight:'800',fontSize:'clamp(1.4rem,4vw,1.7rem)',color:TEXTE,marginBottom:'6px'}}>Mon profil</h1>
        <p style={{color:'#888',fontSize:'0.88rem',marginBottom:'28px'}}>
          {role === 'entreprise' ? "Gérez les informations de votre entreprise" : "Gérez vos informations de prestataire"}
        </p>

        <div style={{background:'white',borderRadius:'20px',padding:'clamp(20px,5vw,32px)',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',border:'1px solid #E8F0E8'}}>

          {/* Photo */}
          <div style={{display:'flex',alignItems:'center',gap:'20px',marginBottom:'28px',flexWrap:'wrap'}}>
            <div
              onClick={()=>fileInputRef.current?.click()}
              style={{
                width:'84px',height:'84px',borderRadius:'50%',
                background: photoUrl ? `url(${photoUrl})` : `linear-gradient(135deg, ${VERT}, ${VERT_MEDIUM})`,
                backgroundSize:'cover',backgroundPosition:'center',
                display:'flex',alignItems:'center',justifyContent:'center',
                color:'white',fontWeight:'800',fontSize:'1.5rem',
                cursor:'pointer',flexShrink:0,border:'3px solid white',boxShadow:'0 2px 10px rgba(26,122,74,0.2)'
              }}>
              {!photoUrl && nom.substring(0,2).toUpperCase()}
            </div>
            <div>
              <button
                onClick={()=>fileInputRef.current?.click()}
                disabled={uploading}
                style={{background:VERT_LIGHT,color:VERT,border:'none',borderRadius:'8px',padding:'9px 16px',fontWeight:'700',fontSize:'0.82rem',cursor:'pointer',fontFamily:'sans-serif'}}>
                {uploading ? '⏳ Envoi...' : '📷 Changer la photo'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{display:'none'}} />
              <div style={{fontSize:'0.72rem',color:'#aaa',marginTop:'6px'}}>JPG, PNG · 5 Mo max</div>
            </div>
          </div>

          {message && (
            <div style={{
              background: message.startsWith('✅') ? 'rgba(46,204,113,0.1)' : 'rgba(232,51,74,0.08)',
              color: message.startsWith('✅') ? VERT : '#E8334A',
              padding:'12px',borderRadius:'10px',marginBottom:'20px',fontSize:'0.85rem',fontWeight:'600'
            }}>
              {message}
            </div>
          )}

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>
              {role === 'entreprise' ? "Nom de l'entreprise" : "Nom complet"}
            </label>
            <input value={nom} onChange={e=>setNom(e.target.value)} style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'16px'}}>
            <div>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Téléphone</label>
              <input value={telephone} onChange={e=>setTelephone(e.target.value)} placeholder="06 12 34 56 78" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
            <div>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Ville</label>
              <input value={ville} onChange={e=>setVille(e.target.value)} placeholder="Cannes" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>
          </div>

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>SIRET</label>
            <input value={siret} onChange={e=>setSiret(e.target.value)} placeholder="123 456 789 00012" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
          </div>

          <div style={{marginBottom:'28px'}}>
            <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Description</label>
            <textarea
              value={description}
              onChange={e=>setDescription(e.target.value)}
              placeholder={role === 'entreprise' ? "Présentez votre entreprise en quelques mots..." : "Présentez votre expérience, vos spécialités..."}
              style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',minHeight:'100px',resize:'vertical',boxSizing:'border-box'}}/>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{width:'100%',padding:'14px',background:saving?'#ccc':VERT,color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',fontSize:'0.92rem',cursor:saving?'not-allowed':'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
            {saving ? '⏳ Enregistrement...' : '💾 Enregistrer les modifications'}
          </button>

        </div>
      </div>
    </div>
  )
}