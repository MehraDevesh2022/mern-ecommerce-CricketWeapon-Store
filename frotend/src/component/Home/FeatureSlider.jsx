import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { motion } from "framer-motion";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./FeatureSlider.css";
import { Link } from "react-router-dom";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

// Card animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const FeaturedSlider = ({ products }) => {
  return (
    <div className="featured_container">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        loop={true}
        speed={600}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
        }}
        centeredSlides={false}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
        }}
        className="featured_swiper"
      >
        {products.map((product, index) => {
          const { _id, images, name, price } = product;
          let newPrice = generateDiscountedPrice(price);
          newPrice = dispalyMoney(newPrice);
          const oldPrice = dispalyMoney(price);

          return (
            <SwiperSlide key={_id} className="featured_slide_wrapper">
              <motion.div
                className="featured_slides"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/product/${_id}`}
                  className="featured_link"
                >
                  <div className="featured_badge">Featured</div>
                  <figure className="featured_img">
                    <img src={images[0].url} alt={name} loading="lazy" />
                  </figure>
                  <div className="featured_content">
                    <h3 className="featured_title">{name}</h3>
                    <div className="products_price">
                      <span className="final_price">{newPrice}</span>
                      <small>
                        <del className="old_price">{oldPrice}</del>
                      </small>
                    </div>
                    <div className="featured_discount_badge">35% OFF</div>
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom" aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="swiper-button-next-custom" aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default FeaturedSlider;
