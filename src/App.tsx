import React, { useState, useEffect, useRef } from 'react';
import { MENU_ITEMS, MOKAI_GALLERY_SPACES } from './data';
import { MenuItem, CartItem, TableBooking } from './types';

// Components
import WellnessMatchaQuiz from './components/WellnessMatchaQuiz';
import TableBookingView from './components/TableBookingView';
import ItemDetailModal from './components/ItemDetailModal';
import CartDrawer from './components/CartDrawer';

// Icons
import {
  ShoppingBag,
  Compass,
  UtensilsCrossed,
  Heart,
  Calendar,
  Sparkles,
  Search,
  Check,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  BookmarkCheck,
  Instagram,
  Coffee,
  X,
  Plus,
  Minus
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'wellness' | 'booking'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [menuFilter, setMenuFilter] = useState<'all' | 'breakfast' | 'salads' | 'pastries' | 'drinks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [hoveredSpot, setHoveredSpot] = useState<{ title: string; txt: string } | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [userBookings, setUserBookings] = useState<TableBooking[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  // AutoPlay logic for background video bypasses browser blocking policies
  useEffect(() => {
    if (activeTab === 'home' && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, [activeTab]);

  // Load cart and bookings from localStorage on mount
  useEffect(() => {
    const cachedCart = localStorage.getItem('you_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const cachedBookings = localStorage.getItem('you_bookings');
    if (cachedBookings) {
      try {
        setUserBookings(JSON.parse(cachedBookings));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync cart shifts
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('you_cart', JSON.stringify(newCart));
  };

  const openNotification = (msg: string) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4500);
  };

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selections: { [key: string]: { name: string; price: number } },
    specialInstructions: string = ''
  ) => {
    // Generate unique composite key based on selections structure to isolate different modifications
    const hashcode = Object.values(selections)
      .map((s) => s.name)
      .join('|');
    const compositeCartId = `${item.id}-${hashcode}-${specialInstructions}`;

    const existingIndex = cart.findIndex((c) => c.cartId === compositeCartId);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        cartId: compositeCartId,
        item,
        quantity,
        selectedSelections: selections,
        specialInstructions
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleUpdateCartQty = (cartId: string, deltaQty: number) => {
    if (deltaQty <= 0) {
      handleRemoveCartItem(cartId);
      return;
    }
    const updated = cart.map((c) => (c.cartId === cartId ? { ...c, quantity: deltaQty } : c));
    saveCart(updated);
  };

  const handleRemoveCartItem = (cartId: string) => {
    const filtered = cart.filter((c) => c.cartId !== cartId);
    saveCart(filtered);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleAddBooking = (newBooking: TableBooking) => {
    const updated = [...userBookings, newBooking];
    setUserBookings(updated);
    localStorage.setItem('you_bookings', JSON.stringify(updated));
  };

  // Toggle dietary chips
  const handleToggleDietary = (filterTag: string) => {
    if (dietaryFilters.includes(filterTag)) {
      setDietaryFilters(dietaryFilters.filter((t) => t !== filterTag));
    } else {
      setDietaryFilters([...dietaryFilters, filterTag]);
    }
  };

  // Render variables helper
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = menuFilter === 'all' || item.category === menuFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary =
      dietaryFilters.length === 0 || dietaryFilters.every((tag) => item.tags.includes(tag as any));

    return matchesCategory && matchesSearch && matchesDietary;
  });

  const cartItemsCount = cart.reduce((sums, c) => sums + c.quantity, 0);
  const currentGallery = MOKAI_GALLERY_SPACES[activeGalleryIdx];

  return (
    <div className="min-h-screen bg-[#fdf8f6] text-[#1c1b1a] relative flex flex-col font-sans selection:bg-[#705a49]/15">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 w-full bg-[#fdf8f6]/85 backdrop-blur-md z-[500] border-b border-[#ccc6bb]/25 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center h-20">
          
          {/* Typographic cursive Brand logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group text-left"
          >
            <div className="w-9 h-9 bg-brand-wood rounded-full flex items-center justify-center text-[#f2edea] tracking-wide font-serif shadow-md transition-all group-hover:rotate-12">
              M
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
                YOU
              </h1>
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-outline -mt-1 block">
                KASGNJ
              </span>
            </div>
          </button>

          {/* Nav Links menu desktop */}
          <nav className="hidden md:flex gap-1 items-center bg-brand-clay/35 border border-[#ccc6bb]/20 p-1.5 rounded-full">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase font-sans transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#fcfbf9] text-brand-dark shadow-sm'
                  : 'text-brand-outline hover:text-brand-dark'
              }`}
            >
              Our Sanctuary
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase font-sans transition-all duration-200 cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#fcfbf9] text-brand-dark shadow-sm'
                  : 'text-brand-outline hover:text-brand-dark'
              }`}
            >
              Culinary Menu
            </button>
            <button
              onClick={() => setActiveTab('wellness')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase font-sans transition-all duration-200 cursor-pointer ${
                activeTab === 'wellness'
                  ? 'bg-[#fcfbf9] text-brand-dark shadow-sm'
                  : 'text-brand-outline hover:text-brand-dark'
              }`}
            >
              Mindfulness Bar
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase font-sans transition-all duration-200 cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-[#fcfbf9] text-brand-dark shadow-sm'
                  : 'text-brand-outline hover:text-brand-dark'
              }`}
            >
              Seating Reservation
            </button>
          </nav>

          {/* Right quick actions bag helper */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCartOpen(true);
              }}
              className="relative w-11 h-11 bg-brand-clay-light hover:bg-brand-clay-high border border-[#ccc6bb]/30 rounded-full flex items-center justify-center transition-all cursor-pointer text-brand-dark active:scale-95 shadow-sm"
              aria-label="Active Bag"
            >
              <ShoppingBag className="w-5 h-5 text-brand-outline" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-matcha text-white text-[10px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-[#fdf8f6] animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE LOWER NAV TAB BAR */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] bg-[#fdf8f6]/95 backdrop-blur-md border border-[#ccc6bb]/40 p-1.5 rounded-2xl shadow-xl z-[490] flex justify-between items-center">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 py-3 px-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeTab === 'home' ? 'bg-brand-clay-light text-brand-dark' : 'text-brand-outline'
          }`}
        >
          <Compass className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Sanctuary</span>
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-3 px-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeTab === 'menu' ? 'bg-brand-clay-light text-brand-dark' : 'text-brand-outline'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Culinary</span>
        </button>
        <button
          onClick={() => setActiveTab('wellness')}
          className={`flex-1 py-3 px-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeTab === 'wellness' ? 'bg-brand-clay-light text-brand-dark' : 'text-brand-outline'
          }`}
        >
          <Heart className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Mindful</span>
        </button>
        <button
          onClick={() => setActiveTab('booking')}
          className={`flex-1 py-3 px-1 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            activeTab === 'booking' ? 'bg-brand-clay-light text-brand-dark' : 'text-brand-outline'
          }`}
        >
          <Calendar className="w-4 h-4 mb-1" />
          <span className="text-[9px] font-bold tracking-widest uppercase font-mono">Reserve</span>
        </button>
      </div>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 pb-24 md:pb-12">
        
        {/* TAB 1: OUR SANCTUARY (HOME STORY & GALLERY HOTSPOTS) */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in-up">
            
            {/* HERO INTRODUCTION */}
            <section className="relative min-h-[75vh] flex flex-col justify-end px-6 md:px-12 pb-16 overflow-hidden">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover filter brightness-[0.85]"
                  poster="https://lh3.googleusercontent.com/aida-public/AB6AXuDiYLwZjPUPmfVXvZUTtZy_CwIp875H2jcYO2lSajin07MkcLyaOcb4EBSE-OFnPAfvg-GPbVMgVL9gWoQcdOTHtxCOUj-bt6T-iVc4hTRkkZQpkpRvDCvn8GJeEvGymN8eyf_KxOmFTgMPx1zii_v9trZhrOjtjRLAphfkGoXRqhxbhMOp-YGQJgtTOpLK-BkMgz49w8d35yszFYW-RTem1xEM5q60SV1eUEOnRuR_YXJI2oOi-zWnkMN5HXSlPVjXe1Dgg6kSHvs"
                >
                  <source src="/mokai_bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f6] via-[#fdf8f6]/55 to-[#32302f]/25" />
              </div>

              <div className="max-w-2xl mx-auto md:mx-0">
                <div className="inline-flex items-center gap-2 bg-brand-clay text-brand-pink-text px-4 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase mb-4 shadow-sm border border-brand-outline/10">
                  <span className="w-2 h-2 bg-brand-matcha rounded-full animate-ping" />
                  KASGNJ • KASGNJ
                </div>
                <h2 className="font-serif text-4xl sm:text-6xl text-brand-dark tracking-tight leading-none mb-4">
                  Experience YOU.
                </h2>
                <p className="text-base sm:text-lg text-brand-outline font-sans max-w-lg leading-relaxed mb-8">
                  A sun-drenched sanctuary for hand-whisked matcha cups, sourdough pairings, organic space layout, and silent creative community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="bg-brand-wood hover:bg-brand-charcoal text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                  >
                    Explore Culinary Menu
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="bg-brand-clay-light hover:bg-[#f2edea] text-brand-dark border border-[#ccc6bb]/40 font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    Our Table Sections
                  </button>
                </div>
              </div>
            </section>

            {/* ARTISANAL DECOR CORNER / PHYSICAL MASONRY HOTSPOTS MAP EXPLORER */}
            <section className="max-w-5xl mx-auto px-6 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] tracking-widest text-[#705a49] font-bold uppercase font-mono">
                  EXPLORE OUR SPACE VIRTUALLY
                </span>
                <h3 className="font-serif text-3xl text-brand-dark">
                  Hand-Textured Plaster Walls
                </h3>
                <p className="text-xs text-brand-outline font-sans">
                  Hover or click on our active visual coordinates to learn the background story of our beautiful KASGNJ furniture.
                </p>
              </div>

              {/* Gallery switch tabs */}
              <div className="flex justify-center flex-wrap gap-2">
                {MOKAI_GALLERY_SPACES.map((gal, gIdx) => (
                  <button
                    key={gal.id}
                    onClick={() => {
                      setActiveGalleryIdx(gIdx);
                      setHoveredSpot(null);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-bold leading-none select-none transition-all duration-200 cursor-pointer ${
                      activeGalleryIdx === gIdx
                        ? 'bg-brand-wood text-white shadow-sm'
                        : 'bg-brand-clay-light text-brand-outline hover:text-brand-dark border border-[#ccc6bb]/20'
                    }`}
                  >
                    {gal.title}
                  </button>
                ))}
              </div>

              {/* Spatial hotspot map container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-clay/20 p-6 sm:p-8 rounded-3xl border border-[#ccc6bb]/30">
                
                {/* Physical Interactive Image layout */}
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden clay-shadow border border-[#ccc6bb]/30 max-h-[500px]">
                  <img
                    src={currentGallery.image}
                    alt={currentGallery.title}
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                  
                  {/* Pulsing Hotspot overlay buttons */}
                  {currentGallery.spots.map((spot, sIdx) => (
                    <button
                      key={sIdx}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      onMouseEnter={() => setHoveredSpot({ title: spot.title, txt: spot.txt })}
                      onMouseLeave={() => setHoveredSpot(null)}
                      onClick={() => setHoveredSpot({ title: spot.title, txt: spot.txt })}
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-brand-matcha rounded-full flex items-center justify-center shadow-lg cursor-pointer group active:scale-95 transition-all text-white border-2 border-white"
                      aria-label="Plaster spot indicator"
                    >
                      <span className="absolute inset-0 bg-brand-matcha rounded-full animate-ping opacity-60" />
                      <span className="text-[9px] font-mono font-bold">{sIdx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Spatial story details card */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-widest text-[#705a49] font-bold font-mono uppercase block">
                      SPATIAL QUADRANT
                    </span>
                    <h4 className="font-serif text-2xl text-brand-dark leading-tight">
                      {currentGallery.title}
                    </h4>
                    <p className="text-xs text-brand-outline font-sans leading-relaxed">
                      {currentGallery.description}
                    </p>
                  </div>

                  {/* Active spot card */}
                  <div className="p-4 rounded-2xl border border-brand-matcha bg-brand-matcha-light/25 relative min-h-[140px] flex flex-col justify-center transition-all duration-300">
                    {hoveredSpot ? (
                      <div className="animate-fade-in-scale">
                        <div className="flex items-center gap-1.5 mb-1 text-brand-matcha-text">
                          <Sparkles className="w-3.5 h-3.5" />
                          <h5 className="font-serif text-sm font-bold leading-none">{hoveredSpot.title}</h5>
                        </div>
                        <p className="text-xs text-brand-pink-text leading-relaxed font-sans">{hoveredSpot.txt}</p>
                      </div>
                    ) : (
                      <div className="text-center text-brand-outline space-y-1 py-4">
                        <p className="text-xs font-serif italic text-brand-pink-text">
                          Click or hover a glowing hotspot on the interior view
                        </p>
                        <p className="text-[10px] uppercase font-mono tracking-widest">
                          (Pulsing Spot Buttons 1-3)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK FEATURED PAIRINGS LIST */}
            <section className="bg-brand-clay-light/50 border-y border-[#ccc6bb]/25 py-20 px-6">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-4">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#705a49] font-bold uppercase font-mono block mb-1">
                      CURATED INDULGENCES
                    </span>
                    <h3 className="font-serif text-3xl text-brand-dark leading-none">
                      Handcrafted Fresh Daily
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="text-xs text-brand-wood font-bold uppercase tracking-widest flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    View All Culinary Offerings
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MENU_ITEMS.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="bg-brand-beige border border-[#ccc6bb]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                          {item.tags.slice(0, 1).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-brand-matcha text-[#dcf2a6] font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-lg text-brand-dark font-semibold group-hover:text-brand-wood transition-colors leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-xs text-brand-outline line-clamp-2 mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#ccc6bb]/15">
                          <span className="font-serif font-bold text-brand-wood text-sm">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="bg-brand-clay-light hover:bg-[#ece7e5] text-brand-dark text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full transition-colors font-sans border border-brand-outline/25"
                          >
                            Customise +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: CULINARY MENU (FILTERED SEARCH BOARD) */}
        {activeTab === 'menu' && (
          <div className="max-w-5xl mx-auto px-6 pt-8 space-y-8 animate-fade-in-up">
            
            <div className="text-center max-w-xl mx-auto space-y-2 mb-4">
              <span className="text-[10px] tracking-widest text-[#705a49] font-bold uppercase font-mono">
                THE SLOW LIVING MENU
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight">
                Handcrafted Delights
              </h2>
              <p className="text-xs text-brand-outline font-sans leading-relaxed">
                From organic edamame purées to slow-whisked Japanese ceremony matcha lattes, everything is made in KASGNJ.
              </p>
            </div>

            {/* Filter controls panel */}
            <div className="bg-brand-clay/20 rounded-3xl border border-[#ccc6bb]/30 p-5 space-y-4 shadow-sm font-sans text-xs">
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 border-b border-[#ccc6bb]/25 pb-3">
                {[
                  { key: 'all', label: 'All Offerings' },
                  { key: 'breakfast', label: 'All Day Breakfast' },
                  { key: 'salads', label: 'Salads & Bowls' },
                  { key: 'pastries', label: 'Pastries & Sweets' },
                  { key: 'drinks', label: 'Specialty Matcha' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setMenuFilter(tab.key as any)}
                    className={`px-4 py-2 rounded-full font-bold select-none transition-all duration-200 cursor-pointer ${
                      menuFilter === tab.key
                        ? 'bg-brand-matcha text-white shadow-sm'
                        : 'text-brand-outline hover:text-brand-dark hover:bg-brand-clay-light'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search & Dietary specifics panel */}
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search query input */}
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-outline" />
                  <input
                    type="text"
                    placeholder="Search avo toast, matcha latte, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs font-sans p-3 pl-10 bg-[#fdf8f6] border border-[#ccc6bb]/40 rounded-full text-brand-dark focus:outline-none focus:border-brand-matcha transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-outline hover:text-brand-dark"
                    >
                      X
                    </button>
                  )}
                </div>

                {/* Dietary tag togglers */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {[
                    { label: 'Vegan', tag: 'Vegan' },
                    { label: 'Gluten-Free', tag: 'Gluten-Free' },
                    { label: 'Signatures', tag: 'Signature' },
                    { label: 'Classic', tag: 'Classic' }
                  ].map((chip) => {
                    const isSelected = dietaryFilters.includes(chip.tag);
                    return (
                      <button
                        key={chip.tag}
                        onClick={() => handleToggleDietary(chip.tag)}
                        className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-brand-matcha border-brand-matcha text-white'
                            : 'bg-[#fdf8f6] border-[#ccc6bb]/30 text-brand-outline hover:border-brand-matcha/40'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Menu cards map results */}
            {filteredMenuItems.length === 0 ? (
              <div className="text-center py-20 bg-brand-clay/10 rounded-2xl border border-dashed border-[#ccc6bb]/45 max-w-lg mx-auto">
                <p className="font-serif text-lg text-brand-dark mb-1">
                  No Delights Found
                </p>
                <p className="text-xs text-brand-outline">
                  Try adjusting your dietary keywords or clearance search bar queries.
                </p>
                <button
                  onClick={() => {
                    setMenuFilter('all');
                    setSearchQuery('');
                    setDietaryFilters([]);
                  }}
                  className="mt-4 bg-brand-clay text-xs tracking-wider uppercase font-bold px-4 py-2 rounded-full border border-[#ccc6bb]/25"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#fcfbf9] border border-[#ccc6bb]/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group justify-between hover:-translate-y-1"
                  >
                    {/* Header Image */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Dietary labels overlay icon */}
                      <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-brand-matcha text-[#dcf2a6] font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg text-brand-dark font-bold leading-normal leading-snug group-hover:text-brand-wood transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-brand-outline leading-relaxed font-sans line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer pricing pane */}
                      <div className="flex justify-between items-center mt-5 pt-3 border-t border-[#ccc6bb]/20">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono tracking-widest text-[#705a49] font-bold uppercase">
                            VALUATION
                          </span>
                          <span className="font-serif font-bold text-brand-dark text-base">
                            ₹{item.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedItem(item)}
                          className="bg-brand-wood text-[#fdf8f6] hover:bg-brand-charcoal text-[10px] font-bold uppercase tracking-widest py-2.5 px-5 rounded-full transition-all duration-300 font-sans shadow-sm flex items-center gap-1 active:scale-95"
                        >
                          Customise +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MINDFULNESS BAR (SLOW MATCHING MATCH QUIZ) */}
        {activeTab === 'wellness' && (
          <div className="max-w-4xl mx-auto px-6 pt-8 space-y-10 animate-fade-in-up">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] tracking-widest text-[#705a49] font-bold uppercase font-mono">
                THE MINDFUL CORNER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark tracking-tight">
                Wellness Matcha Whisking
              </h2>
              <p className="text-xs text-brand-outline font-sans leading-relaxed">
                Japanese tea houses are designed for silence. Complete our slow ritual questionnaire layout to find the perfect stone-ground harvest match for your spirit today.
              </p>
            </div>

            <WellnessMatchaQuiz onAddToCart={handleAddToCart} openNotification={openNotification} />
          </div>
        )}

        {/* TAB 4: SEATING RESERVATIONS */}
        {activeTab === 'booking' && (
          <div className="max-w-4xl mx-auto px-6 pt-8 space-y-8 animate-fade-in-up">
            <TableBookingView onAddBooking={handleAddBooking} openNotification={openNotification} />

            {/* Active user bookings lists completed this session */}
            {userBookings.length > 0 && (
              <div className="space-y-4 mt-8 bg-brand-clay/10 rounded-3xl border border-[#ccc6bb]/30 p-6 md:p-8">
                <div className="flex items-center gap-2 text-brand-dark border-b border-[#ccc6bb]/25 pb-3">
                  <BookmarkCheck className="w-5 h-5 text-brand-matcha" />
                  <h4 className="font-serif text-xl font-bold">Your Sanctuary Passes ({userBookings.length})</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-2xl bg-brand-beige border border-[#ccc6bb]/20 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-brand-matcha text-[#dcf2a6] text-[9px] font-bold font-mono uppercase px-2 py-0.5 rounded-full">
                          PASS CODE: {b.id}
                        </span>
                        <p className="text-[10px] text-brand-outline font-mono">
                          Locked: {new Date(b.confirmedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-brand-dark font-sans leading-none">{b.userName}</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-outline mt-3 border-t border-[#ccc6bb]/15 pt-2">
                        <div>
                          <p className="font-bold">Date:</p>
                          <p>{b.date}</p>
                        </div>
                        <div>
                          <p className="font-bold">Table No:</p>
                          <p className="uppercase">{b.tableNumber} ({b.sectionId})</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-bold">Hours Slot:</p>
                          <p>{b.timeSlot}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-clay-highest dark:bg-[#32302f] border-t border-[#ccc6bb]/30 mt-auto py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-brand-dark leading-none">
              YOU
            </h2>
            <p className="text-xs text-brand-outline leading-relaxed font-sans max-w-xs">
              © 2024 YOU KASGNJ. Handcrafted using eco-conscious Mumbai local clay and slow artisanal materials.
            </p>
            <div className="flex items-center gap-3 text-brand-outline">
              <a href="https://instagram.com" className="hover:text-brand-dark" target="_blank" rel="noreferrer">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#705a49] uppercase tracking-wider mb-3">
              SANCTUARY HOURS
            </h5>
            <ul className="text-xs text-brand-outline space-y-1.5 font-sans">
              <li>Open Daily: 8:00 AM - 11:00 PM</li>
              <li className="text-brand-matcha">Slow Whisk Bar: 9:00 AM - 9:00 PM</li>
              <li>Sunday Serenity Days: No calls please</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#705a49] uppercase tracking-wider mb-3">
              FIND US
            </h5>
            <ul className="text-xs text-brand-outline space-y-1.5 font-sans">
              <li>KASGNJ, KASGNJ West</li>
              <li>Mumbai, Maharashtra</li>
              <li>Opposite saint water hydrant code</li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm font-bold text-[#705a49] uppercase tracking-wider mb-3">
              SLOW PHYLOSOPHY
            </h5>
            <p className="text-xs text-brand-outline leading-relaxed font-sans">
              "We whisk, we pour, we quieten. Step away from rapid coordinates into the sandbox."
            </p>
          </div>
        </div>
      </footer>

      {/* FIXED DRAWER / SLIDEOUTS AND MODALS CAROUSELS */}
      
      {/* Sliding Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        openNotification={openNotification}
      />

      {/* Item Customizer Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* FLOATING TOP NOTIFICATIONS AND SUCCESS STATES */}
      {notifications.length > 0 && (
        <div className="fixed bottom-24 right-5 z-[2000] flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
          {notifications.map((note, idx) => (
            <div
              key={idx}
              className="bg-[#32302f] border border-brand-outline text-[#fdf8f6] text-xs font-sans font-bold py-3 px-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 animate-fade-in-scale relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-matcha" />
              <span>{note}</span>
              <button
                onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== idx))}
                className="text-white hover:text-brand-matcha-light text-[10px]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
