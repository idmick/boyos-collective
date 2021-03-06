import Link from "next/link";

const Page404 = () => {
  return (
    <>
      <div className="grid gap-2 text-center h-screen">
        <h3>Page not Found</h3>
        <p>It&apos;s Okay!</p>

        <div>
          <Link href="/" passHref>
            <button type="button" className="btn btn-primary">
              Let&apos;s Go Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page404;
