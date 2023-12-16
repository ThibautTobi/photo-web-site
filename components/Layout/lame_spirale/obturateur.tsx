'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Obturateur() {
    const shutterRef = useRef<SVGSVGElement>(null);
    const tl = useRef(gsap.timeline({ paused: true }));

    useEffect(() => {
    // Vérifiez si shutterRef.current est non null avant de continuer
    if (shutterRef.current) {
    const shutters = shutterRef.current.querySelectorAll('path');

    // Définissez ici les animations GSAP pour ouvrir et fermer les shutters
    tl.current
      .to(shutters, { rotation: 120,transformOrigin: "center",duration: 0.5 })
      .to(shutters, { rotation: 0, duration: 0.5 }, '+=1');
}
    }, []);

    const toggleShutter = () => {
        tl.current.reversed() ? tl.current.play() : tl.current.reverse();
    };

    return (
        // modifier le style dans le global ou avec tailwind
        <div onClick={toggleShutter} style={{ backgroundColor: 'pink', width: '100vw', height: '100vh' }}>
            <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
                <g id="shutters">
                    <path id="shutter1" d="M495.6,509C466.2,673.8,390.8,839,296,1000H707C704,784.9,608.2,584.6,495.6,509Z" transform="translate(0 -3.5" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
                    <path id="shutter2" d="M296,1000c90.9-137,167-319,203-499C368,593,201.3,655.6,0,707Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter3" d="M0,707V295c142.6,85.4,302.9,158.8,499,208C363.2,592.2,198.6,661.4,0,707Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter4" d="M290,4,0,295.8C180.2,401.6,334.3,464.8,498,501,396,354.6,310,60.8,290,4Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter5" d="M290,4H709C622.7,137.4,560.5,310.4,498,499,400.1,346.2,335.5,170.8,290,4Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter6" d="M1001.5,292.5,705.8,3.5C619.9,146.2,563.7,301.6,498,500,646.3,398.3,944,312.5,1001.5,292.5Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter7" d="M999,294.9l.2,422.9C854.5,630.2,691.9,554.9,492.9,504.5,593.7,433,779.3,358.7,999,294.9Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    <path id="shutter8" d="M499,509c169.3,38.9,335.9,109.1,500,209L707,1000c-6-259-117-423-208-491" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
               
                </g>
            </svg>
        </div>

        // <div onClick={toggleShutter} style={{ backgroundColor: 'pink', width: '100vw', height: '100vh' }}>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //             <path id="shutter1" d="M495.6,509C466.2,673.8,390.8,839,296,1000H707C704,784.9,608.2,584.6,495.6,509Z" transform="translate(0 1)" fill="#28292e" strokeWidth="1" stroke="#000"/>
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">

        //             <path id="shutter2" d="M296,1000c90.9-137,167-319,203-499C368,593,201.3,655.6,0,707Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //         <path id="shutter3" d="M0,707V295c142.6,85.4,302.9,158.8,499,208C363.2,592.2,198.6,661.4,0,707Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //             <path id="shutter4" d="M290,4,0,295.8C180.2,401.6,334.3,464.8,498,501,396,354.6,310,60.8,290,4Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //             <path id="shutter5" d="M290,4H709C622.7,137.4,560.5,310.4,498,499,400.1,346.2,335.5,170.8,290,4Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //         <path id="shutter6" d="M1001.5,292.5,705.8,3.5C619.9,146.2,563.7,301.6,498,500,646.3,398.3,944,312.5,1001.5,292.5Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //         <path id="shutter7" d="M999,294.9l.2,422.9C854.5,630.2,691.9,554.9,492.9,504.5,593.7,433,779.3,358.7,999,294.9Z" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
                    
        //         </g>
        //     </svg>
        //     <svg id="shutters_svg" ref={shutterRef} data-name="shutters_svg" xmlns="http://www.w3.org/2000/svg" width="1001.5" height="996.5" viewBox="0 0 1001.5 996.5">
        //         <g id="shutters">
        //         <path id="shutter8" d="M499,509c169.3,38.9,335.9,109.1,500,209L707,1000c-6-259-117-423-208-491" transform="translate(0 -3.5)" fill="#28292e" strokeWidth="1" stroke="#000"/>
            
        //         </g>
        //     </svg>
        // </div>


    );
}
