import './scss/index.scss';

import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Models } from '../../common/models';
import { HeroCarousel, ProductsFeatured } from '../../components';
import { structuredData } from '../../core/SEO/Homepage/structuredData';
import { generateCategoryUrl } from '../../core/utils';
import noPhotoImg from '../../images/no-photo.svg';

const Page: React.FC<{
  apiStatus: Models.APIFetchStatus;
  home: Models.HomePage | null;
}> = ({ home, apiStatus }) => {
  const categoriesExist = () => {
    return home && home.industries && home.industries.length > 0;
  };

  const { industries, heroImages} = home;
  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(home)}
      </script>
      <HeroCarousel loading={apiStatus.loading} sections={heroImages}/>
      <ProductsFeatured products={home.featuredBusinesses}/>
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="container">
            <div className="home-page__categories__title">
              <div className="home-page__categories__title__left_line"></div>
                <h3>Tus Negocios Favoritos</h3>
              <div className="home-page__categories__title__right_line"></div>
          </div>
            <div className="home-page__categories__list">
              {industries.map((ind) => (
                <div key={ind.id}>
                  <Link
                    to={generateCategoryUrl(ind.id, ind.name)}
                    key={ind.id}
                  >
                    <div
                      className={classNames(
                        "home-page__categories__list__image",
                        {
                          "home-page__categories__list__image--no-photo": !ind.backgroundImageUrl,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${
                          ind.backgroundImageUrl
                            ? ind.backgroundImageUrl
                            : noPhotoImg
                        })`,
                      }}
                    />
                    <h3>{ind.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
