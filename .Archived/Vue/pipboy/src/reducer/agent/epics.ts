import { combineEpics, Epic } from 'redux-observable'

import { Observable } from 'rxjs/Observable'
import { RootAction, RootState } from '@src/reducer'
import { ROOT_MOUNTED, actionCreators } from '@src/reducer/agent'
import { push } from 'react-router-redux'

import * as API from '@src/service/api.v1'

const authEpics: Epic<RootAction, RootState> =
  (action$, store) => action$.filter((action: RootAction) => false)

const initEpics: Epic<RootAction, RootState> =
    (action$, store) => action$
        .ofType(ROOT_MOUNTED)
        .mergeMap((action: RootAction) => (
            Observable.fromPromise(API.keepFreshing())
                .map(res => {
                    if (res.data.u_id) {
                        return actionCreators.update_agent(res.data)
                    } else {
                        return push('/agent')
                    }
                }))
                .catch(error => Observable.of(actionCreators.add_error_logger('auth', error)))
        )

export const epics = combineEpics(authEpics, initEpics)
