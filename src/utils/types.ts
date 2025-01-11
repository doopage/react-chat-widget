import { Primitive } from 'utility-types';

export type Nullable<T> = T | null;

export type AnyFunction = (...args: any[]) => any;

export type StateRef<T> = T & {
  $$valtioSnapshot: T;
};

export type SnapshotIgnore = Date | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any> | Error | RegExp | AnyFunction | Primitive;

export type Snapshot<T> = T extends StateRef<infer S> ? S : T extends SnapshotIgnore ? T : T extends Promise<unknown> ? Awaited<T> : T extends object ? {
  readonly [K in keyof T]: Snapshot<T[K]>;
} : T;

export type Position = {
  x: number;
  y: number;
}
