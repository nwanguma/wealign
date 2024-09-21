import { Skill, Project } from "@/common/constants";

const recommendProjects = ({
  currentUser,
  projects,
}: {
  currentUser: any;
  // currentUser: Profile,
  projects: Project[];
}): Project[] => {
  const { profile: userProfile } = currentUser;

  return projects
    .map((project) => {
      let score = 0;

      const skillMatches = project.description
        .split(" ")
        .filter((word) =>
          userProfile.skills.map((skill: Skill) => skill.title).includes(word)
        ).length;
      score += skillMatches * 5;

      if (project.location === userProfile.location) {
        score += 3;
      }

      //Todo: more work on this
      // const similarCollaborations = project.collaborators.filter(
      //   (collaborator) =>
      //     currentUser.collaborators.some(
      //       (currentCollaborator) => currentCollaborator.id === collaborator.id
      //     )
      // ).length;
      // score += similarCollaborations * 4;

      const recentUpdate =
        (new Date(project.updated_at).getTime() - Date.now()) /
        (1000 * 3600 * 24);
      if (recentUpdate < 30) {
        score += 2;
      }

      const popularityScore =
        Math.min(project?.collaborators?.length || 0, 50) / 5;
      score += popularityScore;

      return { project, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((result) => result.project);
};

export default recommendProjects;
