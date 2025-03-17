import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './components/home/Home'
import { Products } from './components/products/Products'
import { ProductDetails } from './components/products/ProductDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  )
}

export default App
