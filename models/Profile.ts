type naturalLanguage =
  | "English"
  | "German"
  | "Spanish"
  | "Mandarin"
  | "Italian"
  | "French"
  | "Croatian"
  | "Polish"
  | "Arabic"
  | "Portuguese"
  | "Hebrew"
  | "Japanese";

type technicalLanguage =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "Vue"
  | "React"
  | "Angular"
  | "Cypress"
  | "Express"
  | "SQL"
  | "JSON"
  | "Markdown"
  | "Java"
  | "C"
  | "C++"
  | "Rust"
  | "TypeScript"
  | "Python"
  | "REST";

type hobby =
  | "Hiking"
  | "Running"
  | "Swimming"
  | "Writing"
  | "Yoga"
  | "Reading"
  | "Coding"
  | "Music"
  | "Knitting"
  | "Sleeping";

interface Profile {
  email: String;
  firstName: String;
  lastName: String;
  githubUsername: String;
  class: Number;
  role: String;
  jobTitle: String;
  company: String;
  gender?: "female" | "male" | String;
  birthday?: Date;
  location?: String;
  mentor: Boolean;

  about?: String;

  facebook?: String;
  linkedin?: String;
  instagram?: String;

  natLanguages: NaturalLanguage[];
  techLanguages: TechnicalLanguage[];

  hobbies: Hobby[];
}
