import { useEffect, useState } from 'react';
import { hcWithType, type Student } from '@exercise-progress-tracker/server/hc';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const client = hcWithType('http://localhost:3000/');

export function Edit() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    client.index
      .$get()
      .then((res) => res.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

  return (
    <Container>
      <TextField type="text" />
      <Button type="button">完了確認</Button>
      <Button type="button">訂正</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>学籍番号</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>グループ</TableCell>
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
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.group}</TableCell>
                <TableCell>{student.ex1}</TableCell>
                <TableCell>{student.ex2}</TableCell>
                <TableCell>{student.ex3}</TableCell>
                <TableCell>{student.ex4}</TableCell>
                <TableCell>{student.ex5}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
