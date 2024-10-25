import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import PropTypes from 'prop-types'

import './Layout.css'

function Layout({products ,carts, setToken}) {
          return(
                    <div>
                              <Header/>
                              <Navbar  products={products} carts={carts} setToken={setToken}/>
                              <Outlet/>
                              <Footer/>
                    </div>
          )
}

Layout.propTypes = {
          tab: PropTypes.string,
          setTab: PropTypes.func,
          products: PropTypes.array,
          carts: PropTypes.array,
          setToken: PropTypes.func
}

export default Layout