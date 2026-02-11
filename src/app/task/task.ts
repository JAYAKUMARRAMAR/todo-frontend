import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from './task.model';
import { TaskService } from './task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CommonModule,FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit{
   
  constructor(private taskService: TaskService) { }
  tasks: TaskModel[] = [];
  newTask: TaskModel = {description: "", completed: false};
  editingTask: TaskModel | null = null;
  updatedTask: TaskModel = {description: "", completed: false};
  
  ngOnInit(): void {
    this.getAllTasks();
  }

  createTask():void {
    this.taskService.createTask(this.newTask).subscribe(   
      (createdTask) => {
        console.log('Task created successfully:', createdTask);
        this.newTask = {description: '', completed: false};
        this.tasks.push(createdTask);
      } );
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.log('Tasks retrieved successfully:', tasks);
      })
  }
  
  editTask(task: TaskModel) {
    this.editingTask = task;
    this.updatedTask = { ...task };
  }

  updateTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id!, this.updatedTask).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          this.editingTask = null;
          this.getAllTasks();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(testId:any)
  {
    this.taskService.deleteTask(testId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.tasks = this.tasks.filter(task => task.id !== testId)
        if(this.editingTask && this.editingTask.id === testId) {
          this.cancelEdit();
        }
      }
    )
  }
}