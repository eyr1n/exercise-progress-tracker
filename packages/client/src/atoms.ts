import { hcWithType } from '@exercise-progress-tracker/server/hc';
import { atom } from 'jotai';
import { atomWithRefresh } from 'jotai/utils';

export const usernameAtom = atom('');

export const passwordAtom = atom('');

export const clientAtom = atom((get) =>
  hcWithType(`http://${location.hostname}:3000/`, {
    headers: {
      Authorization: `Basic ${btoa(`${get(usernameAtom)}:${get(passwordAtom)}`)}`,
    },
  }),
);

export const studentsAtom = atomWithRefresh((get) =>
  get(clientAtom)
    .students.$get()
    .then((res) => res.json())
    .catch(() => []),
);

export const studentIdAtom = atom('');

export const studentAtom = atomWithRefresh((get) =>
  get(clientAtom)
    .student[':id'].$get({
      param: {
        id: get(studentIdAtom),
      },
    })
    .then((res) => res.json())
    .catch(() => null),
);
