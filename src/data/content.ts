export type ContentType = "film" | "series";

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  poster: string;
  banner: string;
}

export const contents: Content[] = [
  {
    id: "dont-look-up",
    title: "Don't Look Up",
    type: "film",
    poster: "poster-dl-up.webp",
    banner: "banner-dl-up.webp",
  },
  {
    id: "all-of-us-are-dead",
    title: "All of Us Are Dead",
    type: "series",
    poster: "poster-aod.webp",
    banner: "banner-aou-dead.webp",
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    type: "series",
    poster: "poster-blue-lock.webp",
    banner: "banner-blue-lock.webp",
  },
  {
    id: "a-man-called-otto",
    title: "A Man Called Otto",
    type: "film",
    poster: "poster-tmco.webp",
    banner: "banner-tmc-otto.webp",
  },
  {
    id: "doctor-strange-multiverse-of-madness",
    title: "Dr. Strange: Multiverse of Madness",
    type: "film",
    poster: "poster-ds-mom.webp",
    banner: "banner-ds-mom.webp",
  },
  {
    id: "duty-after-school",
    title: "Duty After School",
    type: "series",
    poster: "poster-das.webp",
    banner: "banner-da-school.webp",
  },
  {
    id: "suzume",
    title: "Suzume",
    type: "film",
    poster: "poster-suzume.webp",
    banner: "banner-suzume.webp",
  },
  {
    id: "john-wick",
    title: "John Wick",
    type: "film",
    poster: "poster-jw.webp",
    banner: "banner-jw.webp",
  },
  {
    id: "sonic",
    title: "Sonic",
    type: "film",
    poster: "poster-sonic.webp",
    banner: "banner-sonic.webp",
  },
  {
    id: "black-hat-society",
    title: "Black Hat Society",
    type: "series",
    poster: "poster-bhs.webp",
    banner: "banner-bhs.webp",
  },
  {
    id: "the-little-mermaid",
    title: "The Little Mermaid",
    type: "film",
    poster: "poster-tlm.webp",
    banner: "banner-tlm.webp",
  },
  {
    id: "the-tomorrow-war",
    title: "The Tomorrow War",
    type: "film",
    poster: "poster-ttw.webp",
    banner: "banner-ttw.webp",
  },
  {
    id: "a-quiet-place",
    title: "A Quiet Place",
    type: "film",
    poster: "poster-amqm.webp",
    banner: "banner-amqm.webp",
  },
  {
    id: "guardians-of-the-galaxy",
    title: "Guardians of the Galaxy",
    type: "film",
    poster: "poster-gotg.webp",
    banner: "banner-gotg.webp",
  },
  {
    id: "the-man-called-otto",
    title: "The Man Called Otto",
    type: "film",
    poster: "poster-tmco.webp",
    banner: "banner-tmco.webp",
  },
];