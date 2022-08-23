# Workspace

A work in progress task management app (Kanban board) specifically inspired by Trello.

## User stories

-   User can add a board/project
-   Each board has three categories: Todo, Doing, and Done
-   In every category, the user can add a task card
-   The user can open each task card, a modal will pop up
-   When the user opens the card modal, the user can do the following:
    1. Change card title
    2. Add card description
    3. Set and delete deadline
    4. Add and delete subtasks
    5. Change status of the card to either Todo, Doing, or Done
    6. Update card status completion by clicking the checkbox deadline or due date
    7. Update subtasks status completion
    8. User can drop comments and see team members' comments as well.
-   User can move the card to any category using Drag and Drop API

## Technologies

-   React
-   styled-components
-   react-icons
-   react-router
-   uuid
-   HTML Drag and Drop API
-   Firebase (Authentication, Cloud Firestore and Hosting)

## Motivation

The goal is to practice React with Firebase integration.

## Challenges

### Database and Data Structure

## Learnings

## Areas for Improvement

-   Drag and Drop for on touch devices
-   Sorting or ranking of task items per board status based on level of importance
-   Refactor the setDate Component
-   Add assign task to a person feature
