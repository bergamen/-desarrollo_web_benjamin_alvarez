package com.tarea4.t4.dto;

import java.time.LocalDateTime;

public record AvisoDTO(Integer id
                        ,LocalDateTime fecha_ingreso
                        , String sector
                        , Integer cantidad
                        , String tipo
                        , Integer edad
                        , String comuna
                        , Double nota) {

}
