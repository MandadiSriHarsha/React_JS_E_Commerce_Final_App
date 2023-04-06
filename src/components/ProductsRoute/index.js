import Navbar from '../NavbarComponent'

import PrimeDealsSection from '../PrimeDealsSectionComponent'

import AllProductsSection from '../AllProductsSectionComponent'

import './index.css'

const ProductsRoute = () => (
  <div className="products-route-bg-container">
    <Navbar />
    <PrimeDealsSection />
    <AllProductsSection />
  </div>
)

export default ProductsRoute
