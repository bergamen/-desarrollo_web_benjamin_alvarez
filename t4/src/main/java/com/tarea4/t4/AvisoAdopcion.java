package com.tarea4.t4;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Created by José Urzúa <a href="mailto:jose@urzua.cl">jose@urzua.cl</a> on 12-06-25.
 */

/** 
`id` INT NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` DATETIME NOT NULL,
  `comuna_id` INT NOT NULL,
  `sector` VARCHAR(100) NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `celular` VARCHAR(15) NULL,
  `tipo` ENUM('gato', 'perro') NOT NULL,
  `cantidad` INT NOT NULL,
  `edad` INT NOT NULL,
  `unidad_medida` ENUM('a', 'm') NOT NULL,
  `fecha_entrega` DATETIME NOT NULL,
  `descripcion` TEXT(500) NULL,*/


@Entity
public class AvisoAdopcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDateTime fecha_ingreso;
    private Integer comuna_id;
    private String sector;
    private String nombre;
    private String email;
    private String celular;
    private String tipo;
    private Integer cantidad;
    private Integer edad;
    private String unidad_medida;
    private LocalDateTime fecha_entrega;
    private String descripcion;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDateTime getFechaIngreso(){return fecha_ingreso;}
    public void setFechaIngreso(LocalDateTime fecha){fecha_ingreso=fecha;}

    public Integer getComuna_id(){return comuna_id;}
    public void setComuna_id(Integer comuna){comuna_id=comuna;}

    public String getSector(){return sector;}
    public void setSector(String newSector){sector=newSector;}

    public String getEmail(){return email;}
    public void setEmail(String newEmail){email=newEmail;}

    public String getCelular(){return celular;}
    public void setCelular(String newCelular){email=newCelular;}

    public String getTipo(){return tipo;}
    public void setTipo(String newTipo){email=newTipo;}

    public Integer getCantidad(){return cantidad;}
    public void setCantidad(Integer newCantidad){cantidad=newCantidad;}

    public Integer getEdad(){return edad;}
    public void setEdad(Integer newEdad){edad=newEdad;}

    public String getUnidadMedida(){return unidad_medida;}
    public void setUnidadMedida(String newMedida){email=newMedida;}

    public LocalDateTime getFechaEntrega(){return fecha_entrega;}
    public void setFechaEntrega(LocalDateTime fecha){fecha_entrega=fecha;}

    public String getDescripcion(){return descripcion;}
    public void setDescripcion(String newDescripcion){descripcion=newDescripcion;}
}