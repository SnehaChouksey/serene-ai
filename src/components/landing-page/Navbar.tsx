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
    redirect?: string;
  }>;
}

export function LandingNavbar({ searchParamsPromise }: Props) {
  const searchParams = use(searchParamsPromise);
  const router = useRouter();
  const { data: session } = useSession();
  const [openLogin, setOpenLogin] = useState(false);

  // 🔐 Open login modal + store redirect
  useEffect(() => {
    if (searchParams?.loginRequired === "true") {
      if (searchParams?.redirect) {
        localStorage.setItem(
          "postLoginRedirect",
          searchParams.redirect
        );
      }
      setOpenLogin(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  // 👇 Central navigation logic
  const handleProtectedNav = (path: string) => {
    if (!session?.user) {
      localStorage.setItem("postLoginRedirect", path);
      router.push("/?loginRequired=true");
    } else {
      router.push(path);
    }
  };

  const navItems = [
    {
      name: "Collection",
      link: "/self-help",
      onClick: () => handleProtectedNav("/self-help"),
    },
    {
      name: "Chat",
      link: "/chat",
      onClick: () => handleProtectedNav("/chat"),
    },
    {
      name: "Mood Tracker",
      link: "/user/me",
      onClick: () => handleProtectedNav("/user/me"),
    },
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
              items={navItems.map(({ name, link, onClick }) => ({
                name,
                link,
                onClick,
              }))}
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
