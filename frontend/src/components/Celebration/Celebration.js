import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

export default function Celebration() {
  const triggerCelebration = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const particleMultiplier = isMobile ? 0.7 : 1;

    // Vibrant celebratory color palette matching brand blue, gold, magenta, teal
    const colors = ['#001a9c', '#ffb703', '#e63946', '#2a9d8f', '#9d4edd', '#f72585', '#4cc9f0', '#ffd700'];

    // Left celebration cannon burst
    const fireLeft = () => {
      confetti({
        particleCount: Math.floor(80 * particleMultiplier),
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
        particleCount: Math.floor(80 * particleMultiplier),
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.85 },
        colors: colors,
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    };

    // Wave 1: Immediate Left & Right Cannons launch on site open/refresh
    fireLeft();
    fireRight();

    // Wave 2: Mid-celebration wave with higher trajectory (600ms)
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: Math.floor(55 * particleMultiplier),
        angle: 55,
        spread: 65,
        origin: { x: 0.02, y: 0.75 },
        colors: colors,
        zIndex: 99999,
        shapes: ['circle', 'square'],
      });
      confetti({
        particleCount: Math.floor(55 * particleMultiplier),
        angle: 125,
        spread: 65,
        origin: { x: 0.98, y: 0.75 },
        colors: colors,
        zIndex: 99999,
        shapes: ['circle', 'square'],
      });
    }, 600);

    // Wave 3: Grand Finale burst as preloader reveals main content (2100ms)
    const timer2 = setTimeout(() => {
      fireLeft();
      fireRight();
      // Center festive celebration burst
      confetti({
        particleCount: Math.floor(65 * particleMultiplier),
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ffb703', '#f72585', '#4cc9f0', '#001a9c', '#ffd700'],
        zIndex: 99999,
        scalar: 1.25,
      });
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    // Automatically start celebration animation when website opens or is refreshed
    const cleanup = triggerCelebration();
    return cleanup;
  }, [triggerCelebration]);

  return null;
}
