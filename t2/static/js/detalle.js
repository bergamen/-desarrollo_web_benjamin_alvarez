const validateText = (nombre,min=3,max=200) => {
    if(!nombre) return false;
    else{
        let lengthValid = nombre.trim().length >= min && nombre.trim().length <= max;
        return lengthValid
    }
}


async function agregarComentario(aviso_id,nombre,texto)  {

    try {
      const response = await fetch('http://127.0.0.1:5000/agregar_comentario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aviso_id, nombre, texto })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error al conectarse");
      }
    } catch (error) {
      console.error(error);
    }

}


const validar = () => {
    let nombre = myForm["nombre"].value;
    let comentario = myForm["conf-text-area"].value;

    let isValid = true;

    let nombreValidate = document.getElementById("nombre");
    if(!validateText(nombre)){
        nombreValidate.style.borderColor = "red";
        isValid &&=false;
    } else nombreValidate.style.borderColor = "";

    let comentarioValidate = document.getElementById("conf-text-area");
    if(!validateText(comentario)){
        comentarioValidate.style.borderColor = "red";
        isValid &&=false;
    } else comentarioValidate.style.borderColor = "";

    id = document.getElementById("id").value;

    if(isValid){
        agregarComentario(id,nombre,comentario);
        
        myForm["nombre"].value = "";
        myForm["conf-text-area"].value = "";;
        cargarComentarios(id);
    }

}



async function cargarComentarios(aviso_id) {
    const lista = document.getElementById('lista-comentarios');
    try {
      const response = await fetch(`http://127.0.0.1:5000/comentarios/${aviso_id}`);
      if(!response.ok){
        throw new Error("Error al conectarse");
      }
      const comentarios = await response.json();

      lista.innerHTML = '';
      comentarios.forEach(c => {
        const li = document.createElement('li');
        li.textContent = `${c.fecha} - ${c.nombre}: ${c.texto}`;
        lista.appendChild(li);
      });
    } catch (error) {
      console.error('Error cargando comentarios:', error);
    }
};



const inicio = () => {
    cargarComentarios(id_pagina);
}

var id_pagina = document.getElementById("id").value;
document.addEventListener('DOMContentLoaded',inicio);
let btn = document.getElementById("sgte-btn");
btn.addEventListener("click",validar);
