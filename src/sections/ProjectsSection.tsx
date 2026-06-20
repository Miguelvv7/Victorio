"use client";
import ProjectTitle from "@/components/ProjectTitle";
import ProjectSlider from "@/components/ProjectSlider";

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[45%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <ProjectTitle />
        </div>
        <div className="h-full">
          <ProjectSlider />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
