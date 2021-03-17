export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms * 1000));
