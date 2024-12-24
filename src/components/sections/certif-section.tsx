'use client';

import Image from 'next/image';
import Link from 'next/link';
import { certifications } from '@/data/certifications';

export default function CertifSection() {
  return (
    <section className="py-16 bg-background" id="certifications">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Certifications
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and achievements that validate my expertise and commitment to continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg aspect-[4/3]">
              {/* Background Image */}
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                {/* Logo with white background */}
                <div className="relative w-20 h-20 mb-4 bg-white rounded-full p-2 shadow-lg">
                  <Image
                    src={cert.logo}
                    alt={`${cert.title} logo`}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                {/* Title */}
                <h3 className="text-white text-xl font-semibold text-center mb-4">
                  {cert.title}
                </h3>

                {/* Provider */}
                <p className="text-gray-300 mb-4 text-sm">
                  {cert.provider}
                </p>

                {/* View Button */}
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-full text-sm transition-all transform hover:scale-105"
                >
                  View Certificate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
