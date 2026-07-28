import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

export default function Celebration() {
  const triggerCelebration = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const particleMultiplier = isMobile ? 0.6 : 1;
    const colors = ['#001a9c', '#ffb703', '#e63946', '#2a9d8f', '#9d4edd', '#f72585', '#4cc9f0', '#ffd700'];

    // Left celebration cannon burst
    const fireLeft = () => {
      confetti({
        particleCount: Math.floor(50 * particleMultiplier),
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.85 },
        colors: colors,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    };

    // Right celebration cannon burst
    const fireRight = () => {
      confetti({
        particleCount: Math.floor(50 * particleMultiplier),
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.85 },
        colors: colors,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    };

    // Synchronized cannon burst right as preloader dissolves (~1100ms)
    const timer1 = setTimeout(() => {
      fireLeft();
      fireRight();
    }, 1100);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    const cleanup = triggerCelebration();
    return cleanup;
  }, [triggerCelebration]);

  return null;
}
