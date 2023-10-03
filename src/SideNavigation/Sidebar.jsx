import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdOutlineDownloadForOffline,
} from "react-icons/md";
import {IoIosPeople} from "react-icons/io";
import {FaWarehouse} from "react-icons/fa";
import {TbChartBar} from "react-icons/tb";
// import Logo from "../../assets/image/png/Logo.png";

const Sidebar = ({toggle}) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [menuItems] = useState([
    {
      id: 1,
      title: "Dashboard",
      icon: AiOutlineHome,
      path: "/",
      subMenus: [],
    },
    {
      id: 2,
      title: "Manage Staffs",
      icon: TbChartBar,
      path: "/manage-staff",
      subMenus: [],
    },
    {
      id: 3,
      title: "Manage Products",
      icon: MdOutlineDownloadForOffline,
      path: "",
      subMenus: [
        {label: "Categories", path: "/manage-products/categories"},
        {label: "Brands", path: "/manage-products/brands"},
        {label: "Units", path: "/manage-products/units"},
        {label: "Products", path: "/manage-products/products"},
      ],
    },
    {
      id: 4,
      title: "Warehouses",
      icon: FaWarehouse,
      path: "/home/transactions",
      subMenus: [],
    },
    {
      id: 5,
      title: "Customers",
      icon: IoIosPeople,
      path: "/home/withdrawals",
      subMenus: [],
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);

  useEffect(() => {
    const activeMenuId = localStorage.getItem("activeMenuId");
    const activeSubmenuId = localStorage.getItem("activeSubmenuId");

    setActiveIndex(activeMenuId ? parseInt(activeMenuId) : 1); // Set the default active menu ID to 1 (Home)
    setActiveSubmenuIndex(activeSubmenuId ? parseInt(activeSubmenuId) : null);
  }, []);

  const toggleSubMenu = (id) => {
    setActiveIndex(activeIndex === id ? null : id);
    setActiveSubmenuIndex(null);

    localStorage.setItem("activeMenuId", activeIndex === id ? null : id);
    localStorage.removeItem("activeSubmenuId");
  };

  const toggleSubmenuItem = (submenuIndex) => {
    setActiveSubmenuIndex(
      activeSubmenuIndex === submenuIndex ? null : submenuIndex
    );

    localStorage.setItem(
      "activeSubmenuId",
      activeSubmenuIndex === submenuIndex ? null : submenuIndex
    );
  };

  const isSubmenuActive = (submenuPath) => {
    return location.pathname.startsWith(submenuPath);
  };

  return (
    <nav
      className={`sidebar border-end ${
        toggle || isHovered ? "sidebar-hide" : "sidebar-show"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <img src={Logo} alt="paysuite" /> */}
      <div className="menu-items-wrapper">
        <ul className="menu-ul">
          {menuItems.map((menuItem) => (
            <li key={menuItem.id}>
              <Link
                to={menuItem.path}
                className={`menu-item text-dark px-4 py-2 ${
                  activeIndex === menuItem.id ? "menu-active" : ""
                }`}
                onClick={() => toggleSubMenu(menuItem.id)}
              >
                {React.createElement(menuItem.icon)}
                <div className={`menu-title ${toggle ? "invisible" : ""}`}>
                  {menuItem.title}
                </div>
                {menuItem.subMenus.length > 0 && (
                  <>
                    {activeIndex === menuItem.id ? (
                      <MdKeyboardArrowUp
                        className={`submenu-icon ${
                          toggle ? "invisible" : "visible"
                        }`}
                      />
                    ) : (
                      <MdKeyboardArrowDown
                        className={`submenu-icon ${
                          toggle ? "invisible" : "visible"
                        }`}
                      />
                    )}
                  </>
                )}
              </Link>
              {menuItem.subMenus.length > 0 && (
                <ul
                  className={`submenu-ul ${
                    activeIndex === menuItem.id ? "visible" : ""
                  }`}
                >
                  {menuItem.subMenus.map((submenu, submenuIndex) => (
                    <li
                      className="submenu-li text-dark py-2"
                      key={submenuIndex}
                    >
                      <Link
                        to={`${submenu.path}`}
                        className={`submenu-item position-relative text-decoration-none ${
                          isSubmenuActive(submenu.path) ? "submenu-active" : ""
                        }`}
                        onClick={() => toggleSubmenuItem(submenuIndex)}
                      >
                        {submenu.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
