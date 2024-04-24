package com.quiz;

import java.util.Date;

public class ResultDTO {
    private String examTitle;
    private String userName;
    private String score;
    private Date createdAt;

    // Constructor
    public ResultDTO(String examTitle, String userName, String score, Date date) {
        this.examTitle = examTitle;
        this.userName = userName;
        this.score = score;
        this.createdAt = date;
    }

    // Getters and setters
    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
