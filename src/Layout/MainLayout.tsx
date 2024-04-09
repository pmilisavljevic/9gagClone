import { PropsWithChildren } from "react";
import NavBar from "./NavBar/NavBar";

type Props = PropsWithChildren;

export default function MainLayout({ children }: Props) {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="main-layout__container">{children}</div>
    </div>
  );
}
