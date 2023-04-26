import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./FeatureSlider.css";

const FeaturedSlider = () => {
  const featuredProducts = [
    {
      id: 1,
      images: [
        "https://5.imimg.com/data5/TV/XG/MY-7466880/cricket-helmet-500x500.jpg",
      ],
      title: "Product 1",
      originalPrice: 100,
      finalPrice: 10,
    },
    {
      id: 2,
      images: [
        "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/f6804705d3c9b06dccd038949280b6b0/r/o/rory-burns-cricket-bat_1.jpg",
      ],
      title: "Product 2",
      originalPrice: 50,
      finalPrice: 5,
    },
    {
      id: 3,
      images: [
        "https://contents.mediadecathlon.com/p1805918/3affdf4be21ed02a174738d8a0958b12/p1805918.jpg",
      ],
      title: "Product 3",
      originalPrice: 200,
      finalPrice: 20,
    },
  ];

  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      effect={"coverflow"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 70,
        modifier: 3,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 200,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 250,
        },
      }}
      className="featured_swiper"
    >
      {featuredProducts.map((item) => {
        const { id, images, title, finalPrice, originalPrice } = item;
        const newPrice = finalPrice;
        const oldPrice = originalPrice;

        return (
          <SwiperSlide key={id} className="featured_slides">
            <div className="featured_title">{title}</div>
            <figure className="featured_img">
              <img src={images[0]} alt="" />
            </figure>
            <h2 className="products_price">
              <span className="final_price">₹{newPrice}</span> &nbsp;
              <small>
                <del className="old_price">₹{oldPrice}</del>
              </small>
            </h2>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FeaturedSlider;
