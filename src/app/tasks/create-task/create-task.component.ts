import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../task.actions';
import { TaskService } from '../task.services';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  taskForm!: FormGroup;
  taskFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedPeople: this.formBuilder.array([], [Validators.required, this.assignedPeopleRequired])
    });
  }

  get assignedPeople(): FormArray {
    return this.taskForm.get('assignedPeople') as FormArray;
  }

  addPerson() {
    const personGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      skills: this.formBuilder.array([], [this.skillsRequired])
    });

    this.assignedPeople.push(personGroup);
  }

  removePerson(index: number) {
    this.assignedPeople.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    return this.assignedPeople.at(personIndex).get('skills') as FormArray;
  }

  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.formBuilder.control('', [Validators.required]));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  assignedPeopleRequired(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    return formArray.length > 0 ? null : { required: true };
  }

  skillsRequired(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    return formArray.length > 0 ? null : { required: true };
  }

  onSubmit() {
    this.taskFormSubmitted = true;

    if (this.taskForm.valid) {
      const task = {
        id: Date.now(),
        name: this.taskForm.value.name,
        dueDate: this.taskForm.value.dueDate,
        assignedPeople: this.taskForm.value.assignedPeople,
        isCompleted: false
      };

      this.store.dispatch(addTask({ task }));
      this.taskService.addTask(task);
      this.taskForm.reset();
      this.taskFormSubmitted = false;
    } else {
      // alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
