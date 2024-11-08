use document;
SELECT * FROM document.documents where user_id = 1;
select * from document.users;

-- Insert test users with hashed passwords
INSERT INTO `users` (`name`, `username`, `email`, `password`, `createdOn`, `updatedOn`) VALUES
('Alice', 'alice123', 'alice@example.com', '$2a$10$3LOvUZCGgodwJ845oehfJunPEU40f8MK3agRUZ0rfY3/dS.vxlTHq', NOW(), NOW()),
('Bob', 'bob456', 'bob@example.com', '$2a$10$ZsKvTcTrc.90LyLCJjfPe.BuJDr0.l0J6eJkyu8a8YgJPNtVDtCEG', NOW(), NOW()),
('Charlie', 'charlie789', 'charlie@example.com', '$2a$10$pCtezmG4pWebX5oQNzPXvOEA5Nhlk1XDEsZ2L4i0ebbLf4JEMCMD2', NOW(), NOW()),
('David', 'david012', 'david@example.com', '$2a$10$cpjiQJxJC9iMVKjZGpmL3eUTA3HMVrAm3UZznSghXhKprsTQ7J6M2', NOW(), NOW()),
('Eve', 'eve345', 'eve@example.com', '$2a$10$yrnZAPsc599PB2Nk2JKI2OZnsFFrJ2a7uAFsW/urQyKOcKo2twsMa', NOW(), NOW());

-- Insert test documents (tasks) for each user
INSERT INTO `documents` (`user_id`, `title`,`emoji`,`imageUrl`, `content`, `createdOn`, `updatedOn`, `privacy`) VALUES
-- Documents for Alice
(1, 'My First Document','📝','https://fastly.picsum.photos/id/49/536/354.jpg?hmac=nHnd7iRJJCEu5ETUJ1utIrDqxG0pq_JrU_d_9zSnuL0', '# Project Documentation.md

# Project Overview: Task Management System

## Introduction
This document outlines the key components and functionality of our task management system.

### Features
- User authentication and authorization
- Task creation and assignment
- Priority-based scheduling
- Progress tracking
- Team collaboration tools

## Technical Stack
- Frontend: React.js
- Backend: Node.js
- Database: PostgreSQL
- Authentication: JWT

## Getting Started
1. Clone the repository
2. Install dependencies using `npm install`
3. Configure environment variables
4. Run `npm start` to launch the application', NOW(), NOW(), 'PRIVATE'),
(1, 'My Second Document','🕊️','https://fastly.picsum.photos/id/659/536/354.jpg?hmac=rDYerKb1XZkOQo_yPZDDV6mc1c8pj5CGU9cdsQwldgs', '# Meeting Minutes.md

# Team Meeting Minutes - Project Phoenix

**Date**: October 23, 2024  
**Time**: 10:00 AM - 11:30 AM  
**Location**: Virtual Meeting Room

## Attendees
- Sarah Johnson (Project Manager)
- Mike Chen (Lead Developer)
- Lisa Rodriguez (UX Designer)
- David Kim (QA Lead)

## Agenda Items
1. Sprint Review
2. Upcoming Milestones
3. Resource Allocation
4. Risk Assessment

## Action Items
- [ ] Update project timeline
- [ ] Schedule user testing sessions
- [ ] Review security protocols
- [ ] Prepare client presentation

## Next Meeting
**Date**: October 30, 2024  
**Time**: 10:00 AM
', NOW(), NOW(), 'PUBLIC'),
(1, 'My Third Document','🐯','https://fastly.picsum.photos/id/213/536/354.jpg?hmac=uR4LvY7i-5xHRT95H_5axefzY962e0SahoabNthg3zg', '# Style Guide.md

# Company Style Guide

## Brand Colors
| Color Name | Hex Code | Usage |
|------------|----------|--------|
| Primary Blue | #1E90FF | Main buttons, headers |
| Secondary Gray | #707070 | Text, icons |
| Accent Green | #32CD32 | Success states |

## Typography
### Headers
- H1: Montserrat Bold, 32px
- H2: Montserrat SemiBold, 24px
- H3: Montserrat Medium, 20px

### Body Text
- Font: Open Sans Regular, 16px
- Line Height: 1.5
- Letter Spacing: 0.5px

## Components
1. Buttons
2. Forms
3. Cards
4. Navigation
', NOW(), NOW(), 'PRIVATE'),
(1, 'My Fourth Document','','', '# Research Notes.md

# Research Notes: AI in Healthcare

## Executive Summary
This document summarizes current trends in AI applications within healthcare settings.

### Key Areas of Implementation
1. **Diagnostic Assistance**
   - Image recognition
   - Pattern analysis
   - Predictive diagnostics

2. **Patient Care**
   - Monitoring systems
   - Treatment optimization
   - Resource allocation

## Data Analysis
```
Patient Improvement Rates:
Traditional Methods: 75%
AI-Assisted Methods: 89%
```

### Recommendations
* Increase AI training datasets
* Implement cross-validation
* Enhance security protocols

## References
1. Journal of Medical AI (2024)
2. Healthcare Technology Review
3. International Medical Database', NOW(), NOW(), 'PUBLIC');

-- Documents for Bob
INSERT INTO `documents` (`user_id`, `title`, `imageUrl`, `content`, `createdOn`, `updatedOn`, `privacy`) VALUES
(2, 'Bob\'s Document 1', NULL, 'Content of the first document for Bob.', NOW(), NOW(), 'PRIVATE'),
(2, 'Bob\'s Document 2', NULL, 'Content of the second document for Bob.', NOW(), NOW(), 'PUBLIC'),
(2, 'Bob\'s Document 3', NULL, 'Content of the third document for Bob.', NOW(), NOW(), 'PRIVATE'),
(2, 'Bob\'s Document 4', NULL, 'Content of the fourth document for Bob.', NOW(), NOW(), 'PUBLIC');


-- Documents for Eve
INSERT INTO `documents` (`user_id`, `title`, `imageUrl`, `content`, `createdOn`, `updatedOn`, `privacy`) VALUES
(5, 'Eve\'s Document 1', NULL, 'Content of the first document for Eve.', NOW(), NOW(), 'PRIVATE'),
(5, 'Eve\'s Document 2', NULL, 'Content of the second document for Eve.', NOW(), NOW(), 'PUBLIC'),
(5, 'Eve\'s Document 3', NULL, 'Content of the third document for Eve.', NOW(), NOW(), 'PRIVATE');
