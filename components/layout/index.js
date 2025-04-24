import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF4EB]">
      <Header />
      <main>{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;
