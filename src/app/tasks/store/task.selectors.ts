import { createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

export const selectTaskState = (state: any) => state.task;

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => {
    return state.tasks;
  }
);
