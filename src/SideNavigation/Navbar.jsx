import React, {useState, useEffect} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {BiMenuAltRight, BiBell, BiSearch} from "react-icons/bi";
import {FaBars} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {FcBusinessman, IconName} from "react-icons/fc";
import {BsFillBellFill} from "react-icons/bs";

const Navbar = (props) => {
  // state to toggle navbar from hide to display
  const [toggle, setToggle] = useState(false);

  // function to toggle navbar from hide to display
  const handleSidebarToggle = () => {
    setToggle(!toggle);
    props.onToggle();
  };

  // state to store profile info to show on the Nav
  const [profile, setProfile] = useState({});

  // Getting data from the API
  // useEffect(() => {
  //   const token = `Token ${localStorage.getItem("token")}`;
  //   axiosInstance
  //     .get("/v1/auth/profile/", {
  //       headers: {Authorization: token},
  //     })
  //     .then((res) => setProfile(res.data));
  // }, []);

  // Function to handle sign out and clearing local-storage
  const navigate = useNavigate();
  // const handleSignOut = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("login");
  //   navigate("/login");
  // };
  return (
    <section
      style={{
        width: toggle
          ? window.innerWidth < 992
            ? "100%"
            : "calc(100% )"
          : window.innerWidth < 992
          ? "100%"
          : "calc(100% )",
      }}
      className="header-div shadow-sm"
    >
      {/* Toogle Bar */}
      <div className="">
        <div className="bars">
          {toggle ? (
            window.innerWidth < 992 || window.innerWidth > 992 ? (
              <FaBars onClick={handleSidebarToggle} />
            ) : (
              <AiOutlineClose onClick={handleSidebarToggle} />
            )
          ) : window.innerWidth > 992 ? (
            <AiOutlineClose onClick={handleSidebarToggle} />
          ) : (
            <FaBars onClick={handleSidebarToggle} />
          )}
        </div>
      </div>

      {/* Header links */}
      <div className=" d-flex align-items-center">
        <div>
          <BsFillBellFill className="fs-4 me-3"></BsFillBellFill>
        </div>
        <div>
          {" "}
          <FcBusinessman className="profile"></FcBusinessman>
        </div>
        <div>
          <h6>Mehedi hasan</h6>
          <div className="font-15">mehedi.nion@gmail.com</div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
