// components/ShutterAnimation.tsx
import React, { useEffect } from 'react';
//import { gsap, Expo } from 'gsap';

export default function ShutterAnimation () {
  useEffect(() => {
    // Animation logic goes here

    
        // const shutterSVG = document.getElementById('shutters_svg');
        // const shutters = shutterSVG.querySelectorAll('path');
      
        // const shutterTimeline = gsap.timeline({ paused: true, yoyo: true, repeat: 1 });
      
        // // Ajoutez les animations GSAP ici, similaires à celles de votre code JavaScript original
        // // Exemple :
        // shutterTimeline.from(shutters[0], { rotation: 60, transformOrigin: '39% 87%', ease: Expo.easeIn });
      
        // // Jouez l'animation
        // shutterTimeline.play();
      
      

  }, []);

  // Reste du code du composant
  return (
    <div className="container">
      {/* SVG et autres éléments ici */}
    </div>
  );
};
