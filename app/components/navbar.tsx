import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full px-8 py-2 bg-light-primary text-light-dark font-chewy">
      <Link className="text-5xl" href="/">
        PetMatch
      </Link>
    </nav>
  );
};
