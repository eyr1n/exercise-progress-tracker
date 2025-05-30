import { useEffect, useState } from 'react';
import { hcWithType, type Student } from '@exercise-progress-tracker/server/hc';

const client = hcWithType('http://localhost:3000/');

export function App() {
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
    <>
      <input id="id" type="text" />
      <button type="button">完了確認</button>
      <button type="button">訂正</button>
      <table>
        <thead>
          <tr>
            <th scope="col">学籍番号</th>
            <th scope="col">名前</th>
            <th scope="col">グループ</th>
            <th scope="col">ex1</th>
            <th scope="col">ex2</th>
            <th scope="col">ex3</th>
            <th scope="col">ex4</th>
            <th scope="col">ex5</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.group}</td>
              <td>{student.ex1}</td>
              <td>{student.ex2}</td>
              <td>{student.ex3}</td>
              <td>{student.ex4}</td>
              <td>{student.ex5}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <script type="text/javascript">
        const idElm = document.querySelector("#id");
      </script>
    </>
  );
}
