import { useLocation } from "react-router-dom";
function useAdminRoute() {
  // get the current location
  const location = useLocation();
  // check if the pathname starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");
  // return the boolean value
  return isAdminRoute;
}

export default useAdminRoute;