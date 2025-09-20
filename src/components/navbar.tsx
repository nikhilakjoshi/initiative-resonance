"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  { name: "Challenges", href: "/challenges" },
  { name: "Approach", href: "/approach" },
  { name: "Solutions", href: "/solutions" },
  { name: "Leadership", href: "/leadership" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm border-gray-200"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-gray-900">
                  Resonance
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <NavigationMenu>
                <NavigationMenuList className="flex">
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTA Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                className="focus:outline-none focus-visible:outline-none"
                asChild
              >
                <Link href="/sign-up">Sign up for updates</Link>
              </Button>
              <Button
                variant="default"
                className="focus:outline-none focus-visible:outline-none rounded-full"
                asChild
              >
                <Link href="/partner-with-us">Partner with us</Link>
              </Button>
            </div>

            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="focus:outline-none focus-visible:outline-none"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Menu Items - Center aligned */}
            <div className="flex flex-col items-center justify-center h-full px-6 pb-16">
              {/* Navigation Links */}
              <div className="flex flex-col items-start space-y-6 mb-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-2xl font-medium text-gray-900 hover:text-blue-600 text-left"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Separator */}
              <Separator className="w-20 mb-8" />

              {/* CTA Links */}
              <div className="flex flex-col items-start space-y-6">
                <Link
                  href="/sign-up"
                  className="text-xl font-medium text-gray-700 hover:text-blue-600 text-center"
                  onClick={toggleMobileMenu}
                >
                  Sign up for updates
                </Link>
                <Link
                  href="/partner-with-us"
                  className="text-xl font-medium text-gray-700 hover:text-blue-600 text-center"
                  onClick={toggleMobileMenu}
                >
                  Partner with us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
