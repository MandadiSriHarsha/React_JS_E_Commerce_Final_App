import {BsSearch} from 'react-icons/bs'

import './index.css'

const ProductsFilter = props => {
  const {
    categoryOptions,
    ratingsList,
    categoryValue,
    searchValue,
    ratingValue,
    onChangeSearchValue,
    onChangeCategoryValue,
    onChangeRatingValue,
    onEnterSearchFetch,
    onClearFilters,
  } = props

  const changeSearchValue = event => {
    onChangeSearchValue(event.target.value)
  }

  const enterSearchValue = event => {
    if (event.key === 'Enter') {
      onEnterSearchFetch()
    }
  }

  const CategoryItem = categoryProps => {
    const {data, check} = categoryProps
    const {name, categoryId} = data
    const className = check ? 'apply-category-style-class' : ''
    const changeCategoryValue = () => {
      onChangeCategoryValue(categoryId)
    }
    return (
      <li
        className={` apply-category-normal-class ${className}`}
        onClick={changeCategoryValue}
      >
        {name}
      </li>
    )
  }

  const RatingItem = ratingProps => {
    const {data, check} = ratingProps
    const {ratingId, imageUrl} = data
    const className = check ? 'apply-rating-style-class' : ''
    const changeRatingValue = () => {
      onChangeRatingValue(ratingId)
    }
    return (
      <li
        className={`apply-rating-normal-class ${className}`}
        onClick={changeRatingValue}
      >
        <img src={imageUrl} alt="rating" className="rating-image" />
        <p className="rating-text">& Up</p>
      </li>
    )
  }

  return (
    <>
      <div className="products-search-container">
        <input
          type="text"
          className="search-input"
          value={searchValue}
          onChange={changeSearchValue}
          onKeyDown={enterSearchValue}
          placeholder="Search"
        />
        <button
          className="filter-search-button"
          type="button"
          onClick={onEnterSearchFetch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      <h1 className="filter-heading">Category</h1>
      <ul className="categories-list">
        {categoryOptions.map(eachitem => (
          <CategoryItem
            key={eachitem.categoryId}
            data={eachitem}
            check={categoryValue === eachitem.categoryId}
          />
        ))}
      </ul>
      <h1 className="filter-heading">Rating</h1>
      <ul className="ratings-list">
        {ratingsList.map(eachitem => (
          <RatingItem
            key={eachitem.ratingId}
            data={eachitem}
            check={ratingValue === eachitem.ratingId}
          />
        ))}
      </ul>
      <button
        className="products-filter-button"
        type="button"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </>
  )
}

export default ProductsFilter
