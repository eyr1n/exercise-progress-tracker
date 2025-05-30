import type { PathLike } from 'node:fs';
import { CSVDatabase } from './csv_database.js';
import { type Exercise, type Student, StudentSchema } from './schemas/index.js';

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

  async set(id: string, exercises: Pick<Student, Exercise>) {
    const student = await this.get(id);
    if (student == null) {
      return false;
    }
    await this.#db.set(id, { ...student, ...exercises });
    return true;
  }

  async check(id: string, exercise: Exercise) {
    const student = await this.get(id);
    if (student == null || student[exercise] === 'x') {
      return false;
    }
    student[exercise] = 'x';
    return true;
  }
}
