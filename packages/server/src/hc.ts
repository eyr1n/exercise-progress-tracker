import type { app } from './app.js';
import { hc } from 'hono/client';

const client = hc<typeof app>('');
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);
