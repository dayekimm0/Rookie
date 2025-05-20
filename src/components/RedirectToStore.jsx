import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RedirectToStore = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/store", { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectToStore;
