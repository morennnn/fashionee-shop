import { NavLink, useLocation } from 'react-router-dom';
import { useCartFavorites } from '../context/CartFavoritesContext';

const MenuItem = ({ to, children, withArrow = false, disabled = false }) => {
  const location = useLocation();
  const isActiveCustom = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <div className={`menu-item ${isActiveCustom ? 'active' : ''}`}>
      {to && !disabled ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `menu-link ${isActive ? 'active' : ''}`
          }
        >
          <span>{children}</span>
          {withArrow && (
            <>
              <img src="/icons/arrow.svg" className="arrow-default" alt="" />
              <img src="/icons/arrow-pink.svg" className="arrow-hover" alt="" />
            </>
          )}
        </NavLink>
      ) : (
        <>
          <span>{children}</span>
          {withArrow && (
            <>
              <img src="/icons/arrow.svg" className="arrow-default" alt="" />
              <img src="/icons/arrow-pink.svg" className="arrow-hover" alt="" />
            </>
          )}
        </>
      )}
    </div>
  );
};

const Header = () => {
  const { cartCount, favoriteCount } = useCartFavorites();

  const leftMenuItems = [
    { label: "Home", disabled: true },
    { label: "Pages", withArrow: true }, 
    { to: "/", label: "Shop", withArrow: true },
    { label: "Contact" },
  ];

  const middleMenuItems = [
    { label: "Home", disabled: true },
    { to: "/", label: "Shop" },
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="left-side">
          <div className="logo-container">
            <div className="burger-menu">
              <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
              <label className="burger" htmlFor="burger-checkbox"></label>
            </div>
            <div className="logo">
              <img src="/icons/logo.svg" alt="logo" />
            </div>
          </div>

          <div className="menu">
            {leftMenuItems.map(({ to, label, withArrow, disabled }, idx) => (
              <MenuItem key={idx} to={to} withArrow={withArrow} disabled={disabled}>
                {label}
              </MenuItem>
            ))}
          </div>
        </div>

        <div className="right-side">
          <div className="header-icon">
            <img src="/icons/search.svg" alt="search" />
          </div>
          <div className="header-icon">
            <img src="/icons/profile.svg" alt="profile" />
          </div>

          <div className="header-icon">
            <img src="/icons/heart.svg" alt="favorites" />
            <div className="counter">{favoriteCount}</div>
          </div>

          <NavLink to="/cart" className="header-icon" style={{ cursor: 'pointer' }}>
            <img src="/icons/cart.svg" alt="cart" />
            <div className="counter">{cartCount}</div>
          </NavLink>
        </div>
      </div>

      <div className="header-middle">
        <div className="content-and-decoration">
          <div className="content">
            <div className="title">Shop</div>
            <div className="menu">
              {middleMenuItems.map(({ to, label, disabled }, idx) => (
                <MenuItem key={idx} to={to} disabled={disabled}>
                  {label}
                </MenuItem>
              ))}
            </div>
          </div>
          <div className="container-middle-line">
            <img src="/icons/header-middle-line.svg" alt="line" className="middle-line" />
          </div>
          <div className="container-points">
            <img src="/icons/points.svg" alt="points" className="points" />
          </div>
        </div>
        <div className="photo"></div>
      </div>
    </header>
  );
};

export default Header;
