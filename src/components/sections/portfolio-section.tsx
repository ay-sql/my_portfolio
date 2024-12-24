import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getBaseUrl } from '@/lib/utils';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: Array<{ _id: string; name: string }>;
  demoLink?: string;
  codeLink?: string;
  figmaLink?: string;
  featured: boolean;
  order: number;
}

interface ProjectsResponse {
  projects: Project[];
  total: number;
  totalPages: number;
  currentPage: number;
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/projects?featured=true`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }
    
    const data: ProjectsResponse = await res.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function PortfolioSection() {
  const projects = await getProjects();
  const featuredProjects = projects
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section id="portfolio" className="py-16 md:py-20 lg:py-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-primary">
              Recent Works
            </h4>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Portfolio
            </h2>
          </div>
          <p className="max-w-[700px] text-muted-foreground">
            Explore a collection of my recent projects that showcase my skills and expertise in web development and design.
          </p>
        </div>

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
            >
              <div className="aspect-video relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="px-2 py-1 text-xs rounded-full bg-white/20"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Live Demo
                    </Link>
                  )}
                  {project.codeLink && (
                    <Link
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary"
                    >
                      View Code
                    </Link>
                  )}
                  {project.figmaLink && (
                    <Link
                      href={project.figmaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Figma
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
