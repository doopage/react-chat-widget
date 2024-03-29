import { cloneDeep } from 'lodash';
import { DeepPartial } from 'utility-types';

export const mergeProps = <T extends object>(...items: Array<DeepPartial<T>>): T => {
  const w = {} as T;
  for (const item of items) {
    for (const key of Object.keys(item)) {
      const v = Reflect.get(item, key);
      if (typeof v === 'object') {
        let y: unknown;
        if (Reflect.has(w, key)) {
          const wv = Reflect.get(w, key);
          if (typeof wv === 'object') {
            y = mergeProps(wv as object, v as object);
          } else {
            throw new Error('Invalid types !');
          }
        } else {
          y = cloneDeep(v);
        }
        Reflect.set(w, key, y);
      } else {
        Reflect.set(w, key, v);
      }
    }
  }
  return w;
};
