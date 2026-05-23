import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Vasu Bhalodiya on design engineering, frontend development, React, Next.js and shipping polished products.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Vasu Bhalodiya",
    description:
      "Writing by Vasu Bhalodiya on design engineering, frontend development, React, Next.js and shipping polished products.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="flex h-full w-full flex-col gap-6 relative py-10 pb-32 max-w-xl mx-auto px-6">
      <h1 className="font-cabinet-grotesk font-medium tracking-normal text-2xl">Blog</h1>
      <p className="text-muted-foreground">Coming soon.</p>
    </main>
  );
}
