'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

export default function Dashboard() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [nom, setNom] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [dispos, setDispos] = useState<{[key: string]: string}>({})
  const [annonces, setAnnonces] = useState<any[]>([])

  const [titre, setTitre] = useState('')
  const [typeLieu, setTypeLieu] = useState('🏠 Appartement / Villa')
  const [adresse, setAdresse] = useState('')
  const [deadline, setDeadline] = useState('')
  const [remuneration, setRemuneration] = useState('')
  const [description, setDescription] = useState('')
  const [publishLoading, setPublishLoading] = useState(false)
  const [publishErreur, setPublishErreur] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/connexion'); return }
      setNom(user.user_metadata?.nom || 'Utilisateur')
      setRole(user.user_metadata?.role || '')
      setUserId(user.id)
      setLoading(false)
    }
    getUser()
  }, [])

  useEffect(() => {
    if (!userId || !role) return
    const fetchAnnonces = async () => {
      if (role === 'entreprise') {
        const { data, error } = await supabase
          .from('annonces')
          .select('*')
          .eq('entreprise_id', userId)
          .order('created_at', { ascending: false })
        if (!error && data) setAnnonces(data)
      } else if (role === 'prestataire') {
        const { data, error } = await supabase
          .from('annonces')
          .select('*')
          .order('created_at', { ascending: false })
        if (!error && data) setAnnonces(data)
      }
    }
    fetchAnnonces()
  }, [userId, role])

  const handleDeconnexion = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handlePublier = async () => {
    setPublishLoading(true)
    setPublishErreur('')
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Utilisateur non connecté')

      const { error } = await supabase.from('annonces').insert({
        entreprise_id: user.id,
        titre,
        type_lieu: typeLieu,
        adresse,
        remuneration: parseInt(remuneration),
        deadline,
        description,
        statut: 'en_attente',
      })
      if (error) throw error

      const { data } = await supabase
        .from('annonces')
        .select('*')
        .eq('entreprise_id', user.id)
        .order('created_at', { ascending: false })
      if (data) setAnnonces(data)

      setShowForm(false)
      setTitre(''); setAdresse(''); setDeadline(''); setRemuneration(''); setDescription('')
      alert('✅ Annonce publiée avec succès !')
    } catch (err: unknown) {
      if (err instanceof Error) setPublishErreur(err.message)
      else setPublishErreur('Une erreur est survenue')
    } finally {
      setPublishLoading(false)
    }
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'2rem',marginBottom:'12px'}}>⏳</div>
        <div style={{color:'#888'}}>Chargement...</div>
      </div>
    </div>
  )

  const Navbar = () => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'28px'}}>
      <h1 style={{fontWeight:'900',fontSize:'1.5rem'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <span style={{fontSize:'0.85rem',color:'#555',fontWeight:'600'}}>👋 {nom}</span>
        <button onClick={handleDeconnexion} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'7px 14px',cursor:'pointer',fontSize:'0.82rem',color:'#888'}}>Déconnexion</button>
      </div>
    </div>
  )

  // ── DASHBOARD ENTREPRISE ──
  if (role === 'entreprise') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'24px'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <Navbar />
        {!showForm ? (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div>
                <h2 style={{fontWeight:'800',fontSize:'1.8rem',marginBottom:'4px'}}>Mes annonces</h2>
                <p style={{color:'#888',fontSize:'0.85rem'}}>{annonces.length} annonce{annonces.length > 1 ? 's' : ''} publiée{annonces.length > 1 ? 's' : ''}</p>
              </div>
              <button onClick={()=>setShowForm(true)} style={{background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',padding:'12px 22px',fontWeight:'700',fontSize:'0.9rem',cursor:'pointer'}}>+ Nouvelle urgence</button>
            </div>

            {annonces.length === 0 ? (
              <div style={{background:'white',borderRadius:'16px',padding:'40px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>📋</div>
                <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'8px'}}>Aucune annonce pour l'instant</div>
                <div style={{color:'#888',fontSize:'0.85rem',marginBottom:'20px'}}>Publiez votre première mission urgente</div>
                <button onClick={()=>setShowForm(true)} style={{background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',padding:'12px 22px',fontWeight:'700',cursor:'pointer'}}>+ Publier une urgence</button>
              </div>
            ) : (
              annonces.map(annonce => (
                <div key={annonce.id} style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'22px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
                    <div>
                      <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'6px'}}>{annonce.type_lieu}</div>
                      <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'4px'}}>{annonce.titre}</div>
                      <div style={{fontSize:'0.82rem',color:'#888'}}>📍 {annonce.adresse} · ⏱ {new Date(annonce.deadline).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <span style={{background:'rgba(255,165,0,0.08)',color:'#F5A623',border:'1px solid rgba(255,165,0,0.2)',padding:'5px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600'}}>{annonce.statut === 'en_attente' ? '🟡 En attente' : '🟢 Pourvue'}</span>
                  </div>
                  {annonce.description && (
                    <div style={{background:'#FAFAF7',borderRadius:'10px',padding:'12px',marginBottom:'14px',fontSize:'0.85rem',color:'#555'}}>{annonce.description}</div>
                  )}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontWeight:'800',fontSize:'1.2rem'}}>{annonce.remuneration} €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                    <span style={{fontSize:'0.75rem',color:'#888',fontWeight:'600'}}>📅 {new Date(annonce.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <div style={{background:'white',borderRadius:'20px',padding:'28px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <h3 style={{fontWeight:'800',fontSize:'1.3rem',marginBottom:'4px'}}>Nouvelle annonce urgente</h3>
            <p style={{color:'#888',fontSize:'0.85rem',marginBottom:'24px'}}>Remplissez les informations pour trouver un prestataire</p>

            {publishErreur && (
              <div style={{background:'rgba(232,51,74,0.1)',color:'#E8334A',padding:'12px',borderRadius:'10px',marginBottom:'16px',fontSize:'0.85rem'}}>
                {publishErreur}
              </div>
            )}

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Titre de l'annonce</label>
              <input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Ex: Villa Marbella — Remise en état urgente" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Type de lieu</label>
              <select value={typeLieu} onChange={e=>setTypeLieu(e.target.value)} style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',background:'#FAFAF7'}}>
                <option>🏠 Appartement / Villa</option>
                <option>🏢 Bureaux / Open Space</option>
                <option>🏨 Chambre d'hôtel</option>
                <option>🏥 Cabinet médical / Clinique</option>
                <option>🏬 Commerce / Restaurant</option>
              </select>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Adresse</label>
              <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="14 boulevard de la Croisette, 06400 Cannes" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'16px'}}>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Deadline</label>
                <input value={deadline} onChange={e=>setDeadline(e.target.value)} type="datetime-local" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Rémunération (€ net)</label>
                <input value={remuneration} onChange={e=>setRemuneration(e.target.value)} type="number" placeholder="95" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
            </div>

            <div style={{marginBottom:'20px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Décrivez les tâches à effectuer..." style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',minHeight:'90px',resize:'vertical',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:'12px',background:'none',border:'1.5px solid #eee',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer'}}>Annuler</button>
              <button onClick={handlePublier} disabled={publishLoading} style={{flex:2,padding:'12px',background:publishLoading?'#ddd':'#FF4D00',color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',cursor:publishLoading?'not-allowed':'pointer'}}>
                {publishLoading ? '⏳ Publication...' : "⚡ Publier l'annonce"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // ── DASHBOARD PRESTATAIRE ──
  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'24px'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <Navbar />
        <div style={{background:'white',borderRadius:'16px',padding:'22px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'20px',display:'flex',alignItems:'center',gap:'18px'}}>
          <div style={{width:'60px',height:'60px',background:'linear-gradient(135deg,#FF4D00,#ff8c66)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'1.3rem',flexShrink:0}}>
            {nom.substring(0,2).toUpperCase()}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:'800',fontSize:'1.2rem'}}>{nom}</div>
            <div style={{color:'#F5A623',fontSize:'0.85rem',marginBottom:'6px'}}>⭐ Nouveau prestataire</div>
            <div style={{display:'flex',gap:'20px'}}>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>0</div><div style={{fontSize:'0.7rem',color:'#888'}}>missions</div></div>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>—</div><div style={{fontSize:'0.7rem',color:'#888'}}>note moy.</div></div>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>0 €</div><div style={{fontSize:'0.7rem',color:'#888'}}>ce mois</div></div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h2 style={{fontWeight:'800',fontSize:'1.5rem'}}>Missions disponibles</h2>
          <span style={{fontSize:'0.82rem',color:'#888'}}>{annonces.length} annonce{annonces.length > 1 ? 's' : ''} disponible{annonces.length > 1 ? 's' : ''}</span>
        </div>

        {annonces.length === 0 ? (
          <div style={{background:'white',borderRadius:'16px',padding:'40px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🔍</div>
            <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'8px'}}>Aucune mission disponible</div>
            <div style={{color:'#888',fontSize:'0.85rem'}}>Revenez bientôt pour voir les nouvelles missions</div>
          </div>
        ) : (
          annonces.map(m => (
            <div key={m.id} style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>{m.type_lieu}</div>
                  <div style={{fontWeight:'700',fontSize:'1rem',marginBottom:'3px'}}>{m.titre}</div>
                  <div style={{fontSize:'0.8rem',color:'#888'}}>📍 {m.adresse}</div>
                </div>
                <span style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',padding:'5px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600',whiteSpace:'nowrap'}}>🔴 Urgent</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid #f0f0f0',marginBottom:'12px'}}>
                <span style={{fontWeight:'800',fontSize:'1.2rem'}}>{m.remuneration} €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                <span style={{fontSize:'0.75rem',color:'#888',fontWeight:'600'}}>⏱ {new Date(m.deadline).toLocaleDateString('fr-FR')}</span>
              </div>
              <div style={{display:'flex',gap:'10px'}}>
                <button onClick={()=>setDispos(d=>({...d,[m.id]:'oui'}))} style={{flex:1,padding:'11px',borderRadius:'10px',border:'2px solid #0CB86A',background:dispos[m.id]==='oui'?'#0CB86A':'rgba(12,184,106,0.08)',color:dispos[m.id]==='oui'?'white':'#0CB86A',fontWeight:'700',cursor:'pointer',fontSize:'0.9rem'}}>
                  {dispos[m.id]==='oui'?'✓ Disponible confirmé':'✓ Je suis disponible'}
                </button>
                <button onClick={()=>setDispos(d=>({...d,[m.id]:'non'}))} style={{flex:1,padding:'11px',borderRadius:'10px',border:'2px solid #E8334A',background:dispos[m.id]==='non'?'#E8334A':'rgba(232,51,74,0.08)',color:dispos[m.id]==='non'?'white':'#E8334A',fontWeight:'700',cursor:'pointer',fontSize:'0.9rem'}}>
                  {dispos[m.id]==='non'?'✗ Refusé':'✗ Pas disponible'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}