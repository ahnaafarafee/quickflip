"use client";

import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { signOut, openUserProfile } = useClerk();
  const { userId } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/30 w-full !z-50">
      {/* Logo */}
      <Link className="flex items-center justify-center" href="/">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          QuickFlip
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex justify-center items-center gap-4 sm:gap-6">
        {userId && <Link href="/decks">Decks</Link>}
        {userId && <Link href="/decks/create">Create</Link>}
        {userId && <Link href="/learn">Learn</Link>}
        {userId && <Link href="/analytics">Analytics</Link>}

        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="ml-auto md:hidden">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button aria-label="Menu" className="text-gray-900 dark:text-white">
              <HamburgerMenuIcon className="w-6 h-6" />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Content
              className="fixed inset-y-0 left-0 bg-white dark:bg-gray-800 z-50 p-6 w-64 transform transition-transform translate-x-0 shadow-lg"
              style={{ transition: "transform 0.3s ease-in-out" }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Menu"
                className="text-gray-900 dark:text-white absolute top-4 right-4"
              >
                <Cross2Icon className="w-6 h-6" />
              </button>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col mt-8 space-y-4">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                {userId && (
                  <Link href="/decks" onClick={() => setOpen(false)}>
                    Decks
                  </Link>
                )}
                {userId && (
                  <Link href="/decks/create" onClick={() => setOpen(false)}>
                    Create
                  </Link>
                )}
                {userId && (
                  <Link href="/learn" onClick={() => setOpen(false)}>
                    Learn
                  </Link>
                )}
                {userId && (
                  <Link href="/analytics" onClick={() => setOpen(false)}>
                    Analytics
                  </Link>
                )}

                {userId && (
                  <SignedIn>
                    <div className="flex flex-col gap-2">
                      {/* Button to open account settings */}
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => openUserProfile()}
                      >
                        Manage Account
                      </button>
                      {/* Button to sign out */}
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </SignedIn>
                )}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
};

export default Navbar;
