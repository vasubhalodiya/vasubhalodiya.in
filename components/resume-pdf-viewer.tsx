"use client";

import { useEffect, useRef, useState } from "react";
import { ShimmerLine } from "@/components/shimmer";

const SKELETON_LINES = [
  "w-2/3 h-6",
  "w-1/2 h-3",
  "w-full h-3 mt-4",
  "w-full h-3",
  "w-5/6 h-3",
  "w-full h-3 mt-4",
  "w-full h-3",
  "w-4/6 h-3",
  "w-full h-3 mt-4",
  "w-full h-3",
  "w-3/4 h-3",
];

function ResumeSkeleton() {
  return (
    <div className="aspect-[1/1.4142] w-full rounded-2xl bg-card p-8 flex flex-col gap-2.5">
      {SKELETON_LINES.map((cls, i) => (
        <ShimmerLine key={i} className={cls} delay={i * 0.08} />
      ))}
    </div>
  );
}

export function ResumePdfViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: import("pdfjs-dist").PDFDocumentLoadingTask | null = null;

    async function render() {
      const container = containerRef.current;
      if (!container) return;

      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();

      loadingTask = pdfjsLib.getDocument({ url: src });
      const pdf = await loadingTask.promise;
      if (cancelled) return;

      const width = container.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const renderWidth = Math.min(Math.max(width * dpr, 1920), 2600);
      container.innerHTML = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = renderWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";

        const context = canvas.getContext("2d");
        if (!context) continue;

        await page.render({ canvasContext: context, viewport, canvas }).promise;
        if (cancelled) return;
        container.appendChild(canvas);
      }

      if (!cancelled) setIsLoading(false);
    }

    render();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [src]);

  return (
    <div className={isLoading ? "" : "bg-white"}>
      {isLoading && <ResumeSkeleton />}
      <div ref={containerRef} className={isLoading ? "hidden" : "w-full"} />
    </div>
  );
}
