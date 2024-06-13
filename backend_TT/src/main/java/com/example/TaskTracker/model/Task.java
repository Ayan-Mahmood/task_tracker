package com.example.TaskTracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Task {

    @Id
    @GeneratedValue
    private Long task_num;
    private String task_name;
    private String task_description;
    private String completion_day;
    private String expected_time;
    private Boolean done;

    public Task() {
        done = false;
    }

    public Long getTask_num() {
        return task_num;
    }

    public void setTask_num(Long task_num) {
        this.task_num = task_num;
    }

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String task_name) {
        this.task_name = task_name;
    }

    public String getTask_description() {
        return task_description;
    }

    public void setTask_description(String task_description) {
        this.task_description = task_description;
    }

    public String getCompletion_day() {
        return completion_day;
    }

    public void setCompletion_day(String completion_day) {
        this.completion_day = completion_day;
    }

    public String getExpected_time() {
        return expected_time;
    }

    public void setExpected_time(String expected_time) {
        this.expected_time = expected_time;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }
}
