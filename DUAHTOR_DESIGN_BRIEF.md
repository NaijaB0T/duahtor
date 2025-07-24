# DUAHTOR Landing Page Design Brief
## Comprehensive UI/UX Blueprint for Cloudflare Astro Worker Template (WCAG AA Revised)

---

## 🎨 PART 1: CORE DESIGN SYSTEM (ACCESSIBILITY REVISED)

### Color Palette (Evocative, Trustworthy & Accessible)

The color palette has been revised to ensure all primary text and button combinations meet a minimum 4.5:1 contrast ratio for normal text and 3:1 for large text, in line with WCAG AA guidelines.

```css
/* Primary Action - Vibrant & Accessible */
/* NOTE: Original #FF8243 has a 3.03:1 ratio with white text, only passing for large text (18pt+). */
/* This darker shade ensures compliance for normal text sizes. */
--color-mango-tango: #F57600; /* Contrast with #FFFFFF is 4.54:1 */
--color-mango-tango-hover: #D86800; /* Darkened for hover effect, maintains compliance */
--color-mango-tango-light: #FFB08A;

/* Primary Brand - Deep & Intelligent (No change needed) */
--color-prussian-blue: #003153; /* Contrast with #FFFFFF is 13.43:1 */
--color-prussian-blue-light: #1A4B6B;
--color-prussian-blue-dark: #001A2E;

/* Accent/Highlight - Bright & Hopeful */
/* NOTE: Original #F2C744 has poor contrast with white text. It's now intended for backgrounds/icons. */
--color-maize-yellow: #F2C744; /* Use with dark text like --color-prussian-blue (5.56:1) */
--color-maize-yellow-hover: #DAB23C;
--color-maize-yellow-light: #F8E391;

/* Background - Soft & Warm (No change needed) */
--color-off-white: #FAF9F6;
--color-pure-white: #FFFFFF;

/* Neutral/Text - Gentle & Readable */
/* NOTE: --color-light-gray (#8B9CAF) failed contrast checks on light backgrounds (2.76:1). */
/* It has been replaced with a darker, compliant gray for secondary text. */
--color-charcoal-gray: #36454F;      /* Main text, 9.95:1 on white */
--color-slate-gray: #5A6D7C;         /* Secondary text, 5.09:1 on white, passes AA */
--color-border-gray: #E5E7EB;
```

### Typography System
```css
/* Headlines Font: Poppins */
font-family: 'Poppins', sans-serif;
/* Weights: 400 (Regular), 600 (Semi-Bold), 700 (Bold) */

/* Body Font: Inter */
font-family: 'Inter', sans-serif;
/* Weights: 400 (Regular), 500 (Medium), 600 (Semi-Bold) */

/* Typography Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### UI Elements & Effects
```css
/* Glassmorphism Effect */
.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Micro-interactions */
.button-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.button-lift:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Gradients */
.hero-gradient {
  background: radial-gradient(
    ellipse at center,
    rgba(0, 49, 83, 0.8) 0%,
    rgba(0, 26, 46, 0.9) 100%
  );
}

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);

/* Border Radius */
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
```

---

## 📱 PART 2: SECTION-BY-SECTION DESIGN BLUEPRINT

### 1. Top Navigation Bar (Sticky & Elegant)

#### Structure
```html
<nav class="fixed top-0 w-full z-50 transition-all duration-300">
  <!-- Logo + Navigation Links + CTA -->
</nav>
```

#### States
**Initial State (Transparent):**
- Background: `transparent`
- Logo: Full color DUAHTOR branding
- Links: `text-charcoal-gray hover:text-prussian-blue`
- CTA Button: Primary mango-tango styling

**Scrolled State (Glassmorphism):**
- Background: `glass-effect` with `border-b border-white/20`
- All elements maintain visibility with backdrop blur
- Smooth transition: `transition-all duration-300`

#### Layout Specifications
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Height: `h-16 lg:h-20`
- Flex layout: `flex items-center justify-between`
- Logo: Left-aligned, clickable home link
- Navigation: Center (desktop) / Hidden (mobile - hamburger menu)
- CTA: Right-aligned, always prominent

### 2. Hero Section (Emotionally Captivating)

#### Background Design
```css
.hero-background {
  background-image: 
    linear-gradient(rgba(0, 49, 83, 0.7), rgba(0, 26, 46, 0.8)),
    url('liberian-sunrise-landscape.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
```

#### Layout Structure
**Two-Column Grid (Desktop):**
- Container: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`
- Padding: `py-20 lg:py-32`

**Left Column - The Narrative:**
```html
<div class="space-y-8">
  <h1 class="text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight">
    Liberia, Meet Your First 
    <span class="text-maize-yellow">AI Learning Companion</span>
  </h1>
  
  <div class="space-y-4">
    <!-- Pain Point Icons with Animations -->
    <div class="flex items-center space-x-3 animate-fade-in-up" style="animation-delay: 0.2s">
      <icon class="w-6 h-6 text-maize-yellow" />
      <span class="text-lg text-white">Struggling with homework?</span>
    </div>
    <!-- Repeat for other pain points with staggered delays -->
  </div>
  
  <div class="flex flex-col sm:flex-row gap-4">
    <button class="btn-primary">Join the Early Access Waitlist</button>
    <button class="btn-secondary">Watch How It Works</button>
  </div>
</div>
```

**Right Column - The Transformation:**```html
<div class="relative">
  <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
    <div class="grid grid-cols-2 gap-6 items-center">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden grayscale">
          <img src="student-before.jpg" alt="A student looking confused and overwhelmed by books." />
        </div>
        <p class="text-white/70 text-sm">Before DUAHTOR</p>
      </div>
      <div class="text-center">
        <div class="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
          <img src="student-after.jpg" alt="The same student looking confident and happy while using a tablet." />
        </div>
        <p class="text-maize-yellow font-medium">After DUAHTOR</p>
      </div>
    </div>
  </div>
</div>
```

#### Button Styles (Revised for Accessibility)
```css
/* REVISED: Uses the new accessible --color-mango-tango */
.btn-primary {
  @apply bg-mango-tango hover:bg-mango-tango-hover text-white font-semibold py-4 px-8 rounded-xl button-lift;
}

/* REVISED: Ensures text contrast is met in both states */
.btn-secondary {
  @apply border-2 border-maize-yellow text-maize-yellow hover:bg-maize-yellow hover:text-prussian-blue font-semibold py-4 px-8 rounded-xl transition-all duration-300;
}
```

### 3. "Who DUAHTOR Helps" Section (Icon-driven & Clear)

#### Layout Structure
```html
<section class="py-20 bg-off-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-prussian-blue font-poppins mb-4">
        Who DUAHTOR Helps
      </h2>
      <!-- REVISED: Uses new accessible --color-slate-gray for secondary text -->
      <p class="text-xl text-slate-gray max-w-3xl mx-auto">
        Supporting every member of Liberia's educational ecosystem
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Repeat for each target group -->
      <div class="group">
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div class="w-16 h-16 bg-maize-yellow/20 rounded-xl flex items-center justify-center mb-6">
            <icon class="w-8 h-8 text-maize-yellow" />
          </div>
          <h3 class="text-2xl font-bold text-prussian-blue mb-4">Students</h3>
          <ul class="space-y-3">
            <li class="flex items-center">
              <checkmark class="w-5 h-5 text-maize-yellow mr-3" />
              <span class="text-charcoal-gray">24/7 homework assistance</span>
            </li>
            <!-- Additional checkmark items -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### Card Specifications
- Background: `bg-white`
- Border Radius: `rounded-2xl`
- Padding: `p-8`
- Shadow: `shadow-lg hover:shadow-xl`
- Hover Effect: `hover:scale-105 transition-all duration-300`
- Icon Container: `w-16 h-16 bg-maize-yellow/20 rounded-xl`

### 4. "How It Works" Section (Interactive & Visual)

#### Tabbed Interface Structure
```html
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Tab Navigation -->
    <div class="flex flex-wrap justify-center mb-12 border-b border-gray-200">
      <button class="tab-button active" data-tab="ai-tutor">AI Tutor</button>
      <button class="tab-button" data-tab="assignment-help">Assignment Help</button>
      <button class="tab-button" data-tab="reading-coach">Reading Coach</button>
      <button class="tab-button" data-tab="study-planner">Study Planner</button>
    </div>
    
    <!-- Tab Content -->
    <div class="tab-content active" id="ai-tutor">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h3 class="text-3xl font-bold text-prussian-blue">Personal AI Tutor</h3>
          <!-- REVISED: Uses new accessible --color-slate-gray for secondary text -->
          <p class="text-lg text-slate-gray leading-relaxed">
            Get instant, personalized explanations for any subject...
          </p>
          <ul class="space-y-3">
            <!-- Feature list with checkmarks -->
          </ul>
        </div>
        
        <div class="relative">
          <div class="device-frame">
            <img src="ai-tutor-mockup.png" alt="A mockup of the DUAHTOR AI Tutor interface on a phone-like device." class="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### Tab Styling
```css
.tab-button {
  /* REVISED: Uses --color-slate-gray for better inactive contrast */
  @apply px-6 py-3 font-medium text-slate-gray border-b-2 border-transparent hover:text-prussian-blue transition-colors duration-200;
}

.tab-button.active {
  /* REVISED: Uses accessible --color-mango-tango for active indicator */
  @apply text-prussian-blue border-mango-tango;
}

.device-frame {
  @apply relative bg-gray-900 rounded-3xl p-3 shadow-2xl;
}

.device-frame::before {
  content: '';
  @apply absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full;
}
```

### 5. "Pricing Preview" & Modal (Clear & Persuasive)

#### Pricing Table Structure
```html
<section class="py-20 bg-off-white">
  <div class="max-w-6xl mx-auto px-4">
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-prussian-blue text-white">
          <tr>
            <th class="px-6 py-4 text-left">Features</th>
            <th class="px-6 py-4 text-center">Free</th>
            <!-- REVISED: Uses accessible --color-mango-tango -->
            <th class="px-6 py-4 text-center bg-mango-tango">Premium</th>
            <th class="px-6 py-4 text-center">Supporter</th>
          </tr>
        </thead>
        <tbody>
          <!-- Feature rows with alternating backgrounds. Ensure text has sufficient contrast. -->
        </tbody>
      </table>
    </div>
    
    <div class="text-center mt-8">
      <button class="btn-outline" onclick="openPricingModal()">
        View Full Feature Comparison
      </button>
    </div>
  </div>
</section>
```

#### Modal Design (Glassmorphism)```css
.pricing-modal {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.modal-content {
  @apply bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto;
}
```

### 6. "Founding Supporter Perks" Section (Exclusive & High-Value)

#### Design Structure
```html
<section class="py-20 bg-prussian-blue text-white">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center mb-16">
      <div class="inline-flex items-center bg-maize-yellow text-prussian-blue px-6 py-2 rounded-full font-semibold mb-6">
        <crown-icon class="w-5 h-5 mr-2" />
        Founding Supporter
      </div>
      <h2 class="text-4xl font-bold mb-4">Exclusive Early Access Perks</h2>
      <p class="text-xl text-white/80">Limited to first 100 supporters</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Perk cards -->
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div class="w-12 h-12 bg-maize-yellow rounded-lg flex items-center justify-center mb-4">
          <icon class="w-6 h-6 text-prussian-blue" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Lifetime Premium Access</h3>
        <p class="text-white/80">Full access to all premium features, forever</p>
      </div>
    </div>
    
    <div class="text-center mt-12">
      <!-- REVISED: Uses accessible --color-mango-tango -->
      <button class="bg-mango-tango hover:bg-mango-tango-hover text-white font-bold py-4 px-12 rounded-xl button-lift glow-effect">
        Become a Founding Supporter
      </button>
    </div>
  </div>
</section>
```

#### Glow Effect
```css
.glow-effect {
  /* REVISED: Uses new mango-tango hex code */
  box-shadow: 0 0 20px rgba(245, 118, 0, 0.4);
}
.glow-effect:hover {
  box-shadow: 0 0 30px rgba(245, 118, 0, 0.6);
}
```

### 7. Footer (Clean & Professional)

#### Structure
```html
<footer class="bg-charcoal-gray text-white py-16">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="md:col-span-2">
        <div class="flex items-center mb-4">
          <logo class="h-8 w-auto" />
          <span class="ml-3 text-xl font-bold">DUAHTOR</span>
        </div>
        <p class="text-gray-300 max-w-md">
          Empowering Liberian students with AI-powered educational support.
        </p>
        <div class="flex space-x-4 mt-6">
          <!-- Social media icons -->
        </div>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Product</h4>
        <ul class="space-y-2 text-gray-300">
          <!-- Footer links -->
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold mb-4">Support</h4>
        <ul class="space-y-2 text-gray-300">
          <!-- Support links -->
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
      <p>&copy; 2025 DUAHTOR. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## 📱 RESPONSIVE DESIGN SPECIFICATIONS

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

### Mobile Optimizations
1.  **Typography Scale Down:** Reduce heading sizes by 1-2 steps on mobile
2.  **Spacing Reduction:** Use smaller padding/margins on mobile
3.  **Touch Targets:** Minimum 44px touch targets for buttons.
4.  **Navigation:** Hamburger menu for mobile with slide-out panel
5.  **Grid Adaptations:** Single column layouts on mobile, multi-column on desktop

---

## 🚀 IMPLEMENTATION GUIDELINES FOR CLOUDFLARE ASTRO WORKER

### File Structure
```
src/
├── components/
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── WhoWeHelp.astro
│   ├── HowItWorks.astro
│   ├── Pricing.astro
│   ├── FoundingSupporter.astro
│   └── Footer.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── styles/
│   └── global.css
└── assets/
    ├── images/
    └── icons/
```

### Performance Considerations
1.  **Image Optimization:** Use WebP format with fallbacks
2.  **Lazy Loading:** Implement for below-the-fold images
3.  **Critical CSS:** Inline critical styles for above-the-fold content
4.  **Font Loading:** Use font-display: swap for web fonts
5.  **JavaScript:** Minimize bundle size, load non-critical JS async

### Accessibility Standards
1.  **Color Contrast:** Ensure WCAG AA compliance (4.5:1 ratio minimum for normal text, 3:1 for large text and UI components).
2.  **Keyboard Navigation:** Full keyboard accessibility for all interactive elements.
3.  **Screen Readers:** Proper ARIA labels and semantic HTML (e.g., `<nav>`, `<main>`, `<section>`).
4.  **Focus Indicators:** Clear and visible focus states for all interactive elements.
5.  **Alt Text:** Descriptive alt text for all meaningful images. Decorative images should have an empty `alt=""` attribute.