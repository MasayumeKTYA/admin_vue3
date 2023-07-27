export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // 处理基本类型和 null
  }

  const clone: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]); // 递归复制对象属性
    }
  }
  return clone;
}