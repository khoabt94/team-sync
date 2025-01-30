import { v4 as uuidV4 } from 'uuid';

export function generateRandomCode(length: number) {
  return uuidV4().replace(/-/g, '').slice(0, length).toUpperCase();
}

export function generateTaskCode() {
  return `task-${generateRandomCode(4)}`;
}
