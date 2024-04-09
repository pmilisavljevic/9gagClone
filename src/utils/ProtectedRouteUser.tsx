import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = PropsWithChildren;

export default function ProtectedRouteUser({ children }: Props) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);
  return children;
}
