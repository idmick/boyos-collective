import Link from 'next/link'
import Image from 'next/image'
import BoyosBoxed from '../public/images/Boyos_logo_boxed.png'

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#EC90B0] text-[#1B1212] px-4">
      <div className="flex flex-col items-center">
        <Image
          src={BoyosBoxed}
          width={300}
          height={300}
          alt="Boyos Collective Logo"
          className="mb-6"
        />
        <h1 className="text-7xl font-[anton] uppercase font-bold mb-2 tracking-wider">
          404
        </h1>
        <h2 className="text-2xl font-[anton] uppercase mb-4">Page Not Found</h2>
        <p className="text-lg font-[moret] mb-8 text-center max-w-md">
          Oops! The page you’re looking for doesn’t exist.
          <br />
          But the groove never stops at Boyos Collective.
        </p>
        <Link href="/" passHref>
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-[#0085D0] text-white font-bold text-lg shadow-lg hover:bg-[#0072B2] transition"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Page404
