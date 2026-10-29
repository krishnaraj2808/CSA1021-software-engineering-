import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  Gift,
  Headphones,
  IndianRupee,
  LayoutDashboard,
  LocateFixed,
  LogOut,
  MapPin,
  Menu,
  Navigation,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Ticket,
  User,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type Screen =
  | "home"
  | "results"
  | "seats"
  | "passengers"
  | "payment"
  | "confirmation"
  | "bookings"
  | "auth"
  | "profile"
  | "admin";

const cityImages = [
  {
    city: "Chennai",
    subtitle: "Culture by the coast",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Bangalore",
    subtitle: "India's garden city",
    image:
      "https://images.unsplash.com/photo-1687158266872-fd2773fa76c6?auto=format&fit=crop&w=900&q=80",
  },
  {
    city: "Mumbai",
    subtitle: "The city of dreams",
    image:
      "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
  },
];

const buses = [
  {
    operator: "Orange Tours",
    name: "Volvo Multi-Axle",
    type: "AC Sleeper (2+1)",
    departure: "21:30",
    arrival: "05:45",
    duration: "8h 15m",
    seats: 12,
    price: 1299,
    rating: "4.7",
  },
  {
    operator: "GreenLine Travels",
    name: "Scania Premium",
    type: "AC Sleeper (2+1)",
    departure: "22:15",
    arrival: "06:30",
    duration: "8h 15m",
    seats: 7,
    price: 1499,
    rating: "4.5",
  },
  {
    operator: "KPN Travels",
    name: "BharatBenz",
    type: "AC Seater (2+2)",
    departure: "20:45",
    arrival: "05:30",
    duration: "8h 45m",
    seats: 18,
    price: 899,
    rating: "4.3",
  },
];

const cn = (...items: Array<string | false | undefined>) => items.filter(Boolean).join(" ");

function Button({
  children,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("btn", `btn-${variant}`, className)}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  icon,
  value,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  icon?: ReactNode;
  value?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("field", className)}>
      <span>{label}</span>
      <div className="field-control">
        {icon}
        <input type={type} defaultValue={value} placeholder={placeholder} />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="field-control">
        <select defaultValue={value}>{children}</select>
        <ChevronDown size={16} />
      </div>
    </label>
  );
}

function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "slate";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="BusGo home">
      <span className="logo-mark">
        <Bus size={21} />
      </span>
      <span>Bus<span>Go</span></span>
    </button>
  );
}

function Header({
  screen,
  navigate,
}: {
  screen: Screen;
  navigate: (screen: Screen) => void;
}) {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Home", "home"],
    ["Search Buses", "results"],
    ["My Bookings", "bookings"],
    ["Offers", "home"],
    ["Help", "home"],
  ] as const;
  return (
    <header className="header">
      <div className="container header-inner">
        <Logo onClick={() => navigate("home")} />
        <nav className={cn("nav", open && "nav-open")}>
          {nav.map(([label, page]) => (
            <button
              key={label}
              className={cn(screen === page && "active")}
              onClick={() => {
                navigate(page);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn bell" aria-label="Notifications">
            <Bell size={19} />
            <i />
          </button>
          <Button variant="secondary" onClick={() => navigate("auth")}>
            <User size={17} /> Login / Sign Up
          </Button>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo onClick={() => navigate("home")} />
          <p>India's simple, safe and reliable way to book bus journeys.</p>
          <div className="trust-line"><ShieldCheck size={18} /> Secure bookings. Always.</div>
        </div>
        {[
          ["Company", "About us", "Careers", "Press"],
          ["Support", "Help centre", "Cancellation", "Contact us"],
          ["Legal", "Privacy", "Terms", "Refund policy"],
        ].map(([title, ...links]) => (
          <div key={title}>
            <strong>{title}</strong>
            {links.map((link) => <button key={link}>{link}</button>)}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© 2025 BusGo Technologies Pvt. Ltd.</span>
        <span>Made for journeys across India</span>
      </div>
    </footer>
  );
}

function SearchCard({ onSearch, compact = false }: { onSearch: () => void; compact?: boolean }) {
  return (
    <div className={cn("search-card", compact && "compact-search")}>
      <Field label="From" value="Chennai" icon={<LocateFixed size={19} />} />
      <button className="swap" aria-label="Swap locations">⇄</button>
      <Field label="To" value="Bangalore" icon={<MapPin size={19} />} />
      <Field label="Journey date" value="2025-12-18" type="date" icon={<CalendarDays size={19} />} />
      {!compact && <Field label="Return date" value="2025-12-21" type="date" icon={<CalendarDays size={19} />} />}
      <SelectField label="Passengers" value="1">
        <option value="1">1 Passenger</option>
        <option value="2">2 Passengers</option>
        <option value="3">3 Passengers</option>
      </SelectField>
      <Button onClick={onSearch} className="search-button">
        <Search size={19} /> Search buses
      </Button>
    </div>
  );
}

function Home({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-orb one" />
        <div className="hero-orb two" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Badge tone="blue"><BadgeCheck size={14} /> Trusted by 2M+ travellers</Badge>
            <h1>Book your bus journey <em>easily.</em></h1>
            <p>Compare operators, choose your perfect seat, and travel anywhere across India—all in a few clicks.</p>
            <div className="hero-stats">
              <span><b>3,500+</b> Bus operators</span>
              <span><b>50K+</b> Routes</span>
              <span><b>4.8/5</b> Traveller rating</span>
            </div>
          </div>
          <div className="bus-visual">
            <img
              src="https://images.unsplash.com/photo-1634721285014-9b17ad5a230f?auto=format&fit=crop&w=1100&q=85"
              alt="A scenic highway through the mountains"
            />
            <div className="floating-card rating-card"><Star size={18} fill="currentColor" /> 4.8 <span>Excellent</span></div>
            <div className="floating-card safe-card"><ShieldCheck size={19} /> Safe & verified</div>
          </div>
          <div className="hero-search"><SearchCard onSearch={() => navigate("results")} /></div>
        </div>
      </section>

      <main>
        <section className="section container">
          <div className="section-heading split">
            <div><span className="eyebrow">Popular right now</span><h2>Routes travellers love</h2></div>
            <button onClick={() => navigate("results")}>View all routes <ArrowRight size={17} /></button>
          </div>
          <div className="route-grid">
            {[
              ["Chennai", "Bangalore", "6h 30m", "₹699"],
              ["Bangalore", "Hyderabad", "8h 15m", "₹849"],
              ["Coimbatore", "Chennai", "7h 05m", "₹749"],
              ["Mumbai", "Pune", "3h 45m", "₹449"],
            ].map(([from, to, time, price]) => (
              <button className="route-card" key={`${from}${to}`} onClick={() => navigate("results")}>
                <div className="route-icon"><Bus size={20} /></div>
                <div><strong>{from} <ArrowRight size={14} /> {to}</strong><span>{time} · from {price}</span></div>
                <ChevronDown size={18} className="route-arrow" />
              </button>
            ))}
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="section-heading"><span className="eyebrow">Explore more</span><h2>Popular destinations</h2><p>Weekend escapes and city adventures, just a bus ride away.</p></div>
            <div className="destination-grid">
              {cityImages.map((item) => (
                <button className="destination-card" key={item.city} onClick={() => navigate("results")}>
                  <img src={item.image} alt={`${item.city} travel destination`} />
                  <div><span>{item.subtitle}</span><strong>{item.city}</strong><small>Explore routes <ArrowRight size={14} /></small></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="offer-banner">
            <div className="offer-icon"><Gift size={28} /></div>
            <div><Badge tone="amber">LIMITED TIME</Badge><h2>Get 20% off your first journey</h2><p>Use code <b>FIRST20</b> at checkout. Maximum discount ₹300.</p></div>
            <Button variant="secondary" onClick={() => navigate("results")}>Book now <ArrowRight size={17} /></Button>
          </div>
        </section>

        <section className="section container">
          <div className="section-heading center"><span className="eyebrow">The BusGo difference</span><h2>Travel confidently, every time</h2></div>
          <div className="feature-grid">
            {[
              [ShieldCheck, "Safe & verified", "Every operator is verified for quality and safety."],
              [Ticket, "Easy booking", "Book your seat in less than two minutes."],
              [WalletCards, "Secure payments", "Your payments and personal data stay protected."],
              [Headphones, "24/7 support", "Real people are always here when you need us."],
            ].map(([Icon, title, text]) => (
              <div className="feature-card" key={String(title)}>
                <span><Icon size={23} /></span><h3>{String(title)}</h3><p>{String(text)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section review-section">
          <div className="container review-wrap">
            <div>
              <span className="eyebrow">Real journeys, real stories</span>
              <h2>Loved by travellers across India</h2>
              <p>More than 2 million people choose BusGo for journeys that feel effortless.</p>
              <div className="big-rating"><strong>4.8</strong><span>★★★★★<small>12,400+ reviews</small></span></div>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <blockquote>“The seat selection was incredibly simple and the boarding updates were spot on. BusGo is now my default for every trip home.”</blockquote>
              <div className="reviewer"><span>AK</span><div><strong>Ananya Krishnan</strong><small>Chennai → Bangalore</small></div><Badge tone="green"><Check size={12} /> Verified</Badge></div>
            </div>
          </div>
        </section>
      </main>
      <Footer navigate={navigate} />
    </>
  );
}

function FilterSidebar() {
  return (
    <aside className="filters card">
      <div className="filter-title"><strong>Filters</strong><button>Clear all</button></div>
      {[
        ["Bus type", ["AC Sleeper", "AC Seater", "Non-AC", "Volvo / Scania"]],
        ["Departure time", ["Before 6 AM", "6 AM – 12 PM", "12 PM – 6 PM", "After 6 PM"]],
        ["Seat type", ["Sleeper", "Seater"]],
        ["Bus operator", ["Orange Tours", "GreenLine Travels", "KPN Travels"]],
      ].map(([title, options]) => (
        <div className="filter-group" key={String(title)}>
          <strong>{String(title)}</strong>
          {(options as string[]).map((option, index) => (
            <label key={option}><input type="checkbox" defaultChecked={index === 0 && title === "Bus type"} /> <span>{option}</span></label>
          ))}
        </div>
      ))}
      <div className="filter-group">
        <strong>Price range</strong>
        <input type="range" min="400" max="2500" defaultValue="1800" />
        <div className="range-labels"><span>₹400</span><span>₹2,500</span></div>
      </div>
    </aside>
  );
}

function Results({ navigate }: { navigate: (screen: Screen) => void }) {
  const [sort, setSort] = useState("Recommended");
  return (
    <main className="page-bg">
      <section className="search-summary">
        <div className="container">
          <button className="back-link" onClick={() => navigate("home")}><ArrowLeft size={17} /> Back</button>
          <SearchCard compact onSearch={() => undefined} />
        </div>
      </section>
      <div className="container results-layout">
        <FilterSidebar />
        <section className="results-main">
          <div className="results-head">
            <div><h1>Chennai to Bangalore buses</h1><p>Wednesday, 18 Dec · 24 buses found</p></div>
            <div className="sort-tabs">
              {["Recommended", "Price", "Departure", "Duration"].map((item) => (
                <button key={item} className={sort === item ? "active" : ""} onClick={() => setSort(item)}>{item}</button>
              ))}
            </div>
          </div>
          <div className="notice"><BadgeCheck size={18} /> Free cancellation available on select buses</div>
          {buses.map((bus, index) => (
            <article className="bus-card card" key={bus.operator}>
              <div className="bus-card-top">
                <div className="operator">
                  <div className={`operator-logo logo-${index}`}><Bus size={24} /></div>
                  <div><h2>{bus.operator}</h2><p>{bus.name} · {bus.type}</p><span><Star size={13} fill="currentColor" /> {bus.rating} · 680 ratings</span></div>
                </div>
                <div className="timings">
                  <div><strong>{bus.departure}</strong><span>Chennai</span></div>
                  <div className="duration"><span>{bus.duration}</span><i /><small>Direct</small></div>
                  <div><strong>{bus.arrival}</strong><span>Bangalore</span></div>
                </div>
                <div className="price"><span>Starts from</span><strong>₹{bus.price.toLocaleString("en-IN")}</strong><small>per seat</small></div>
              </div>
              <div className="bus-meta">
                <span><MapPin size={15} /> Koyambedu → Madiwala</span>
                <span className="seat-count"><BadgeCheck size={15} /> {bus.seats} seats available</span>
                <button>Boarding & dropping points <ChevronDown size={15} /></button>
                <Button onClick={() => navigate("seats")}>View seats</Button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="stepper">
      {["Select seats", "Passenger details", "Payment", "Confirmation"].map((label, index) => (
        <div className={cn(index + 1 <= step && "done", index + 1 === step && "current")} key={label}>
          <span>{index + 1 < step ? <Check size={14} /> : index + 1}</span><small>{label}</small>
        </div>
      ))}
    </div>
  );
}

const reservedSeats = ["L2", "L5", "L8", "L11", "U3", "U7"];
const femaleSeats = ["L6", "U10"];

function SeatSelection({ navigate }: { navigate: (screen: Screen) => void }) {
  const [selected, setSelected] = useState<string[]>(["L3"]);
  const toggleSeat = (seat: string) => {
    if (reservedSeats.includes(seat) || femaleSeats.includes(seat)) return;
    setSelected((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };
  const deck = (prefix: string) => (
    <div className="seat-map">
      <div className="driver"><span /><small>Driver</small></div>
      {Array.from({ length: 12 }, (_, index) => `${prefix}${index + 1}`).map((seat, index) => (
        <button
          key={seat}
          onClick={() => toggleSeat(seat)}
          className={cn(
            "seat",
            selected.includes(seat) && "selected",
            reservedSeats.includes(seat) && "reserved",
            femaleSeats.includes(seat) && "female",
            index % 3 === 2 && "aisle"
          )}
          disabled={reservedSeats.includes(seat) || femaleSeats.includes(seat)}
          aria-label={`Seat ${seat}`}
        >
          <span>{seat}</span>
        </button>
      ))}
    </div>
  );
  return (
    <main className="page-bg">
      <div className="container flow-header">
        <button className="back-link" onClick={() => navigate("results")}><ArrowLeft size={17} /> Back to buses</button>
        <Stepper step={1} />
      </div>
      <div className="container flow-layout">
        <section>
          <div className="card journey-card">
            <div><Badge tone="blue">AC SLEEPER</Badge><h1>Orange Tours · Volvo Multi-Axle</h1><p>Wednesday, 18 December 2025</p></div>
            <div className="mini-route"><strong>21:30</strong><span><Bus size={16} /> 8h 15m</span><strong>05:45 <small>+1 day</small></strong></div>
            <div className="mini-places"><span>Chennai · Koyambedu</span><span>Bangalore · Madiwala</span></div>
          </div>
          <div className="card seat-card">
            <div className="seat-heading"><div><h2>Choose your seats</h2><p>Select up to 6 seats. Lower deck seats shown first.</p></div><Badge tone="green">12 seats available</Badge></div>
            <div className="deck-tabs"><button className="active">Lower deck</button><button>Upper deck</button></div>
            <div className="seat-content">
              {deck("L")}
              <div className="seat-guide">
                <strong>Seat legend</strong>
                {[["Available", ""], ["Selected", "selected"], ["Reserved", "reserved"], ["Female reserved", "female"]].map(([text, className]) => (
                  <span key={text}><i className={className} /> {text}</span>
                ))}
                <div className="seat-tip"><CircleHelp size={18} /><p><b>Tip</b> Front seats offer a smoother ride. Rear seats have more privacy.</p></div>
              </div>
            </div>
          </div>
          <div className="card points-card">
            <div><h2>Boarding point</h2><label><input type="radio" defaultChecked name="boarding" /><span><strong>Koyambedu Omni Bus Stand</strong><small>21:15 · Near CMBT Gate 5, Chennai</small></span></label><label><input type="radio" name="boarding" /><span><strong>Guindy</strong><small>21:45 · Near Kathipara flyover</small></span></label></div>
            <div><h2>Dropping point</h2><label><input type="radio" defaultChecked name="drop" /><span><strong>Madiwala</strong><small>05:45 · Near Police Station, Bangalore</small></span></label><label><input type="radio" name="drop" /><span><strong>Silk Board</strong><small>06:00 · BMTC Bus Stop</small></span></label></div>
          </div>
        </section>
        <aside className="card fare-card">
          <h2>Booking summary</h2>
          <div className="fare-row"><span>Selected seats</span><strong>{selected.length ? selected.join(", ") : "None"}</strong></div>
          <div className="selected-seat-chips">{selected.map((seat) => <Badge key={seat}>{seat} <button onClick={() => toggleSeat(seat)}>×</button></Badge>)}</div>
          <hr />
          <div className="fare-row"><span>Seat fare</span><span>₹{selected.length * 1299}</span></div>
          <div className="fare-row"><span>Taxes & fees</span><span>₹{selected.length * 104}</span></div>
          <div className="fare-row total"><span>Total amount</span><strong>₹{selected.length * 1403}</strong></div>
          <Button className="full" disabled={!selected.length} onClick={() => navigate("passengers")}>Continue <ArrowRight size={17} /></Button>
          <small className="secure-note"><ShieldCheck size={14} /> Safe and secure checkout</small>
        </aside>
      </div>
    </main>
  );
}

function PassengerDetails({ navigate }: { navigate: (screen: Screen) => void }) {
  const submit = (event: FormEvent) => { event.preventDefault(); navigate("payment"); };
  return (
    <main className="page-bg">
      <div className="container flow-header"><button className="back-link" onClick={() => navigate("seats")}><ArrowLeft size={17} /> Back to seats</button><Stepper step={2} /></div>
      <div className="container flow-layout">
        <form className="card details-form" onSubmit={submit}>
          <div className="form-title"><span><User size={21} /></span><div><h1>Passenger details</h1><p>Enter details exactly as they appear on the passenger's ID.</p></div></div>
          <div className="passenger-label"><Badge>Passenger 1</Badge><strong>Seat L3</strong></div>
          <div className="form-grid">
            <Field label="Full name" value="Ananya Krishnan" className="wide" />
            <Field label="Age" value="28" type="number" />
            <SelectField label="Gender" value="female"><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></SelectField>
            <Field label="Phone number" value="+91 98765 43210" />
            <Field label="Email address" value="ananya@example.com" type="email" />
            <SelectField label="ID type" value="aadhaar"><option value="aadhaar">Aadhaar Card</option><option value="passport">Passport</option><option value="license">Driving Licence</option></SelectField>
            <Field label="ID number" value="XXXX XXXX 1847" />
            <Field label="Emergency contact" placeholder="+91 Phone number" className="wide" />
          </div>
          <label className="terms"><input type="checkbox" required defaultChecked /><span>I confirm these details are correct and agree to the <button type="button">terms and conditions</button>.</span></label>
          <Button type="submit" className="form-submit">Continue to payment <ArrowRight size={17} /></Button>
        </form>
        <JourneySummary />
      </div>
    </main>
  );
}

function JourneySummary() {
  return (
    <aside className="card summary-card">
      <Badge tone="blue">YOUR JOURNEY</Badge>
      <h2>Chennai → Bangalore</h2>
      <p>Wed, 18 Dec 2025</p>
      <div className="summary-route"><i /><div><strong>21:30 · Chennai</strong><span>Koyambedu Omni Bus Stand</span></div><em /><div><strong>05:45 · Bangalore</strong><span>Madiwala</span></div></div>
      <div className="summary-bus"><Bus size={20} /><div><strong>Orange Tours</strong><span>Volvo Multi-Axle AC Sleeper</span></div></div>
      <div className="fare-row"><span>Seat L3</span><strong>₹1,299</strong></div>
      <div className="fare-row"><span>Taxes & fees</span><span>₹104</span></div>
      <div className="fare-row total"><span>Total</span><strong>₹1,403</strong></div>
    </aside>
  );
}

function Payment({ navigate }: { navigate: (screen: Screen) => void }) {
  const [method, setMethod] = useState("card");
  return (
    <main className="page-bg">
      <div className="container flow-header"><button className="back-link" onClick={() => navigate("passengers")}><ArrowLeft size={17} /> Passenger details</button><Stepper step={3} /></div>
      <div className="container flow-layout">
        <section className="card payment-card">
          <div className="form-title"><span><CreditCard size={21} /></span><div><h1>Choose payment method</h1><p>All transactions are encrypted and secure.</p></div></div>
          <div className="payment-layout">
            <div className="payment-methods">
              {[
                ["upi", <QrCode size={20} />, "UPI"],
                ["card", <CreditCard size={20} />, "Credit / Debit Card"],
                ["bank", <LayoutDashboard size={20} />, "Net Banking"],
                ["wallet", <WalletCards size={20} />, "Wallet"],
              ].map(([id, icon, label]) => <button className={method === id ? "active" : ""} key={String(id)} onClick={() => setMethod(String(id))}>{icon}{label}</button>)}
            </div>
            <div className="payment-fields">
              <Badge tone="green"><ShieldCheck size={13} /> PCI DSS SECURED</Badge>
              {method === "card" ? (
                <>
                  <Field label="Card number" value="4242 4242 4242 4242" icon={<CreditCard size={18} />} />
                  <Field label="Name on card" value="ANANYA KRISHNAN" />
                  <div className="two-col"><Field label="Expiry date" value="12/28" /><Field label="CVV" value="•••" /></div>
                  <label className="terms"><input type="checkbox" defaultChecked /> Save this card securely for future payments</label>
                </>
              ) : (
                <div className="method-placeholder"><QrCode size={54} /><h3>Pay securely with {method.toUpperCase()}</h3><p>You will be guided through the next step after clicking Pay now.</p></div>
              )}
            </div>
          </div>
        </section>
        <aside className="card checkout-summary">
          <h2>Payment summary</h2>
          <div className="passenger-mini"><span>AK</span><div><strong>Ananya Krishnan</strong><small>Seat L3 · Female, 28</small></div></div>
          <hr />
          <div className="fare-row"><span>Base fare</span><span>₹1,299</span></div>
          <div className="fare-row"><span>Taxes</span><span>₹65</span></div>
          <div className="fare-row"><span>Service fee</span><span>₹39</span></div>
          <div className="fare-row discount"><span>FIRST20 discount</span><span>− ₹300</span></div>
          <div className="coupon"><input placeholder="Coupon code" /><button>Apply</button></div>
          <div className="fare-row grand-total"><span>Total payable</span><strong>₹1,103</strong></div>
          <Button className="full" onClick={() => navigate("confirmation")}><ShieldCheck size={18} /> Pay ₹1,103 securely</Button>
          <small className="secure-note"><ShieldCheck size={14} /> 256-bit SSL encrypted payment</small>
        </aside>
      </div>
    </main>
  );
}

function Confirmation({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="page-bg confirmation-page">
      <div className="container confirmation-wrap">
        <div className="success-mark"><Check size={38} /></div>
        <Badge tone="green">PAYMENT SUCCESSFUL</Badge>
        <h1>Your journey is confirmed!</h1>
        <p>We've sent your e-ticket and journey details to ananya@example.com</p>
        <div className="ticket-card">
          <div className="ticket-top">
            <Logo onClick={() => navigate("home")} />
            <div><span>BOOKING ID / PNR</span><strong>BG7K29M4</strong></div>
          </div>
          <div className="ticket-main">
            <div className="ticket-info">
              <Badge tone="blue">AC SLEEPER</Badge>
              <h2>Orange Tours</h2><p>Volvo Multi-Axle · TN 01 AB 4928</p>
              <div className="ticket-route">
                <div><strong>21:30</strong><span>Wed, 18 Dec</span><b>Chennai</b><small>Koyambedu, Gate 5</small></div>
                <div><Clock3 size={16} /><span>8h 15m</span><i /><Bus size={19} /></div>
                <div><strong>05:45</strong><span>Thu, 19 Dec</span><b>Bangalore</b><small>Madiwala Police Station</small></div>
              </div>
              <div className="ticket-passenger"><span>AK</span><div><small>PASSENGER</small><strong>Ananya Krishnan</strong></div><div><small>SEAT</small><strong>L3</strong></div><div><small>TOTAL FARE</small><strong>₹1,103</strong></div></div>
            </div>
            <div className="qr-section"><div className="fake-qr"><QrCode size={102} /></div><strong>Scan to verify ticket</strong><small>PNR: BG7K29M4</small></div>
          </div>
          <div className="ticket-note"><CircleHelp size={17} /> Please arrive at the boarding point at least 15 minutes before departure.</div>
        </div>
        <div className="confirmation-actions">
          <Button><Download size={17} /> Download ticket</Button>
          <Button variant="secondary" onClick={() => navigate("bookings")}><Ticket size={17} /> View booking</Button>
          <Button variant="ghost">Share ticket</Button>
          <Button variant="ghost" onClick={() => navigate("home")}>Go to home</Button>
        </div>
      </div>
    </main>
  );
}

function MyBookings({ navigate }: { navigate: (screen: Screen) => void }) {
  const [tab, setTab] = useState("Upcoming");
  return (
    <main className="page-bg">
      <div className="container standard-page">
        <div className="page-title"><div><span className="eyebrow">Your journeys</span><h1>My bookings</h1><p>Manage upcoming journeys and revisit your travel history.</p></div><Button onClick={() => navigate("home")}><Search size={17} /> Book a new trip</Button></div>
        <div className="tabs">{["Upcoming", "Completed", "Cancelled"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}<Badge tone="slate">{item === "Upcoming" ? 2 : item === "Completed" ? 8 : 1}</Badge></button>)}</div>
        {tab === "Upcoming" ? (
          <div className="booking-list">
            <article className="card booking-card">
              <div className="booking-date"><span>DEC</span><strong>18</strong><small>WED</small></div>
              <div className="booking-content">
                <div className="booking-route"><div><span>21:30</span><strong>Chennai</strong></div><div><Bus size={17} /><i /><small>8h 15m</small></div><div><span>05:45</span><strong>Bangalore</strong></div></div>
                <p>Orange Tours · Volvo Multi-Axle AC Sleeper · Seat L3</p>
                <div className="booking-tags"><Badge tone="green">CONFIRMED</Badge><span>PNR BG7K29M4</span><span>₹1,103</span></div>
              </div>
              <div className="booking-actions"><Button variant="secondary">View ticket</Button><Button variant="ghost"><Download size={16} /> Download</Button><button>Reschedule</button><button className="danger-link">Cancel booking</button></div>
            </article>
            <article className="card booking-card faded">
              <div className="booking-date"><span>JAN</span><strong>04</strong><small>SUN</small></div>
              <div className="booking-content"><div className="booking-route"><div><span>22:00</span><strong>Bangalore</strong></div><div><Bus size={17} /><i /><small>9h 10m</small></div><div><span>07:10</span><strong>Hyderabad</strong></div></div><p>GreenLine Travels · Scania AC Sleeper · Seat U8</p><div className="booking-tags"><Badge tone="amber">PAYMENT PENDING</Badge><span>Expires in 09:42</span></div></div>
              <div className="booking-actions"><Button>Complete payment</Button><button className="danger-link">Remove</button></div>
            </article>
          </div>
        ) : <div className="card empty-state"><Ticket size={42} /><h2>{tab} trips</h2><p>Your {tab.toLowerCase()} journeys will appear here.</p></div>}
      </div>
    </main>
  );
}

function Auth({ navigate }: { navigate: (screen: Screen) => void }) {
  const [signup, setSignup] = useState(false);
  return (
    <main className="auth-page">
      <div className="auth-brand">
        <Logo onClick={() => navigate("home")} />
        <div><Badge tone="blue">YOUR JOURNEY STARTS HERE</Badge><h1>More places.<br />Fewer worries.</h1><p>Join millions of travellers booking safe, comfortable bus journeys every day.</p></div>
        <img src="https://images.unsplash.com/photo-1634721285014-9b17ad5a230f?auto=format&fit=crop&w=1200&q=85" alt="Scenic mountain road" />
      </div>
      <section className="auth-form-wrap">
        <button className="auth-close" onClick={() => navigate("home")}><X /></button>
        <div className="auth-form">
          <h1>{signup ? "Create your account" : "Welcome back"}</h1><p>{signup ? "Start booking smarter journeys today." : "Sign in to manage bookings and saved passengers."}</p>
          <Button variant="secondary" className="google-btn"><b>G</b> Continue with Google</Button>
          <div className="or"><span>or continue with email</span></div>
          {signup && <Field label="Full name" placeholder="Enter your full name" />}
          <Field label="Email or mobile number" value="ananya@example.com" />
          <Field label="Password" value="password" type="password" />
          {!signup && <div className="forgot-row"><label><input type="checkbox" defaultChecked /> Remember me</label><button>Forgot password?</button></div>}
          <Button className="full" onClick={() => navigate("profile")}>{signup ? "Create account" : "Sign in"} <ArrowRight size={17} /></Button>
          <button className="otp-link">Sign in with OTP instead</button>
          <p className="switch-auth">{signup ? "Already have an account?" : "New to BusGo?"} <button onClick={() => setSignup(!signup)}>{signup ? "Sign in" : "Create account"}</button></p>
        </div>
      </section>
    </main>
  );
}

function Profile({ navigate }: { navigate: (screen: Screen) => void }) {
  const [tab, setTab] = useState("Personal information");
  const items = ["Personal information", "Saved passengers", "Payment methods", "Booking history", "Notifications", "Settings"];
  return (
    <main className="page-bg">
      <div className="container standard-page">
        <div className="page-title"><div><span className="eyebrow">Your account</span><h1>Profile & settings</h1></div></div>
        <div className="profile-layout">
          <aside className="card profile-nav">
            <div className="profile-person"><span>AK</span><div><strong>Ananya Krishnan</strong><small>ananya@example.com</small></div></div>
            {items.map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item === "Settings" ? <Settings size={18} /> : <User size={18} />}{item}<ArrowRight size={15} /></button>)}
            <button className="logout" onClick={() => navigate("home")}><LogOut size={18} /> Log out</button>
          </aside>
          <section className="card profile-content">
            <div className="content-head"><div><h2>{tab}</h2><p>Keep your account details up to date.</p></div><Button variant="secondary">Edit details</Button></div>
            {tab === "Personal information" ? (
              <div className="profile-details">
                <div><span>Full name</span><strong>Ananya Krishnan</strong></div><div><span>Email address</span><strong>ananya@example.com</strong><Badge tone="green">Verified</Badge></div><div><span>Mobile number</span><strong>+91 98765 43210</strong><Badge tone="green">Verified</Badge></div><div><span>Date of birth</span><strong>14 March 1997</strong></div><div><span>Gender</span><strong>Female</strong></div><div><span>Home city</span><strong>Chennai, Tamil Nadu</strong></div>
              </div>
            ) : <div className="empty-state"><User size={40} /><h2>{tab}</h2><p>Manage your {tab.toLowerCase()} here.</p><Button>Add new</Button></div>}
          </section>
        </div>
      </div>
    </main>
  );
}

function Admin({ navigate }: { navigate: (screen: Screen) => void }) {
  const stats = [
    ["Total bookings", "24,892", "+12.5%", Ticket],
    ["Total revenue", "₹3.84 Cr", "+8.2%", IndianRupee],
    ["Active buses", "1,284", "+3.1%", Bus],
    ["Registered users", "2.1L", "+18.4%", Users],
  ] as const;
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Logo onClick={() => navigate("home")} />
        <small>WORKSPACE</small>
        {[
          [LayoutDashboard, "Overview"], [Ticket, "Bookings"], [Bus, "Bus management"], [Navigation, "Routes"], [CalendarDays, "Schedules"], [Users, "Users"], [WalletCards, "Refunds"], [Gift, "Offers & coupons"], [Settings, "Reports"],
        ].map(([Icon, label], index) => <button className={index === 0 ? "active" : ""} key={String(label)}><Icon size={18} /> {String(label)}</button>)}
        <div className="admin-user"><span>SK</span><div><strong>Sanjay Kumar</strong><small>Super admin</small></div><ChevronDown size={15} /></div>
      </aside>
      <section className="admin-main">
        <header><div><h1>Good morning, Sanjay</h1><p>Here's what's happening with BusGo today.</p></div><div><button className="icon-btn"><Bell size={19} /></button><Button><Bus size={17} /> Add new bus</Button></div></header>
        <div className="admin-date"><CalendarDays size={17} /> Dec 12 – Dec 18, 2025 <ChevronDown size={15} /></div>
        <div className="stats-grid">
          {stats.map(([label, value, growth, Icon], index) => <article className="stat-card card" key={label}><div><span>{label}</span><strong>{value}</strong><small><b>{growth}</b> vs last week</small></div><i className={`stat-${index}`}><Icon size={22} /></i></article>)}
        </div>
        <div className="admin-grid">
          <article className="card chart-card">
            <div className="card-head"><div><h2>Booking analytics</h2><p>Bookings over the last 7 days</p></div><SelectField label="" value="week"><option value="week">This week</option></SelectField></div>
            <div className="chart">
              {[42, 58, 48, 72, 66, 90, 78].map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><span>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}
            </div>
          </article>
          <article className="card route-performance">
            <div className="card-head"><div><h2>Top routes</h2><p>By booking volume</p></div><button>View report</button></div>
            {[
              ["Chennai → Bangalore", "3,482", "92%"],
              ["Mumbai → Pune", "2,940", "84%"],
              ["Bangalore → Hyderabad", "2,516", "78%"],
              ["Chennai → Coimbatore", "2,184", "70%"],
            ].map(([route, count, width]) => <div className="route-progress" key={route}><div><strong>{route}</strong><span>{count}</span></div><i><b style={{ width }} /></i></div>)}
          </article>
        </div>
        <article className="card recent-table">
          <div className="card-head"><div><h2>Recent bookings</h2><p>Latest customer transactions</p></div><button>View all bookings <ArrowRight size={16} /></button></div>
          <div className="table-row table-head"><span>Booking ID</span><span>Passenger</span><span>Route</span><span>Journey date</span><span>Amount</span><span>Status</span></div>
          {[
            ["#BG89241", "Ananya Krishnan", "Chennai → Bangalore", "18 Dec 2025", "₹1,103", "Confirmed"],
            ["#BG89240", "Rahul Mehta", "Mumbai → Pune", "18 Dec 2025", "₹748", "Confirmed"],
            ["#BG89239", "Meera Iyer", "Hyderabad → Bangalore", "19 Dec 2025", "₹1,599", "Pending"],
            ["#BG89238", "Arjun Nair", "Coimbatore → Chennai", "20 Dec 2025", "₹1,248", "Cancelled"],
          ].map((row) => <div className="table-row" key={row[0]}>{row.slice(0, 5).map((cell) => <span key={cell}>{cell}</span>)}<span><Badge tone={row[5] === "Confirmed" ? "green" : row[5] === "Pending" ? "amber" : "red"}>{row[5]}</Badge></span></div>)}
        </article>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const noHeader = ["auth", "admin"].includes(screen);
  return (
    <>
      {!noHeader && <Header screen={screen} navigate={navigate} />}
      {screen === "home" && <Home navigate={navigate} />}
      {screen === "results" && <Results navigate={navigate} />}
      {screen === "seats" && <SeatSelection navigate={navigate} />}
      {screen === "passengers" && <PassengerDetails navigate={navigate} />}
      {screen === "payment" && <Payment navigate={navigate} />}
      {screen === "confirmation" && <Confirmation navigate={navigate} />}
      {screen === "bookings" && <MyBookings navigate={navigate} />}
      {screen === "auth" && <Auth navigate={navigate} />}
      {screen === "profile" && <Profile navigate={navigate} />}
      {screen === "admin" && <Admin navigate={navigate} />}
      {screen !== "admin" && screen !== "auth" && (
        <button className="admin-shortcut" onClick={() => navigate("admin")} title="Open admin dashboard">
          <LayoutDashboard size={18} /><span>Admin</span>
        </button>
      )}
    </>
  );
}
