'use client'
import { useEffect } from 'react';


export default function CustomCursor() {
    useEffect(() => {
      const updateCursor = (e: MouseEvent) => {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }
      };
  
      // Ajout des écouteurs pour le mouvement de la souris
      window.addEventListener('mousemove', updateCursor);
  
      // // Gestion du survol des liens
      // const handleLinkHover = (e:any) => {
      //   e.target.classList.add('cursor-link-hover');
      // };
  
      // // Gestion du survol des inputs
      // const handleInputHover = (e:any) => {
      //   e.target.classList.add('cursor-input-hover');
      // };
  
      // // Sélectionner tous les liens et inputs
      // const links = document.querySelectorAll('a');
      // const inputs = document.querySelectorAll('input');
  
      // // Ajouter des écouteurs pour les liens et les inputs
      // links.forEach(link => {
      //   link.addEventListener('mouseover', handleLinkHover);
      //   link.addEventListener('mouseout', () => {
      //     link.classList.remove('cursor-link-hover');
      //   });
      // });
  
      // inputs.forEach(input => {
      //   input.addEventListener('mouseover', handleInputHover);
      //   input.addEventListener('mouseout', () => {
      //     input.classList.remove('cursor-input-hover');
      //   });
      // });
  
      // return () => {
      //   window.removeEventListener('mousemove', updateCursor);
      //   links.forEach(link => {
      //     link.removeEventListener('mouseover', handleLinkHover);
      //   });
      //   inputs.forEach(input => {
      //     input.removeEventListener('mouseover', handleInputHover);
      //   });
      // };
    }, []);
  
    return <div id="custom-cursor" />;
  };


  /**

  
export default function CustomCursor() {
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    // Ajout des écouteurs pour le mouvement de la souris
    window.addEventListener('mousemove', updateCursor);

    // Gestion du survol des liens
    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.classList.add('cursor-link-hover');
      }
    };

    // Gestion du survol des inputs
    const handleInputHover = (e: React.MouseEvent<HTMLInputElement>) => {
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.classList.add('cursor-input-hover');
      }
    };

    // Sélectionner tous les liens et inputs
    const links = document.querySelectorAll('a');
    const inputs = document.querySelectorAll('input');

    // Ajouter des écouteurs pour les liens et les inputs
    links.forEach(link => {
      link.addEventListener('mouseover', handleLinkHover);
      link.addEventListener('mouseout', () => {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
          cursor.classList.remove('cursor-link-hover');
        }
      });
    });

    inputs.forEach(input => {
      input.addEventListener('mouseover', handleInputHover);
      input.addEventListener('mouseout', () => {
        const cursor = document.getElementById('custom-cursor');
        if (cursor) {
          cursor.classList.remove('cursor-input-hover');
        }
      });
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      links.forEach(link => {
        link.removeEventListener('mouseover', handleLinkHover);
      });
      inputs.forEach(input => {
        input.removeEventListener('mouseover', handleInputHover);
      });
    };
  }, []);

  return <div id="custom-cursor" />;
};

   **/