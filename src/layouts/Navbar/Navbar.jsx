import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Navbar.css";

function Navbar({ tab, setTab }) { // ใช้ destructuring เพื่อรับ props ที่ต้องการ
  return (
    <div className='navbar-container'>

      <Link to={'/Home'}>
        <button className={'btn ' + (tab === 'home' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('home')}
        >Home</button>
      </Link>

      <Link to={'/calculator'}>
        <button className={'btn ' + (tab === 'calculator' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('calculator')}
        >Calculator</button>
      </Link>

      <Link to={'/todo'}>
        <button className={'btn ' + (tab === 'todo' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('todo')}
        >Todo</button>
      </Link>

      <Link to={'/components'}>
        <button className={'btn ' + (tab === 'components' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('components')}
        >Components</button>
      </Link>

      <Link to={'/animation'}>
        <button className={'btn ' + (tab === 'animation' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('animation')}
        >Animation</button>
      </Link>

      <Link to={'/products'}>
        <button className={'btn ' + (tab === 'products' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('products')}
        >Products</button>
      </Link>

      <Link to={'/carts'}>
        <button className={'btn ' + (tab === 'carts' ? 'btn-primary' : 'btn-outline-primary')}
          onClick={() => setTab('carts')}
        >Carts</button>
      </Link>

    </div>
  );
}

// เพิ่ม propTypes สำหรับการตรวจสอบชนิดข้อมูลของ props
Navbar.propTypes = {
  tab: PropTypes.string.isRequired,     // tab ต้องเป็น string
  setTab: PropTypes.func.isRequired,    // setTab ต้องเป็น function
};

export default Navbar;
