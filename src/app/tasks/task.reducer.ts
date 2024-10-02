import { Action, createReducer, on } from '@ngrx/store';
import { Task } from './task.model';
import { addTask, updateTask } from './task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(updateTask, (state, { task }) => {
    const updatedTasks = state.tasks.map(t =>
      t.id === task.id ? task : t
    );
    return { ...state, tasks: updatedTasks };
  })
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return _taskReducer(state ?? initialState, action);
}
