// import React, { useState, useEffect, useRef } from 'react';

// // Définissez l'interface pour chaque image
// interface ParallaxImage {
//   url: string;
//   size: 'small' | 'medium' | 'large';
//   customStyle?: React.CSSProperties; // Styles CSS optionnels pour une image spécifique
// }

// interface ParallaxProps {
//   images: ParallaxImage[];
// }

// export default function Parallax ({ images :<ParallaxProps> }) {
//   const [offsetY, setOffsetY] = useState(0);
//   const [windowCenter, setWindowCenter] = useState(0);

//   const handleScroll = () => {
//     setOffsetY(window.pageYOffset);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const updateWindowCenter = () => {
//       setWindowCenter(window.innerHeight / 2);
//     };

//     window.addEventListener('resize', updateWindowCenter);
//     updateWindowCenter();

//     return () => window.removeEventListener('resize', updateWindowCenter);
//   }, []);

//   const calculateSize = (size: string, position: number) => {
//     // Ajoutez ici la logique pour ajuster la taille des images
//   };

//   const calculateHorizontalShift = (offsetY: number, imageTop: number) => {
//     // Ajoutez ici la logique pour le déplacement horizontal des images
//   };

//   const calculateOpacity = (offsetY: number, imageTop: number) => {
//     // Ajoutez ici la logique pour ajuster l'opacité des images
//   };

//   return (
//     <div>
//       {images.map((image, index) => {
//         const imageRef = useRef<HTMLDivElement>(null);

//         // Calculez les effets dynamiques pour chaque image
//         const horizontalShift = imageRef.current
//           ? calculateHorizontalShift(offsetY, imageRef.current.offsetTop)
//           : 0;
//         const opacity = imageRef.current
//           ? calculateOpacity(offsetY, imageRef.current.offsetTop)
//           : 1;

//         return (
//           <div
//             ref={imageRef}
//             key={index}
//             style={{
//               backgroundImage: `url(${image.url})`,
//               transform: `translateX(${horizontalShift}px)`,
//               opacity: opacity,
//               ...image.customStyle,
//               // Autres styles...
//             }}
//             className={`parallax-image ${calculateSize(image.size, offsetY)}`}
//           >
//             {/* Contenu optionnel pour chaque section */}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
