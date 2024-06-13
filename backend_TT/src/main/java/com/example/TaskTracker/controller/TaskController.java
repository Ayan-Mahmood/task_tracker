package com.example.TaskTracker.controller;

import com.example.TaskTracker.exception.TaskNotFoundException;
import com.example.TaskTracker.model.Task;
import com.example.TaskTracker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/task")
    Task newTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    @GetMapping("/tasks")
    List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @GetMapping("/task/{task_num}")
    Task getTaskByTaskNum(@PathVariable Long task_num){
        return taskRepository.findById(task_num).orElseThrow(()->new TaskNotFoundException(task_num));
    }

    @PutMapping("/task/{task_num}")
    Task editTask(@RequestBody Task newTask, @PathVariable Long task_num){
        return taskRepository.findById(task_num)
                .map(task->{
                    task.setTask_name(newTask.getTask_name());
                    task.setTask_description(newTask.getTask_description());
                    task.setExpected_time(newTask.getExpected_time());
                    task.setCompletion_day(newTask.getCompletion_day());
                    return taskRepository.save(task);
                }).orElseThrow(()->new TaskNotFoundException(task_num));
    }

    @DeleteMapping("/task/{task_num}")
    String deleteTask(@PathVariable Long task_num){
        if(!taskRepository.existsById(task_num)){
            throw new TaskNotFoundException(task_num);
        }
        taskRepository.deleteById(task_num);
        return "Task " + task_num + " has been deleted successfully!";
    }

    @PutMapping("/done/{task_num}")
    Task markDone(@PathVariable Long task_num){
        return taskRepository.findById(task_num)
                .map(task->{
                    task.setDone(!(task.getDone()));
                    return taskRepository.save(task);
                }).orElseThrow(()->new TaskNotFoundException(task_num));
    }

}
