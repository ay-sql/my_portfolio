export default function SkillsSection() {
  const skills = [
    { name: "Frontend Development", level: 90 },
    { name: "Backend Development", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Mobile Development", level: 75 },
    { name: "DevOps", level: 70 },
  ];

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-muted flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
          <p className="max-w-[700px] text-muted-foreground">
            Here are some of the key skills and technologies I work with.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
