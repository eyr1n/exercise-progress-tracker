import type { Exercise } from '@exercise-progress-tracker/server/hc';
import {
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { clientAtom, studentAtom, studentIdAtom, studentsAtom } from './atoms';
import { Close } from '@mui/icons-material';

export function Check() {
  const [id, setId] = useAtom(studentIdAtom);

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={2}>
        <Typography variant="h4">完了確認</Typography>
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
          <CheckImpl />
        </Suspense>
      </Stack>
    </Container>
  );
}

function CheckImpl() {
  const client = useAtomValue(clientAtom);
  const refreshStudents = useSetAtom(studentsAtom);
  const id = useAtomValue(studentIdAtom);
  const [student, refreshStudent] = useAtom(studentAtom);

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
        .then(() => {
          refreshStudents();
          refreshStudent();
          window.alert('処理に成功しました');
        })
        .catch(() => {
          window.alert('処理に失敗しました');
        });
    }
  };

  return (
    student != null && (
      <>
        <Typography>学籍番号: {student.id}</Typography>
        <Typography>グループ: {student.group}</Typography>
        <Typography>名前: {student.name}</Typography>
        <Button
          variant="contained"
          disabled={student.ex1 !== ''}
          onClick={() => {
            check('ex1');
          }}
        >
          ex1
        </Button>
        <Button
          variant="contained"
          disabled={student.ex2 !== ''}
          onClick={() => {
            check('ex2');
          }}
        >
          ex2
        </Button>
        <Button
          variant="contained"
          disabled={student.ex3 !== ''}
          onClick={() => {
            check('ex3');
          }}
        >
          ex3
        </Button>
        <Button
          variant="contained"
          disabled={student.ex4 !== ''}
          onClick={() => {
            check('ex4');
          }}
        >
          ex4
        </Button>
        <Button
          variant="contained"
          disabled={student.ex5 !== ''}
          onClick={() => {
            check('ex5');
          }}
        >
          ex5
        </Button>
      </>
    )
  );
}
