package com.tarea4.t4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by José Urzúa <a href="mailto:jose@urzua.cl">jose@urzua.cl</a> on 12-06-25.
 */
@RestController
@RequestMapping("/nota")
public class TareaController {
    @Autowired
    private AvisoAdopcionRepository avisoAdopcionRepository;
    @Autowired
    private ComunaRepository comunaRepository;
    @Autowired
    private NotaRepository notaRepository;

    @PostMapping("/addnota")
    @ResponseBody
    String addnota(@RequestParam Integer nota, @RequestParam Integer aviso_id) {
        Nota n = new Nota();
        n.setNota(nota);
        n.setAvisoId(aviso_id);
        notaRepository.save(n);
        return "Agregada nueva nota";
    }

    @GetMapping("/listado/{id}")
    @ResponseBody
    Iterable<Object[]> getListado(@PathVariable Integer id) {
       return avisoAdopcionRepository.listaCompletaPagina(id*5);
    }

    


    @GetMapping("/comuna/{id}")
    String one(@PathVariable Integer id) {
        return comunaRepository.findById(id).orElse(null).getNombre();
    }

}
