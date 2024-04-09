import React, {useEffect, useRef} from 'react';
import livingroom from '../images/livingroom.png';
const LandingPage: React.FC = () => {
  // Función para manejar el scroll suave
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (div) {
        const containerScrollPosition = div.scrollLeft;
        div.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
          behavior: 'smooth',
        });
      }
    };

    div?.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      div?.removeEventListener('wheel', handleScroll);
    };
  }, []);


  return (
    <div
    ref={divRef}
      className=" mx-auto max-w-screen-xl bg-gradient-to-b from-white to-custom-purple items-center justify-center"

    >

    <div className="hero flex">
      <div className="hero-content flex-col">
         <h1 className=" text-xl text-black font-bold">Aware Gaming</h1>
         <p className=" text-black text-base">Bienvenido a nuestra plataforma de juegos, donde creemos en el juego responsable.
Únete a esta experiencia y aprende acerca de la importancia divertirse concientemente</p>
          <button className="btn btn-primary text-base">Jugar</button>

     </div>
     <img className="rounded-lg max-w-custom p-10"   src={livingroom} alt="living room" />
      </div>
      {/* LANDING 2, 3...*/}

    </div>
  );
};

export default LandingPage;
