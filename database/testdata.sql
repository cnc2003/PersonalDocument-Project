use document;
SELECT * FROM document.documents;
select * from document.users;

-- Insert test users with hashed passwords
INSERT INTO `users` (`name`, `username`, `email`, `password`, `createdOn`, `updatedOn`) VALUES
('Alice', 'alice123', 'alice@example.com', '$2a$10$3LOvUZCGgodwJ845oehfJunPEU40f8MK3agRUZ0rfY3/dS.vxlTHq', NOW(), NOW()),
('Bob', 'bob456', 'bob@example.com', '$2a$10$ZsKvTcTrc.90LyLCJjfPe.BuJDr0.l0J6eJkyu8a8YgJPNtVDtCEG', NOW(), NOW()),
('Charlie', 'charlie789', 'charlie@example.com', '$2a$10$pCtezmG4pWebX5oQNzPXvOEA5Nhlk1XDEsZ2L4i0ebbLf4JEMCMD2', NOW(), NOW()),
('David', 'david012', 'david@example.com', '$2a$10$cpjiQJxJC9iMVKjZGpmL3eUTA3HMVrAm3UZznSghXhKprsTQ7J6M2', NOW(), NOW()),
('Eve', 'eve345', 'eve@example.com', '$2a$10$yrnZAPsc599PB2Nk2JKI2OZnsFFrJ2a7uAFsW/urQyKOcKo2twsMa', NOW(), NOW());

-- Insert test documents (tasks) for each user
INSERT INTO `documents` (`user_id`, `title`, `content`, `createdOn`, `updatedOn`, `privacy`) VALUES
-- Documents for Alice
(1, 'My First Document', 'This is the content of the first document for Alice.', NOW(), NOW(), 'PRIVATE'),
(1, 'My Second Document', 'This is the content of the second document for Alice.', NOW(), NOW(), 'PUBLIC'),
(1, 'My Third Document', 'This is the content of the third document for Alice.', NOW(), NOW(), 'PRIVATE'),
(1, 'My Fourth Document', 'This is the content of the fourth document for Alice.', NOW(), NOW(), 'PUBLIC'),

-- Documents for Bob
(2, 'Bob\'s Document 1', 'Content of the first document for Bob.', NOW(), NOW(), 'PRIVATE'),
(2, 'Bob\'s Document 2', 'Content of the second document for Bob.', NOW(), NOW(), 'PUBLIC'),
(2, 'Bob\'s Document 3', 'Content of the third document for Bob.', NOW(), NOW(), 'PRIVATE'),
(2, 'Bob\'s Document 4', 'Content of the fourth document for Bob.', NOW(), NOW(), 'PUBLIC'),

-- Documents for Charlie
(3, 'Charlie\'s Document 1', 'Content of the first document for Charlie.', NOW(), NOW(), 'PRIVATE'),
(3, 'Charlie\'s Document 2', 'Content of the second document for Charlie.', NOW(), NOW(), 'PUBLIC'),

-- Documents for David
(4, 'David\'s First Document', 'This is the content of David\'s first document.', NOW(), NOW(), 'PUBLIC'),
(4, 'David\'s Second Document', 'This is the content of David\'s second document.', NOW(), NOW(), 'PRIVATE'),

-- Documents for Eve
(5, 'Eve\'s Document 1', 'Content of the first document for Eve.', NOW(), NOW(), 'PRIVATE'),
(5, 'Eve\'s Document 2', 'Content of the second document for Eve.', NOW(), NOW(), 'PUBLIC'),
(5, 'Eve\'s Document 3', 'Content of the third document for Eve.', NOW(), NOW(), 'PRIVATE');
