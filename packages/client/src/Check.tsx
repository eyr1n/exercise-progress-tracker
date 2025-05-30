import {
  hcWithType,
  type Exercise,
  type Student,
} from '@exercise-progress-tracker/server/hc';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const client = hcWithType('http://localhost:3000/');

export function Check() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const setId = (id: string) => {
    setSearchParams({ id });
  };
  const [student, setStudent] = useState<Student | null>(null);

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

  const check = (exercise: Exercise) => {
    if (
      window.confirm(
        `${student?.name}さん(${student?.id})の${exercise}を完了しますか?`,
      )
    ) {
      client.check[':id'][':exercise']
        .$post({
          param: {
            id,
            exercise,
          },
        })
        .then((res) => res.json())
        .then((student) => {
          setStudent(student);
        });
    }
  };

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Typography variant="h4">完了確認</Typography>
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
        <Button
          variant="contained"
          disabled={student?.ex1 !== ''}
          onClick={() => {
            check('ex1');
          }}
        >
          ex1
        </Button>
        <Button
          variant="contained"
          disabled={student?.ex2 !== ''}
          onClick={() => {
            check('ex2');
          }}
        >
          ex2
        </Button>
        <Button
          variant="contained"
          disabled={student?.ex3 !== ''}
          onClick={() => {
            check('ex3');
          }}
        >
          ex3
        </Button>
        <Button
          variant="contained"
          disabled={student?.ex4 !== ''}
          onClick={() => {
            check('ex4');
          }}
        >
          ex4
        </Button>
        <Button
          variant="contained"
          disabled={student?.ex5 !== ''}
          onClick={() => {
            check('ex5');
          }}
        >
          ex5
        </Button>
      </Stack>
    </Container>
  );
}
