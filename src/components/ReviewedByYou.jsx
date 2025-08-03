import { useMemo } from 'react';
import productsJson from '../data/products.json';

const ReviewedByYou = () => {
  const reviewedProducts = useMemo(() => {
    const shuffled = [...productsJson.products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []); 
  return (
    <div className="sidebar-item">
      <div className="sidebar-title">Reviewed by you</div>
      <div className="sidebar-content">
        <div className="reviewed-products">
          {reviewedProducts.map(product => (
            <div className="product" key={product.id}>
              <div className="image">
                <img
                  src={product.image}
                  alt={product.name.split('#')[0].trim()}
                />
              </div>
              <div className="info">
                <div className="name">{product.name.split('#')[0].trim()}</div>
                <div className="price">
                  <div className="current-price">${product.price}</div>
                  {product.oldPrice && (
                    <div className="old-price">${product.oldPrice}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewedByYou;
