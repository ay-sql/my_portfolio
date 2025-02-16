export interface Certification {
  title: string;
  image: string;
  logo: string;
  link: string;
  provider: string;
}

export const certifications: Certification[] = [
  {
    title: "Google UX Design",
    image: "/img/google-certification.png",
    logo: "/img/test.jpg",
    link: "https://www.coursera.org/account/accomplishments/your-cert-id",
    provider: "Google"
  },
  {
    title: "Google Digital Marketing",
    image: "/img/google-certification.png",
    logo: "/img/test.jpg",
    link: "https://www.coursera.org/account/accomplishments/your-cert-id",
    provider: "Google"
  },
  {
    title: "Google Data engineer",
    image: "/img/google-certification.png",
    logo: "/img/test.jpg",
    link: "https://www.coursera.org/account/accomplishments/your-cert-id",
    provider: "Google"
  },
  {
    title: "Meta Front-End Developer",
    image: "/img/Meta-Certification.jpg",
    logo: "/img/test.jpg",
    link: "https://www.coursera.org/account/accomplishments/your-cert-id",
    provider: "Meta"
  },
  {
    title: "Meta Back-End Developer",
    image: "/img/Meta-Certification.jpg",
    logo: "/img/test.jpg",
    link: "https://www.coursera.org/account/accomplishments/your-cert-id",
    provider: "Meta"
  },
  {
    title: "AWS Cloud Practitioner",
    image: "/img/awspng.png",
    logo: "/img/test.jpg",
    link: "https://www.credly.com/badges/your-badge-id",
    provider: "AWS"
  }
];
