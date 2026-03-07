import React from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {

  const { data } = useData();
  const navigate = useNavigate();

  const getUniqueCategories = (data, property) => {
    let newVal = data?.map((curElem) => curElem[property]);
    newVal = [...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategories(data, "category");

  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-200 py-12">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {categoryOnlyData?.map((item, index) => (

            <div
              key={index}
              onClick={() => navigate(`/category/${item}`)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center justify-center group"
            >

              {/* Icon Circle */}

              <div className="w-16 h-16 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition">

                {item.charAt(0).toUpperCase()}

              </div>

              {/* Category Name */}

              <p className="mt-4 font-semibold text-gray-700 capitalize group-hover:text-red-500 transition">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Category;