  import React, { useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import ProductCard from '../components/product/productCard';
  import productData from '../products.json'; // Import the JSON data
  import { Product } from '../types'; // Assuming your types file is named 'types.ts'
  import { setSortBy } from '../redux/reducers/sortReducer';
  import { setCurrentPage } from '../redux/reducers/paginationReducer';
  import { RootState } from '../redux/store';
  import { filterProducts } from '../utils/filterUtil';
  import { sortProducts } from '../utils/sortUtil'; // Import the sorting utility function
  import { paginate } from '../utils/paginationUtil'; // Import the pagination utility function
  import '../styles/productList.css'
  import Header from '../components/header';

  const ProductListPage = () => {
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [priceRangeFilter, setPriceRangeFilter] = useState<string>('');
    const dispatch = useDispatch();
    const sortOption = useSelector((state: RootState) => state.sort.sortBy); // Get sorting option from Redux store
    const currentPage = useSelector((state: RootState) => state.paginate.currentPage); // Get current page number from Redux store

    const productsPerPage = 12; // Number of products to display per page

    const filteredProducts = filterProducts(productData, categoryFilter, priceRangeFilter);
    const sortedProducts = sortProducts(filteredProducts, sortOption);

    // Calculate indexes for pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortBy(e.target.value)); // Dispatch action to update sorting option
    };

    // Pagination controls
    const totalProducts = sortedProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pages = paginate(totalProducts, currentPage, productsPerPage);

    const handlePageChange = (page: number) => {
      dispatch(setCurrentPage(page)); // Dispatch action to update current page
    };

    const goToPrevPage = () => {
      if (currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      }
    };

    const goToNextPage = () => {
      if (currentPage < totalPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    };

    const navigationLinks = [
    {
      label: 'Home',href: '/'
    },
    {
      label: 'Cart',href: '/cart'
    },
  ]
    return (
      <div>
        <Header navigationLinks={navigationLinks}/>
        <div className="utility-container">
          <div className="filter-group"> 
            <select id="categoryFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Rings">Rings</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Necklaces">Necklaces</option>
      
            </select>
          </div>

          <div className="filter-group">
            <select id="priceRangeFilter" value={priceRangeFilter} onChange={(e) => setPriceRangeFilter(e.target.value)}>
              <option value="">All Prices</option>
              <option value="0-199">$0 - $199</option>
              <option value="200-599">$200 - $599</option>
              <option value="600-999">$600 - $999</option>
              <option value="1000-1899">$1000 - $1899</option>
            </select>
          </div>
          
        

          
          <div className="filter-group">
            <select id="sortOption" value={sortOption} onChange={handleSortChange}>
              <option value="">Sort By</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="name-alphabetical">Name: A to Z</option>
            </select>
          
          </div>
        </div>


        <div className="product-list">
          {currentProducts.map((product: Product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageURL}
            />
          ))}
        </div>

        {/* Pagination controls */}
        <div className='pagination-controls'>
          <button className='page-control-btn' onClick={goToPrevPage} disabled={currentPage === 1}>{'<'}</button>
          <ul className="pagination">
            {pages.map((page) => (
              <li key={page} className={page === currentPage ? 'active' : ''}>
                <button onClick={() => handlePageChange(page)}>{page}</button>
              </li>
            ))}
          </ul>
          <button className='page-control-btn' onClick={goToNextPage} disabled={currentPage === totalPages}>{'>'}</button>
        </div>
      </div>
    );
  };

  export default ProductListPage;
