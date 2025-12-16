import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItems from '../FoodItems/FoodItems'

function Food_display({ category }) {
  const { food_list } = useContext(StoreContext)

  return (
    <section className="w-full px-4 sm:px-8 md:px-16 py-14 bg-orange-50">

      {/* Section Heading */}
      <div className="mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Top Dishes Near You
        </h2>
        <div className="w-16 sm:w-24 h-1 bg-orange-500 rounded-full"></div>
      </div>

      {/* Food Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6 sm:gap-8 md:gap-10
      ">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItems
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            )
          }
        })}
      </div>

    </section>
  )
}

export default Food_display
