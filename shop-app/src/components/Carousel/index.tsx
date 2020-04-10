import './scss/index.scss';

import NukaCarousel, { CarouselProps } from 'nuka-carousel';
import * as React from 'react';
import Media from 'react-media';
import ReactSVG from 'react-svg';

import { mediumScreen, smallScreen } from '../../globalStyles/scss/variables.scss';
import arrowImg from '../../images/carousel-arrow.svg';

interface CarouselType extends CarouselProps {
  children: React.ReactNode;
  renderCenterControls?: boolean;
  slidesPerView?: number;
}

const Carousel: React.FC<CarouselType> = ({ children, renderCenterControls, slidesPerView, ...rest }) => {
  const settings = {
    className: "carousel",
    renderBottomCenterControls: renderCenterControls ? undefined : () => null,
    renderCenterLeftControls: ({ previousSlide, currentSlide }) =>
      currentSlide !== 0 ? (
        <div
          onClick={previousSlide}
          className="carousel__control carousel__control--left"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    renderCenterRightControls: ({
      nextSlide,
      currentSlide,
      slideCount,
      slidesToShow,
    }) =>
      slideCount - slidesToShow !== currentSlide ? (
        <div
          onClick={nextSlide}
          className="carousel__control carousel__control--right"
        >
          <ReactSVG path={arrowImg} />
        </div>
      ) : null,
    ...rest,
  };
  const carousel = (slides: number) => (
    <NukaCarousel slidesToShow={slides} slidesToScroll={slides} {...settings}>
      {children}
    </NukaCarousel>
  );

  return (
    <Media query={{ maxWidth: smallScreen }}>
      {matches =>
        matches ? (
          carousel(1)
        ) : (
          <Media query={{ maxWidth: mediumScreen }}>
            {matches => carousel(slidesPerView ? slidesPerView: matches ? 2 : 4)}
          </Media>
        )
      }
    </Media>
  );
};

export default Carousel;
