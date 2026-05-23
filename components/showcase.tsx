import Image from "next/image";
import showcaseData from "@/data/showcase.json";

export function Showcase() {
  return (
    <section className="w-full">
      <div className="overflow-hidden">
        <div className="group flex flex-row gap-8 overflow-hidden">
          {showcaseData.marqueeTracks.map((track) => (
            <div
              key={track}
              className="flex shrink-0 flex-row justify-around gap-8 animate-marquee group-hover:[animation-play-state:paused]"
            >
              {showcaseData.showcases.map((item) => (
                <div
                  key={item.src}
                  className="relative shrink-0 overflow-hidden rounded-md border border-border bg-card w-100 md:w-150"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={338}
                    className="aspect-video h-auto w-full rounded-md object-cover object-top"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
