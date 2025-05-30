import type { PathLike } from 'node:fs';
import { CSVDatabase } from './csv_database.js';
import type { Exercise } from './exercise.js';
import { StudentSchema } from './student.js';

export class ExerciseProgressTracker {
  #db: CSVDatabase<typeof StudentSchema>;

  constructor(path: PathLike) {
    this.#db = new CSVDatabase(StudentSchema, 'id', path);
  }

  students() {
    return this.#db.records();
  }

  get(id: string) {
    return this.#db.get(id);
  }

  async check(id: string, exercise: Exercise) {
    const student = await this.#db.get(id);
    if (student == null || student[exercise] === 'x') {
      return false;
    }
    student[exercise] = 'x';
    return true;
  }

  async uncheck(id: string, exercise: Exercise) {
    const student = await this.#db.get(id);
    if (student == null || student[exercise] === '') {
      return false;
    }
    student[exercise] = '';
    return true;
  }
}
