export interface User {
  _id: string;
  email: string;
  role: string;
}

export interface Applicant {
  fullName: string;
  phone: string;
  location: string;
  resume: string;
  profilePicture: string;
  skills: string[];
  bio: string;
}

export interface CompanyInterface {
  logo: string;
  name: string;
  email: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  about: string;
}

export interface JobForm {
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  experienceLevel: "Internship" | "Entry" | "Mid" | "Senior" | "Lead";
  location: string;
  salary: string;
  employmentType:
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Temporary";
  applicationDeadline: string;
  status: "active" | "draft" | "closed";
}

export interface Job {
  _id: string;
  company: string;
  title: string;
  description: string;
  requirements: string[];
  skills: string[];
  experienceLevel:
  | "Internship"
  | "Entry"
  | "Mid"
  | "Senior"
  | "Lead";
  location: string;
  salary: string;
  employmentType:
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Temporary";
  status: "active" | "draft" | "closed";
  applicationDeadline: string;
  postedAt: string;
  views: number;
  applicantsCount: number;
  totalApplied: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardJob {
  id: string;
  title: string;
  location: string;
  type: string;
  applicants: number;
  status: "Active" | "Closed" | "Draft";
  postedAt: string;
}

export interface DashboardCandidate {
  id: string;
  name: string;
  role: string;
  appliedFor: string;
  appliedAt: string;
  status: "New" | "Shortlisted" | "Rejected" | "Hired";
}

export type ExperienceLevel = "Internship" | "Entry" | "Mid" | "Senior" | "Lead";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Temporary";