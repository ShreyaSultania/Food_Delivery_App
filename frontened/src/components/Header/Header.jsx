import React from 'react'

function Header() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex justify-center mb-10 sm:mb-16 px-4">
      <div
        className="
          w-full sm:w-[90%] 
          h-[60vh] sm:h-[70vh] md:h-[80vh] 
          flex items-center justify-center 
          bg-cover bg-center 
          relative rounded-2xl sm:rounded-3xl 
          overflow-hidden
        "
        style={{
          backgroundImage: "url('/header_img.png')"
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-xl md:max-w-2xl">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Order your favourite food here
          </h2>

          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-5 sm:mb-6">
            Choose from a diverse menu featuring a delectable array of dishes crafted
            with the finest ingredients and delivered hot & fresh to your doorstep.
          </p>

          <button
            onClick={scrollToMenu}
            className="
              px-6 sm:px-8 
              py-2.5 sm:py-3 
              bg-orange-500 text-white 
              text-sm sm:text-lg 
              font-semibold rounded-full shadow-md 
              hover:bg-orange-600 hover:scale-105 
              transition-all duration-300
            "
          >
            View Menu
          </button>

        </div>
      </div>
    </div>
  )
}

export default Header
