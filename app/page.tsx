"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, LinkButton } from "@/components/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar04Icon, CheckmarkCircle02Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { LocalTime } from "@/components/local-time";
import { socials } from "@/constants/socials";
import experience from "@/data/experience.json";
import testimonial from "@/data/testimonial.json";


export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("vasubhalodiya24@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
    }
  };

  return (
    <main className="flex h-full w-full flex-col gap-14 relative py-10 pb-32">
      {/* Hero */}
      <section className="flex flex-col gap-6 max-w-xl mx-auto px-6">
        <Image
          src="/vasu.jpg"
          alt="Vasu Bhalodiya"
          width={64}
          height={80}
          className="aspect-3/4 rounded-md object-cover grayscale w-16 h-20"
        />

        <div className="flex flex-col gap-px">
          <div className="flex items-center justify-between gap-2">
            <h1 className="font-cabinet-grotesk font-medium tracking-normal">
              Vasu Bhalodiya
            </h1>
            <div className="group/socials flex items-center gap-2 text-accent">
              {socials.map(({ label, href, Icon, size }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-opacity duration-200 group-hover/socials:opacity-60 hover:!opacity-100"
                >
                  <HugeiconsIcon icon={Icon} strokeWidth={1.5} size={size} />
                </a>
              ))}
            </div>
          </div>
          <LocalTime />
        </div>

        <div className="flex flex-col gap-3 font-medium leading-7 tracking-normal text-foreground">
          <p>I design and build fast products for founders and teams.</p>
          <p>
            I have delivered products for customers and built many side projects to keep learning.
          </p>
          <p>
            Design is where I start, but I do it in code, not Figma. I
            always push to build something truly polished.
          </p>
          <p>
            I am probably building something with coffee right now. If you&apos;re up for it, let&apos;s be friends — DM me or email me.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 font-medium tracking-normal">
          <Button variant="outline-dashed" onClick={handleCopyEmail} aria-live="polite">
            <HugeiconsIcon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} strokeWidth={2} size={16} />
            {copied ? "Copied!" : "Copy email"}
          </Button>
          <LinkButton
            variant="accent"
            href="https://cal.com/vasubhalodiya/meeting"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HugeiconsIcon icon={Calendar04Icon} strokeWidth={2} size={16} />
            Book call
          </LinkButton>
        </div>
      </section>

      {/* Experience */}
      <section className="w-full max-w-xl mx-auto px-6 space-y-3">
        {/* <p className="flex items-center gap-2 text-[15px] font-medium tracking-wide text-muted-foreground/80">
          <HugeiconsIcon icon={Briefcase01Icon} strokeWidth={1.5} size={17} />
          Companies I&apos;ve worked with
        </p> */}
        <span className="block font-clash-display text-[20px] font-bold leading-none  text-foreground/80 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
            Experience
          </span>
        <div className="group relative flex flex-col gap-4 p-4 pb-0 w-full">
          <div className="relative space-y-8 w-full [&>*:last-child_[data-experience-line]]:hidden">
            {experience.map((item, index) => (
              <div
                key={index}
                className="relative w-full flex items-start justify-between gap-6"
              >
                <div className="relative shrink-0 self-stretch flex items-start justify-center">
                  <div
                    data-experience-line="true"
                    className="absolute left-1/2 top-0 -translate-x-1/2 h-[calc(100%+2rem)] w-px bg-border"
                  />
                  <div className="relative z-20 shrink-0">
                    <div className="size-3 rounded-full bg-primary shrink-0 ring-2 ring-border" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-start gap-2 min-w-0 pb-2">
                  <time className="text-sm font-medium leading-none text-muted-foreground">
                    {item.time}
                  </time>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-clash-display font-medium leading-none text-foreground">
                      {item.title}
                    </h3>
                    {item.role && (
                      <span className="text-sm font-medium text-muted-foreground/60 shrink-0">
                        {item.role}
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Testimonial */}
      <section className="mx-auto flex w-full max-w-xl flex-col gap-6 px-6">
        <blockquote className="rounded-r-2xl border border-l-[6px] border-border border-l-accent bg-accent/10 px-6 py-8">
          <p className="text-[15px] font-medium leading-[1.9] tracking-normal md:text-[16px] font-clash-display text-quote">
            {testimonial.quote}
          </p>
        </blockquote>

        <LinkButton
          variant="accent"
          href={testimonial.callUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-clash-display w-fit!"
        >
          <HugeiconsIcon icon={Calendar04Icon} strokeWidth={2} size={16} />
          Book now
        </LinkButton>
      </section>
    </main>
  );
}
