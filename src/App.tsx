  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import AboutUs from './pages/aboutUs';
  import Homepage from './pages/homePage';
  import LoginForm from './pages/loginForm';
  import RegistrationForm from './pages/registrationForm';
import Simulator3D from './pages/Simulator3D';
import ProductListPage from './pages/prodListPage';
import ProductDetail from './components/product/productDetails';
import CartPage from './pages/cartPage';
import ProfilePage from './pages/userProfile';
import CheckoutPage from './pages/checkout';

  const App: React.FC = () => {

    return (
      <Router>
        <div className="app">
        
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/products' element={<ProductListPage/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegistrationForm/>}/>
            <Route path='/simulator' element={<Simulator3D/>}/>
            <Route path='/products/:productId' element={<ProductDetail/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>

         
            {/* <Route
              path="/login" element={<LoginForm onSuccess={() => setIsLoggedIn(true)} />}
            />
            <Route
              path="/register" element={<Registration/>}
            />
            <Route
              path="/products" element={<Products/>}
            />
            <Route
              path="/product/:id" element={<ProductDetails/>}
            /> */}
            
          </Routes>
    
        </div>
      </Router>
      
    );
  };

  export default App;
