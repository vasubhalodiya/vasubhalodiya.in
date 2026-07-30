"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { ResumePdfViewer } from "@/components/resume-pdf-viewer";

const PDF_SRC = "/resume/pdf?download";
const FILENAME = "Vasu-Bhalodiya-Resume.pdf";

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(PDF_SRC);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = FILENAME;
      link.click();

      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="flex h-full w-full flex-col gap-6 relative py-10 pb-32">
      <section className="flex w-full max-w-xl mx-auto items-center justify-between gap-4 px-6">
        <h1 className="font-clash-display text-[20px] font-bold leading-none text-foreground/80">
          Resume
        </h1>
        <Button
          variant="accent"
          onClick={handleDownload}
          disabled={isDownloading}
          aria-busy={isDownloading}
          className="w-fit! px-4 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <HugeiconsIcon
            icon={isDownloading ? Loading03Icon : Download01Icon}
            strokeWidth={2}
            size={16}
            className={isDownloading ? "animate-spin" : ""}
          />
          Download
        </Button>
      </section>

      <section className="w-full max-w-xl mx-auto px-6">
        <div className="overflow-hidden rounded-2xl bg-card shadow-lg shadow-black/5">
          <ResumePdfViewer src="/resume/pdf" />
        </div>
      </section>
    </main>
  );
}
