import { type PathLike, createReadStream, createWriteStream } from 'node:fs';
import { finished } from 'node:stream/promises';
import { type Parser, parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import type { ZodObject, ZodRawShape, z } from 'zod';

export class CSVDatabase<T extends ZodObject<ZodRawShape>> {
  #schema: T;
  #primaryKey: keyof z.infer<T>;
  #path: PathLike;
  #encoding: BufferEncoding;

  #records: z.infer<T>[] | null = null;
  #columns: string[] | null = null;

  constructor(
    schema: T,
    primaryKey: keyof z.infer<T>,
    path: PathLike,
    encoding: BufferEncoding = 'utf-8',
  ) {
    this.#schema = schema;
    this.#primaryKey = primaryKey;
    this.#path = path;
    this.#encoding = encoding;
  }

  async get(key: string): Promise<z.TypeOf<T> | null> {
    const records = await this.#loadRecords();
    const record = records.find((record) => record[this.#primaryKey] === key);
    return record ?? null;
  }

  async set(key: string, record: z.infer<T>): Promise<void> {
    const records = await this.#loadRecords();
    const recordIndex = records.findIndex(
      (record) => record[this.#primaryKey] === key,
    );
    if (recordIndex > -1) {
      records.splice(recordIndex, 1, record);
    } else {
      records.push(record);
    }
    await this.#storeRecords();
  }

  async records(): Promise<z.infer<T>[]> {
    return this.#loadRecords();
  }

  async #loadRecords(): Promise<z.infer<T>[]> {
    if (this.#records == null) {
      const parser = createReadStream(this.#path, this.#encoding).pipe(
        parse({ columns: true }),
      );
      this.#records = await parseAndValidate(parser, this.#schema);
    }
    return this.#records;
  }

  async #storeRecords(): Promise<void> {
    const records = await this.#loadRecords();
    const columns = await this.#loadColumns();
    const stream = stringify(records, {
      header: true,
      columns,
    }).pipe(createWriteStream(this.#path, this.#encoding));
    await finished(stream);
  }

  async #loadColumns(): Promise<string[]> {
    if (this.#columns == null) {
      const parser = createReadStream(this.#path).pipe(
        parse({ columns: false }),
      );
      for await (const record of parser) {
        this.#columns = record;
        break;
      }
    }
    if (this.#columns == null) {
      throw new Error('csv is empty');
    }
    return this.#columns;
  }
}

async function parseAndValidate<T extends ZodObject<ZodRawShape>>(
  parser: Parser,
  schema: T,
): Promise<z.infer<T>[]> {
  const records: z.infer<T>[] = [];
  for await (const record of parser) {
    records.push(await schema.parseAsync(record));
  }
  return records;
}
