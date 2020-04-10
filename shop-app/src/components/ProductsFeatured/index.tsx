import './scss/index.scss';

import * as React from 'react';

import { Carousel, ProductListItem } from '..';

interface ProductsFeaturedProps {
  title?: string;
  products: Array<{
    id: string;
    name: string;
    address: string;
    imageUrls: string[];
    maxDiscount: number;
  }>
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title, products }) => {
  return (
    <div className="products-featured">
      <div className="container">
        <h3>{title}</h3>
        <Carousel>
          {products.map(( product ) => (
            <a>
              <ProductListItem product={product} />
            </a>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
