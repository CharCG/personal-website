import { FaCode } from "react-icons/fa6";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Chip } from "@/components/ui/chip";
import type { Project } from "@/data/projects";
import { getSkillByName } from "@/data/skills";

type TechnologyListProps = Pick<Project, "technologies"> & {
  className?: string;
};

export function TechnologyList({ technologies, className = "" }: TechnologyListProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Technologies used">
      {technologies.map((technology) => {
        const skill = getSkillByName(technology);

        return (
          <li key={technology}>
            <Chip
              icon={
                skill ? (
                  <BrandIcon icon={skill.icon} className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                )
              }
            >
              {technology}
            </Chip>
          </li>
        );
      })}
    </ul>
  );
}
