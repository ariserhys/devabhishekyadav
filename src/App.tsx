import { useEffect, useState, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import components
import Header from './components/Header';
import Hero from './components/Hero';
import Work from './components/Work';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import LoadingScreen from './components/LoadingScreen';
import ComingSoon from './components/ComingSoon';
import LiveDemo from './components/LiveDemo';

// Import styles
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSourcePage, setShowSourcePage] = useState(false);
  const [showDemoPage, setShowDemoPage] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const initialLoadComplete = useRef(false);
  
  // Handle initial loading screen completion
  const handleLoadingComplete = () => {
    setInitialLoading(false);
    initialLoadComplete.current = true;
    document.body.style.overflow = '';
  };
  
  // Method to scroll to specific sections smoothly
  const scrollTo = useCallback((target: string) => {
    if (!lenisRef.current) return;
    
    const element = document.querySelector(target);
    if (element instanceof HTMLElement) {
      // Calculate offset based on viewport width
      const isMobile = window.innerWidth < 768;
      const headerOffset = isMobile ? -60 : -80;
      
      lenisRef.current.scrollTo(element, {
        offset: headerOffset, // Dynamic offset based on device size
        duration: isMobile ? 1.0 : 1.5, // Faster duration on mobile
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      
      // Close menu if open
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
  }, [menuOpen]);
  
  // Check if URL has special parameters
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      
      if (urlParams.has('source-code')) {
        setShowSourcePage(true);
        setShowDemoPage(false);
      } else if (urlParams.has('live-demo')) {
        setShowDemoPage(true);
        setShowSourcePage(false);
      } else {
        setShowSourcePage(false);
        setShowDemoPage(false);
      }
    };

    checkUrlParams();
    
    // Listen for URL changes
    window.addEventListener('popstate', checkUrlParams);
    
    return () => {
      window.removeEventListener('popstate', checkUrlParams);
    };
  }, []);
  
  // Initialize smooth scroll
  useEffect(() => {
    if (initialLoading && !initialLoadComplete.current) {
      document.body.style.overflow = 'hidden';
      return;
    }
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Create Lenis instance with optimized settings
    lenisRef.current = new Lenis({
      duration: isMobile ? 0.6 : 1.2, // Shorter duration for mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.2 : 1,
      touchMultiplier: isMobile ? 2.0 : 1.5, // Increased responsiveness for touch
      infinite: false,
      // Improved rendering performance
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      // Optimize for mobile
      syncTouch: isMobile ? false : true, // Disable on mobile for better performance
      // Lower lerp for better performance
      lerp: isMobile ? 0.05 : 0.1,
    });
    
    // Use requestAnimationFrame for smoother animation
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Add custom event listener for scrolling to sections from any component
    const handleScrollToSection = (e: CustomEvent) => {
      scrollTo(e.detail);
    };
    
    window.addEventListener('scrollToSection', handleScrollToSection as EventListener);
    
    // Update scroll position when window resizes for smoother transitions
    const resizeObserver = new ResizeObserver(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    });
    
    if (appRef.current) {
      resizeObserver.observe(appRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('scrollToSection', handleScrollToSection as EventListener);
    };
  }, [initialLoading, scrollTo]);
  
  // Initialize parallax effects with GSAP with performance optimizations
  useEffect(() => {
    if (initialLoading) return;
    
    const parallaxElements = document.querySelectorAll('.parallax');
    const scrollTriggers: gsap.core.Tween[] = [];
    
    parallaxElements.forEach(element => {
      const depth = element.getAttribute('data-depth') || '0.2';
      
      // Add will-change hint before animation starts for smoother transitions
      element.classList.add('will-change-transform');
      
      const tween = gsap.to(element, {
        y: `${100 * parseFloat(depth)}%`,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.1, // Lower value for smoother parallax
          invalidateOnRefresh: true, // Recalculate on resize
          onEnter: () => element.classList.add('will-change-transform'),
          onLeave: () => element.classList.remove('will-change-transform'),
          onEnterBack: () => element.classList.add('will-change-transform'),
          onLeaveBack: () => element.classList.remove('will-change-transform'),
        }
      });
      
      scrollTriggers.push(tween);
    });
    
    return () => {
      // Clean up all scroll triggers and remove will-change hints
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      parallaxElements.forEach(element => {
        element.classList.remove('will-change-transform');
      });
      scrollTriggers.forEach(tween => tween.kill());
    };
  }, [initialLoading]);
  
  // Handle menu state for body scrolling
  useEffect(() => {
    if (menuOpen) {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
      document.body.style.overflow = 'hidden';
    } else if (!initialLoading) {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      document.body.style.overflow = '';
    }
  }, [menuOpen, initialLoading]);
  
  // Render special pages without showing loading screen
  if (initialLoadComplete.current) {
    if (showSourcePage) {
      return <ComingSoon />;
    }
    if (showDemoPage) {
      return <LiveDemo />;
    }
  }
  
  return (
    <div ref={appRef} className="app">
      {initialLoading && !initialLoadComplete.current ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <CursorEffect />
          <Header onNavigate={scrollTo} />
          <main>
            <Hero onScrollDown={() => scrollTo('#work')} />
            <Work />
            <Skills />
            <About />
            <Contact />
          </main>
          <Footer onNavigate={scrollTo} />
        </>
      )}
    </div>
  );
}

export default App;