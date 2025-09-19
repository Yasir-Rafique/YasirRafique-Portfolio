// src/data/certifications.ts

export type Certification = {
  title: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  skills?: string[];
  link?: string;
  file?: string; // for local PDF or image
  showResume?: boolean; // whether to show on resume
};

export const certifications: Certification[] = [
  // --- Professional Certifications ---
  {
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    date: "Aug 2025",
    credentialId: "6TOMPAUZDQUX",
    skills: [
      "Natural Language Processing (NLP)",
      "Gen AI",
      "AI Ethics",
      "ChatGPT",
      "Marketing Strategy",
    ],
    file: "/certifications/Coursera-6TOMPAUZDQUX.pdf",
    showResume: true,
  },
  {
    title: "React Native – Mobile App Development (CLI)",
    issuer: "Udemy",
    date: "Jul 2025",
    credentialId: "UC-62860e3f-9038-42ac-b75c-7222d781112c",
    skills: [
      "React Native",
      "CLI",
      "Redux",
      "Stripe",
      "Mobile App Development",
      "Secure Authentication",
    ],
    file: "/certifications/Course-Certificate.jpg",
    showResume: true,
  },
  {
    title: "Software Engineering Basics Certification",
    issuer: "Digital Futures",
    date: "May 2023",
    credentialId: "5tSYkHOwqh",
    skills: ["JavaScript"],
    //showResume: true,
  },
  {
    title: "Make a GraphQL Server with ExpressJS",
    issuer: "Coursera",
    date: "May 2023",
    credentialId: "H7NLFXDVL3SD",
    skills: ["Express.js", "GraphQL"],
    file: "/certifications/Coursera-H7NLFXDVL3SD.pdf",
    //showResume: true,
  },
  {
    title: "Amazon Web Services (AWS) S3 Bucket Basics",
    issuer: "Coursera",
    date: "Apr 2023",
    credentialId: "R2GGN35ZXVB3",
    skills: ["Amazon Web Services (AWS)"],
    file: "/certifications/Coursera-R2GGN35ZXVB3.pdf",
  },

  // --- Academic Certifications ---
  {
    title: "IELTS – Overall Band Score 6.5",
    issuer: "British Council / IDP",
    date: "Apr 2021",
  },
  {
    title: "Dean’s Honor List – Outstanding Academic Performance",
    issuer: "Abasyn University Islamabad",
    date: "2018, 2019",
  },
  {
    title:
      "Academic Excellence – Certificate for Superior Academic Achievement",
    issuer: "Abasyn University Islamabad",
    date: "2016",
  },
  {
    title: "Speed Programming Competition (Participation)",
    issuer: "TECTIQ",
    date: "2016",
  },
  {
    title: "Office Automation Course (3-months)",
    issuer: "Local Training Institute",
    date: "2013",
  },
];
