-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `document` DEFAULT CHARACTER SET utf8 ;
USE `document` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT AUTO_INCREMENT NOT NULL,
  `user_name` VARCHAR(100) NOT NULL,
  `user_username` VARCHAR(50) NOT NULL,
  `user_email` VARCHAR(50) NOT NULL,
  `user_password` VARCHAR(50) NULL,
  `user_createdOn` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `user_updatedOn` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`),
  CHECK (user_name <> ''),
  CHECK (user_username <> ''),
  CHECK (user_email <> ''),
  UNIQUE INDEX `id_UNIQUE` (`user_id` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `documents` (
  `document_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `document_title` VARCHAR(100) NOT NULL,
  `document_content` TEXT NULL,
  `document_createdOn` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `document_updatedOn` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE NOW() NOT NULL,
  `document_privacy` ENUM("PUBLIC", "PRIVATE") NOT NULL,
  PRIMARY KEY (`document_id`),
  UNIQUE INDEX `id_UNIQUE` (`document_id` ASC) VISIBLE,
  INDEX `documents.user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `documents.user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
