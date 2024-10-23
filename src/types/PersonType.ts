export type PersonType = {
  id: string;
  name: string;
  surname: string;
  notes: Note[];
}

export type Note = {
  title?: string;
  content: string;
  score: string;
}