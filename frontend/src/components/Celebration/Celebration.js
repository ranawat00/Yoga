import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

export default function Celebration() {
  const triggerCelebration = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const particleMultiplier = isMobile ? 0.7 : 1;
    const colors = ['#001a9c', '#ffb703', '#e63946', '#2a9d8f', '#9d4edd', '#f72585', '#4cc9f0', '#ffd700'];

    // Left celebration cannon burst
    const fireLeft = () => {
      confetti({
        particleCount: Math.floor(60 * particleMultiplier),
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.85 },
        colors: colors,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    };

    // Right celebration cannon burst
    const fireRight = () => {
      confetti({
        particleCount: Math.floor(60 * particleMultiplier),
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.85 },
        colors: colors,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    };

    // Launch Left & Right Cannons when page is refreshed/opened (~600ms)
    const timer1 = setTimeout(() => {
      fireLeft();
      fireRight();
    }, 600);

    // Follow-up celebratory wave (~1200ms)
    const timer2 = setTimeout(() => {
      fireLeft();
      fireRight();
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const cleanup = triggerCelebration();
    return cleanup;
  }, [triggerCelebration]);

  return null;
}
