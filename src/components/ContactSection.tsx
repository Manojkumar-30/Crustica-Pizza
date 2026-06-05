import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-32 px-4 sm:px-6 md:px-8 bg-primary-green relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white leading-[1] mb-12 sm:mb-20 tracking-tightest uppercase italic"
          >
            Visit Our <br /><span className="text-accent-green font-light lowercase">Botanical Haven.</span>
          </motion.h2>

          <div className="space-y-10 sm:space-y-14">
            {[
              { icon: MapPin, label: "Address", val: "AC-822, 8th E Main Rd, (Behind ibaco ice cream parlour), 1st Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560043", color: "text-accent-green"},
              { icon: Phone, label: "Phone", val: "+91 81977 99090", color: "text-white" },
              { icon: Mail, label: "Email", val: "crusticapizza@gmail.com", color: "text-white" },
              { icon: Clock, label: "Hours", val: "12:00 PM - 11:00 PM", detail: "Open all days", color: "text-white" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 sm:gap-8 text-white"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                  <item.icon className={`${item.color} w-6 h-6 sm:w-7 sm:h-7`} />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-3 font-black">{item.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-display font-medium tracking-tight leading-snug">{item.val}</p>
                  {item.detail && <p className="text-xs sm:text-sm text-white/30 mt-2 italic">{item.detail}</p>}
                </div>
              </motion.div>
            ))}

            <div className="flex gap-6 sm:gap-8 pt-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                <MessageCircle className="text-accent-green w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <button
                onClick={() => window.open("https://wa.me/918197799090", "_blank")}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-accent-green text-primary-green rounded-2xl sm:rounded-[2rem] font-black lowercase tracking-widest text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 font-mono"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-4 sm:p-4 rounded-[2.5rem] sm:rounded-[4rem] bg-white/[0.03] border border-white/10 overflow-hidden aspect-video sm:aspect-square lg:aspect-auto lg:h-[350px] relative group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d577.8539276211192!2d77.64650590624514!3d13.015131565467179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17000d751a61%3A0xff9b662328f1524c!2sCrustica%20Pizza!5e0!3m2!1sen!2sin!4v1780399142018!5m2!1sen!2sin"
              className="w-full h-full rounded-[2rem] sm:rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
            <div className="absolute bottom-10 right-10">
              <a
                href="https://www.google.com/maps/place/Crustica+Pizza/@13.015023,77.6439801,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae17000d751a61:0xff9b662328f1524c!8m2!3d13.015023!4d77.646555!16s%2Fg%2F11yr2dfhnp?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white text-primary-green rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-accent-green transition-all duration-500 shadow-2xl"
              >
                Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-8 ">
              <div className="space-y-4 ">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Your Personal </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[3rem] p-4 py-5 sm:py-6 focus:border-accent-green outline-none transition-all duration-500 text-white font-medium"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[3rem] p-4 py-5 sm:py-6 focus:border-accent-green outline-none transition-all duration-500 text-white font-medium"
                  placeholder="Enter the email"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="text-[14px] font-mono text-white/300 uppercase tracking-[0.2em] font-black">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-[2rem] px-8 py-5 sm:py-6 focus:border-accent-green outline-none h-32 sm:h-40 transition-all duration-500 text-white font-medium resize-none"
                  placeholder="We value your voice..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="w-full py-6 sm:py-7 bg-accent-green text-primary-green font-black uppercase tracking-[0.3em] text-xs rounded-2xl sm:rounded-[2rem] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-2xl shadow-accent-green/20 font-mono disabled:opacity-50"
              >
                {submitStatus === "loading" ? "Sending..." : submitStatus === "success" ? "Message Sent Successfully" : submitStatus === "error" ? "Error Sending - Retry" : "Send Fragment"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
