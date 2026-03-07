import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-16">

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Get in Touch with{" "}
          <span className="text-pink-400">MakStore</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="text-white space-y-8">

            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Contact Info
              </h3>

              <p className="text-gray-300">
                Have a question or need support? We're here to help you with your shopping experience.
              </p>
            </div>

            <div className="space-y-4 text-gray-200">

              <div className="flex items-center gap-3">
                <MapPin className="text-pink-400" size={20} />
                <p>123 Tech Lane, Kolkata, India</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-pink-400" size={20} />
                <p>support@MakStore.com</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-pink-400" size={20} />
                <p>+91 98765 43210</p>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <form className="space-y-6">

            <div>
              <label className="block text-white mb-1">
                Your Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-white mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-white mb-1">
                Your Message
              </label>

              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-xl
              hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/40
              transition duration-300"
            >
              Send Message 🚀
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;