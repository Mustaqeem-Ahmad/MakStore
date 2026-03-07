import { Clock, Lock, RotateCcw, Truck } from "lucide-react";
import React from "react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="bg-linear-to-b from-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-pink-100 group-hover:bg-pink-500 transition">
                  <feature.icon className="h-6 w-6 text-pink-600 group-hover:text-white" />
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {feature.text}
                  </p>
                  <p className="text-sm text-gray-500">{feature.subtext}</p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default Features;