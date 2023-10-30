import React from 'react';

export interface Brand {
  brandID: number;
  name: string;
  startingDate: Date;
  creator: string;
  luxury: boolean;
  rating: number;
  // Other properties...
}

interface BrandListProps {
  brands: Brand[];
}

const BrandList: React.FC<BrandListProps> = ({ brands }) => {
  return (
    <div>
      <h1>Brand List</h1>
      <ul>
        {brands.map((brand) => (
          <li key={brand.brandID}>
            <strong>{brand.name}</strong> by {brand.creator}
            <ul>
              <li>Brand ID: {brand.brandID}</li>
              <li>Starting Date: {brand.startingDate.toDateString()}</li>
              <li>Luxury: {brand.luxury ? 'Yes' : 'No'}</li>
              <li>Rating: {brand.rating}/10</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
