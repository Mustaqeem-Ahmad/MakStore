import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'

const CategoryProduct = () => {

    const [searchData, setSearchData] = useState([])

const params = useParams()

const navigate = useNavigate()


const category = params.category

const getFilterData= async ()=>{
     try {

        const res = await axios.get(`https://fakestoreapi.in/api/products/category?type=${category}`)

        const data = res.data.products
        setSearchData(data)
        
     } catch (error) {
        console.log(error);
     }

}

useEffect(() => {
  getFilterData()
  window.scrollTo(0,0)    // page open ho to top se
}, [])



  return (
    <div>
        {searchData.length > 0 ? (
            <div className='max-w-6xl px-4 mx-auto my-10'>
                <button onClick={()=>navigate('/')} className='bg-[#101828] mb-5 text-white px-3 py-2 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>

                {searchData.map((product,index)=>{
                  return <ProductListView key={index} product={product} />
                })}
            </div>
        ) : (
            <div className='flex items-center justify-center h-[400px]'>
                <video muted autoPlay loop>
                    <source src={Loading} type='video/webm' />
                </video>
            </div>
        )}
    </div>
  )
}

export default CategoryProduct