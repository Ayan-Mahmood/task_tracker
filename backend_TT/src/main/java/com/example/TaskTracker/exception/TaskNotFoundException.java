package com.example.TaskTracker.exception;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long task_num){
        super("Could not find task with task number " + task_num);
    }
}
