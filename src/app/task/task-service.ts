import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiUrl="http://localhost:8080/api/tasks";
  
  constructor(private httpClient: HttpClient) { }
  
  createTask(newtask:TaskModel):Observable<TaskModel>
  {
    return this.httpClient.post<TaskModel>(this.apiUrl, newtask);
  } 

  getAllTasks(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.apiUrl);
  }

  updateTask(id: number, updatedTask: TaskModel): Observable<TaskModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<TaskModel>(url, updatedTask);
  }

  deleteTask(taskId: number) {
    const url = `${this.apiUrl}/${taskId}`;
    return this.httpClient.delete(url);
  }
}
