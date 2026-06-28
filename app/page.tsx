'use client'
import { useState } from 'react'

export default function Home() {
  const [role, setRole] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [dispos, setDispos] = useState({})

  if (!role) return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center',padding:'60px 20px 40px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',fontSize:'0.75rem',fontWeight:'700',letterSpacing:'0.12em',textTransform:'uppercase',color:'#FF4D00',background:'rgba(255,77,0,0.08)',border:'1px solid rgba(255,77,0,0.2)',padding:'5px 14px',borderRadius:'30px',marginBottom:'20px'}}>⚡ Plateforme d'urgence</div>
        <h1 style={{fontWeight:'900',fontSize:'2.8rem',color:'#1A1A1A',marginBottom:'12px',lineHeight:'1.1'}}>Clean<span style={{color:'#FF4D00'}}>Urgence</span></h1>
        <p style={{color:'#555',fontSize:'1.05rem',marginBottom:'8px',fontWeight:'500'}}>La plateforme N°1 des urgences de nettoyage professionnel</p>
        <p style={{color:'#888',fontSize:'0.88rem',marginBottom:'36px'}}>Trouvez un prestataire qualifié en moins de 15 minutes · Disponible 24h/24</p>
        <div style={{display:'flex',justifyContent:'center',gap:'32px',marginBottom:'48px',flexWrap:'wrap'}}>
          <div style={{textAlign:'center'}}><div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>500+</div><div style={{fontSize:'0.78rem',color:'#888'}}>Prestataires actifs</div></div>
          <div style={{textAlign:'center'}}><div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>&lt;15 min</div><div style={{fontSize:'0.78rem',color:'#888'}}>Temps de réponse</div></div>
          <div style={{textAlign:'center'}}><div style={{fontWeight:'900',fontSize:'1.6rem',color:'#FF4D00'}}>24h/24</div><div style={{fontSize:'0.78rem',color:'#888'}}>Disponibilité</div></div>
        </div>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px',padding:'0 20px'}}>
          <div onClick={()=>setRole('entreprise')} style={{background:'white',border:'2px solid #eee',borderRadius:'20px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'260px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#FF4D00';e.currentTarget.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='#eee';e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🏢</div>
            <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'8px',color:'#1A1A1A'}}>Entreprise & Conciergerie</div>
            <div style={{fontSize:'0.82rem',color:'#888',lineHeight:'1.6',marginBottom:'16px'}}>Hôtel, agence immobilière, cabinet médical, commerce, restaurant et plus encore</div>
            <div style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',padding:'8px 16px',borderRadius:'8px',fontSize:'0.8rem',fontWeight:'600'}}>Publier une urgence →</div>
          </div>
          <div onClick={()=>setRole('prestataire')} style={{background:'white',border:'2px solid #eee',borderRadius:'20px',padding:'32px 28px',cursor:'pointer',textAlign:'center',width:'260px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#FF4D00';e.currentTarget.style.transform='translateY(-3px)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='#eee';e.currentTarget.style.transform='translateY(0)'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>🧹</div>
            <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'8px',color:'#1A1A1A'}}>Prestataire indépendant</div>
            <div style={{fontSize:'0.82rem',color:'#888',lineHeight:'1.6',marginBottom:'16px'}}>Trouvez des missions urgentes près de chez vous et augmentez vos revenus</div>
            <div style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',padding:'8px 16px',borderRadius:'8px',fontSize:'0.8rem',fontWeight:'600'}}>Voir les missions →</div>
          </div>
        </div>
        <div style={{background:'white',borderRadius:'20px',padding:'32px',maxWidth:'700px',margin:'0 auto',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
          <div style={{fontWeight:'800',fontSize:'1.1rem',marginBottom:'24px',color:'#1A1A1A'}}>Comment ça marche ?</div>
          <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}><div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>1</div><div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Publiez</div><div style={{fontSize:'0.78rem',color:'#888'}}>Décrivez votre besoin en 2 minutes</div></div>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}><div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>2</div><div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Recevez</div><div style={{fontSize:'0.78rem',color:'#888'}}>Les prestataires disponibles répondent</div></div>
            <div style={{flex:1,minWidth:'160px',textAlign:'center'}}><div style={{width:'44px',height:'44px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 10px',color:'white',fontWeight:'800',fontSize:'1.1rem'}}>3</div><div style={{fontWeight:'700',fontSize:'0.9rem',marginBottom:'4px'}}>Choisissez</div><div style={{fontSize:'0.78rem',color:'#888'}}>Sélectionnez le meilleur prestataire</div></div>
          </div>
        </div>
      </div>
    </div>
  )

  // ── PAGE ENTREPRISE ──
  if (role === 'entreprise') return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'24px'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <button onClick={()=>{setRole(null);setShowForm(false)}} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'0.85rem',marginBottom:'24px'}}>← Retour</button>

        {!showForm ? (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <div>
                <h2 style={{fontWeight:'800',fontSize:'1.8rem',marginBottom:'4px'}}>Mes annonces</h2>
                <p style={{color:'#888',fontSize:'0.85rem'}}>2 annonces actives</p>
              </div>
              <button onClick={()=>setShowForm(true)} style={{background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',padding:'12px 22px',fontWeight:'700',fontSize:'0.9rem',cursor:'pointer'}}>+ Nouvelle urgence</button>
            </div>

            {/* Annonce 1 */}
            <div style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'22px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'6px'}}>🏠 Appartement</div>
                  <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'4px'}}>Villa Marbella — Remise en état urgente</div>
                  <div style={{fontSize:'0.82rem',color:'#888'}}>📍 14 bd de la Croisette, Cannes · ⏱ Aujourd'hui avant 18h</div>
                </div>
                <span style={{background:'rgba(255,77,0,0.08)',color:'#FF4D00',border:'1px solid rgba(255,77,0,0.2)',padding:'5px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600',whiteSpace:'nowrap'}}>🔴 Urgent</span>
              </div>
              <div style={{background:'#FAFAF7',borderRadius:'10px',padding:'14px',marginBottom:'14px'}}>
                <div style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px'}}>👤 Prestataires disponibles (2)</div>
                <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0',borderBottom:'1px solid #eee'}}>
                  <div style={{width:'36px',height:'36px',background:'#FF4D00',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.85rem',flexShrink:0}}>SB</div>
                  <div style={{flex:1}}><div style={{fontWeight:'600',fontSize:'0.88rem'}}>Sophie B.</div><div style={{fontSize:'0.75rem',color:'#888'}}>⭐ 4.9 · 47 missions · Cannes</div></div>
                  <button style={{background:'#FF4D00',color:'white',border:'none',borderRadius:'8px',padding:'7px 14px',fontWeight:'600',fontSize:'0.78rem',cursor:'pointer'}}>Sélectionner</button>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 0'}}>
                  <div style={{width:'36px',height:'36px',background:'#6eb5ff',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'700',fontSize:'0.85rem',flexShrink:0}}>ML</div>
                  <div style={{flex:1}}><div style={{fontWeight:'600',fontSize:'0.88rem'}}>Marie L.</div><div style={{fontSize:'0.75rem',color:'#888'}}>⭐ 4.7 · 23 missions · Nice</div></div>
                  <button style={{background:'#FF4D00',color:'white',border:'none',borderRadius:'8px',padding:'7px 14px',fontWeight:'600',fontSize:'0.78rem',cursor:'pointer'}}>Sélectionner</button>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:'800',fontSize:'1.2rem'}}>95 €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                <span style={{fontSize:'0.75rem',color:'#FF4D00',fontWeight:'600'}}>⚡ Publiée il y a 12 min</span>
              </div>
            </div>

            {/* Annonce 2 */}
            <div style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'22px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
                <div>
                  <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'6px'}}>🏢 Bureaux</div>
                  <div style={{fontWeight:'700',fontSize:'1.1rem',marginBottom:'4px'}}>Open Space — Nettoyage complet</div>
                  <div style={{fontSize:'0.82rem',color:'#888'}}>📍 8 rue du Faubourg, Paris 11e · ⏱ Demain avant 9h</div>
                </div>
                <span style={{background:'rgba(245,166,35,0.1)',color:'#F5A623',border:'1px solid rgba(245,166,35,0.2)',padding:'5px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600',whiteSpace:'nowrap'}}>🟡 Normal</span>
              </div>
              <div style={{background:'#FAFAF7',borderRadius:'10px',padding:'14px',marginBottom:'14px'}}>
                <div style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em'}}>⏳ En attente de réponses...</div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontWeight:'800',fontSize:'1.2rem'}}>140 €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
                <span style={{fontSize:'0.75rem',color:'#888',fontWeight:'600'}}>🕐 Publiée il y a 1h</span>
              </div>
            </div>
          </>
        ) : (
          // FORMULAIRE
          <div style={{background:'white',borderRadius:'20px',padding:'28px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
            <h3 style={{fontWeight:'800',fontSize:'1.3rem',marginBottom:'4px'}}>Nouvelle annonce urgente</h3>
            <p style={{color:'#888',fontSize:'0.85rem',marginBottom:'24px'}}>Remplissez les informations pour trouver un prestataire</p>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Type de lieu</label>
              <select style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',background:'#FAFAF7'}}>
                <option>🏠 Appartement / Villa</option>
                <option>🏢 Bureaux / Open Space</option>
                <option>🏨 Chambre d'hôtel</option>
                <option>🏥 Cabinet médical / Clinique</option>
                <option>🏬 Commerce / Restaurant</option>
                <option>🏗️ Chantier / Entrepôt</option>
              </select>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Adresse</label>
              <input placeholder="14 boulevard de la Croisette, 06400 Cannes" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',marginBottom:'16px'}}>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Deadline</label>
                <input type="datetime-local" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
              <div>
                <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Rémunération (€ net)</label>
                <input type="number" placeholder="95" style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',boxSizing:'border-box'}}/>
              </div>
            </div>

            <div style={{marginBottom:'20px'}}>
              <label style={{fontSize:'0.75rem',fontWeight:'700',color:'#555',textTransform:'uppercase',letterSpacing:'0.06em',display:'block',marginBottom:'6px'}}>Description de la mission</label>
              <textarea placeholder="Décrivez les tâches à effectuer, le matériel fourni, l'accès au logement..." style={{width:'100%',padding:'11px 14px',borderRadius:'10px',border:'1.5px solid #eee',fontFamily:'sans-serif',fontSize:'0.9rem',outline:'none',minHeight:'90px',resize:'vertical',boxSizing:'border-box'}}/>
            </div>

            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:'12px',background:'none',border:'1.5px solid #eee',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'600',cursor:'pointer',fontSize:'0.9rem'}}>Annuler</button>
              <button onClick={()=>{setShowForm(false);alert('Annonce publiée ! Les prestataires sont notifiés.')}} style={{flex:2,padding:'12px',background:'#FF4D00',color:'white',border:'none',borderRadius:'10px',fontFamily:'sans-serif',fontWeight:'700',cursor:'pointer',fontSize:'0.95rem'}}>⚡ Publier l'annonce</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // ── PAGE PRESTATAIRE ──
  return (
    <div style={{minHeight:'100vh',background:'#FAFAF7',fontFamily:'sans-serif',padding:'24px'}}>
      <div style={{maxWidth:'860px',margin:'0 auto'}}>
        <button onClick={()=>setRole(null)} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'8px 16px',cursor:'pointer',fontSize:'0.85rem',marginBottom:'24px'}}>← Retour</button>

        {/* PROFIL */}
        <div style={{background:'white',borderRadius:'16px',padding:'22px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'20px',display:'flex',alignItems:'center',gap:'18px'}}>
          <div style={{width:'60px',height:'60px',background:'linear-gradient(135deg,#FF4D00,#ff8c66)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'800',fontSize:'1.3rem',flexShrink:0}}>SB</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:'800',fontSize:'1.2rem'}}>Sophie Bertrand</div>
            <div style={{color:'#F5A623',fontSize:'0.85rem',marginBottom:'6px'}}>⭐⭐⭐⭐⭐ 4.9 · Cannes & alentours</div>
            <div style={{display:'flex',gap:'20px'}}>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>47</div><div style={{fontSize:'0.7rem',color:'#888'}}>missions</div></div>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>4.9</div><div style={{fontSize:'0.7rem',color:'#888'}}>note moy.</div></div>
              <div><div style={{fontWeight:'800',fontSize:'1.1rem',color:'#FF4D00'}}>2 340 €</div><div style={{fontSize:'0.7rem',color:'#888'}}>ce mois</div></div>
            </div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'0.72rem',fontWeight:'600',color:'#888',marginBottom:'6px'}}>Disponible</div>
            <div style={{width:'48px',height:'28px',background:'#0CB86A',borderRadius:'14px',position:'relative',cursor:'pointer'}}>
              <div style={{position:'absolute',right:'3px',top:'3px',width:'22px',height:'22px',background:'white',borderRadius:'50%',boxShadow:'0 1px 4px rgba(0,0,0,0.15)'}}></div>
            </div>
          </div>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h2 style={{fontWeight:'800',fontSize:'1.5rem'}}>Missions disponibles</h2>
          <span style={{fontSize:'0.82rem',color:'#888'}}>3 annonces près de vous</span>
        </div>

        {/* Mission 1 */}
        {[
          {id:'m1', titre:'Villa Marbella — Remise en état urgente', type:'🏠 Appartement', client:'Conciergerie Azur', adresse:'2,3 km · Cannes', heure:'il y a 12 min', prix:'95', urgence:'🔴 Urgent', urgenceColor:'#FF4D00', urgenceBg:'rgba(255,77,0,0.08)'},
          {id:'m2', titre:'Open Space Republique — Nettoyage complet', type:'🏢 Bureaux', client:'Groupe Immobilier Paris Est', adresse:'Paris 11e', heure:'il y a 1h', prix:'140', urgence:'🟡 Normal', urgenceColor:'#F5A623', urgenceBg:'rgba(245,166,35,0.1)'},
          {id:'m3', titre:'Hôtel Lumière — 6 chambres départ', type:'🏨 Hôtel', client:'Hôtel Lumière Boutique', adresse:'Lyon 2e', heure:'il y a 2h', prix:'115', urgence:'🟢 Planifié', urgenceColor:'#0CB86A', urgenceBg:'rgba(12,184,106,0.1)'},
        ].map(m => (
          <div key={m.id} style={{background:'white',border:'1px solid #eee',borderRadius:'16px',padding:'20px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:'14px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
              <div>
                <div style={{fontSize:'0.7rem',fontWeight:'700',color:'#888',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'4px'}}>{m.type} · {m.client}</div>
                <div style={{fontWeight:'700',fontSize:'1rem',marginBottom:'3px'}}>{m.titre}</div>
                <div style={{fontSize:'0.8rem',color:'#888'}}>📍 {m.adresse}</div>
              </div>
              <span style={{background:m.urgenceBg,color:m.urgenceColor,padding:'5px 12px',borderRadius:'20px',fontSize:'0.72rem',fontWeight:'600',whiteSpace:'nowrap',border:`1px solid ${m.urgenceBg}`}}>{m.urgence}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'12px',borderTop:'1px solid #f0f0f0',marginBottom:'12px'}}>
              <span style={{fontWeight:'800',fontSize:'1.2rem'}}>{m.prix} €<span style={{fontWeight:'400',fontSize:'0.75rem',color:'#888',marginLeft:'3px'}}>net</span></span>
              <span style={{fontSize:'0.75rem',color:m.urgenceColor,fontWeight:'600'}}>⚡ {m.heure}</span>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button
                onClick={()=>setDispos(d=>({...d,[m.id]:'oui'}))}
                style={{flex:1,padding:'11px',borderRadius:'10px',border:`2px solid ${dispos[m.id]==='oui'?'#0CB86A':'#0CB86A'}`,background:dispos[m.id]==='oui'?'#0CB86A':'rgba(12,184,106,0.08)',color:dispos[m.id]==='oui'?'white':'#0CB86A',fontWeight:'700',cursor:'pointer',fontSize:'0.9rem',transition:'all 0.2s'}}>
                {dispos[m.id]==='oui'?'✓ Disponible confirmé':'✓ Je suis disponible'}
              </button>
              <button
                onClick={()=>setDispos(d=>({...d,[m.id]:'non'}))}
                style={{flex:1,padding:'11px',borderRadius:'10px',border:`2px solid ${dispos[m.id]==='non'?'#E8334A':'#E8334A'}`,background:dispos[m.id]==='non'?'#E8334A':'rgba(232,51,74,0.08)',color:dispos[m.id]==='non'?'white':'#E8334A',fontWeight:'700',cursor:'pointer',fontSize:'0.9rem',transition:'all 0.2s'}}>
                {dispos[m.id]==='non'?'✗ Refusé':'✗ Pas disponible'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}