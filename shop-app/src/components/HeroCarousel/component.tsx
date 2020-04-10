import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Carousel, Loader } from '../';
import { generateCategoryUrl } from '../../core/utils';

interface HeroCarouselProps {
    sections: Array<{
      id: string;
      name: string;
      imageUrl: string;
      copyTitle: string;
      copyText: string;
    }>;
    loading: boolean;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ sections, loading }) => {
    const singleSlide = (id: string, name: string, backgroundImageUrl: string, copyTitle: string, copyText: string) => {
        return (
            <div
            className="home-page__hero"
            style={
              backgroundImageUrl
                ? { backgroundImage: `url(${backgroundImageUrl})` }
                : null
            }
          >
            <div className="home-page__hero-text">
              <div>
                <span className="home-page__hero__title">
                <h1>{copyTitle}</h1>
                </span>
              </div>
              <div>
                <span className="home-page__hero__title">
                <h1>{copyText}</h1>
                </span>
              </div>
            </div>
            <div className="home-page__hero-action">
              {loading ? (
                <Loader />
              ) : (
                <Link
                  to={generateCategoryUrl(
                    id,
                    name
                  )}
                >
                  <Button>Compra Ahora</Button>
                </Link>
              )}
            </div>
          </div>
        )
    }

    return (
        <Carousel slidesPerView={1} renderCenterControls={true}>
         {sections.map((sec) => singleSlide(sec.id, sec.name, sec.imageUrl, sec.copyTitle, sec.copyText))} 
        </Carousel>)
}