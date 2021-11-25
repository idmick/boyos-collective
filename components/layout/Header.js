import Image from "next/image";
import BoyosLogo from "../../public/images/Boyos_logo_boxed.png";

const Header = () => {
  return (
    <header className="container px-4 mx-auto">
      <div className="flex flex-wrap justify-center py-20">
        <div className="w-full  sm:w-4/12 px-4">
          <Image src={BoyosLogo} layout="responsive" objectFit="contain" />
        </div>
      </div>
    </header>
  );
};

export default Header;
