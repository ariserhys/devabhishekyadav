import React, { useEffect, useRef } from 'react';

const CursorEffect: React.FC = () => {
  // Make sure all hooks are declared before any conditional returns
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  
  // Set to true to disable the custom cursor effect
  const isDisabled = true;
  
  useEffect(() => {
    if (isDisabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };
    
    // Use transform3d for hardware acceleration
    const updateCursorPosition = () => {
      const { x: mouseX, y: mouseY } = mousePosRef.current;
      const { x: cursorX, y: cursorY } = cursorPosRef.current;
      
      // Calculate new cursor position with smoothing
      const smoothing = 0.05;
      cursorPosRef.current.x = cursorX + (mouseX - cursorX) * (1 - smoothing);
      cursorPosRef.current.y = cursorY + (mouseY - cursorY) * (1 - smoothing);
      
      if (cursorDotRef.current && cursorRingRef.current) {
        // Use translate3d for hardware acceleration
        cursorDotRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
        cursorRingRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      
      frameRef.current = requestAnimationFrame(updateCursorPosition);
    };
    
    // Watch for hover over links and buttons
    const handleLinkHover = () => {
      if (cursorDotRef.current && cursorRingRef.current) {
        cursorDotRef.current.classList.add('scale-up');
        cursorRingRef.current.classList.add('border-active');
      }
    };
    
    const handleLinkUnhover = () => {
      if (cursorDotRef.current && cursorRingRef.current) {
        cursorDotRef.current.classList.remove('scale-up');
        cursorRingRef.current.classList.remove('border-active');
      }
    };
    
    // Apply to all interactive elements - use event delegation for better performance
    const handleDocumentMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        handleLinkHover();
      }
    };
    
    const handleDocumentMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        handleLinkUnhover();
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleDocumentMouseOver, { passive: true });
    document.addEventListener('mouseout', handleDocumentMouseOut, { passive: true });
    
    frameRef.current = requestAnimationFrame(updateCursorPosition);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleDocumentMouseOver);
      document.removeEventListener('mouseout', handleDocumentMouseOut);
    };
  }, [isDisabled]);
  
  // Return null if disabled or render the custom cursor
  if (isDisabled) {
    return null;
  }
  
  return (
    <div className="cursor-container">
      <div ref={cursorDotRef} className="cursor-dot will-change-transform"></div>
      <div ref={cursorRingRef} className="cursor-ring will-change-transform"></div>
    </div>
  );
};

export default CursorEffect;