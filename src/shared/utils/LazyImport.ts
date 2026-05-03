import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

export function lazyImport<
  T extends Record<string, any>,
  U extends keyof T
>(
  factory: () => Promise<T>,
  name: U
): LazyExoticComponent<ComponentType<any>> {
  return lazy(async () => {
    const module = await factory();
    return { default: module[name] };
  });
}