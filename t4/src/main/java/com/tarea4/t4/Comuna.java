package com.tarea4.t4;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Created by José Urzúa <a href="mailto:jose@urzua.cl">jose@urzua.cl</a> on 12-06-25.
 */
@Entity
public class Comuna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private Integer region_id;

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

    public Integer getRegionId() {
        return region_id;
    }

    public void setRegionId(Integer newId) {
        this.region_id = newId;
    }
}