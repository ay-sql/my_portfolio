import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="flex-1 flex justify-center">
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <Image
                src="/img/Ayoub.jpg"
                alt="About Me"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
            <p className="text-muted-foreground">
              I&apos;m a passionate developer with expertise in modern web technologies. I love creating
              beautiful and functional applications that solve real-world problems.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h3 className="font-medium">Experience</h3>
                <p className="text-2xl font-bold">5+ Years</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Projects</h3>
                <p className="text-2xl font-bold">50+</p>
              </div>
            </div>
            <div className="pt-4 flex justify-center md:justify-start">
              <Link
                href="/resume.pdf"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black dark:text-white transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
