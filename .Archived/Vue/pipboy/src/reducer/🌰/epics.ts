import { combineEpics, Epic } from 'redux-observable'

// import { Observable } from 'rxjs/Observable'
import { RootAction, RootState } from '@src/reducer'
// import { FETCH_USER, Actions , actionCreators } from '@src/reducer/users'
// import { ajax } from 'rxjs/observable/dom/ajax'
// // Epics - handling side effects of actions
const testEpics: Epic<RootAction, RootState> =
  (action$, store) => action$
    // .ofType(FETCH_USER)
    // .concatMap((action: Actions[typeof FETCH_USER]) => {
    //     return Observable.of(actionCreators.fetch_user('1'))
    // })
export const epics = combineEpics(testEpics)
