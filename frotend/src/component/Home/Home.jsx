import React from "react";
import { motion } from "framer-motion";
import "./Home.css";
import ProductCard from "./ProductCard";
import MataData from "../layouts/MataData/MataData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/loader/Loader";
import { useAlert } from "react-alert";
import HeroSlider from "./HeroSilder";
import FeaturedSlider from "./FeatureSlider";

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const SectionHeading = ({ title, subtitle }) => (
  <motion.div 
    className="section_heading"
    variants={headingVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
  >
    <h2 className="heading_title">{title}</h2>
    {subtitle && <p className="heading_subtitle">{subtitle}</p>}
    <div className="heading_line">
      <span className="line_accent"></span>
    </div>
  </motion.div>
);

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MataData title="Cricket Weapon - Premium Cricket Equipment" />
          <div className="Home_Page">
            {/* Hero Section */}
            <motion.div 
              className="heroSlider_Home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSlider />
            </motion.div>

            {/* Featured Products Section */}
            <motion.section 
              className="featured_section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading 
                title="Featured Products" 
                subtitle="Discover our top-rated cricket gear"
              />
              {products && <FeaturedSlider products={products} />}
            </motion.section>

            {/* Trending Products Section */}
            <motion.section 
              className="trending_section"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionHeading 
                title="Trending Products" 
                subtitle="Popular picks loved by cricketers"
              />
              <motion.div 
                className="trending-products"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </motion.div>
            </motion.section>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
