import { Profile } from "@/common/constants";

const recommendProfiles = ({
  currentUser,
  profiles,
}: {
  currentUser: any;
  profiles: Profile[];
}): Profile[] => {
  const { profile: userProfile } = currentUser;

  return profiles
    .filter((profile) => profile.id !== currentUser.id)
    .map((profile) => {
      let score = 0;

      const skillMatches = profile.skills!.filter((skill) =>
        userProfile.skills.includes(skill.title)
      ).length;
      score += skillMatches * 5;

      if (profile.location === userProfile.location) {
        score += 3;
      }

      const activityScore = Math.min(profile.views as number, 100) / 10;
      score += activityScore;

      return { profile, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((result) => result.profile);
};

export default recommendProfiles;
