create database areasRoles 
use areasRoles
-- Tabla de áreas (solo con lo básico)
CREATE TABLE IF NOT EXISTS areas (
    id_area INT AUTO_INCREMENT PRIMARY KEY,
    nombre_area VARCHAR(100) NOT NULL
);

-- Tabla de roles (solo con lo básico)
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    id_area INT NOT NULL,
    nombre_rol VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_area) REFERENCES areas(id_area)
);

-- Insertar datos de ejemplo para áreas
INSERT INTO areas (nombre_area) VALUES 
('Desarrollo'),
('Recursos Humanos'),
('Marketing'),
('Finanzas');

-- Insertar datos de ejemplo para roles
INSERT INTO roles (id_area, nombre_rol) VALUES 
(1, 'Frontend'),
(1, 'Backend'),
(1, 'Fullstack'),
(2, 'Reclutador'),
(2, 'Gestor de nóminas'),
(3, 'Community Manager'),
(3, 'Diseñador gráfico'),
(4, 'Contador'),
(4, 'Analista financiero');

select * from roles;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'selinedb';
FLUSH PRIVILEGES;

-- Procedimiento para obtener todas las áreas
DELIMITER //
CREATE PROCEDURE getAreas()
BEGIN
    SELECT id_area, nombre_area 
    FROM areas
    ORDER BY nombre_area;
END //
DELIMITER ;

-- Procedimiento para obtener los roles de un área específica
DELIMITER //
CREATE PROCEDURE getRoles(IN p_id_area INT)
BEGIN
    SELECT id_rol, nombre_rol 
    FROM roles 
    WHERE id_area = p_id_area
    ORDER BY nombre_rol;
END //
DELIMITER ;