import React from 'react'
import { useData } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {

  const { data } = useData()
  const navigate = useNavigate()

  const getUniqueCategories = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property])
    newVal = [...new Set(newVal)]
    return newVal
  }

  const categoryOnlyData = getUniqueCategories(data, "category")

  return (
    <div className='bg-gradient-to-t from-slate-400 to-slate-100'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-5 md:gap-20 items-center md:justify-around justify-center py-7 px-4'>
        {categoryOnlyData?.map((item, index) => (
          <div key={index} className='flex flex-col items-center justify-center space-y-2'>
            <button
              onClick={() => navigate(`/category/${item}`)}
              className='bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 px-4 py-1 rounded-md text-white text-lg uppercase cursor-pointer'
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category