import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { globalData } = useSelector((state: RootState) => state.global)

  const footerData = useMemo(() => globalData?.Footer, [globalData])
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <img onClick={() => navigate(footerData?.Logo?.href || '/')} src={footerData?.Logo?.image?.url} alt="Kashi Shakti" className='nav-logo-image' />
            <p className="footer-copy">
              {footerData?.BrandInformation || ''}
            </p>
          </div>
          <div className="footer-menus">
            {footerData?.menus?.map((menu: { id: number; title: string; NavLink: { href: string; label: string; id: number }[] }) => (
              <div key={menu.id}>
                <div className="footer-heading">{menu?.title || ''}</div>
                  <div className="footer-links">
                    {menu?.NavLink?.map((nav) => <span key={nav?.id} onClick={() => { navigate(nav?.href || '/') }} className="footer-link">{nav?.label || ''}</span>)}
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-meta">
          <span>{footerData?.CopyrightText || ''}</span>
          {/* <span>🪔 1,24,000+ sankalps offered</span> */}
          <span>🪔 1,24,000+ sankalps offered</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
