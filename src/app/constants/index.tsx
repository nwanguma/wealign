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
}

interface Collaborator {
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
  languages: string[] | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  website: string;
  github_url: string | null;
  created_at: string;
  collaborators: Collaborator[];
}
