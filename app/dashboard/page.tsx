'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

const VERT = '#1A7A4A'
const VERT_LIGHT = '#E8F5EE'
const VERT_MEDIUM = '#2ECC71'
const GRIS = '#F7F9F7'
const TEXTE = '#1A2E1A'

export default function Dashboard() {
  const router = useRouter()
  const [role, setRole] = useState('')
  const [nom, setNom] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [dispos, setDispos] = useState<{[key: string]: string}>({})
  const [annonces, setAnnonces] = useState<any[]>([])
  const [reponses, setReponses] = useState<{[key: string]: any[]}>({})

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
        if (!error && data) {
          setAnnonces(data)
          const reponsesMap: {[key: string]: any[]} = {}
          for (const annonce of data) {
            const { data: reps } = await supabase
              .from('reponses')
              .select('*, profiles(nom)')
              .eq('annonce_id', annonce.id)
              .eq('disponible', true)
            if (reps) reponsesMap[annonce.id] = reps
          }
          setReponses(reponsesMap)
        }
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
        titre, type_lieu: typeLieu, adresse,
        remuneration: parseInt(remuneration),
        deadline, description, statut: 'en_attente',
      })
      if (error) throw error
      const { data } = await supabase.from('annonces').select('*').eq('entreprise_id', user.id).order('created_at', { ascending: false })
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

  const handleDispo = async (annonceId: string, disponible: boolean) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: existing } = await supabase.from('reponses').select('id').eq('annonce_id', annonceId).eq('prestataire_id', user.id).single()
    if (existing) {
      await supabase.from('reponses').update({ disponible }).eq('id', existing.id)
    } else {
      await supabase.from('reponses').insert({ annonce_id: annonceId, prestataire_id: user.id, disponible })
    }
    setDispos(d => ({...d, [annonceId]: disponible ? 'oui' : 'non'}))
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:GRIS,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🌿</div>
        <div style={{color:'#888',fontWeight:'600'}}>Chargement...</div>
      </div>
    </div>
  )

  const Navbar = () => (
    <div style={{background:'white',borderBottom:'1px solid #E8F0E8',padding:'0 32px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 1px 8px rgba(26,122,74,0.06)'}}>
      <div style={{fontWeight:'900',fontSize:'1.4rem',color:TEXTE}}>Clean<span style={{color:VERT}}>Urgence</span></div>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'34px',height:'34px',background:VERT,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.8rem'}}>
            {nom.substring(0,2).toUpperCase()}
          </div>
          <span style={{fontSize:'0.88rem',color:TEXTE,fontWeight:'600'}}>{nom}</span>
        </div>
        <button onClick={()=>router.push('/profil')} style={{background:'none',border:`1.5px solid #ddd`,borderRadius:'8px',padding:'7px 16px',cursor:'pointer',fontSize:'0.82rem',color:'#555',fontFamily:'sans-serif',fontWeight:'600'}}>👤 Mon profil</button>
        <button onClick={handleDeconnexion} style={{background:'none',border:`1.5px solid #ddd`,borderRadius:'8px',padding:'7px 16px',cursor:'pointer',fontSize:'0.82rem',color:'#888',fontFamily:'sans-serif',fontWeight:'600'}}>Déconnexion</button>
      </div>
    </div>
  )

  // ── DASHBOARD ENTREPRISE ──
  if (role === 'entreprise') return (
    <div style={{minHeight:'100vh',background:GRIS,fontFamily:'sans-serif'}}>
      <Navbar />
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 24px'}}>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'32px'}}>
          {[
            {label:'Annonces publiées', value: annonces.length, icon:'📋'},
            {label:'En attente', value: annonces.filter(a=>a.statut==='en_attente').length, icon:'⏳'},
            {label:'Prestataires dispo', value: Object.values(reponses).reduce((acc,r)=>acc+r.length,0), icon:'👤'},
          ].map((stat,i) => (
            <div key={i} style={{background:'white',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',border:`1px solid #E8F0E8`}}>
              <div style={{fontSize:'1.6rem',marginBottom:'8px'}}>{stat.icon}</div>
              <div style={{fontWeight:'800',fontSize:'1.8rem',color:VERT,marginBottom:'4px'}}>{stat.value}</div>
              <div style={{fontSize:'0.78rem',color:'#888',fontWeight:'600'}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {!showForm ? (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
              <h2 style={{fontWeight:'800',fontSize:'1.5rem',color:TEXTE}}>Mes annonces</h2>
              <button onClick={()=>setShowForm(true)} style={{background:VERT,color:'white',border:'none',borderRadius:'10px',padding:'11px 22px',fontWeight:'700',fontSize:'0.9rem',cursor:'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>+ Nouvelle urgence</button>
            </div>

            {annonces.length === 0 ? (
              <div style={{background:'white',borderRadius:'20px',padding:'60px 40px',textAlign:'center',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',border:'1px solid #E8F0E8'}}>
                <div style={{fontSize:'3rem',marginBottom:'16px'}}>📋</div>
                <div style={{fontWeight:'700',fontSize:'1.2rem',marginBottom:'8px',color:TEXTE}}>Aucune annonce pour l'instant</div>
                <div style={{color:'#888',fontSize:'0.88rem',marginBottom:'24px'}}>Publiez votre première mission urgente</div>
                <button onClick={()=>setShowForm(true)} style={{background:VERT,color:'white',border:'none',borderRadius:'10px',padding:'12px 24px',fontWeight:'700',cursor:'pointer'}}>+ Publier une urgence</button>
              </div>
            ) : (
              annonces.map(annonce => (
                <div key={annonce.id} style={{background:'white',border:'1px solid #E8F0E8',borderRadius:'20px',padding:'24px',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',marginBottom:'16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
                    <div>
                      <div style={{fontSize:'0.7rem',fontWeight:'700',color:VERT,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'6px'}}>{annonce.type_lieu}</div>
                      <div style={{fontWeight:'800',fontSize:'1.15rem',color:TEXTE,marginBottom:'4px'}}>{annonce.titre}</div>
                      <div style={{fontSize:'0.82rem',color:'#888'}}>📍 {annonce.adresse} · ⏱ {new Date(annonce.deadline).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <span style={{background:VERT_LIGHT,color:VERT,border:`1px solid ${VERT}22`,padding:'6px 14px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'700'}}>{annonce.statut === 'en_attente' ? '🟡 En attente' : '🟢 Pourvue'}</span>
                  </div>

                  <div style={{background:GRIS,borderRadius:'12px',padding:'16px',marginBottom:'16px'}}>
                    {reponses[annonce.id] && reponses[annonce.id].length > 0 ? (
                      <>
                        <div style={{fontSize:'0.75rem',fontWeight:'700',color:VERT,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'12px'}}>
                          👤 Prestataires disponibles ({reponses[annonce.id].length})
                        </div>
                        {reponses[annonce.id].map((rep, i) => (
                          <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0',borderBottom: i < reponses[annonce.id].length - 1 ? `1px solid #E8F0E8` : 'none'}}>
                            <div style={{width:'38px',height:'38px',background:VERT,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.85rem',flexShrink:0}}>
                              {rep.profiles?.nom?.substring(0,2).toUpperCase() || '?'}
                            </div>
                            <div style={{flex:1}}>
                              <div style={{fontWeight:'700',fontSize:'0.9rem',color:TEXTE}}>{rep.profiles?.nom || 'Prestataire'}</div>
                              <div style={{fontSize:'0.75rem',color:VERT_MEDIUM,fontWeight:'600'}}>✓ Disponible</div>
                            </div>
                            <button style={{background:VERT,color:'white',border:'none',borderRadius:'8px',padding:'8px 16px',fontWeight:'700',fontSize:'0.8rem',cursor:'pointer'}}>Sélectionner</button>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div style={{fontSize:'0.82rem',color:'#888',fontWeight:'600'}}>⏳ En attente de réponses des prestataires...</div>
                    )}
                  </div>

                  {annonce.description && (
                    <div style={{fontSize:'0.85rem',color:'#666',marginBottom:'16px',lineHeight:'1.6'}}>{annonce.description}</div>
                  )}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid #E8F0E8'}}>
                    <span style={{fontWeight:'900',fontSize:'1.4rem',color:VERT}}>{annonce.remuneration} €<span style={{fontWeight:'400',fontSize:'0.78rem',color:'#888',marginLeft:'4px'}}>net</span></span>
                    <span style={{fontSize:'0.78rem',color:'#aaa'}}>📅 {new Date(annonce.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <div style={{background:'white',borderRadius:'20px',padding:'32px',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',border:'1px solid #E8F0E8'}}>
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
              <div style={{width:'40px',height:'40px',background:VERT_LIGHT,borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem'}}>⚡</div>
              <div>
                <h3 style={{fontWeight:'800',fontSize:'1.2rem',color:TEXTE,marginBottom:'2px'}}>Nouvelle annonce urgente</h3>
                <p style={{color:'#888',fontSize:'0.82rem'}}>Trouvez un prestataire rapidement</p>
              </div>
            </div>

            {publishErreur && (
              <div style={{background:'rgba(232,51,74,0.08)',color:'#E8334A',padding:'12px',borderRadius:'10px',marginBottom:'16px',fontSize:'0.85rem'}}>
                {publishErreur}
              </div>
            )}

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Titre de l'annonce</label>
              <input value={titre} onChange={e=>setTitre(e.target.value)} placeholder="Ex: Villa Marbella — Remise en état urgente" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Type de lieu</label>
              <select value={typeLieu} onChange={e=>setTypeLieu(e.target.value)} style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',background:'white'}}>
                <option>🏠 Appartement / Villa</option>
                <option>🏢 Bureaux / Open Space</option>
                <option>🏨 Chambre d'hôtel</option>
                <option>🏥 Cabinet médical / Clinique</option>
                <option>🏬 Commerce / Restaurant</option>
              </select>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Adresse</label>
              <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="14 boulevard de la Croisette, 06400 Cannes" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'16px'}}>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Deadline</label>
                <input value={deadline} onChange={e=>setDeadline(e.target.value)} type="datetime-local" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Rémunération (€ net)</label>
                <input value={remuneration} onChange={e=>setRemuneration(e.target.value)} type="number" placeholder="95" style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
            </div>

            <div style={{marginBottom:'24px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Décrivez les tâches à effectuer..." style={{width:'100%',padding:'12px 14px',borderRadius:'10px',border:`1.5px solid #E8F0E8`,fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',minHeight:'90px',resize:'vertical',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'flex',gap:'12px'}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:'13px',background:'none',border:`1.5px solid #E8F0E8`,borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',color:'#888'}}>Annuler</button>
              <button onClick={handlePublier} disabled={publishLoading} style={{flex:2,padding:'13px',background:publishLoading?'#ccc':VERT,color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',cursor:publishLoading?'not-allowed':'pointer',boxShadow:'0 4px 12px rgba(26,122,74,0.3)'}}>
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
    <div style={{minHeight:'100vh',background:GRIS,fontFamily:'sans-serif'}}>
      <Navbar />
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'32px 24px'}}>

        {/* Carte profil */}
        <div style={{background:`linear-gradient(135deg, ${VERT} 0%, #2ECC71 100%)`,borderRadius:'20px',padding:'28px',marginBottom:'28px',color:'white',boxShadow:'0 8px 24px rgba(26,122,74,0.25)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
            <div style={{width:'64px',height:'64px',background:'rgba(255,255,255,0.2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'1.4rem',border:'3px solid rgba(255,255,255,0.4)'}}>
              {nom.substring(0,2).toUpperCase()}
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'800',fontSize:'1.3rem',marginBottom:'4px'}}>{nom}</div>
              <div style={{opacity:0.85,fontSize:'0.85rem'}}>⭐ Nouveau prestataire · CleanUrgence</div>
            </div>
          </div>
          <div style={{display:'flex',gap:'0',marginTop:'20px',background:'rgba(255,255,255,0.15)',borderRadius:'12px',overflow:'hidden'}}>
            {[{label:'Missions', value:'0'},{label:'Note moy.', value:'—'},{label:'Ce mois', value:'0 €'}].map((s,i) => (
              <div key={i} style={{flex:1,padding:'14px',textAlign:'center',borderRight:i<2?'1px solid rgba(255,255,255,0.2)':'none'}}>
                <div style={{fontWeight:'800',fontSize:'1.3rem'}}>{s.value}</div>
                <div style={{fontSize:'0.72rem',opacity:0.8,marginTop:'2px'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h2 style={{fontWeight:'800',fontSize:'1.5rem',color:TEXTE}}>Missions disponibles</h2>
          <span style={{background:VERT_LIGHT,color:VERT,padding:'6px 14px',borderRadius:'20px',fontSize:'0.78rem',fontWeight:'700'}}>{annonces.length} disponible{annonces.length > 1 ? 's' : ''}</span>
        </div>

        {annonces.length === 0 ? (
          <div style={{background:'white',borderRadius:'20px',padding:'60px 40px',textAlign:'center',border:'1px solid #E8F0E8'}}>
            <div style={{fontSize:'3rem',marginBottom:'16px'}}>🔍</div>
            <div style={{fontWeight:'700',fontSize:'1.1rem',color:TEXTE,marginBottom:'8px'}}>Aucune mission disponible</div>
            <div style={{color:'#888',fontSize:'0.85rem'}}>Revenez bientôt !</div>
          </div>
        ) : (
          annonces.map(m => (
            <div key={m.id} style={{background:'white',border:'1px solid #E8F0E8',borderRadius:'20px',padding:'24px',boxShadow:'0 2px 8px rgba(26,122,74,0.06)',marginBottom:'16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:VERT,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'6px'}}>{m.type_lieu}</div>
                  <div style={{fontWeight:'800',fontSize:'1.05rem',color:TEXTE,marginBottom:'4px'}}>{m.titre}</div>
                  <div style={{fontSize:'0.82rem',color:'#888'}}>📍 {m.adresse}</div>
                </div>
                <span style={{background:'#FFF3E0',color:'#E65100',padding:'6px 14px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'700',whiteSpace:'nowrap'}}>🔴 Urgent</span>
              </div>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderTop:'1px solid #E8F0E8',borderBottom:'1px solid #E8F0E8',margin:'12px 0'}}>
                <span style={{fontWeight:'900',fontSize:'1.4rem',color:VERT}}>{m.remuneration} €<span style={{fontWeight:'400',fontSize:'0.78rem',color:'#888',marginLeft:'4px'}}>net</span></span>
                <span style={{fontSize:'0.78rem',color:'#aaa'}}>⏱ {new Date(m.deadline).toLocaleDateString('fr-FR')}</span>
              </div>

              <div style={{display:'flex',gap:'10px'}}>
                <button
                  onClick={()=>handleDispo(m.id, true)}
                  style={{flex:1,padding:'12px',borderRadius:'10px',border:`2px solid ${dispos[m.id]==='oui'?VERT:'#E8F0E8'}`,background:dispos[m.id]==='oui'?VERT:VERT_LIGHT,color:dispos[m.id]==='oui'?'white':VERT,fontWeight:'700',cursor:'pointer',fontSize:'0.9rem',fontFamily:'sans-serif',transition:'all 0.2s'}}>
                  {dispos[m.id]==='oui'?'✓ Disponible confirmé':'✓ Je suis disponible'}
                </button>
                <button
                  onClick={()=>handleDispo(m.id, false)}
                  style={{flex:1,padding:'12px',borderRadius:'10px',border:`2px solid ${dispos[m.id]==='non'?'#E8334A':'#eee'}`,background:dispos[m.id]==='non'?'#E8334A':'#FFF5F5',color:dispos[m.id]==='non'?'white':'#E8334A',fontWeight:'700',cursor:'pointer',fontSize:'0.9rem',fontFamily:'sans-serif',transition:'all 0.2s'}}>
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
