import type { Exercise, Student } from '@exercise-progress-tracker/server/hc';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense, useState } from 'react';
import { clientAtom, studentAtom, studentIdAtom, studentsAtom } from './atoms';
import { Close } from '@mui/icons-material';

export function Edit() {
  const [id, setId] = useAtom(studentIdAtom);

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Typography variant="h4">訂正</Typography>
        <Stack direction="row" gap={1}>
          <TextField
            sx={{ width: '100%' }}
            label="学籍番号"
            autoComplete="off"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              setId('');
            }}
          >
            <Close />
          </IconButton>
        </Stack>
        <Suspense>
          <EditImpl />
        </Suspense>
      </Stack>
    </Container>
  );
}

function EditImpl() {
  const client = useAtomValue(clientAtom);
  const refreshStudents = useSetAtom(studentsAtom);
  const id = useAtomValue(studentIdAtom);
  const [student, refreshStudent] = useAtom(studentAtom);
  const [exercises, setExercises] = useState<Pick<Student, Exercise> | null>(
    null,
  );

  const get = () => {
    setExercises(student);
  };

  const set = () => {
    if (
      id != null &&
      exercises != null &&
      window.confirm(
        `${student?.name}さん(${student?.id})の進捗を修正しますか?`,
      )
    ) {
      client.edit[':id']
        .$post({
          param: {
            id,
          },
          json: exercises,
        })
        .then(() => {
          refreshStudents();
          refreshStudent();
          window.alert('書き込みに成功しました');
        })
        .catch(() => {
          window.alert('書き込みに失敗しました');
        });
    }
  };

  const update = (exercise: Exercise, value: boolean) => {
    setExercises((prev) =>
      prev != null
        ? {
            ...prev,
            [exercise]: value ? 'x' : '',
          }
        : null,
    );
  };

  return (
    student != null && (
      <>
        <Typography>学籍番号: {student.id}</Typography>
        <Typography>グループ: {student.group}</Typography>
        <Typography>名前: {student.name}</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="contained" onClick={get}>
            読み込み
          </Button>
          <Button variant="contained" color="error" onClick={set}>
            書き込み
          </Button>
        </Stack>
        <Stack>
          <FormControlLabel
            control={
              <Checkbox
                checked={exercises?.ex1 === 'x'}
                onChange={(e) => {
                  update('ex1', e.target.checked);
                }}
                disabled={exercises == null}
              />
            }
            label="ex1"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exercises?.ex2 === 'x'}
                onChange={(e) => {
                  update('ex2', e.target.checked);
                }}
                disabled={exercises == null}
              />
            }
            label="ex2"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exercises?.ex3 === 'x'}
                onChange={(e) => {
                  update('ex3', e.target.checked);
                }}
                disabled={exercises == null}
              />
            }
            label="ex3"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exercises?.ex4 === 'x'}
                onChange={(e) => {
                  update('ex4', e.target.checked);
                }}
                disabled={exercises == null}
              />
            }
            label="ex4"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={exercises?.ex5 === 'x'}
                onChange={(e) => {
                  update('ex5', e.target.checked);
                }}
                disabled={exercises == null}
              />
            }
            label="ex5"
          />
        </Stack>
      </>
    )
  );
}
