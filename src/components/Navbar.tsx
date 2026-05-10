import { NavLink } from 'react-router-dom'
import { useMemo, useState } from 'react'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { globalData } = useSelector((state: RootState) => state.global)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  const headerData = useMemo(() => globalData?.Header, [globalData])

  return (
    <>
      <nav className="nav">
        <NavLink to={headerData?.Logo?.href || '/'} className="nav-logo">
          {/* <div className="nav-logo-mark">ॐ</div>
          <div>Kashi <span style={{ fontWeight: 400 }}>Shakti</span></div> */}
          <img src={headerData?.Logo?.image?.url} alt="Kashi Shakti" className='nav-logo-image' />
        </NavLink>
        
        <div className="nav-menu">
          {headerData?.menu?.NavLink?.map((item: { href: string; label: string; id: number }) => (
            <NavLink to={item.href} className="nav-link" key={item.id}>
              {item.label}
            </NavLink>
          ))}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="lang-toggle" style={{ cursor: 'pointer' }}>A/अ</span>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      
      {menuOpen && (
        <div className="mobile-menu">
          {headerData?.menu?.NavLink?.map((item: { href: string; label: string; id: number }) => (
            <NavLink to={item.href} className="mobile-nav-link" key={item.id} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}

export default Navbar
