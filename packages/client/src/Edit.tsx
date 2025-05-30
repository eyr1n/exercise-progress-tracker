import {
  hcWithType,
  type Exercise,
  type Student,
} from '@exercise-progress-tracker/server/hc';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const client = hcWithType('http://localhost:3000/');

export function Edit() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const setId = (id: string) => {
    setSearchParams({ id });
  };
  const [student, setStudent] = useState<Student | null>(null);
  const [exercises, setExercises] = useState<Pick<Student, Exercise> | null>(
    null,
  );

  useEffect(() => {
    client.student[':id']
      .$get({
        param: {
          id,
        },
      })
      .then((res) => res.json())
      .then((student) => {
        setStudent(student);
      });
  }, [id]);

  const get = () => {
    client.student[':id']
      .$get({
        param: {
          id,
        },
      })
      .then((res) => res.json())
      .then((student) => {
        console.log(student);
        setExercises(student);
      });
  };

  const set = () => {
    if (
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
        .then((res) => res.json())
        .then((student) => {
          setStudent(student);
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
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Typography variant="h4">訂正</Typography>
        <Typography>学籍番号: {student?.id}</Typography>
        <Typography>グループ: {student?.group}</Typography>
        <Typography>名前: {student?.name}</Typography>
        <TextField
          label="学籍番号"
          autoComplete="off"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Stack direction="row" gap={2}>
          <Button variant="contained" disabled={student == null} onClick={get}>
            読み込み
          </Button>
          <Button variant="contained" disabled={student == null} onClick={set}>
            書き込み
          </Button>
        </Stack>
        <Stack direction="row" gap={2} flexWrap="wrap">
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
      </Stack>
    </Container>
  );
}
