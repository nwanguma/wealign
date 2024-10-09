export interface User {
  id: string;
  email: string;
  created_at: string;
  status: string;
  last_seen: Date | null;
  profile: Profile;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  website: string;
  ticket_link: string;
  views: number;
  banner: string;
  event_start_date: string;
  event_end_date: string;
  created_at: string;
  owner: string | null;
  location: string | null;
  link: string | null;
  comments: [];
  reactions: [];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  website: string;
  github_url: string | null;
  created_at: string;
  collaborators?: Profile[];
  skills?: Skill[];
  likes?: any[];
  comments?: any[];
  owner: Profile;
  start_date?: string;
  status?: string;
  location?: string;
  views?: number | null;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  website: string;
  application_url: string | null;
  created_at: string;
  requirements?: Skill[];
  likes?: any[];
  comments?: any[];
  owner: Profile;
  deadline?: string;
  status?: string;
  location?: string;
  views?: number | null;
  updated_at: string;
}

export interface Skill {
  title: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  resume: string | null;
  languages?: string[] | null;
  skills?: Skill[] | null;
  title: string;
  heading: string;
  views?: number;
  followers?: Profile[];
  following?: Profile[];
  comments?: any[];
  reactions?: any[];
  events?: Event[];
  jobs?: Job[];
  projects?: Project[];
  user_id?: string;
  status?: string;
  is_mentor?: boolean;
  mentor_note?: string;
  requires_update?: boolean;
  visibility_status?: string;
}

export enum ActivityTypes {
  FOLLOW = "follow",
  LIKE = "like",
  COMMENT = "comment",
}

export interface Activity {
  id: string;
  type: ActivityTypes;
  owner: Profile;
  participant: Profile;
  event: Event;
  profile: Profile;
  project: Project;
}

export const mapLanguageToFlag = {
  english: "england",
  french: "france",
  spanish: "spain",
  italian: "italy",
  german: "germany",
};

export enum ProjectStatus {
  COMPLETED = "completed",
  IN_PROGRESS = "in progress",
  PAUSED = "paused",
  NEED_COLLABORATORS = "need collaborators",
}
export interface Message {
  id: string;
  text: string;
  sender: User;
  created_at: string;
}

export interface Conversation {
  participants: {
    user: User;
    participant: User;
  };
  latest_message: Message;
  messages: Message[];
  is_group: boolean;
  id: string;
}

export interface EventWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Event[];
}

export interface JobsWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Job[];
}

export interface ProjectsWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Project[];
}

export interface ProfilesWithPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Profile[];
}
