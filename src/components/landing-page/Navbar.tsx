"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
} from "@/components/ui/resizable-navbar";
import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSession } from "next-auth/react";
import Profile from "../Profile";
import { useRouter } from "next/navigation";
import LoginModal from "../LoginModal";
import { ModeToggle } from "@/components/ui/ModeToggle";

interface Props {
  searchParamsPromise: Promise<{
    loginRequired?: string;
  }>;
}

export function LandingNavbar({ searchParamsPromise }: Props) {
  const searchParams = use(searchParamsPromise);
  const router = useRouter();
  const { data: session } = useSession();
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (searchParams?.loginRequired === "true") {
      setOpenLogin(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  // ✅ ALL CENTER ITEMS LIVE HERE — NO EXCEPTIONS
  const navItems = [
    { name: "Collection", link: "/self-help" },
    { name: "Chat", link: "/chat" },
    { name: "Mood Tracker", link: "/user/me" },
  ];

  return (
    <>
      <AnimatePresence>
        {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
      >
        <Navbar>
          {/* DESKTOP */}
          <NavBody>
            <NavbarLogo />

            <NavItems
              items={navItems}
              className="text-foreground [&_a:hover]:text-violet-500 dark:[&_a:hover]:text-violet-400"
            />

            <div className="flex items-center gap-4">
              <ModeToggle />
              {session ? (
                <Profile />
              ) : (
                <NavbarButton
                  onClick={() => setOpenLogin(true)}
                  variant="gradient"
                  className="rounded-full"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </NavBody>

          {/* MOBILE */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <div className="flex items-center gap-4">
                <ModeToggle />
                {session ? (
                  <Profile />
                ) : (
                  <NavbarButton
                    onClick={() => setOpenLogin(true)}
                    variant="gradient"
                    className="rounded-full"
                  >
                    Login
                  </NavbarButton>
                )}
              </div>
            </MobileNavHeader>
          </MobileNav>
        </Navbar>
      </motion.div>
    </>
  );
}
