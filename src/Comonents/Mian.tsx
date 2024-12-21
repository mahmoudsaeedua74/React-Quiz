import React from "react";

type Props = {
  children: React.ReactNode;
};
function Main({ children }: Props) {
  return <main className="main">{children}</main>;
}

export default Main;
