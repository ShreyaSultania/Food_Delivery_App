import React from 'react'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="w-full px-4 sm:px-8 md:px-16 py-16 bg-orange-50" id="explore-menu">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-3">
          Explore Our Menu
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission
          is to satisfy our customers with delicious, fresh, and hygienic food.
        </p>
      </div>

      {/* Menu Grid */}
      <div className="
        grid 
        grid-cols-3 
        sm:grid-cols-4 
        md:grid-cols-5 
        lg:grid-cols-6 
        xl:grid-cols-8 
        gap-6 sm:gap-8 md:gap-10
      ">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;

          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="group flex flex-col items-center cursor-pointer transition-all duration-300"
            >
              {/* Image Card */}
              <div
                className={`
                  rounded-full overflow-hidden shadow-lg bg-white 
                  border-4 transition-all duration-300
                  ${isActive ? "border-orange-500 shadow-orange-300" : "border-orange-200"}
                  w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
                `}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className={`
                    w-full h-full object-cover 
                    transition-transform duration-300
                    ${isActive ? "scale-110" : "group-hover:scale-110"}
                  `}
                />
              </div>

              {/* Menu Name */}
              <p
                className={`
                  mt-3 text-xs sm:text-sm md:text-base font-semibold 
                  transition-colors duration-300
                  ${isActive ? "text-orange-600" : "text-gray-800 group-hover:text-orange-600"}
                `}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default ExploreMenu
