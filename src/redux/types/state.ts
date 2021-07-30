import { moduleName as moduleApp } from '../ducks/app';
import { moduleName as moduleNewsCategories } from '../ducks/newsCategory';
import { AppRecord, NewsCategory } from './entities';

export type AppState = {
  [moduleApp]: AppRecord;
  [moduleNewsCategories]: NewsCategory[];
};
