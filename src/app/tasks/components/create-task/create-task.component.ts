import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/task.actions';
import { TaskService } from '../../services/task.services';

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
      assignedPeople: this.formBuilder.array([], [Validators.required, this.assignedPeopleRequired, this.noDuplicateNames])
    });
  }

  get assignedPeople(): FormArray {
    return this.taskForm.get('assignedPeople') as FormArray;
  }

  addPerson() {
    const personGroup = this.formBuilder.group({
      nameP: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, this.ageValidator]],
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

  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const age = control.value;
    return age !== null && age < 18 ? { ageTooYoung: true } : null;
  }

  assignedPeopleRequired(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    return formArray.length > 0 ? null : { required: true };
  }

  noDuplicateNames(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    const names = formArray.controls.map(person => {
      const nameControl = person.get('nameP');
      return nameControl ? nameControl.value?.toLowerCase() : null;
    });

    const duplicateIndices: number[] = [];
    names.forEach((name, index) => {
      if (name !== null && names.indexOf(name) !== index) {
        duplicateIndices.push(index);
      }
    });

    formArray.controls.forEach((person, index) => {
      if (duplicateIndices.includes(index)) {
        person.get('nameP')?.setErrors({ duplicate: true });
      } else {
        person.get('nameP')?.setErrors(null);
      }
    });

    return duplicateIndices.length > 0 ? { duplicateNames: true } : null;
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
      this.assignedPeople.clear();
      this.taskFormSubmitted = false;
    }
  }
}
