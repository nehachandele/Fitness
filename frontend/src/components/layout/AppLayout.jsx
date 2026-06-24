import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

const AppLayout = ({
  children,
}) => {
  return (
    <div
      className="
      flex
      bg-gradient-to-br
      from-white
      via-[#F8F5FF]
      to-[#EDE9FE]
      "
    >
      <Sidebar />

      <main
        className="
        flex-1
        min-h-screen
        p-4
        md:p-6
        "
      >
        <Topbar />

        <div className="mt-6">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default AppLayout;