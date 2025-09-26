export interface Character {
  _id: string;
  height?: string;
  race?: string;
  gender?: string;
  birth?: string;
  spouse?: string;
  death?: string;
  realm?: string;
  hair?: string;
  name: string;
  wikiUrl?: string;
}

// Domain enums (union types) for known values + fallbacks
export const GENDERS = ["Male", "Female", "Other", "Unknown"] as const;
export type Gender = (typeof GENDERS)[number];

export const RACES = [
  "Human",
  "Elf",
  "Dwarf",
  "Hobbit",
  "Orc",
  "Maiar",
  "Ent",
  "Ainur",
  "Uruk-hai",
  "Half-elven",
  "Dúnedain",
  "Istari",
  "Nazgûl",
  "Goblin",
  "Troll",
  "Dragon",
  "Beorning",
  "Great Eagle",
  "Other",
  "Unknown",
] as const;
export type Race = (typeof RACES)[number];

// Translations to Spanish
const GENDER_LABELS: Record<string, string> = {
  Male: "Masculino",
  Female: "Femenino",
  Other: "Otro",
  Unknown: "Desconocido",
  "": "Desconocido",
  NaN: "Desconocido",
};

const RACE_LABELS: Record<string, string> = {
  Human: "Humano",
  Elf: "Elfo",
  Dwarf: "Enano",
  Hobbit: "Hobbit",
  Orc: "Orco",
  Maiar: "Maiar",
  Ent: "Ent",
  Ainur: "Ainur",
  "Uruk-hai": "Uruk-hai",
  "Half-elven": "Medio elfo",
  Dúnedain: "Dúnedain",
  Istari: "Istari",
  Nazgûl: "Nazgûl",
  Goblin: "Goblin",
  Troll: "Trol",
  Dragon: "Dragón",
  Beorning: "Beórning",
  "Great Eagle": "Águila gigante",
  Other: "Otro",
  Unknown: "Desconocido",
  "": "Desconocido",
  NaN: "Desconocido",
};

export function genderLabel(v?: string) {
  return GENDER_LABELS[v ?? ""] ?? v ?? "";
}
export function raceLabel(v?: string) {
  return RACE_LABELS[v ?? ""] ?? v ?? "";
}
