"use client";

import { useEffect } from "react";
import { consumeScrollTarget } from "@/lib/scroll";

export default function ScrollHandler() {
  useEffect(() => {
    const id = consumeScrollTarget();
    if (id) {
      // slight delay ensures sections have rendered/laid out first
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  return null;
}
