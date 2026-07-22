export type EntityId<Prefix extends string> = `${Prefix}.${string}`;

export interface DomainEntity<Prefix extends string> {
  id: EntityId<Prefix>;
}

export interface Experience extends DomainEntity<"experience"> {
  role: string;
  company: string;
  location: string;
  workType: string;
  duration: string;
  description: string[];
  stack: string[];
  logoAssetId?: EntityId<"asset">;
}

export interface Project extends DomainEntity<"project"> {
  category: "Personal" | "Experience" | "GitHub";
  title: string;
  role: string;
  description: string;
  resumeBio?: string;
  stack: string[];
  live: string;
  source: string;
}

export interface Product extends DomainEntity<"product"> {
  name: string;
  projectId: EntityId<"project">;
  logoAssetId?: EntityId<"asset">;
}

export interface Skill extends DomainEntity<"skill"> {
  heading: string;
  items: string[];
}

export interface Publication extends DomainEntity<"publication"> {
  title: string;
  platform?: string;
  date?: string;
  description: string;
  link?: string;
  showResume?: boolean;
}

export interface Education extends DomainEntity<"education"> {
  start: string;
  end: string;
  degree: string;
  institution: string;
  details: string[];
}

export interface Certification extends DomainEntity<"certification"> {
  title: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  skills?: string[];
  link?: string;
  assetId?: EntityId<"asset">;
  showResume?: boolean;
}

export interface Asset extends DomainEntity<"asset"> {
  kind: "image" | "document" | "icon";
  path: string;
  alt?: string;
}
