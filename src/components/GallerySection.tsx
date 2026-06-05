import { motion } from "framer-motion";
import {Instagram, Youtube, Facebook, ArrowUpRight,} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import post1 from "../Assets/Influencer-1.png";
import post2 from "../Assets/Youtube_review1.png";
import post3 from "../Assets/Facebook _review 1.png";
import post4 from "../Assets/Instagram_review2.png";
import post5 from "../Assets/Instagram_review3.png";
import post6 from "../Assets/Instagram_review4.png";


const socialPosts = [
  {
    platform: "instagram",
    image: post1,
    link: "https://www.instagram.com/reel/DUVR4HHkZiT/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  },

  {
    platform: "youtube",
    image: post2,
    link: "https://youtube.com/shorts/CgLx3XYzJKQ?si=jAaL-UYGnLAhdnKG",
  },

  {
    platform: "facebook",
    image: post3,
    link: "https://www.facebook.com/watch/?v=1339339987968993",
  },

  {
    platform: "instagram",
    image: post4,
    link: "https://www.instagram.com/reel/DTvFN-kEt6q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },

  {
    platform: "instagram",
    image: post5,
    link: "https://www.instagram.com/reel/DYblqqeyi4n/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
   {
    platform: "instagram",
    image: post6,
    link: "https://www.instagram.com/reel/DT0H2yPE3Eo/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
  },
];

      const getPlatformIcon = (platform: string) => {
        switch (platform) {
          case "instagram":
            return <Instagram size={18} className="text-white" />;

          case "youtube":
            return <Youtube size={18} className="text-white" />;

          case "facebook":
            return <Facebook size={18} className="text-white" />;

          default:
            return <Instagram size={18} className="text-white" />;
        }
      };
export const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-primary-green
        py-20
        md:py-28
        lg:py-40
      "
    >
      {/* Glow Effects */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent-green/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-accent-green/10 blur-[140px] rounded-full" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 lg:mb-24">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className=" text-accent-green font-mono uppercase block text-[18px] sm:text-xl font-black tracking-tightest mb-4 sm:mb-6"
            >
              Visual Chronicle
            </span>

            <h2
              className="
                text-white
                leading-[0.85]
                font-display
                font-black
                italic
                uppercase

                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                xl:text-9xl
              "
            >
              THE PIECE
              <br />
              <span className="text-accent-green font-light lowercase">
                of art.
              </span>
            </h2>
          </motion.div>

          <motion.a
            href="https://www.instagram.com/crusticapizza_/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="
              inline-flex
              items-center
              gap-3
              px-6
              py-4
              rounded-full
              bg-black/20
              backdrop-blur-xl
              border
              border-white/10
              text-white
              font-semibold
              hover:bg-white
              hover:text-primary-green
              transition-all
            "
          >
            <Instagram size={18} />
            Explore Feed
          </motion.a>
        </div>

        {/* SOCIAL WALL */}

        <div className="space-y-8">

          <Swiper
            modules={[Autoplay]}
            loop
            speed={5000}
            allowTouchMove
            grabCursor
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={16}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
              },
              480: {
                slidesPerView: 1.5,
              },
              640: {
                slidesPerView: 2.2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 5,
              },
            }}
          >
            {socialPosts.map((post, i) => (
              <SwiperSlide key={i}>
                <motion.a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -10 }}
                  className="
                    group
                    block
                    relative
                    overflow-hidden
                    rounded-[24px]
                    md:rounded-[32px]
                    lg:rounded-[40px]
                    aspect-[3/5]
                    bg-black/20
                    shadow-[0_25px_50px_rgba(0,0,0,0.25)]
                  "
                >
                  <img
                    src={post.image}
                    alt=""
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-all
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/90
                      via-black/20
                      to-transparent
                    "
                  />

                  <div
                    className="
                      absolute
                      top-4
                      right-4
                      w-11
                      h-11
                      rounded-full
                      bg-black/50
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {getPlatformIcon(post.platform)}
                  </div>

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-5
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          View Content
                        </p>

                        <p className="text-white/60 text-xs capitalize">
                          {post.platform}
                        </p>
                      </div>

                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-accent-green
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <ArrowUpRight
                          size={18}
                          className="text-black"
                        />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Mobile CTA */}
        <div className="flex justify-center mt-10 md:hidden">
          <a
            href="https://www.instagram.com/crusticapizza_/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6
              py-3
              rounded-full
              bg-accent-green
              text-black
              font-bold
              flex
              items-center
              gap-2
            "
          >
            <Instagram size={18} />
            Follow Us
          </a>
        </div>

      </div>
    </section>
  );
};