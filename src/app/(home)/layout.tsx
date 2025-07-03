import Navbar from "@/components/navbar/navbar";
import { ChildrenNodeProps } from "@/types/children";

const Layout = ({ children }: ChildrenNodeProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
