import { ref as valtioRef } from 'valtio';
import { StateRef } from '@utils/types';

export const ref = <T extends object>(v: T): StateRef<T> => valtioRef<T>(v);
