import { Action, createReducer, on } from '@ngrx/store';
import { TaskState, initialTaskState } from './task.state';
import { addTask } from './task.actions';

const _taskReducer = createReducer(
  initialTaskState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  }))
);

export function taskReducer(state: TaskState, action: Action) {
  return _taskReducer(state, action);
}
