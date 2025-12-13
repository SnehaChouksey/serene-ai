"use client";

import {
  Navbar,
  NavBody,
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

  // Open login modal ONLY (no redirect logic here)
  useEffect(() => {
    if (searchParams?.loginRequired === "true") {
      setOpenLogin(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  // 🔐 Protected navigation handler
  const handleNav = (path: string) => {
    if (!session?.user) {
      localStorage.setItem("postLoginRedirect", path);
      router.push("/?loginRequired=true");
    } else {
      router.push(path);
    }
  };

  const navItems = [
    { name: "Collection", path: "/self-help" },
    { name: "Chat", path: "/chat" },
    { name: "Mood Tracker", path: "/user/me" },
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
          <NavBody>
            <NavbarLogo />

            {/* CENTER NAV */}
            <div className="flex flex-1 justify-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.path)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-violet-500 dark:hover:text-violet-400 rounded-full transition"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* RIGHT */}
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
