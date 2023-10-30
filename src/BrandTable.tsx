import React from 'react';
import './BrandTable.css'

export interface Brand {
  brandID: number;
  name: string;
  creator: string;
  startingDate: Date;
  luxury: boolean;
  rating: number;
  // Other properties...
}

interface BrandListProps {
  brands: Brand[];
}

const BrandList: React.FC<BrandListProps> = ({ brands }) => {
    const keys = Object.keys(brands[0]);
  return (
    <div>
      <h1>Brand List</h1>
      <div className="grid-container">
        {keys.map((props) => (
        <p key={props}>{props}</p>
        ))}
        {brands.map((brand) => [
            <React.Fragment key={brand.brandID}>
                <div className="grid-item">{brand.brandID}</div>
                <div className="grid-item">{brand.name}</div>
                <div className="grid-item">{brand.creator}</div>
                <div className="grid-item">{brand.startingDate.toLocaleDateString()}</div>
                <div className="grid-item">{brand.luxury ? "Yes" : "No"}</div>
                <div className="grid-item">{brand.rating}</div>
            </React.Fragment>
        ])}
      </div>
    </div>
  );
};

export default BrandList;
