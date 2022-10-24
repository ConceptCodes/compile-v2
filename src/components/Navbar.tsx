import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-transparent p-5">
      <Link href="/">
        <h1 className="text-2xl z-3 cursor-pointer font-bold capitalize text-white">Compile;</h1>
      </Link>
    </div>
  );
}

export default Navbar;