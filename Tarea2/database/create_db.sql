-- Active: 1759897864347@@127.0.0.1@3306@mysql
-- Crear Base de datos
CREATE DATABASE IF NOT EXISTS tarea2 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE tarea2;

-- Darle permisos al usuario
GRANT ALL ON tarea2.* TO cc5002@localhost;


-- Crear Tabla de usuarios
CREATE TABLE adoptions(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  region VARCHAR(255) NOT NULL,
  comuna VARCHAR(255) NOT NULL,
  sector VARCHAR(255),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(255),
  contacto VARCHAR(255) NOT NULL,
  otro VARCHAR(255),
  tipo VARCHAR(255) NOT NULL,
  fechaEntrega VARCHAR(255) NOT NULL,
  fechaPublicacion VARCHAR(255) NOT NULL,
  cantidad INT UNSIGNED NOT NULL,
  edad INT UNSIGNED NOT NULL,
  medida VARCHAR(255) NOT NULL,
  fotos VARCHAR(255) NOT NULL


);

