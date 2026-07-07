import React, { useState, useEffect } from 'react';
import { 
  Cake, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Check, 
  Sparkles, 
  Calculator, 
  Heart, 
  Info,
  Calendar,
  Gift,
  Coffee,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types for our menu items
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'wedding' | 'birthday' | 'cupcakes' | 'pastries';
  tags: string[];
  isPopular?: boolean;
}

// Menu Items Data
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'w1',
    name: 'La Rose Royale Wedding Cake',
    description: 'A breathtaking multi-tiered vanilla bean cake layered with fresh elderflower cream and hand-sculpted sugar rose petals.',
    price: '$180',
    category: 'wedding',
    tags: ['Best Seller', 'Handcrafted Roses', 'Serves 40+'],
    isPopular: true
  },
  {
    id: 'w2',
    name: '24K Golden Leaf Red Velvet',
    description: 'Rich red velvet layers paired with Madagascan vanilla cream cheese frosting and exquisite 24k edible gold leaf gilding.',
    price: '$210',
    category: 'wedding',
    tags: ['Gold Leaf', 'Premium Cheese', 'Serves 50+']
  },
  {
    id: 'w3',
    name: 'Enchanted Lavender Meadow',
    description: 'Whimsical floral-themed tier cake infused with organic lemon lavender syrup and fresh wild berry coulis.',
    price: '$195',
    category: 'wedding',
    tags: ['Organic', 'Lavender Infused', 'Serves 40+']
  },
  {
    id: 'b1',
    name: 'Belgian Double Chocolate Drip',
    description: 'Signature cocoa sponge layered with 70% dark Belgian chocolate ganache and crowned with chocolate-draped fresh strawberries.',
    price: '$45',
    category: 'birthday',
    tags: ['Best Seller', 'Double Chocolate', 'Serves 12-15'],
    isPopular: true
  },
  {
    id: 'b2',
    name: 'Pistachio Rose Perfection',
    description: 'Delicately sweet, fragrant pistachio-infused layers sandwiched between smooth rosewater Swiss meringue buttercream.',
    price: '$52',
    category: 'birthday',
    tags: ['Fragrant', 'Nutty', 'Eggless Option', 'Serves 12-15']
  },
  {
    id: 'b3',
    name: 'Salted Caramel Hazelnut Praline',
    description: 'Fluffy brown-sugar sponge filled with house-made slow-cooked salted caramel and crunchy toasted hazelnut praline.',
    price: '$48',
    category: 'birthday',
    tags: ['Crunchy', 'House Caramel', 'Serves 12-15']
  },
  {
    id: 'c1',
    name: 'Velvet Rose Cupcakes (Box of 6)',
    description: 'Elegantly swirled rosewater buttercream on fluffy vanilla sponge cupcakes, sprinkled with silver sugar pearls.',
    price: '$26',
    category: 'cupcakes',
    tags: ['Box of 6', 'Pastel Pink']
  },
  {
    id: 'c2',
    name: 'Midnight Chocolate Lava (Box of 6)',
    description: 'Dark chocolate cupcakes with a gooey liquid chocolate center, topped with silk ganache swirl and edible gold flake.',
    price: '$28',
    category: 'cupcakes',
    tags: ['Box of 6', 'Warm Served', 'Rich Chocolate'],
    isPopular: true
  },
  {
    id: 'c3',
    name: 'Salted Amber Caramel (Box of 6)',
    description: 'Rich caramel-infused cupcakes topped with whipped sea salt buttercream and a luscious caramel drizzle.',
    price: '$26',
    category: 'cupcakes',
    tags: ['Box of 6', 'Sweet & Salty']
  },
  {
    id: 'p1',
    name: 'Parisian Raspberry Macaron Assortment',
    description: 'Delicate French almond shells filled with intense fresh raspberry gelée and premium white chocolate ganache.',
    price: '$22',
    category: 'pastries',
    tags: ['Gluten-Free', 'Pastry Chef Pick'],
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Classic Praline Paris-Brest',
    description: 'Crispy rings of choux pastry filled with a rich, velvety hazelnut praline mousseline and toasted flaked almonds.',
    price: '$18',
    category: 'pastries',
    tags: ['Traditional French', 'Crispy Choux']
  },
  {
    id: 'p3',
    name: 'Vanilla Bean Mille-Feuille',
    description: 'Layers of caramelized, flaky puff pastry filled with luscious Madagascan vanilla pastry cream and elegant icing.',
    price: '$16',
    category: 'pastries',
    tags: ['Flaky', 'Fresh Daily']
  }
];

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Emily Watson',
    role: 'Bride',
    stars: 5,
    text: 'La Petite Patisserie created our wedding cake, and it was the highlight of the evening! Not only was the design exactly what we dreamed of, but the Pistachio Rose flavor left our guests talking for days. Absolutely flawless craftsmanship.'
  },
  {
    name: 'Marcus Sterling',
    role: 'Birthday Host',
    stars: 5,
    text: 'The Belgian Chocolate Drip cake is out of this world! I ordered it for my daughter’s birthday. The sponge was incredibly moist, and the chocolate was rich but perfectly balanced. Their service over WhatsApp was incredibly responsive and helpful.'
  },
  {
    name: 'Sophia Laurent',
    role: 'Local Food Critic',
    stars: 5,
    text: 'As someone who has tasted pastries all over Paris, their Paris-Brest is remarkably authentic. The praline cream has the perfect hazelnut toastiness, and the choux is exceptionally fresh. A true hidden gem.'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'wedding' | 'birthday' | 'cupcakes' | 'pastries'>('wedding');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Quote Calculator state
  const [calcEventType, setCalcEventType] = useState('Birthday');
  const [calcTiers, setCalcTiers] = useState('1 Tier (Serves 15-20)');
  const [calcFlavor, setCalcFlavor] = useState('Belgian Chocolate');
  const [calcPreference, setCalcPreference] = useState('Standard');
  const [calcSpecialMessage, setCalcSpecialMessage] = useState('');
  const [calcPrice, setCalcPrice] = useState(45);

  // Form submission state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Price calculation logic
  useEffect(() => {
    let base = 45; // Default for 1 Tier
    
    // Tiers multiplier
    if (calcTiers.includes('2 Tiers')) {
      base = 120;
    } else if (calcTiers.includes('3 Tiers')) {
      base = 220;
    }

    // Flavor premium
    if (calcFlavor === 'Pistachio Rose' || calcFlavor === 'Lemon Lavender') {
      base += 15;
    } else if (calcFlavor === 'Red Velvet') {
      base += 10;
    }

    // Eggless option
    if (calcPreference === '100% Eggless') {
      base += 10;
    }

    setCalcPrice(base);
  }, [calcEventType, calcTiers, calcFlavor, calcPreference]);

  // Handler for custom order via WhatsApp
  const handleCustomOrderWhatsApp = () => {
    const message = `Hello La Petite Patisserie! I would like to request a custom cake quote with the following details:
• Event Type: ${calcEventType}
• Size: ${calcTiers}
• Flavor: ${calcFlavor}
• Diet Preference: ${calcPreference}
• Special Message: "${calcSpecialMessage || 'None'}"
• Estimated Total: $${calcPrice}

Please let me know if this is available for ordering!`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/9511811540?text=${encodedText}`, '_blank');
  };

  // Handler for menu order via WhatsApp
  const handleMenuOrderWhatsApp = (item: MenuItem) => {
    const message = `Hello La Petite Patisserie! I would like to order:
• Item: ${item.name}
• Category: ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
• Price: ${item.price}

Please let me know how to proceed with the payment and pick-up/delivery. Thank you!`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/9511811540?text=${encodedText}`, '_blank');
  };

  // Handler for contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    
    // We simulate a submission and offer a quick button to send via WhatsApp as well
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 5000);
  };

  // Quick helper to scroll to section
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="root-container" className="min-h-screen bg-cream text-chocolate font-sans antialiased selection:bg-rose selection:text-white">
      
      {/* HEADER SECTION */}
      <header 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-rose/10 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              id="logo-container"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center border border-rose/20 group-hover:bg-rose group-hover:border-rose transition-colors duration-300">
                <Cake className="w-5 h-5 text-rose-dark group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-wide text-chocolate group-hover:text-rose-dark transition-colors duration-300 block leading-tight">
                  La Petite
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-rose-dark font-semibold -mt-0.5 block">
                  Patisserie
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-chocolate hover:text-rose-dark font-medium transition-colors cursor-pointer text-sm">
                Home
              </button>
              <button onClick={() => scrollToSection('menu')} className="text-chocolate hover:text-rose-dark font-medium transition-colors cursor-pointer text-sm">
                Menu
              </button>
              <button onClick={() => scrollToSection('special-cakes')} className="text-chocolate hover:text-rose-dark font-medium transition-colors cursor-pointer text-sm">
                Special Cakes
              </button>
              <button onClick={() => scrollToSection('about')} className="text-chocolate hover:text-rose-dark font-medium transition-colors cursor-pointer text-sm">
                About Us
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-chocolate hover:text-rose-dark font-medium transition-colors cursor-pointer text-sm">
                Contact
              </button>
            </nav>

            {/* Prominent Call button */}
            <div className="hidden sm:block">
              <a 
                id="header-call-btn"
                href="tel:9511811540" 
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-rose text-rose-dark hover:bg-rose hover:text-white font-medium text-sm transition-all duration-300 shadow-sm shadow-rose/5 hover:shadow-rose/25 cursor-pointer group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Call Now: 9511811540
              </a>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="md:hidden flex items-center space-x-3">
              <a 
                href="tel:9511811540"
                className="p-2.5 rounded-full bg-rose/10 border border-rose/20 text-rose-dark flex sm:hidden"
                aria-label="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button 
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-chocolate hover:text-rose transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full bg-cream border-b border-rose/10 shadow-lg z-40 md:hidden overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left px-4 py-2.5 rounded-xl hover:bg-rose/5 hover:text-rose-dark font-medium transition-all"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('menu')} 
                className="block w-full text-left px-4 py-2.5 rounded-xl hover:bg-rose/5 hover:text-rose-dark font-medium transition-all"
              >
                Menu
              </button>
              <button 
                onClick={() => scrollToSection('special-cakes')} 
                className="block w-full text-left px-4 py-2.5 rounded-xl hover:bg-rose/5 hover:text-rose-dark font-medium transition-all"
              >
                Special Cakes
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left px-4 py-2.5 rounded-xl hover:bg-rose/5 hover:text-rose-dark font-medium transition-all"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left px-4 py-2.5 rounded-xl hover:bg-rose/5 hover:text-rose-dark font-medium transition-all"
              >
                Contact
              </button>
              <div className="pt-4 border-t border-rose/10 flex flex-col space-y-3">
                <a 
                  href="tel:9511811540" 
                  className="flex items-center justify-center px-4 py-3 bg-chocolate hover:bg-chocolate-light text-white rounded-xl font-medium transition-all text-sm shadow-md"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: 9511811540
                </a>
                <a 
                  href="https://wa.me/9511811540" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="home"
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex items-center"
      >
        {/* Soft background glow effects */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-rose/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cream-dark rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-light border border-rose/20 text-rose-dark text-xs sm:text-sm font-semibold tracking-wide uppercase"
              >
                <Sparkles className="w-4 h-4 text-rose" />
                <span>Crafted by Award-Winning Artisans</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-chocolate leading-tight tracking-tight"
              >
                Baked with <span className="text-rose-dark relative inline-block">Love</span>, <br className="hidden sm:inline" />
                Crafted for Your <span className="italic text-rose">Celebrations</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-chocolate-light text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                We believe every milestone deserves an exquisite center of attention. Indulge in our gourmet, customized 100% fresh pastries, created with the finest Belgian chocolate, Madagascan vanilla, and local organic fruits.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-chocolate hover:bg-chocolate-light text-cream font-medium rounded-full shadow-lg shadow-chocolate/10 hover:shadow-chocolate/20 transition-all duration-300 cursor-pointer flex items-center justify-center group"
                >
                  View Menu
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://wa.me/9511811540?text=Hello%20La%20Petite%20Patisserie!%20I'd%20like%20to%20inquire%20about%20ordering%20a%20delicious%20cake."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-300 flex items-center justify-center group"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-white fill-current" />
                  Order via WhatsApp
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 border-t border-rose/10"
              >
                <div className="text-center lg:text-left">
                  <p className="font-serif font-bold text-2xl text-rose-dark">100%</p>
                  <p className="text-xs text-chocolate-light uppercase tracking-wider font-semibold">Fresh Daily</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif font-bold text-2xl text-rose-dark">4.9 ★</p>
                  <p className="text-xs text-chocolate-light uppercase tracking-wider font-semibold">500+ Reviews</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif font-bold text-2xl text-rose-dark">Custom</p>
                  <p className="text-xs text-chocolate-light uppercase tracking-wider font-semibold">Bespoke Designs</p>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Image Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md sm:max-w-lg lg:max-w-none"
              >
                {/* Decorative Framed Background Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-rose/40" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-rose/40" />
                <div className="absolute inset-0 bg-rose-light/40 rounded-3xl -rotate-3 scale-[1.02] -z-10" />
                <div className="absolute inset-0 bg-chocolate/5 rounded-3xl rotate-2 scale-[1.01] -z-10" />

                {/* Main Hero Cake Image */}
                <div className="overflow-hidden rounded-3xl shadow-xl shadow-chocolate/10 aspect-[4/3] sm:aspect-square lg:aspect-[4/5] bg-cream-dark">
                  <img 
                    src="/src/assets/images/hero_cake_1783405434155.jpg" 
                    alt="Premium handcrafted tiered wedding cake decorated with roses and gold flakes" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Small floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-white border border-rose/10 p-3 sm:p-4 rounded-2xl shadow-lg shadow-chocolate/5 flex items-center space-x-3 max-w-[200px] animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-rose-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-rose-dark">Specialty</p>
                    <p className="text-sm font-bold font-serif text-chocolate leading-tight">Tiered Wedding Cakes</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE BENEFITS / FEATURES */}
      <section id="benefits" className="py-12 bg-cream-dark border-y border-rose/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 space-y-3 bg-cream/60 rounded-2xl border border-rose/5 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center mx-auto text-rose-dark">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate">Handcrafted with Pride</h3>
              <p className="text-sm text-chocolate-light leading-relaxed">
                Every single petal, drop of glaze, and frosting swirl is handcrafted on-order by our experienced pastry chefs.
              </p>
            </div>

            <div className="p-6 space-y-3 bg-cream/60 rounded-2xl border border-rose/5 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center mx-auto text-rose-dark">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate">Premium Natural Ingredients</h3>
              <p className="text-sm text-chocolate-light leading-relaxed">
                Zero artificial preservatives. We strictly import Belgian chocolate, Madagascan vanilla pods, and fresh organic milk.
              </p>
            </div>

            <div className="p-6 space-y-3 bg-cream/60 rounded-2xl border border-rose/5 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center mx-auto text-rose-dark">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate">Bespoke Customization</h3>
              <p className="text-sm text-chocolate-light leading-relaxed">
                Need something unique? Talk to us. We customize tiers, shapes, flavors, and cater perfectly to eggless preferences.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES INTRO GRID */}
      <section id="categories" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">Discover our creations</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">Beautiful Cake Categories</h2>
          <p className="text-sm text-chocolate-light font-light leading-relaxed">
            We offer premium baked creations categorized perfectly to suit your specific cravings or special celebratory requirements.
          </p>
        </div>

        {/* 4 Grid Category Showcase with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Wedding category box */}
          <div 
            onClick={() => {
              setActiveCategory('wedding');
              scrollToSection('menu');
            }}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-chocolate/5 border border-rose/10 hover:border-rose transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-chocolate-dark/40 to-transparent z-10" />
            <img 
              src="/src/assets/images/hero_cake_1783405434155.jpg" 
              alt="Wedding Cakes category" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-cream space-y-2">
              <span className="text-xs font-semibold bg-rose/95 text-white px-2 py-1 rounded-md uppercase tracking-wider inline-block">
                Exclusive
              </span>
              <h3 className="font-serif font-bold text-xl leading-tight">Wedding & Tiered Cakes</h3>
              <p className="text-xs text-cream/85 font-light line-clamp-2">Stunning multi-tiered custom statement pieces to frame your most memorable celebrations.</p>
              <div className="pt-2 text-xs text-rose font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                Browse Collection <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Birthday category box */}
          <div 
            onClick={() => {
              setActiveCategory('birthday');
              scrollToSection('menu');
            }}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-chocolate/5 border border-rose/10 hover:border-rose transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-chocolate-dark/40 to-transparent z-10" />
            <img 
              src="/src/assets/images/birthday_cake_1783405449607.jpg" 
              alt="Birthday Cakes category" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-cream space-y-2">
              <span className="text-xs font-semibold bg-rose/95 text-white px-2 py-1 rounded-md uppercase tracking-wider inline-block">
                Popular
              </span>
              <h3 className="font-serif font-bold text-xl leading-tight">Signature Birthday Cakes</h3>
              <p className="text-xs text-cream/85 font-light line-clamp-2">Exquisite, rich chocolate drip, berry layers, and custom message cakes to mark another great year.</p>
              <div className="pt-2 text-xs text-rose font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                Browse Collection <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Cupcakes category box */}
          <div 
            onClick={() => {
              setActiveCategory('cupcakes');
              scrollToSection('menu');
            }}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-chocolate/5 border border-rose/10 hover:border-rose transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-chocolate-dark/40 to-transparent z-10" />
            <img 
              src="/src/assets/images/cupcakes_1783405464117.jpg" 
              alt="Cupcakes category" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-cream space-y-2">
              <span className="text-xs font-semibold bg-rose/95 text-white px-2 py-1 rounded-md uppercase tracking-wider inline-block">
                Sweet Bites
              </span>
              <h3 className="font-serif font-bold text-xl leading-tight">Gourmet Cupcakes</h3>
              <p className="text-xs text-cream/85 font-light line-clamp-2">Perfect single-serving cakes with silky swirls of buttercreams and delicious surprises inside.</p>
              <div className="pt-2 text-xs text-rose font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                Browse Collection <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Pastries category box */}
          <div 
            onClick={() => {
              setActiveCategory('pastries');
              scrollToSection('menu');
            }}
            className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md shadow-chocolate/5 border border-rose/10 hover:border-rose transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-chocolate-dark via-chocolate-dark/40 to-transparent z-10" />
            <img 
              src="/src/assets/images/pastries_1783405479991.jpg" 
              alt="Artisanal French Pastries category" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-cream space-y-2">
              <span className="text-xs font-semibold bg-rose/95 text-white px-2 py-1 rounded-md uppercase tracking-wider inline-block">
                Artisanal
              </span>
              <h3 className="font-serif font-bold text-xl leading-tight">French Pastries & Macarons</h3>
              <p className="text-xs text-cream/85 font-light line-clamp-2">Flaky classic croissants, crunchy macarons, and creamy Paris-Brest creations fresh every morning.</p>
              <div className="pt-2 text-xs text-rose font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                Browse Collection <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FILTERABLE INTERACTIVE MENU EXPLORER */}
      <section id="menu" className="py-16 md:py-24 bg-cream-dark border-y border-rose/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
            <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">The Patisserie Menu</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">Browse Our Sweet Creations</h2>
            <p className="text-sm text-chocolate-light font-light">
              Filter by category to view detailed ingredients, sizes, and pricing. Click on any item to instantly order or customize via WhatsApp!
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div id="menu-tabs-container" className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto">
            
            <button
              id="tab-wedding"
              onClick={() => setActiveCategory('wedding')}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
                activeCategory === 'wedding' 
                  ? 'bg-chocolate text-cream border-chocolate shadow-md' 
                  : 'bg-cream text-chocolate hover:text-rose-dark border-rose/15 hover:bg-rose-light/40'
              }`}
            >
              <Cake className="w-4 h-4" />
              <span>Wedding & Tiered Cakes</span>
            </button>

            <button
              id="tab-birthday"
              onClick={() => setActiveCategory('birthday')}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
                activeCategory === 'birthday' 
                  ? 'bg-chocolate text-cream border-chocolate shadow-md' 
                  : 'bg-cream text-chocolate hover:text-rose-dark border-rose/15 hover:bg-rose-light/40'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Birthday Cakes</span>
            </button>

            <button
              id="tab-cupcakes"
              onClick={() => setActiveCategory('cupcakes')}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
                activeCategory === 'cupcakes' 
                  ? 'bg-chocolate text-cream border-chocolate shadow-md' 
                  : 'bg-cream text-chocolate hover:text-rose-dark border-rose/15 hover:bg-rose-light/40'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Gourmet Cupcakes</span>
            </button>

            <button
              id="tab-pastries"
              onClick={() => setActiveCategory('pastries')}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
                activeCategory === 'pastries' 
                  ? 'bg-chocolate text-cream border-chocolate shadow-md' 
                  : 'bg-cream text-chocolate hover:text-rose-dark border-rose/15 hover:bg-rose-light/40'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>French Pastries</span>
            </button>

          </div>

          {/* Menu Grid Content */}
          <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-cream rounded-2xl border border-rose/10 p-6 shadow-md hover:shadow-xl hover:border-rose/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Decorative golden corner element on popular items */}
                  {item.isPopular && (
                    <div className="absolute top-0 right-0 bg-rose text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm z-10 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Item header */}
                    <div>
                      <h3 className="font-serif font-bold text-lg text-chocolate group-hover:text-rose-dark transition-colors duration-300 leading-snug">
                        {item.name}
                      </h3>
                      
                      {/* Price tag */}
                      <p className="text-xl font-bold text-rose-dark font-serif mt-1">
                        {item.price}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-chocolate-light leading-relaxed font-light line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-rose-light text-rose-dark font-semibold px-2 py-0.5 rounded-full border border-rose/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ordering CTAs */}
                  <div className="pt-6 mt-6 border-t border-rose/5 flex items-center justify-between gap-3">
                    <a 
                      href={`tel:9511811540`}
                      className="inline-flex items-center justify-center p-2 rounded-full border border-rose/20 text-rose-dark hover:bg-rose-light transition-all cursor-pointer"
                      title="Inquire via Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleMenuOrderWhatsApp(item)}
                      className="flex-1 bg-chocolate hover:bg-chocolate-light text-cream hover:text-white font-medium text-xs py-2.5 px-4 rounded-full shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer group-hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Order via WhatsApp</span>
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Notice */}
          <div className="mt-12 bg-cream border border-rose/10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto shadow-sm">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-rose-dark shrink-0 hidden sm:flex">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-chocolate">Need custom sizes, colors, or eggless options?</p>
                <p className="text-xs text-chocolate-light">We can customize any menu item to fulfill your party’s size or dietary restriction.</p>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('special-cakes')}
              className="px-5 py-2 bg-rose text-white hover:bg-rose-dark font-medium text-xs rounded-full shadow-sm transition-all cursor-pointer inline-flex items-center"
            >
              <Calculator className="w-3.5 h-3.5 mr-1.5" />
              Customize & Quote
            </button>
          </div>

        </div>
      </section>

      {/* SPECIAL CAKES SECTION: INTERACTIVE CUSTOM CAKE CREATOR */}
      <section id="special-cakes" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">Bespoke Creations</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">Interactive Cake Creator</h2>
          <p className="text-sm text-chocolate-light font-light">
            Design your dream cake below, calculate an instant estimate, and send your request straight to our WhatsApp line! Our chefs will reply to finalize the booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Customizer Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-cream border border-rose/10 p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center space-x-2 pb-4 border-b border-rose/10">
                <Calculator className="w-5 h-5 text-rose-dark" />
                <h3 className="font-serif font-bold text-lg text-chocolate">Specify Cake Requirements</h3>
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block">1. What is the Occasion?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Birthday', 'Wedding', 'Anniversary', 'Other'].map((event) => (
                    <button
                      key={event}
                      type="button"
                      onClick={() => setCalcEventType(event)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        calcEventType === event 
                          ? 'bg-rose text-white border-rose shadow-sm' 
                          : 'bg-cream text-chocolate border-rose/10 hover:bg-rose-light/30'
                      }`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiers / Servings Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block">2. Select Cake Size & Tiers</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: '1 Tier (Serves 15-20)', label: '1 Tier', desc: 'Serves 15-20 guests' },
                    { value: '2 Tiers (Serves 30-45)', label: '2 Tiers', desc: 'Serves 30-45 guests' },
                    { value: '3 Tiers (Serves 60-80)', label: '3 Tiers', desc: 'Serves 60-80 guests' }
                  ].map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setCalcTiers(tier.value)}
                      className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                        calcTiers === tier.value 
                          ? 'bg-chocolate text-cream border-chocolate shadow-sm' 
                          : 'bg-cream text-chocolate border-rose/10 hover:bg-rose-light/30'
                      }`}
                    >
                      <p className="font-bold text-sm leading-tight">{tier.label}</p>
                      <p className={`text-[10px] mt-0.5 ${calcTiers === tier.value ? 'text-cream/80' : 'text-chocolate-light'}`}>{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Flavor */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block">3. Choose Signature Flavor</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Belgian Chocolate', extra: '' },
                    { name: 'Madagascan Vanilla', extra: '' },
                    { name: 'Red Velvet', extra: '+$10' },
                    { name: 'Pistachio Rose', extra: '+$15' },
                    { name: 'Lemon Lavender', extra: '+$15' }
                  ].map((flavor) => (
                    <button
                      key={flavor.name}
                      type="button"
                      onClick={() => setCalcFlavor(flavor.name)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border cursor-pointer flex justify-between items-center transition-all ${
                        calcFlavor === flavor.name 
                          ? 'bg-rose text-white border-rose shadow-sm' 
                          : 'bg-cream text-chocolate border-rose/10 hover:bg-rose-light/30'
                      }`}
                    >
                      <span>{flavor.name}</span>
                      {flavor.extra && <span className={`text-[9px] font-bold ${calcFlavor === flavor.name ? 'text-white' : 'text-rose-dark'}`}>{flavor.extra}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diet Preferences */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block">4. Dietary Preference</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Standard', desc: 'Our traditional pastry recipe' },
                    { name: '100% Eggless', desc: 'No eggs used, identical texture (+$10)' }
                  ].map((pref) => (
                    <button
                      key={pref.name}
                      type="button"
                      onClick={() => setCalcPreference(pref.name)}
                      className={`p-3 rounded-xl border cursor-pointer text-left transition-all ${
                        calcPreference === pref.name 
                          ? 'bg-chocolate text-cream border-chocolate shadow-sm' 
                          : 'bg-cream text-chocolate border-rose/10 hover:bg-rose-light/30'
                      }`}
                    >
                      <p className="font-bold text-sm leading-tight">{pref.name}</p>
                      <p className={`text-[10px] mt-0.5 ${calcPreference === pref.name ? 'text-cream/80' : 'text-chocolate-light'}`}>{pref.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Written Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block" htmlFor="calc-special-message">
                  5. Fondant Special Inscription (Optional)
                </label>
                <input
                  id="calc-special-message"
                  type="text"
                  placeholder="e.g., Happy 30th Anniversary Mom & Dad!"
                  value={calcSpecialMessage}
                  onChange={(e) => setCalcSpecialMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-rose/15 bg-cream focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose text-sm"
                />
              </div>

            </div>

            {/* Note */}
            <div className="mt-6 flex items-start space-x-2.5 p-3 rounded-xl bg-rose-light/40 border border-rose/10">
              <Sparkles className="w-4.5 h-4.5 text-rose-dark shrink-0 mt-0.5" />
              <p className="text-[11px] text-chocolate-light leading-relaxed">
                Prices shown are estimations. Elaborate topper dolls, real flowers, and specific cake drawings can carry slight price variations, which our chef will consult with you on.
              </p>
            </div>

          </div>

          {/* Interactive Pricing card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-chocolate-dark text-cream rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-chocolate">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose/10 rounded-full blur-2xl -z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose/5 rounded-full blur-2xl -z-0" />

            <div className="space-y-6 z-10 relative">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs uppercase tracking-wider text-rose font-bold">Quote Calculator</p>
              </div>

              <h3 className="font-serif font-bold text-2xl tracking-wide border-b border-cream/10 pb-4">Custom Order Summary</h3>

              {/* Visual Preview specifications */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cream/70">Occasion Type</span>
                  <span className="text-sm font-semibold text-rose-light">{calcEventType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cream/70">Tiers & Sizing</span>
                  <span className="text-sm font-semibold text-rose-light">{calcTiers.split(' ')[0]} {calcTiers.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cream/70">Flavor Base</span>
                  <span className="text-sm font-semibold text-rose-light">{calcFlavor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-cream/70">Diet Formulation</span>
                  <span className="text-sm font-semibold text-rose-light">{calcPreference}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-cream/70 mt-0.5">Written Message</span>
                  <span className="text-xs text-right font-medium max-w-[150px] italic text-rose-light line-clamp-1">
                    {calcSpecialMessage ? `"${calcSpecialMessage}"` : 'None specified'}
                  </span>
                </div>
              </div>

              {/* Live Image mockup thumbnail */}
              <div className="p-3.5 rounded-2xl bg-cream/5 border border-cream/10 space-y-3 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-chocolate/30 shrink-0">
                  <img 
                    src="/src/assets/images/hero_cake_1783405434155.jpg" 
                    alt="Tiered Cake Blueprint" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-rose">Interactive Design</p>
                  <p className="text-[10px] text-cream/70 leading-relaxed">Our chefs will reference this design blueprint on WhatsApp to customize your decorations!</p>
                </div>
              </div>
            </div>

            {/* Quote Pricing Button Section */}
            <div className="mt-8 pt-6 border-t border-cream/10 z-10 relative space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-cream/80">Estimated Price:</span>
                <div className="flex items-baseline">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-rose-light">${calcPrice}</span>
                  <span className="text-xs text-cream/60 ml-1">Onwards</span>
                </div>
              </div>

              <button 
                onClick={handleCustomOrderWhatsApp}
                className="w-full bg-rose hover:bg-rose-dark text-cream hover:text-white font-medium py-3.5 px-6 rounded-2xl shadow-lg shadow-rose/10 hover:shadow-rose/25 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer text-sm"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-current text-cream" />
                <span>Request Quote via WhatsApp</span>
              </button>

              <div className="text-center">
                <a href="tel:9511811540" className="text-xs text-cream/60 hover:text-rose transition-colors inline-flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  Or call directly: 9511811540
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="py-16 md:py-24 bg-cream-dark border-t border-rose/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Visual Frame (5 Columns) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                {/* Decorative frames */}
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-rose/40" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-rose/40" />
                <div className="absolute inset-0 bg-rose-light/50 rounded-2xl -rotate-2 scale-[1.01] -z-10" />

                <div className="overflow-hidden rounded-2xl shadow-lg aspect-square sm:aspect-[4/3] lg:aspect-square bg-cream">
                  <img 
                    src="/src/assets/images/pastries_1783405479991.jpg" 
                    alt="Baker crafting colorful pastries" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Overlap stats badge */}
                <div className="absolute -bottom-6 -right-6 bg-white border border-rose/10 p-4 rounded-xl shadow-lg shadow-chocolate/5 max-w-[200px]">
                  <p className="font-serif font-bold text-3xl text-rose-dark">2016</p>
                  <p className="text-[10px] font-bold text-chocolate-light uppercase tracking-wider mt-0.5">Established & Handcrafting Local Celebrations</p>
                </div>
              </div>
            </div>

            {/* Story Content (7 Columns) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">Our Story</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">The Sweet Art of Pastry</h2>
              
              <div className="space-y-4 text-chocolate-light font-light text-sm leading-relaxed">
                <p>
                  La Petite Patisserie started with a humble passion: to replace standard commercial baking with true high-end Parisian craftsmanship. Established in 2016, our tiny workshop has grown into a beloved premium bakery known for custom statement pieces and incredible flavor formulations.
                </p>
                <p>
                  Our lead pastry chef, trained in traditional French baking, curates our menu using recipes that highlight genuine raw ingredients. We avoid heavy artificial sweets, focusing instead on deep Belgian chocolate ganache, natural fruit reduction fillings, and perfectly balanced Swiss meringue buttercream.
                </p>
                <p>
                  Whether it is a small box of elegant cupcakes for a quiet afternoon coffee, or a grand 3-tiered customized wedding cake to mark your forever union, we craft with equal parts precision and love.
                </p>
              </div>

              {/* Checklist values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-rose/10">
                <div className="flex items-center space-x-2 text-sm text-chocolate">
                  <Check className="w-4 h-4 text-rose-dark" />
                  <span className="font-medium">100% Organic Fresh Milk & Flour</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chocolate">
                  <Check className="w-4 h-4 text-rose-dark" />
                  <span className="font-medium">Imported Belgian Chocolate Base</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chocolate">
                  <Check className="w-4 h-4 text-rose-dark" />
                  <span className="font-medium">Catering to Eggless Requirements</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chocolate">
                  <Check className="w-4 h-4 text-rose-dark" />
                  <span className="font-medium">Handcrafted Fondant Decorations</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">Kind Words</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-chocolate">Our Customer Reviews</h2>
          <p className="text-sm text-chocolate-light font-light">
            We are honored to be a part of your celebrations. Read what our lovely local customers say about our cakes, desserts, and services.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="bg-cream border border-rose/10 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6 relative hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute top-6 right-6 text-rose/15 font-serif text-7xl font-bold leading-none -mt-3">“</div>
              
              <div className="space-y-4 z-10">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-rose-dark fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-xs text-chocolate-light leading-relaxed italic font-light">
                  "{t.text}"
                </p>
              </div>

              {/* Customer info */}
              <div className="flex items-center space-x-3 border-t border-rose/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-rose-light/50 flex items-center justify-center font-serif font-bold text-rose-dark uppercase text-sm">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-chocolate">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider text-rose-dark font-semibold">{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & ORDER INFO SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-cream-dark border-t border-rose/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Contact Details (Left 5 Columns) */}
            <div className="lg:col-span-5 bg-cream border border-rose/10 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-rose-dark font-bold">Contact Us</p>
                <h2 className="font-serif text-3xl font-bold text-chocolate">We are here for you!</h2>
                <p className="text-sm text-chocolate-light font-light leading-relaxed">
                  Have a question, want to order a signature cake, or need custom party pricing? Get in touch with us using any method below.
                </p>
              </div>

              {/* Direct links list */}
              <div className="space-y-5">
                
                {/* Phone detail */}
                <a 
                  href="tel:9511811540"
                  className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-rose-light/40 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-rose-dark shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">Call to Order</p>
                    <p className="text-base font-bold text-chocolate group-hover:text-rose-dark transition-colors">9511811540</p>
                    <p className="text-[10px] text-chocolate-light">Available for voice bookings daily</p>
                  </div>
                </a>

                {/* WhatsApp detail */}
                <a 
                  href="https://wa.me/9511811540"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-rose-light/40 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-rose-dark shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">WhatsApp Messaging</p>
                    <p className="text-base font-bold text-chocolate group-hover:text-rose-dark transition-colors">9511811540</p>
                    <p className="text-[10px] text-chocolate-light">Instantly text custom cake photos/queries</p>
                  </div>
                </a>

                {/* Hours detail */}
                <div className="flex items-start space-x-4 p-3">
                  <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-rose-dark shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">Operational Hours</p>
                    <p className="text-sm font-bold text-chocolate">Mon - Sun: 9:00 AM - 9:00 PM</p>
                    <p className="text-[10px] text-chocolate-light">Fresh pick-ups and delivery windows daily</p>
                  </div>
                </div>

                {/* Location detail */}
                <div className="flex items-start space-x-4 p-3">
                  <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-rose-dark shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-dark">Primary Kitchen</p>
                    <p className="text-sm font-bold text-chocolate">102 Rosewood Boulevard</p>
                    <p className="text-[10px] text-chocolate-light">Premium Pastry District, Sweet Valley</p>
                  </div>
                </div>

              </div>

              {/* Social icons block */}
              <div className="pt-4 border-t border-rose/10 flex items-center space-x-4">
                <span className="text-xs text-chocolate-light uppercase tracking-wider font-semibold">Follow our glaze:</span>
                <a href="#" className="w-8 h-8 rounded-full bg-rose-light flex items-center justify-center text-rose-dark hover:bg-rose hover:text-white transition-colors" aria-label="Follow us on Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-rose-light flex items-center justify-center text-rose-dark hover:bg-rose hover:text-white transition-colors" aria-label="Follow us on Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Quick Inquiry Form (Right 7 Columns) */}
            <div className="lg:col-span-7 bg-cream border border-rose/10 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
              
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-chocolate">Send a Quick Inquiry</h3>
                  <p className="text-xs text-chocolate-light font-light">Have an urgent party next weekend? Send details and we will call you back shortly.</p>
                </div>

                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-sm">Inquiry Logged Successfully!</p>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Thank you for contacting us! We have received your query. To receive a reply instantly, you can also copy your message and start a WhatsApp chat with us directly.
                    </p>
                    <button 
                      type="button"
                      onClick={() => {
                        const message = `Hello La Petite Patisserie! My name is ${contactName}. I would like to inquire: "${contactMessage}"`;
                        window.open(`https://wa.me/9511811540?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                      Instantly Send via WhatsApp
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block" htmlFor="contact-name">Your Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Catherine Smith"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-rose/15 bg-cream focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block" htmlFor="contact-phone">Phone Number *</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9511811540"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-rose/15 bg-cream focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-rose-dark block" htmlFor="contact-message">What celebration cake or pastry do you need? *</label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        placeholder="e.g. I need a 2-tier chocolate cake for an anniversary on July 15th. I have 35 guests and need eggless options..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-rose/15 bg-cream focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose text-sm resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-chocolate hover:bg-chocolate-light text-cream hover:text-white font-medium py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2 text-sm"
                    >
                      <span>Submit Inquiry</span>
                    </button>
                  </>
                )}
              </form>

              {/* Instant Call CTA */}
              <div className="mt-6 pt-5 border-t border-rose/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-chocolate">Need an immediate answer?</p>
                  <p className="text-[11px] text-chocolate-light">Call our main bakery line now to speak with our kitchen desk directly.</p>
                </div>
                <a 
                  href="tel:9511811540" 
                  className="px-5 py-2.5 bg-rose hover:bg-rose-dark text-white rounded-full font-medium text-xs shadow-sm transition-all text-center flex items-center justify-center cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  Call: 9511811540
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="footer" className="bg-chocolate-dark text-cream border-t border-chocolate pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: Logo & Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-rose/10 flex items-center justify-center border border-rose/20">
                  <Cake className="w-5 h-5 text-rose" />
                </div>
                <div>
                  <span className="font-serif font-bold text-xl tracking-wide text-cream block leading-tight">
                    La Petite
                  </span>
                  <span className="font-sans text-xs uppercase tracking-widest text-rose font-semibold -mt-0.5 block">
                    Patisserie
                  </span>
                </div>
              </div>
              <p className="text-xs text-cream/70 leading-relaxed font-light">
                Premium, handcrafted cake bakery established in 2016. Crafting gorgeous tiered wedding statements, indulgent birthdays, and fine daily French pastries.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base tracking-wide text-rose-light">Quick Navigation</h3>
              <ul className="space-y-2 text-xs text-cream/80 font-light">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-rose transition-colors cursor-pointer text-left">
                    Back to Top / Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('menu')} className="hover:text-rose transition-colors cursor-pointer text-left">
                    Our Pastry Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('special-cakes')} className="hover:text-rose transition-colors cursor-pointer text-left">
                    Interactive Cake Customizer
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-rose transition-colors cursor-pointer text-left">
                    About Our Bakery
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-rose transition-colors cursor-pointer text-left">
                    Contact & Kitchen Hours
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Kitchen Details */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base tracking-wide text-rose-light">Kitchen Hours</h3>
              <div className="space-y-2 text-xs text-cream/80 font-light">
                <p className="flex justify-between">
                  <span>Monday - Sunday:</span>
                  <span className="font-medium text-rose-light">9:00 AM - 9:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Cake Customization Desk:</span>
                  <span className="font-medium text-rose-light">10:00 AM - 7:00 PM</span>
                </p>
                <p className="pt-2 border-t border-cream/5 text-[11px] text-cream/60">
                  Pick-up address: 102 Rosewood Boulevard, Sweet Valley
                </p>
              </div>
            </div>

            {/* Col 4: Direct Order Prominent Button */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base tracking-wide text-rose-light">Order Directly</h3>
              <div className="space-y-3">
                <a 
                  href="tel:9511811540" 
                  className="flex items-center justify-center px-4 py-3 bg-rose hover:bg-rose-dark text-white rounded-xl font-medium transition-all text-xs shadow-md shadow-rose/10 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  Call: 9511811540
                </a>
                <a 
                  href="https://wa.me/9511811540" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all text-xs shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2 text-white fill-current" />
                  WhatsApp Support
                </a>
              </div>
              <div className="flex justify-center md:justify-start space-x-3 pt-1 text-cream/55">
                <a href="#" className="hover:text-rose transition-colors" aria-label="Instagram page link">
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a href="#" className="hover:text-rose transition-colors" aria-label="Facebook page link">
                  <Facebook className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright strip */}
          <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50 font-light">
            <p>© 2026 La Petite Patisserie. Handcrafted with Love. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-rose transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-rose transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
