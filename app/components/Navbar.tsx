import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/30 fixed w-full !z-50">
      <Link className="flex items-center justify-center" href="#">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          QuickFlip
        </span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
