import { moduleName as moduleApp } from '../ducks/app';
import { AppRecord } from './entities';

export type AppState = {
  [moduleApp]: AppRecord;
};
