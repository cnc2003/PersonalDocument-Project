-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- ------------------------documents-----------------------------
DROP DATABASE IF EXISTS document;
CREATE DATABASE document;
SET GLOBAL time_zone = '+00:00';
USE document;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS users;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) UNIQUE NOT NULL,
  `password` VARCHAR(100) NULL,
  `createdOn` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedOn` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  CHECK (name <> ''),
  CHECK (username <> ''),
  CHECK (email <> ''),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `imageUrl` TEXT DEFAULT NULL, 
  `content` TEXT NULL,
  `createdOn` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedOn` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW() NOT NULL,
  `privacy` ENUM("PUBLIC", "PRIVATE") NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `documents.id_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
