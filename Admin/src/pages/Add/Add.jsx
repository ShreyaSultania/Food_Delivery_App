import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
// import { useEffect } from 'react';

function Add({url}) {
  
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"

    })
    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))
    }
    // useEffect(()=>{
    //     console.log(data)
    // },[data]);

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        console.log("form submitted");
        const formData=new FormData();
        formData.append("name",data.name);
         formData.append("description",data.description);
          formData.append("price",Number(data.price));
            formData.append("category",data.category);
             formData.append("image",image);
             const response=await axios.post(`${url}/api/food/add`,formData);
             if(response.data.success){
              setData({
              name:"",
              description:"",
              price:"",
              category:"Salad"
             }
            )
          setImage(false)
          toast.success(response.data.message);
        }
             else{
              toast.error(response.data.error);
             }
    }
  return (

    <div className="max-w-4xl bg-white p-6 rounded-xl shadow-md">

      <form className="space-y-6" onSubmit={onSubmitHandler}>

        {/* Upload Image */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Upload image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image?URL.createObjectURL(image):assets.upload_area}
              alt=""
              className="w-40 h-32 object-contain border-2 border-dashed border-orange-400 rounded-lg p-4 hover:bg-orange-50 transition"
            />
          </label>
          <input type="file" id="image" name="image" hidden required onChange={(e)=>{
            setImage(e.target.files[0])
          }}/>
        </div>

        {/* Product Name */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Product name</p>
          <input onChange={onChangeHandler} value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Product Description */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description}
            rows={5}
            placeholder="Write content here"
            name="description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <p className="font-semibold text-gray-700 mb-2">Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Sandwich</option>
              <option>Cake</option>
              <option>Pure Veg</option>
              <option>Pasta</option>
              <option>Noodles</option>
            </select>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Product price</p>
            <input onChange={onChangeHandler} value={data.price}
              type="number"
              name="price"
              placeholder="₹ 30"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

        </div>

        {/* Submit Button */}
        <button type='submit'
          className="bg-orange-500 text-white px-8 py-2 rounded-lg font-semibold
                     hover:bg-orange-600 transition shadow"
        >
          ADD
        </button>

      </form>
    </div>
  )
}

export default Add
