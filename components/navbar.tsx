"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home03Icon,
  Folder02Icon,
  Book02Icon,
  Sun01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { socials } from "@/constants/socials";

const BASE_SIZE = 38;
const MAGNIFY = 55;
const DISTANCE = 95;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

const dockItemBaseClass =
  "relative flex aspect-square items-center justify-center shrink-0 rounded-[10px] cursor-pointer bg-background dark:bg-neutral-900 border shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] transition-colors";

const dockItemInactiveClass =
  "text-neutral-500 dark:text-neutral-400 border-border hover:text-accent dark:hover:text-accent hover:border-accent/40";

const dockItemActiveClass = "text-accent dark:text-accent border-border";

const dockItemClass = `${dockItemBaseClass} ${dockItemInactiveClass}`;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function DockTooltip({ label, show }: { label: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.6 }}
          className="pointer-events-none absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full z-50"
        >
          <div className="relative whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg dark:bg-neutral-800">
            {label}
            <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 -translate-y-px h-2 w-2 rotate-45 bg-neutral-900 dark:bg-neutral-800 rounded-[2px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useDockIconSizes(mouseX: MotionValue<number>, baseIcon: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });
  const sizeRaw = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFY, BASE_SIZE],
  );
  const iconRaw = useTransform(
    distance,
    [-DISTANCE, 0, DISTANCE],
    [baseIcon, baseIcon * (MAGNIFY / BASE_SIZE), baseIcon],
  );
  const size = useSpring(sizeRaw, SPRING);
  const iconSize = useSpring(iconRaw, SPRING);
  return { ref, size, iconSize };
}

function DockNavLink({
  href,
  label,
  mouseX,
  icon,
}: {
  href: string;
  label: string;
  mouseX: MotionValue<number>;
  icon: typeof Home03Icon;
}) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const active = !isDesktop && pathname === href;
  const { ref, size, iconSize } = useDockIconSizes(mouseX, 19);
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={href} aria-label={label} className="relative">
      <DockTooltip label={label} show={hovered} />
      <motion.div
        ref={ref}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ width: size, height: size }}
        className={`${dockItemBaseClass} ${active ? dockItemActiveClass : dockItemInactiveClass}`}
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center [&_svg]:size-full"
        >
          <HugeiconsIcon icon={icon} strokeWidth={1.5} size={19} />
        </motion.div>
      </motion.div>
    </Link>
  );
}

function DockExternal({
  href,
  label,
  mouseX,
  icon,
  baseIconSize,
}: {
  href: string;
  label: string;
  mouseX: MotionValue<number>;
  icon: typeof Home03Icon;
  baseIconSize: number;
}) {
  const { ref, size, iconSize } = useDockIconSizes(mouseX, baseIconSize);
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="relative">
      <DockTooltip label={label} show={hovered} />
      <motion.div
        ref={ref}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ width: size, height: size }}
        className={dockItemClass}
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center [&_svg]:size-full"
        >
          <HugeiconsIcon icon={icon} strokeWidth={1.5} size={baseIconSize} />
        </motion.div>
      </motion.div>
    </a>
  );
}

function DockThemeToggle({ mouseX }: { mouseX: MotionValue<number> }) {
  const { ref, size, iconSize } = useDockIconSizes(mouseX, 19);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const initTheme = () => {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const initial = stored ?? "dark";
      setTheme(initial);
    };
    initTheme();
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="relative p-0">
      <DockTooltip label={theme === "dark" ? "Light mode" : "Dark mode"} show={hovered} />
      <motion.div
        ref={ref}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ width: size, height: size }}
        className={dockItemClass}
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center [&_svg]:size-full"
        >
          <HugeiconsIcon icon={theme === "dark" ? Sun01Icon : Moon02Icon} strokeWidth={1.5} size={18} />
        </motion.div>
      </motion.div>
    </button>
  );
}

function Divider() {
  return (
    <div
      className="h-7 w-px shrink-0 self-center bg-linear-to-b from-transparent via-border to-transparent"
      aria-hidden="true"
    />
  );
}

export function Navbar() {
  const mouseX = useMotionValue(Infinity);
  const isDesktop = useIsDesktop();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <motion.div
        onMouseMove={(e) => isDesktop && mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="items-end justify-center overflow-visible z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 rounded-2xl border border-border bg-background/90 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-neutral-950/90 dark:shadow-black/20"
      >
        <DockNavLink href="/" label="Home" mouseX={mouseX} icon={Home03Icon} />
        <DockNavLink href="/projects" label="Projects" mouseX={mouseX} icon={Folder02Icon} />
        {/* <DockNavLink href="/blog" label="Blog" mouseX={mouseX} icon={Book02Icon} /> */}
        <Divider />
        {socials.map(({ label, href, Icon, navSize }) => (
          <DockExternal
            key={label}
            href={href}
            label={label}
            mouseX={mouseX}
            icon={Icon}
            baseIconSize={navSize}
          />
        ))}
        <Divider />
        <DockThemeToggle mouseX={mouseX} />
      </motion.div>
    </div>
  );
}
