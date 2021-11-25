import Link from "next/link";

const Header = () => {
  return (
    <header className="z-10 bg-base-100 w-full sticky top-0">
      <section className="flex items-center justify-between wrapper mx-auto">
        Boyos
      </section>

      <div className="h-1 bg-gradient-to-br from-primary to-accent" />
    </header>
  );
};

export default Header;
