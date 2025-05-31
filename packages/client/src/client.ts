import { hcWithType } from '@exercise-progress-tracker/server/hc';

export const client = hcWithType(`http://${location.hostname}:3000/`);
