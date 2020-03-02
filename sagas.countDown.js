import { eventChannel, END } from 'redux-saga';
import { call, fork, put, take, cancel, cancelled } from 'redux-saga/effects';
import {CounterAction,ActionType} from "./actions"

const countdown = secs =>
  eventChannel(emit => {
    const counter = setInterval(() => {
      secs -= 1;
      emit(secs >= 0 ? secs : END);
    }, 1000);

    return () => clearInterval(counter);
  });

function* countdownTask(secs) {
  const chan = yield call(countdown, secs);

  try {
    while (true) {
      const sec = yield take(chan);
      yield put({type: CounterAction.UPDATE_COUNTER,payload: sec});
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    } else {
      yield put({type: CounterAction.COUNT_OVER});
    }
  }
}

function* watchCountdown() {
  while (true) {
    const { payload: { secs } } = yield take(CounterAction.START_COUNTER);

    const task = yield fork(countdownTask, secs);
    yield put({type: CounterAction.COUNTER_STARTED});

    const { type } = yield take([CounterAction.PAUSE_COUNTER, CounterAction.COUNT_OVER]);
    if (type === CounterAction.PAUSE_COUNTER) {
      yield cancel(task);
      yield put({type: CounterAction.COUNTER_PAUSED});
    }
    else{
        yield put({type:ActionType.FINISH_GAME})
    }
  }
}

export default watchCountdown;
