package com.tarea4.t4;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Created by José Urzúa <a href="mailto:jose@urzua.cl">jose@urzua.cl</a> on 12-06-25.
 */
@Entity
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer nota;
    private Integer aviso_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public Integer getAvisoId() {
        return aviso_id;
    }

    public void setAvisoId(Integer newId) {
        this.aviso_id = newId;
    }
}