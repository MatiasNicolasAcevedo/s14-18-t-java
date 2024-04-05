import React from 'react';

const LandingPage: React.FC = () => {
  // Función para manejar el scroll suave
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget;
    const containerScrollPosition = container.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onWheel={handleScroll}
      className="w-full h-screen overflow-hidden bg-white items-center justify-center text-white font-sans"

    >
      <div className="hero  max-w-md bg-gradient-to-b from-white to-purple-500 to-8d3da5">
      <div className="hero-content flex-col lg:flex-row-reverse">
    <div>
      <h1 className="text-5xl font-bold">Aware Gaming</h1>
      <p className="py-6">Bienvenido a nuestra plataforma de juegos, donde creemos en el juego responsable.
Únete a esta experiencia y aprende acerca de la importancia divertirse concientemente</p>
      <button className="btn btn-secondary">Jugar</button>
    </div>
     </div>
      </div>
      {/* LANDING 2, 3...*/}

    </div>
  );
};

export default LandingPage;
