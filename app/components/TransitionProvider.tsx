"use client";

import { createContext, useContext, ReactNode, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import CustomLogo from "./CustomLogo";

const TransitionContext = createContext<{
  handleTransition: (href: string) => void;
}>({
  handleTransition: () => {},
});

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const slideInRef = useRef<HTMLDivElement>(null);
  const slideOutRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleTransition = (href: string) => {
    if (href === pathname) return;
    const tl = gsap.timeline();
    tl.set(logoRef.current, { opacity: 0, scale: 0.8 });
    tl.to(slideInRef.current, {
        y: "0%",
        ease: "power3.in",
        duration: 0.5,
        onComplete: () => {
            router.push(href);
        }
    });
    tl.to(logoRef.current, { opacity: 1, scale: 1, duration: 0.3 }, "-=0.2");
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(logoRef.current, { opacity: 0, scale: 0.8, duration: 0.3, delay: 0.2 });
    tl.to(slideOutRef.current, {
        y: "100%",
        ease: "power3.out",
        duration: 0.5
    });

    // THIS IS THE FIX: We now correctly reset the logo's opacity to 0
    // while resetting the slide panels for the next transition.
    tl.set(logoRef.current, { opacity: 0 }); 
    tl.set([slideInRef.current, slideOutRef.current], {
        y: "-100%",
    });

  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ handleTransition }}>
      <div 
        ref={slideInRef}
        className="fixed top-0 left-0 w-full h-screen bg-gh-bg z-[100] transform -translate-y-full"
      />
      <div 
        ref={slideOutRef}
        className="fixed top-0 left-0 w-full h-screen bg-gh-green z-[99] transform -translate-y-full"
      />
      <div
          ref={logoRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] text-white opacity-0 pointer-events-none"
      >
          <CustomLogo size={64} />
      </div>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);