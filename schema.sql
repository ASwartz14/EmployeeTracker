DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL ,
  depName VARCHAR(30) NOT NULL,
  primary key(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,4) NULL,
  depId INT NOT NULL,
  primary key(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INT NOT NULL,
  managerId INT NOT NULL,
  primary key(id)
);

INSERT INTO department (depName) values ("Engineering");

INSERT INTO roles (title, salary, depId) values ("Engineer",80,000,4);

INSERT INTO employees (firstName, lastName, roleId, managerId) values ("Jane", "Doe", 14,1);