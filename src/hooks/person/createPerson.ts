import type { PersonType } from "../../types/PersonType";

type PersonProps = {
  name: string;
  surname: string;
}

function createPerson({name, surname} : PersonProps): PersonType {
  const ids = Object.keys({ ...localStorage }).map(Number);
  const maxId = ids.reduce(
    (max, id) => Math.max(max, id),
    0
  );
  const newPersonId = String(maxId + 1);
  const newPerson = {
    id: newPersonId,
    notes: [],
    name, surname
  };
  return newPerson
}

export default createPerson
export type {PersonProps}