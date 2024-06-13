package com.example.TaskTracker.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class TaskNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(TaskNotFoundException.class)
    public Map<String, String> exceptionHandler(TaskNotFoundException exception){
        Map<String, String> mp = new HashMap<>();
        mp.put("errorMessage", exception.getMessage());
        return mp;
    }
}
