import { hcWithType, type Student } from '@exercise-progress-tracker/server/hc';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

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
    <Paper sx={{maxHeight:"80dvh",height: "100%",
        display: "flex",
        overflow: "hidden"}}>
    <TableContainer>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
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
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.group}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.ex1}</TableCell>
              <TableCell>{student.ex2}</TableCell>
              <TableCell>{student.ex3}</TableCell>
              <TableCell>{student.ex4}</TableCell>
              <TableCell>{student.ex5}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></Paper>
  );
}
