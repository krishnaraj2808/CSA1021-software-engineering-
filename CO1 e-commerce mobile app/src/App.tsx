import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
  Truck,
  X,
} from 'lucide-react'

type View = 'home' | 'shop' | 'saved' | 'studio'
type Category = 'All' | 'Home' | 'Kitchen' | 'Wellness' | 'Textiles'
type Product = {
  id: number
  name: string
  category: Exclude<Category, 'All'>
  price: number
  image: string
  badge?: string
  description: string
  maker: string
  material: string
  color: string
}
type Cart = Record<number, number>
type Feedback = {
  preference: 'Editorial' | 'Utility' | ''
  rating: number
  notes: string
  approved: boolean
  name: string
  date?: string
}

const photos = {
  vase: 'https://images.unsplash.com/photo-1572853566597-b83cde546912?auto=format&fit=crop&w=1000&q=85',
  bowls: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
  linen: 'https://images.unsplash.com/photo-1591625591034-75d303d2e1a4?auto=format&fit=crop&w=1000&q=85',
  soap: 'https://images.unsplash.com/photo-1674053524062-30b8ad746d4b?auto=format&fit=crop&w=1000&q=85',
  plate: 'https://images.unsplash.com/photo-1632996547902-064471618ef0?auto=format&fit=crop&w=1000&q=85',
  pitcher: 'https://images.unsplash.com/photo-1610219171293-e9809faf73bd?auto=format&fit=crop&w=1000&q=85',
  hero: 'https://images.unsplash.com/photo-1700721027942-6de825edcc68?auto=format&fit=crop&w=1600&q=90',
  bedding: 'https://images.unsplash.com/photo-1634665810235-011d663754e7?auto=format&fit=crop&w=1000&q=85',
}

const products: Product[] = [
  { id: 1, name: 'Form Vase No. 02', category: 'Home', price: 68, image: photos.vase, badge: 'Bestseller', description: 'A softly sculpted vessel made to bring quiet form to a shelf, table, or bedside.', maker: 'Warion Studio', material: 'Stoneware', color: 'Chalk' },
  { id: 2, name: 'Everyday Nesting Bowls', category: 'Kitchen', price: 54, image: photos.bowls, badge: 'Small batch', description: 'Three hand-finished bowls designed for morning oats, shared sides, and everything between.', maker: 'Gladkov Ceramics', material: 'Glazed clay', color: 'Oat' },
  { id: 3, name: 'Washed Linen Napkins', category: 'Textiles', price: 38, image: photos.linen, description: 'A set of four naturally softened linen napkins with an easy, lived-in drape.', maker: 'Maite Textiles', material: '100% European linen', color: 'Natural' },
  { id: 4, name: 'Citrus Botanical Bar', category: 'Wellness', price: 16, image: photos.soap, badge: 'New', description: 'Cold-processed cleansing bar with grapefruit peel, olive oil, and a fresh herbaceous finish.', maker: 'Red Orange Botanics', material: 'Plant oils', color: 'Grapefruit' },
  { id: 5, name: 'Petal Serving Plate', category: 'Kitchen', price: 46, image: photos.plate, description: 'An organic-edged plate for fruit, pastries, or collected objects.', maker: 'Sikorska Studio', material: 'Porcelain', color: 'Milk' },
  { id: 6, name: 'Morning Pourer', category: 'Kitchen', price: 42, image: photos.pitcher, badge: 'Limited', description: 'A balanced ceramic pourer sized for milk, dressing, or a handful of stems.', maker: 'Langevin Objects', material: 'Stoneware', color: 'Ivory' },
  { id: 7, name: 'Soft Linen Throw', category: 'Textiles', price: 94, image: photos.bedding, description: 'A breathable, weighty throw woven for slow mornings and cool evenings.', maker: 'Hliznitsova Home', material: 'Linen blend', color: 'Cloud' },
  { id: 8, name: 'Sculptural Catchall', category: 'Home', price: 34, image: photos.plate, description: 'A small hand-built tray for keys, jewelry, or salt at the table.', maker: 'Sikorska Studio', material: 'Porcelain', color: 'Soft white' },
]

const money = (value: number) => `$${value.toFixed(2)}`
const load = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T
  } catch {
    return fallback
  }
}

function IconButton({ label, children, onClick, active, className = '' }: { label: string; children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLButtonElement>; active?: boolean; className?: string }) {
  return <button className={`icon-button ${active ? 'active' : ''} ${className}`} aria-label={label} onClick={onClick}>{children}</button>
}

function ProductCard({ product, saved, onSave, onOpen, onAdd }: { product: Product; saved: boolean; onSave: () => void; onOpen: () => void; onAdd: () => void }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={onOpen}>
        <img src={product.image} alt={product.name} />
        {product.badge && <span className="badge">{product.badge}</span>}
        <IconButton label={saved ? 'Remove from saved' : 'Save item'} active={saved} onClick={(event) => { event.stopPropagation(); onSave() }} className="save-button">
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </IconButton>
      </div>
      <button className="product-copy" onClick={onOpen}>
        <span className="eyebrow">{product.category}</span>
        <strong>{product.name}</strong>
        <span>{money(product.price)}</span>
      </button>
      <button className="quick-add" onClick={onAdd}><Plus size={16} /> Quick add</button>
    </article>
  )
}

function App() {
  const [view, setView] = useState<View>('home')
  const [cart, setCart] = useState<Cart>(() => load('gather-cart', {}))
  const [saved, setSaved] = useState<number[]>(() => load('gather-saved', []))
  const [feedback, setFeedback] = useState<Feedback>(() => load('gather-feedback', { preference: '', rating: 0, notes: '', approved: false, name: '' }))
  const [category, setCategory] = useState<Category>('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('Featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)
  const [toast, setToast] = useState('')
  const [checkout, setCheckout] = useState(0)
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => localStorage.setItem('gather-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('gather-saved', JSON.stringify(saved)), [saved])
  useEffect(() => localStorage.setItem('gather-feedback', JSON.stringify(feedback)), [feedback])
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const visibleProducts = useMemo(() => {
    const result = products.filter((product) => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'Price: low') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high') return [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category, query, sort])

  const cartItems = products.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] }))
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const navigate = (next: View) => {
    setView(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const add = (id: number) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
    setToast('Added to your bag')
  }
  const updateQuantity = (id: number, amount: number) => {
    setCart((current) => {
      const quantity = (current[id] || 0) + amount
      const next = { ...current }
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }
  const toggleSaved = (id: number) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  const beginCheckout = () => {
    setCartOpen(false)
    setCheckout(1)
  }
  const completeOrder = () => {
    setOrderNumber(`GTH-${Math.floor(10000 + Math.random() * 89999)}`)
    setCheckout(3)
    setCart({})
  }

  return (
    <div className="app-shell">
      <div className="announcement"><Leaf size={13} /> Complimentary carbon-neutral shipping on orders over $75</div>
      <header className="site-header">
        <IconButton label="Open menu" onClick={() => setMenuOpen(!menuOpen)} className="mobile-only"><Menu size={21} /></IconButton>
        <button className="wordmark" onClick={() => navigate('home')}>gather<span>.</span></button>
        <nav className={menuOpen ? 'open' : ''}>
          <button onClick={() => navigate('home')} className={view === 'home' ? 'current' : ''}>Discover</button>
          <button onClick={() => navigate('shop')} className={view === 'shop' ? 'current' : ''}>Shop all</button>
          <button onClick={() => navigate('saved')} className={view === 'saved' ? 'current' : ''}>Saved</button>
          <button onClick={() => navigate('studio')} className={view === 'studio' ? 'current studio-link' : 'studio-link'}><Sparkles size={14} /> Design studio</button>
        </nav>
        <div className="header-actions">
          <IconButton label="Search" onClick={() => { navigate('shop'); setTimeout(() => document.getElementById('search')?.focus(), 100) }}><Search size={20} /></IconButton>
          <IconButton label="Saved items" onClick={() => navigate('saved')}><Heart size={20} /></IconButton>
          <IconButton label={`Shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={20} /><span className="count">{cartCount}</span>
          </IconButton>
        </div>
      </header>

      <main>
        {view === 'home' && (
          <>
            <section className="hero">
              <img src={photos.hero} alt="A curated collection of sculptural ceramics" />
              <div className="hero-overlay" />
              <div className="hero-copy">
                <span className="kicker">The considered home</span>
                <h1>Objects for the<br />everyday ritual.</h1>
                <p>Useful, beautiful goods chosen for how they’re made—and how they make daily life feel.</p>
                <button className="primary light" onClick={() => navigate('shop')}>Explore the collection <ArrowRight size={17} /></button>
              </div>
              <span className="hero-note">Edition 01 · Spring / Summer</span>
            </section>
            <section className="manifesto section">
              <span className="section-number">01</span>
              <div>
                <p className="kicker">Our point of view</p>
                <h2>Buy less.<br />Gather well.</h2>
              </div>
              <p className="manifesto-copy">We bring together enduring objects from independent makers and responsible studios. Each piece earns its place through honest materials, quiet utility, and lasting form.</p>
            </section>
            <section className="section collection">
              <div className="section-heading">
                <div><p className="kicker">Freshly gathered</p><h2>New & noteworthy</h2></div>
                <button className="text-link" onClick={() => navigate('shop')}>View all pieces <ArrowRight size={16} /></button>
              </div>
              <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => toggleSaved(product.id)} onOpen={() => setSelected(product)} onAdd={() => add(product.id)} />)}</div>
            </section>
            <section className="story-banner">
              <div className="story-image"><img src={photos.linen} alt="Natural linen folded on a wood table" /></div>
              <div className="story-copy">
                <p className="kicker">Material story · 01</p>
                <h2>The beauty of linen</h2>
                <p>Breathable, durable, and softer with every wash. Discover why this ancient fiber remains a modern essential.</p>
                <button className="text-link" onClick={() => { setCategory('Textiles'); navigate('shop') }}>Shop the linen edit <ArrowRight size={16} /></button>
              </div>
            </section>
            <section className="values section">
              <div><Leaf /><h3>Considered materials</h3><p>Natural, recycled, and low-impact wherever possible.</p></div>
              <div><Package /><h3>Thoughtful packaging</h3><p>Plastic-free, recyclable, and made to arrive beautifully.</p></div>
              <div><Truck /><h3>Slower shipping</h3><p>Carbon-neutral delivery without the unnecessary rush.</p></div>
            </section>
          </>
        )}

        {view === 'shop' && (
          <section className="shop-page section">
            <div className="page-title"><p className="kicker">Everyday goods</p><h1>The full collection</h1><p>Objects with purpose, selected to live well and last.</p></div>
            <div className="shop-tools">
              <label className="search-box"><Search size={18} /><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the collection" /></label>
              <button className="filter-button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filters <ChevronDown size={15} /></button>
              <label className="sort">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option>Featured</option><option>Price: low</option><option>Price: high</option></select></label>
            </div>
            <div className={`filter-panel ${filtersOpen ? 'open' : ''}`}>
              <span>Category</span>
              <div>{(['All', 'Home', 'Kitchen', 'Wellness', 'Textiles'] as Category[]).map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            </div>
            <div className="results-row"><span>{visibleProducts.length} pieces</span>{category !== 'All' && <button onClick={() => setCategory('All')}>Clear filter <X size={13} /></button>}</div>
            {visibleProducts.length ? <div className="product-grid shop-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onSave={() => toggleSaved(product.id)} onOpen={() => setSelected(product)} onAdd={() => add(product.id)} />)}</div> : <div className="empty"><Search /><h2>No pieces found</h2><p>Try a different search or clear your filters.</p><button className="secondary" onClick={() => { setQuery(''); setCategory('All') }}>Reset collection</button></div>}
          </section>
        )}

        {view === 'saved' && (
          <section className="saved-page section">
            <div className="page-title"><p className="kicker">Your edit</p><h1>Saved pieces</h1><p>A quiet corner for the things you’d like to return to.</p></div>
            {saved.length ? <div className="product-grid shop-grid">{products.filter((p) => saved.includes(p.id)).map((product) => <ProductCard key={product.id} product={product} saved onSave={() => toggleSaved(product.id)} onOpen={() => setSelected(product)} onAdd={() => add(product.id)} />)}</div> : <div className="empty"><Heart /><h2>Nothing saved yet</h2><p>Tap the heart on any piece to keep it close.</p><button className="primary" onClick={() => navigate('shop')}>Explore the collection</button></div>}
          </section>
        )}

        {view === 'studio' && (
          <section className="studio-page section">
            <div className="studio-hero">
              <div><p className="kicker">Stakeholder review · Prototype 01</p><h1>Help shape the gather experience.</h1><p>Explore two interface directions, record your preference, and approve the path forward.</p></div>
              <div className="status-pill"><span className={feedback.approved ? 'approved' : ''} />{feedback.approved ? 'Approved' : 'Awaiting decision'}</div>
            </div>
            <div className="review-progress"><div className="complete"><span>1</span>Explore</div><i /><div className={feedback.preference ? 'complete' : ''}><span>2</span>Compare</div><i /><div className={feedback.approved ? 'complete' : ''}><span>3</span>Approve</div></div>
            <div className="concepts">
              <button className={`concept-card ${feedback.preference === 'Editorial' ? 'chosen' : ''}`} onClick={() => setFeedback({ ...feedback, preference: 'Editorial', approved: false })}>
                <div className="concept-preview editorial-preview"><span>gather.</span><div /><strong>Objects for the<br />everyday ritual.</strong><small>Explore collection →</small></div>
                <div className="concept-info"><span className="concept-letter">A</span><div><h2>Editorial calm</h2><p>Immersive imagery, generous space, and a story-led pace.</p></div><span className="choose">{feedback.preference === 'Editorial' ? <Check size={17} /> : null}</span></div>
              </button>
              <button className={`concept-card ${feedback.preference === 'Utility' ? 'chosen' : ''}`} onClick={() => setFeedback({ ...feedback, preference: 'Utility', approved: false })}>
                <div className="concept-preview utility-preview"><span>Shop all</span><div className="mini-products"><i /><i /><i /></div><small>Filters · Sort · 24 pieces</small></div>
                <div className="concept-info"><span className="concept-letter">B</span><div><h2>Curated utility</h2><p>Product-first density, visible controls, and faster comparison.</p></div><span className="choose">{feedback.preference === 'Utility' ? <Check size={17} /> : null}</span></div>
              </button>
            </div>
            <div className="feedback-grid">
              <div className="feedback-card">
                <p className="kicker">Your assessment</p><h2>How does this direction feel?</h2>
                <label>Overall experience</label>
                <div className="rating">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} onClick={() => setFeedback({ ...feedback, rating })} aria-label={`${rating} stars`}><Star fill={feedback.rating >= rating ? 'currentColor' : 'none'} /></button>)}</div>
                <label htmlFor="notes">Comments & considerations</label>
                <textarea id="notes" placeholder="What feels strong? What would you change?" value={feedback.notes} onChange={(e) => setFeedback({ ...feedback, notes: e.target.value })} />
                <label htmlFor="name">Your name</label>
                <input id="name" placeholder="Stakeholder name" value={feedback.name} onChange={(e) => setFeedback({ ...feedback, name: e.target.value })} />
                <p className="autosave"><Check size={13} /> Feedback saves automatically on this device</p>
              </div>
              <aside className="decision-card">
                <p className="kicker">Final decision</p><h2>{feedback.approved ? 'Direction approved.' : 'Ready to decide?'}</h2>
                {feedback.preference ? <div className="selection-summary"><span>Selected direction</span><strong>{feedback.preference === 'Editorial' ? 'A · Editorial calm' : 'B · Curated utility'}</strong></div> : <p>Select a concept above to continue.</p>}
                <ul><li className={feedback.preference ? 'done' : ''}><Check />Direction selected</li><li className={feedback.rating ? 'done' : ''}><Check />Experience rated</li><li className={feedback.name.trim() ? 'done' : ''}><Check />Reviewer identified</li></ul>
                <button className="primary full" disabled={!feedback.preference || !feedback.rating || !feedback.name.trim()} onClick={() => { setFeedback({ ...feedback, approved: true, date: new Date().toLocaleDateString() }); setToast('Decision recorded') }}>{feedback.approved ? <><Check size={17} /> Approved {feedback.date}</> : <>Approve direction <ArrowRight size={17} /></>}</button>
                {feedback.approved && <button className="text-link center" onClick={() => setFeedback({ ...feedback, approved: false })}>Reopen decision</button>}
              </aside>
            </div>
          </section>
        )}
      </main>

      <footer>
        <div><button className="wordmark footer-mark" onClick={() => navigate('home')}>gather<span>.</span></button><p>Everyday Goods.<br />Considered Shopping.</p></div>
        <div><strong>Explore</strong><button onClick={() => navigate('shop')}>Shop all</button><button onClick={() => { setCategory('Home'); navigate('shop') }}>Home</button><button onClick={() => { setCategory('Wellness'); navigate('shop') }}>Wellness</button></div>
        <div><strong>About</strong><button onClick={() => setToast('Our maker journal is coming soon')}>Our makers</button><button onClick={() => setToast('Material guide is coming soon')}>Materials</button><button onClick={() => navigate('studio')}>Design studio</button></div>
        <div className="newsletter"><strong>Notes from gather.</strong><p>New finds and thoughtful stories, occasionally.</p><form onSubmit={(e) => { e.preventDefault(); setToast('You’re on the list') }}><input required type="email" placeholder="Email address" /><button aria-label="Subscribe"><ArrowRight /></button></form></div>
        <small>© 2026 gather goods · Prototype experience</small>
      </footer>

      {cartOpen && <div className="overlay" onMouseDown={() => setCartOpen(false)}>
        <aside className="drawer" onMouseDown={(e) => e.stopPropagation()}>
          <div className="drawer-head"><div><p className="kicker">Your selection</p><h2>Shopping bag <span>({cartCount})</span></h2></div><IconButton label="Close bag" onClick={() => setCartOpen(false)}><X /></IconButton></div>
          <div className="drawer-body">
            {cartItems.length ? cartItems.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{item.color} · {item.material}</span><div className="quantity"><button onClick={() => updateQuantity(item.id, -1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus /></button></div></div><div className="cart-price">{money(item.price * item.quantity)}<button onClick={() => updateQuantity(item.id, -item.quantity)}><Trash2 /></button></div></div>) : <div className="empty drawer-empty"><ShoppingBag /><h2>Your bag is empty</h2><p>Considered goods are waiting.</p><button className="primary" onClick={() => { setCartOpen(false); navigate('shop') }}>Start exploring</button></div>}
          </div>
          {!!cartItems.length && <div className="drawer-foot"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Carbon-neutral shipping calculated at checkout.</p><button className="primary full" onClick={beginCheckout}>Continue to checkout <ArrowRight /></button></div>}
        </aside>
      </div>}

      {selected && <div className="overlay product-overlay" onMouseDown={() => setSelected(null)}>
        <article className="product-modal" onMouseDown={(e) => e.stopPropagation()}>
          <IconButton label="Close product" onClick={() => setSelected(null)} className="modal-close"><X /></IconButton>
          <div className="modal-image"><img src={selected.image} alt={selected.name} /></div>
          <div className="modal-copy">
            <p className="kicker">{selected.category} · {selected.maker}</p><h1>{selected.name}</h1><p className="modal-price">{money(selected.price)}</p>
            <p className="description">{selected.description}</p>
            <dl><div><dt>Material</dt><dd>{selected.material}</dd></div><div><dt>Color</dt><dd>{selected.color}</dd></div><div><dt>Made by</dt><dd>{selected.maker}</dd></div></dl>
            <button className="primary full" onClick={() => add(selected.id)}>Add to bag · {money(selected.price)}</button>
            <button className={`secondary full ${saved.includes(selected.id) ? 'saved' : ''}`} onClick={() => toggleSaved(selected.id)}><Heart fill={saved.includes(selected.id) ? 'currentColor' : 'none'} />{saved.includes(selected.id) ? 'Saved for later' : 'Save for later'}</button>
            <div className="delivery-note"><Truck /><span><strong>Carbon-neutral delivery</strong>Free over $75 · Easy returns within 30 days</span></div>
          </div>
        </article>
      </div>}

      {!!checkout && <div className="checkout-screen">
        <header><button className="wordmark">gather<span>.</span></button>{checkout < 3 && <button className="text-link" onClick={() => setCheckout(0)}><X /> Exit checkout</button>}</header>
        {checkout < 3 ? <div className="checkout-layout">
          <section className="checkout-form">
            <button className="back-link" onClick={() => checkout === 1 ? setCheckout(0) : setCheckout(1)}><ArrowLeft /> {checkout === 1 ? 'Return to shop' : 'Back to delivery'}</button>
            <p className="kicker">Step {checkout} of 2</p><h1>{checkout === 1 ? 'Delivery details' : 'Payment'}</h1>
            {checkout === 1 ? <form onSubmit={(e) => { e.preventDefault(); setCheckout(2); window.scrollTo(0, 0) }}>
              <div className="field-grid"><label>First name<input required placeholder="Avery" /></label><label>Last name<input required placeholder="Stone" /></label></div>
              <label>Email<input required type="email" placeholder="avery@example.com" /></label>
              <label>Street address<input required placeholder="14 Field Lane" /></label>
              <div className="field-grid three"><label>City<input required placeholder="Portland" /></label><label>State<select required defaultValue=""><option value="" disabled>Select</option><option>OR</option><option>NY</option><option>CA</option></select></label><label>ZIP<input required placeholder="97205" /></label></div>
              <button className="primary full" type="submit">Continue to payment <ArrowRight /></button>
            </form> : <form onSubmit={(e) => { e.preventDefault(); completeOrder() }}>
              <div className="payment-choice"><span><i /><strong>Credit or debit card</strong></span><span>VISA · MC · AMEX</span></div>
              <label>Card number<input required inputMode="numeric" placeholder="4242 4242 4242 4242" /></label>
              <div className="field-grid"><label>Expiry<input required placeholder="MM / YY" /></label><label>Security code<input required placeholder="CVC" /></label></div>
              <label>Name on card<input required placeholder="Avery Stone" /></label>
              <button className="primary full" type="submit">Place order · {money(subtotal * 1.08)} <ArrowRight /></button>
              <p className="secure-note">Secure encrypted checkout · No real payment will be processed</p>
            </form>}
          </section>
          <aside className="order-summary"><p className="kicker">Order summary</p>{cartItems.map((item) => <div className="summary-item" key={item.id}><div><img src={item.image} alt="" /><span>{item.quantity}</span></div><p><strong>{item.name}</strong><small>{item.color}</small></p><strong>{money(item.price * item.quantity)}</strong></div>)}<dl><div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div><dt>Shipping</dt><dd>{subtotal >= 75 ? 'Complimentary' : '$8.00'}</dd></div><div><dt>Estimated tax</dt><dd>{money(subtotal * .08)}</dd></div><div className="total"><dt>Total</dt><dd>{money(subtotal * 1.08 + (subtotal >= 75 ? 0 : 8))}</dd></div></dl></aside>
        </div> : <div className="confirmation"><div className="success-mark"><Check /></div><p className="kicker">Order confirmed · {orderNumber}</p><h1>Thank you for gathering well.</h1><p>Your considered goods are being prepared. A confirmation has been sent to your email.</p><button className="primary" onClick={() => { setCheckout(0); navigate('home') }}>Return home</button></div>}
      </div>}
      {toast && <div className="toast"><Check />{toast}</div>}
    </div>
  )
}

export default App
