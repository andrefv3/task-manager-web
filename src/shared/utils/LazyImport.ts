import { type ComponentType, lazy, type LazyExoticComponent } from 'react';

export function lazyImport<
  T extends Record<string, unknown>,
  U extends keyof T
>(
  factory: () => Promise<T>,
  name: U
): LazyExoticComponent<ComponentType<unknown>> {
  return lazy(async () => {
    const module = await factory();
    const component = module[name];
    return { default: component as ComponentType<unknown> };
  });
}