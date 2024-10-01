import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../task.actions';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit{

  taskForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedPeople: this.formBuilder.array([], Validators.required),
      skills: this.formBuilder.array([], Validators.required)
    });
  }

  get assignedPeople(): FormArray {
    return this.taskForm.get('assignedPeople') as FormArray;
  }

  addPerson() {
    this.assignedPeople.push(this.formBuilder.control('', [Validators.required, Validators.minLength(1)]));
  }

  removePerson(index: number) {
    this.assignedPeople.removeAt(index);
  }

  // Métodos para manejar el FormArray de habilidades
  get skills(): FormArray {
    return this.taskForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.formBuilder.control('', [Validators.required, Validators.minLength(1)]));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    console.log(this.taskForm)
    if (this.taskForm.valid) {
      const task: Task = {
        id: Date.now(),
        name: this.taskForm.value.name,
        dueDate: this.taskForm.value.dueDate,
        assignedPeople: this.taskForm.value.assignedPeople,
        skills: this.taskForm.value.skills
      };

      console.log(this.taskForm);

      this.store.dispatch(addTask({ task }));
      this.taskForm.reset();
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }

  }
}
