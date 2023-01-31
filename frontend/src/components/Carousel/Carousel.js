import React, { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Carousel.css";

const Carousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = props.images.length;
  const nextImage = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };
  const prevImage = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };
  if (!Array.isArray(props.images) || length <= 0) {
    return null;
  }
  return (
    <section className="slider">
      <NavigateBeforeIcon className="leftArrow" onClick={prevImage} />
      <NavigateNextIcon className="rightArrow" onClick={nextImage} />
      {props.images.map((image, index) => {
        return (
          <div
            className={index === currentIndex ? "slideActive" : "slide"}
            key={image._id}
          >
            {index === currentIndex && (
              <img
                src={image.url}
                alt={`ProductImg ${index + 1}`}
                className="image"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Carousel;
