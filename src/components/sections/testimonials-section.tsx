import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "CEO",
    company: "Tech Corp",
    image: "/img/test.jpg",
    content: "Working with this developer was an absolute pleasure. They delivered exceptional results on time and within budget.",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Product Manager",
    company: "Design Studio",
    image: "/img/test.jpg",
    content: "Their attention to detail and creative problem-solving skills made our project a huge success.",
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "CTO",
    company: "Startup Inc",
    image: "/img/test.jpg",
    content: "An excellent developer who brings both technical expertise and creative insights to every project.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Client Testimonials
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            Here&apos;s what some of my clients have to say about working with me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center p-6 space-y-4 bg-muted rounded-lg"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <blockquote className="text-center">
                <p className="text-muted-foreground">{testimonial.content}</p>
              </blockquote>
              <div className="text-center">
                <cite className="not-italic font-medium">{testimonial.name}</cite>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
