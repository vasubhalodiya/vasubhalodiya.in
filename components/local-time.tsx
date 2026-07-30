"use client";

import { useEffect, useState } from "react";
import { ShimmerLine } from "@/components/shimmer";

const TIMEZONE = "Asia/Kolkata";
const CITY = "Rajkot";

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: TIMEZONE,
    });
    const update = () =>
      setTime(fmt.format(new Date()).replace(" ", "").toLowerCase());
    update();
    const id = window.setInterval(update, 1000);
    const onVisible = () => {
      if (document.visibilityState === "visible") update();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (!time) {
    return <ShimmerLine className="h-[18px] w-28" />;
  }

  return (
    <p className="text-sm font-medium tracking-wide text-muted-foreground/80">
      {time} in {CITY}
    </p>
  );
}
