package com.tarea4.t4;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by José Urzúa <a href="mailto:jose@urzua.cl">jose@urzua.cl</a> on 12-06-25.
 */
public interface AvisoAdopcionRepository extends CrudRepository<AvisoAdopcion, Integer> {
    @Query(value = "SELECT * FROM aviso_adopcion limit 5 offset ?1", nativeQuery = true)
    Iterable<AvisoAdopcion> findByPage(Integer page);
    @Query(value = """
        SELECT a.id as id, a.fecha_ingreso as fecha_ingreso,a.sector as sector,a.cantidad as cantidad,a.tipo as tipo,a.unidad_medida,a.edad,c.nombre as comuna, COALESCE(AVG(n.nota),0) as nota
        FROM aviso_adopcion a
        JOIN comuna c ON c.id = a.comuna_id
        LEFT JOIN nota n ON n.aviso_id = a.id
        GROUP BY id limit 5 offset ?1
        """,
        nativeQuery = true)
    Iterable<Object[]> listaCompletaPagina(Integer id);
}

/**Integer id
                        ,LocalDateTime fecha_ingreso
                        , String sector
                        , Integer cantidad
                        , String tipo
                        , Integer edad
                        , String comuna
                        , Double nota) {*/