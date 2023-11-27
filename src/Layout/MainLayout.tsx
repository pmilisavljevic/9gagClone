import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

type Props = PropsWithChildren;

function MainLayout({ children }: Props) {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="main-layout__container">{children}</div>
    </div>
  );
}

export default MainLayout;
