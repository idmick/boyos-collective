const Footer = () => {
  return (
    <footer className="wrapper">
      <div className="flex">
        <p>
          {new Date().getFullYear()} -{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">
            Boyos Collective
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
