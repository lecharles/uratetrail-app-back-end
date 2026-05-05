# REQUIREMENTS.md

> Distilled from the GA project requirements doc. This is the rubric we will be graded on. Use this as a checklist to validate the project before submission.

> Source: GA Software Engineering Bootcamp - MERN Stack CRUD App Group Project

---

## MVP requirements (any incomplete = redo required)

- [ ] Back-end built with Express and Node
- [ ] Front-end built with React
- [ ] MongoDB used as database
- [ ] JWT token-based auth implemented across both apps (sign up, sign in, sign out)
- [ ] Authorization implemented across both apps (guest users cannot create/update/delete or access functionality for those actions)
- [ ] At least 2 data entities in addition to User model (we have Trail and Comment)
- [ ] At least one entity has relationship with User model (Comment has user_id ref)
- [ ] Full CRUD functionality on both back-end and front-end
- [ ] No secret keys held in front-end (Google Maps key proxied through back-end if needed)
- [ ] Project deployed online

## Code conventions (more than 2 incomplete = redo required)

- [ ] File organization follows lecture conventions (Billy's boilerplate)
- [ ] Code adheres to lecture conventions (e.g., plural names for arrays)
- [ ] No dead code, commented-out sections, or console.logs in committed code
- [ ] Back-end runs without errors in terminal
- [ ] Front-end runs without errors in browser console
- [ ] Back-end follows RESTful routing conventions
- [ ] Proper indentation throughout

## UI/UX (more than 2 incomplete = redo required)

- [ ] Visual theme: consistent color palette and cohesive layout
- [ ] Easily navigable by first-time user (links, not URL typing)
- [ ] Uses CSS Flexbox and/or Grid for layout
- [ ] Colors meet WCAG 2.0 AA contrast standard
- [ ] Edit forms pre-fill with current item's details
- [ ] Only the user who created data can see/interact with edit/delete UI
- [ ] All images have alt text
- [ ] No text on top of images in inaccessible ways
- [ ] All buttons are styled

## Git and GitHub (any incomplete = redo required)

- [ ] Only Carlos and William shown as contributors
- [ ] Repos named appropriately (`uratetrail-app-back-end` and `uratetrail-app-front-end` ✓)
- [ ] Repos are publicly accessible
- [ ] Commits date back to the very beginning of the project (no fresh-repo restarts that delete history)

## README requirements (more than 2 incomplete = redo required)

### Front-end README must contain:

- [ ] Screenshot or logo of app
- [ ] App name with description and functionality (background info is a nice touch)
- [ ] Getting started section: link to deployed app, link to planning materials, link to back-end repo
- [ ] Attributions section (if any external libraries/assets require attribution)
- [ ] Technologies used: principal technologies including JavaScript and major frameworks/libraries
- [ ] Next steps: planned future enhancements (stretch goals)

### Back-end README must contain:

- [ ] Project name
- [ ] Link to front-end repo

## Presentation requirements (any incomplete = redo required)

- [ ] Group presents on scheduled day
- [ ] Project presented matches what was approved by instructor
- [ ] Maximum 15 minutes presentation length

## Individual contributor requirements

### Git and GitHub (any incomplete = redo)

- [ ] Significant contributor (visible in GitHub commit count and lines modified)
- [ ] Commit count not artificially inflated by minor commits
- [ ] Commits across both front-end and back-end
- [ ] Descriptive commit messages

### Presentation (any incomplete = redo)

- [ ] Demonstrate a feature personally built during project week

## Project planning deliverables (Trello)

- [ ] Public Trello board with these lists:
  - [ ] **MVP User Stories** (one card per story, format: "As a [user role], I want [feature], so that [reason]")
  - [ ] **Wireframes** (one card per page, optional stretch wireframes clearly labeled)
  - [ ] **ERD** (one card with the diagram)
  - [ ] **Stretch Goal User Stories** (separate list)

## Submission deliverables

- [ ] Trello board link
- [ ] Front-end GitHub repo link
- [ ] Back-end GitHub repo link
- [ ] Deployed front-end app link

## Things explicitly forbidden

- [ ] Plagiarism - code must be substantially the team's own
- [ ] Generic boilerplate code from the internet copied wholesale
- [ ] Deleting old repo if starting over (history must persist)
