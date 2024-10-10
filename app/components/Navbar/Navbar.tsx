import { auth, currentUser } from "@clerk/nextjs/server";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  let user = await currentUser();

  return <NavbarClient user={!!user} />;
};

export default Navbar;
