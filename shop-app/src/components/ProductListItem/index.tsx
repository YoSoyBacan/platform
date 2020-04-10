import './scss/index.scss';

import { Thumbnail } from '@components/molecules';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { generateProductUrl } from '../../core/utils';


interface ProductListItemProps {
  product: {
    id: string;
    name: string;
    address: string;
    imageUrls: string[];
    maxDiscount: number;
  };
}


const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    id,
    name,
    address,
    imageUrls,
    maxDiscount
  } = product;

  const [isHovered, setState] = React.useState(false);
  // const [ isAuthenticated, setAuthenticatedState ] = React.useState(false);
  // const [ productVariant, setProductVariant ] = React.useState({
  //   variantId: '',
  //   quantity: 0,
  // });

  // const price = product.pricing.priceRange.start;
  // const priceUndiscounted = product.pricing.priceRangeUndiscounted.start;

  // const getProductPrice = () => {
  //   if (isEqual(price, priceUndiscounted)) {
  //     return <TaxedMoney taxedMoney={price} />;
  //   } else {
  //     return (
  //       <>
  //         <span className="product-list-item__undiscounted_price">
  //           <TaxedMoney taxedMoney={priceUndiscounted} />
  //         </span>
  //         &nbsp;&nbsp;&nbsp;&nbsp;
  //         <TaxedMoney taxedMoney={price} />
  //       </>
  //     );
  //   }
  // };


  // Check authentication
  // useAuth((authenticated) => {
  //   setAuthenticatedState(authenticated);
  // });

  let secondImage;
  if (imageUrls && imageUrls.length > 1) {
    secondImage = {
      thumbnail: {
        url: imageUrls[1],
      },
    }
  }

  function getThumbnail(source, id, name) {
    return(
      <Link
      to={generateProductUrl(id, name)}
      key={id}
      >
        <Thumbnail source={source} />
      </Link>
    )
  }
  return (
    <div 
    className="product-list-item"
    onMouseOver={() => {
      if (!isHovered) {
        setState(!isHovered)
      }
    }} 
    onMouseLeave={() =>  {
      if (isHovered) {
        setState(!isHovered)
      }
    }}
  >
    <div className="product-list-item__image">
      {(!isHovered || !secondImage) &&  getThumbnail(product, id, name)}
      {isHovered && secondImage && getThumbnail(secondImage, id, name)}

    </div>
    <h4 className="product-list-item__title">{product.name}</h4>
    <p className="product-list-item__category">{address}</p>
    <p className="product-list-item__price">{maxDiscount}</p>
  </div>
  );
};

export default ProductListItem;
