import megaMenuData from "../data/megaMenuData";
import "../styles/megaMenu.css";

export default function MegaMenu() {
  return (
    <nav className="mega-navbar">
      <ul className="mega-nav-links">
        {megaMenuData.map((menu, index) => (
          <li key={index} className="mega-item">
            {menu.title}

            <div className="mega-dropdown">
              <div className="mega-content">
                {menu.columns.map((column, colIndex) => (
                  <div className="mega-column" key={colIndex}>
                    <h4>{column.heading}</h4>
                    <ul>
                      {column.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mega-footer">View all {menu.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
