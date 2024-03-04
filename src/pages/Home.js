import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "../components/Product";
import { v4 as uuidv4 } from "uuid";
import Carousel from "../components/Carousel";
// import banner from "../Images/banner.jpg";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const moreProductsEl = products.map((product) => {
    return (
      <Product
        key={uuidv4()}
        id={product.id}
        title={product.title}
        price={product.price}
        rating={product.rating}
        image={product.images[0]}
      />
    );
  });

  return (
    <div className="home">
      <div className="home__container">
        {/* <img className="home__image" src={banner} alt="banner" /> */}
        <Carousel />
        <div className="home__row">
          <Product
            id="12321341"
            title="ASUS Dual GeForce RTX™ 4070 OC Edition 12GB GDDR6X (PCIe 4.0, 12GB GDDR6X, DLSS 3, HDMI 2.1, DisplayPort 1.4a, 2.56-Slot Design, Axial-tech Fan Design, 0dB Technology)"
            price={699}
            rating={5}
            image="https://m.media-amazon.com/images/I/61eVx7oQ1OL._SX679_.jpg"
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
        <div className="more-products-grid">{moreProductsEl}</div>
      </div>
    </div>
  );
}
