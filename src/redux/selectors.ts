import { AppState } from './types/state';
import { moduleName as appModule } from './ducks/app';
export const isAuthorizedSelector = (state: AppState) => state[appModule].authorized;

