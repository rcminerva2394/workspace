# Workspace

A work in progress task management app (Kanban board) specifically inspired by Trello.

## User stories

-   User can add a board/project
-   Each board has three categories: Todo, Doing, and Done
-   In every category, the user can add a task card
-   The user can open each task card, a modal will pop up
-   When the user opens the card modal, the user can do the following:
    -   Change card title
    -   Add card description
    -   Set and delete deadline
    -   Add and delete subtasks
    -   Change status of the card to either Todo, Doing, or Done
    -   Update card status completion by clicking the checkbox deadline or due date
    -   Update subtasks status completion
    -   User can drop comments and see team members' comments as well.
-   User can move the card to any category using Drag and Drop API

## Technologies

-   React
-   styled-components
-   react-icons
-   react-router v6
-   HTML Drag and Drop API
-   Firebase
    -   Authentication
    -   Cloud Firestore
    -   Hosting

## Motivation

The goal is to practice React with Firebase integration.

## Challenges

### Database and Data Structure

I chose the root-level collections as suggested by firestore. The reason is my app has a distinct need of sharing the boards to other users. Since copying a board to another user (a member) doesn't sound efficient, I opted to separate the boards collection and users collection. In this case, the users who share a board will only edit one board and its subcollections. Each board in boards collection will hold members (either the owner or a member). When a user logs in, frontend will query the boards collection one by one to fetch only the boards wherein users id are listed in the members object.

I am not pretty sure if this is faster since the app could have thousands of boards and it might take longer time to fetch one by one. However since this is just for practice, I guess this is not a bad data structure for my case.

(./screenshots/data-structure.png)

## Learnings

## Areas for Improvement

-   Additional features in the future

    -   Drag and Drop for on touch devices
    -   Sorting or ranking of task items per board status based on level of importance
    -   Add assign task to a person feature

-   Refactoring Needed
    -   Refactor the setDate/ Deadline Component
    -   Refactor repeated codes for UI like forms and inputs
