import { CheckBox, CheckBoxOutlineBlank, Edit } from '@mui/icons-material';
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { studentIdAtom, studentsAtom } from './atoms';
import { useNavigate } from 'react-router';

export function Home() {
  return (
    <Container sx={{ paddingY: 2, flexGrow: 1, overflow: 'hidden' }}>
      <Suspense>
        <StudentsTable />
      </Suspense>
    </Container>
  );
}

function StudentsTable() {
  const navigate = useNavigate();
  const students = useAtomValue(studentsAtom);
  const setId = useSetAtom(studentIdAtom);

  return (
    <Paper
      sx={{
        display: 'flex',
        maxHeight: '100%',
        overflow: 'auto',
      }}
    >
      <TableContainer>
        <Table size="small" stickyHeader sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>学籍番号</TableCell>
              <TableCell>グループ</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>ex1</TableCell>
              <TableCell>ex2</TableCell>
              <TableCell>ex3</TableCell>
              <TableCell>ex4</TableCell>
              <TableCell>ex5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell padding="checkbox">
                  <IconButton
                    onClick={() => {
                      setId(student.id);
                      navigate('/edit');
                    }}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.group}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  {student.ex1 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell>
                  {student.ex2 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell>
                  {student.ex3 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell>
                  {student.ex4 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell>
                  {student.ex5 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
