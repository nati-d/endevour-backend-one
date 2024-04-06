// admin.model.ts
export type Admin = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: Admin_role;
  profile_image: string;
  password: string;
  token: string;
  created_at: Date;
  updated_at: Date;
};

export enum Admin_role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

// user.model.ts
export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_image: string;
  location: Record<string, any>;
  verified_by: number;
  password: string;
  token: string;
  created_at: Date;
  updated_at: Date;
};

// tag.model.ts
export type Tag = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

// organization.model.ts
export type Organization_category = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Organization = {
  id: number;
  name: string;
  email: string;
  about: string;
  location: Record<string, any>;
  category: number;
  verified_by: number | null;
  created_at: Date;
  updated_at: Date;
};

// service-provider.model.ts
export type Service_provider_category = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Service_provider = {
  id: number;
  name: string;
  category: number;
  about: string;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

export type Service_provider_post = {
  id: number;
  content: string;
  description: string;
  posted_by: number;
  created_at: Date;
  updated_at: Date;
};

// job.model.ts
export type Job_category = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Salary = {
  id: number;
  low_end: number;
  high_end: number;
  periodicity: Periodicity;
  currency: string;
};

export type Job_post = {
  id: number;
  title: string;
  overview: string;
  body: string;
  contract_type: Contract_type;
  year_of_experience: number;
  thumbnail: string;
  category: number;
  closing_date: Date;
  verified_at: Date;
  verified_by: number;
  posted_by: number;
  created_at: Date;
  updated_at: Date;
};

export enum Contract_type {
  REMOTE = "REMOTE",
  PARTIME = "PARTIME",
  FULLTIME = "FULLTIME",
  CONTRACT = "CONTRACT",
}

export enum Periodicity {
  HOURLY = "HOURLY",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}

// news.model.ts
export type News = {
  id: number;
  title: string;
  overview: string;
  thumbnail: string;
  body: string;
  posted_by: number;
  created_at: Date;
  updated_at: Date;
};

// tender.model.ts
export type Tender_category = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Tender = {
  id: number;
  title: string;
  overview: string;
  body: string;
  price: number | null;
  starting_bid: number;
  eligibility: boolean;
  status: string;
  category: number;
  opening_date: Date;
  closing_date: Date;
  posted_by: number;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

export type Tender_files = {
  id: number;
  file: string;
  tender_id: number;
  created_at: Date;
  updated_at: Date;
};

// grant.model.ts
export type Grant = {
  id: number;
  title: string;
  overview: string;
  body: string;
  location: string;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

// blog.model.ts
export type Blog = {
  id: number;
  title: string;
  overview: string;
  body: string;
  posted_by: number;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

// exclusive-job.model.ts
export type Exclusive_job = {
  id: number;
  title: string;
  body: string;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

// recommender.model.ts
export type Recommender = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  verified_by: number;
  created_at: Date;
  updated_at: Date;
};

// recommended-applicants.model.ts
export type Recommended_Applicants = {
  id: number;
  first_name: string;
  last_name: string;
  cv: string;
  job: number;
  recommender: number;
  recommendation_letter: string;
  created_at: Date;
  updated_at: Date;
};
