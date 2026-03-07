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
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
              >

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100">
                  <Icon className="h-6 w-6 text-pink-500" />
                </div>

                {/* Text */}
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {feature.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {feature.subtext}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Features;