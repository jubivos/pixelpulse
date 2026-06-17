'use client';
import { useEffect } from 'react';

export default function RetroEffects() {
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const navLink = target.closest('.nav-link');
      if (navLink && !navLink.classList.contains('active')) {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 200);
      }
    };

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const crt = document.querySelector('.crt');
        if (crt) {
          (crt as HTMLElement).style.opacity = '0.3';
          setTimeout(() => {
            if (crt) (crt as HTMLElement).style.opacity = '1';
          }, 100);
        }
      }
    }, 3000);

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
      clearInterval(interval);
    };
  }, []);

  return null;
}