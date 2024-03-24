import slide1 from "../images/b1.jpg";
import slide2 from "../images/b2.jpg";
import slide3 from "../images/b3.jpg";
import slide4 from "../images/b4.jpg";
import ImageSlider from "./ImageSlider";

const slides = [slide1, slide2, slide3, slide4];

export default function Carousel() {
  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        // aspectRatio: "10 / 6",
        // maxWidth: "1200px",
        // height: "800px",
      }}
    >
      <ImageSlider imageUrls={slides} />
    </div>
  );
}
