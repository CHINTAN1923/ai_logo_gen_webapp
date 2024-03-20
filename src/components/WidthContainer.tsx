import { ReactNode } from "react";

const WidthContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={"maxWidthContainer p-3 mx-auto body-font"}>{children}</div>
  );
};

export default WidthContainer;
