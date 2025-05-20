import { Navigate } from "react-router-dom";

const RedirectToStore = () => {
  return <Navigate to="/store" replace />;
};

export default RedirectToStore;
