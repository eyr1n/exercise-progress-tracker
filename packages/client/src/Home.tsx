import { hcWithType, type Student } from '@exercise-progress-tracker/server/hc';
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
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const client = hcWithType('http://localhost:3000/');

export function Home() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    client.students
      .$get()
      .then((res) => res.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

  return (
    <Container sx={{ paddingY: 2, flexGrow: 1, overflow: 'hidden' }}>
      <Paper
        sx={{
          display: 'flex',
          maxHeight: '100%',
          overflow: 'auto',
        }}
      >
        <TableContainer>
          <Table size="small" stickyHeader>
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
                    <IconButton component={Link} to={`/edit?id=${student.id}`}>
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
    </Container>
  );
}
