import React ,{useState} from 'react'
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../Image/Profile.png";
import { logout } from '../../../actions/userAction';

function UserOptions({user}) {
  const {cartItems} = useSelector(state => state.cart)
 const [open, setOpen] = useState(false);
  const history = useHistory();
    const alert = useAlert();
      const dispatch = useDispatch();

const options = [
  // these all are from matrial ui

  { icon: <PersonIcon />, name: "Profile", func: account },
  { icon: <ListAltIcon />, name: "Orders", func: orders },
  {
    icon: (
      <ShoppingCartIcon
        style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
      />
    ),
    name: `Cart(${cartItems.length})`,
    func: cart,
  },
  { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
];

if(user.role === "admin"){
    // now add the first admin-dashbord icon in options array 
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });

}

function dashboard(){
    history.push("/admin/dashboard");
}


function account(){
    history.push("/account")
}

 function orders() {
   history.push("/orders");
 }



    function logoutUser() {
      dispatch(logout());
      alert.success("Logout Successfully");
    }

    function cart(){
       history.push("/cart");
    }

  return (
    <>
    {/* if click the drop down-menu profile option section the backround color of the page will change */}
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)} // when click after open
        onOpen={() => setOpen(true)} // for open option dropdown menu
        style={{ zIndex: "11" }}
        open={open}
        direction="down" // in which direction open deom down menu
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
          />
        }
      >
        {options.map((item, idx) => (
          <SpeedDialAction
            key={idx}
            icon={item.icon}
            tooltipTitle={item.name} // while hover name will pop up
            onClick={item.func} // function call for action with that icon
            tooltipOpen={window.innerWidth <= 600 ? true : false} // for responsiveness
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOptions