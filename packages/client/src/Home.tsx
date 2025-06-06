import {
  CheckBox,
  CheckBoxOutlineBlank,
  Edit,
  Refresh,
} from '@mui/icons-material';
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
import { useAtom, useSetAtom } from 'jotai';
import { Suspense } from 'react';
import { studentIdAtom, studentsAtom } from './atoms';
import { useNavigate } from 'react-router';

export function Home() {
  return (
    <Container sx={{ paddingY: 2, flexGrow: 1, overflow: 'hidden' }}>
      <Suspense>
        <HomeImpl />
      </Suspense>
    </Container>
  );
}

function HomeImpl() {
  const navigate = useNavigate();
  const [students, refreshStudents] = useAtom(studentsAtom);
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
              <TableCell padding="checkbox" align="center">
                <IconButton
                  onClick={() => {
                    refreshStudents();
                  }}
                >
                  <Refresh />
                </IconButton>
              </TableCell>
              <TableCell>学籍番号</TableCell>
              <TableCell>グループ</TableCell>
              <TableCell>名前</TableCell>
              <TableCell align="center">ex1</TableCell>
              <TableCell align="center">ex2</TableCell>
              <TableCell align="center">ex3</TableCell>
              <TableCell align="center">ex4</TableCell>
              <TableCell align="center">ex5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell padding="checkbox" align="center">
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
                <TableCell align="center">
                  {student.ex1 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell align="center">
                  {student.ex2 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell align="center">
                  {student.ex3 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell align="center">
                  {student.ex4 === 'x' ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )}
                </TableCell>
                <TableCell align="center">
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
