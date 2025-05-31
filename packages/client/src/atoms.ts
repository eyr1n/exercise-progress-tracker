import { atom } from 'jotai';
import { client } from './client';
import { atomWithRefresh } from 'jotai/utils';

export const studentsAtom = atomWithRefresh(() =>
  client.students.$get().then((res) => res.json()),
);

export const studentIdAtom = atom('');

export const studentAtom = atomWithRefresh((get) =>
  client.student[':id']
    .$get({
      param: {
        id: get(studentIdAtom),
      },
    })
    .then((res) => res.json())
    .catch(() => null),
);
