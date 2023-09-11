export function notNullQueries(args: string[]): boolean {
  let status = true;

  for (const key in args) {
    if (!args[key]) {
      status = false;
      break;
    }
  }
    
  return status;
}
