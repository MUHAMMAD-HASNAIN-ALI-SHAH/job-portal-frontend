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

export interface ApplicantForm {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
}

export interface Recruiter {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  companyWebsite: string;
  companySize: string;
  companyLogo: string;
  industry: string;
}

export interface RecruiterForm {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
}

export interface Resume {
  resumeUrl: string;
  fileName: string;
  uploadedAt: string;
}