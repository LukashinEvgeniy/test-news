import { AppState } from './types/state';
import { moduleName as appModule } from './ducks/app';
import { moduleName as newsCategoriesModule } from './ducks/newsCategory';
export const isAuthorizedSelector = (state: AppState) => state[appModule].authorized;

export const getNewsCategoires = (state: AppState) => state[newsCategoriesModule];

