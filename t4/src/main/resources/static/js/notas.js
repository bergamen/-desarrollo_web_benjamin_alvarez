var pagina = 0;
var id_aviso = 1;

function evaluar(nota){
    let formu = document.getElementById("formulario");
    let titul = document.getElementById("eval");
    
    formu.hidden=false;
    id_aviso = nota;
    titul.textContent="Evaluar aviso "+nota;
}

async function getNota(id) {
    try {
        const response = await fetch(`/nota/detalle/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const promedio = await response.json();
        return promedio ?? 0;
    } catch (err) {
        console.error("Error recuperando la nota:", err);
        return 0;
    }
}

async function getData(page){
            const url = "http://localhost:8080/nota/listado/"+page;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Response status: ${response.status}');
                }

                const obj = await response.json();

                const table = document.getElementById('tablaPersonas');
                if (obj.length > 0){
                    const myElement = document.getElementById('listaPersonas');
                    myElement.style.display = "block";
                    table.innerHTML = "";
                }
                filas = "<tr>\n" +
                    "    <td><b>ID</b></td>\n" +
                    "    <td><b>Fecha<br>publicación</b></td>\n" +
                    "    <td><b>Sector</b></td>\n" +
                    "    <td><b>Cantidad Tipo<br>Edad</b></td>\n" +
                    "    <td><b>Comuna</b></td>\n" +
                    "    <td><b>Nota</b></td>\n" +
                    "    <td><b></b></td>\n" +
                    "  </tr>"
                for (let i = 0; i < obj.length; i++) {
                    fecha = obj[i][1].split("T")[0]
                    medida = ""
                    if(obj[i][5]=="a"){medida="año"}
                    else{medida ="mes"}
                    cte = "" + obj[i][3] +" "+obj[i][4]+"<br>"+obj[i][6]+" "+medida
                    nota = ""
                    if (obj[i][8]==0) {nota="-"}
                    else{nota = String(obj[i][8])}

                    evaluar_nota = "<button onclick="+"'evaluar("+obj[i][0]+")'"+">evaluar</button>"

                    filas = filas + "<tr><td>"+obj[i][0]+"</td><td>"+fecha+"</td><td>"+obj[i][2]+"</td><td>"+cte+"</td><td>"+obj[i][7]+"</td><td>"+nota+"</td><td>"+evaluar_nota+"</td></tr>"
                }
                table.innerHTML = filas;
                console.log(filas);
            } catch (error) {
                console.error(error.message);
            }
        }

async function agregaNota(){
    let mensaje = document.getElementById('mensaje');
    mensaje.style.display = "none";
    let error = document.getElementById('error');
    error.style.display = "none";
    const elemNota = document.getElementById("nota");
    const response = await fetch("http://localhost:8080/nota/addnota", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ nota: elemNota.value, aviso_id: id_aviso })
    });
    if (!response.ok) {
        error.innerHTML = "no se puedo agregar persona";
        error.style.display = "block";
        throw new Error('POST Response status: ${response.status}');
    }
    mensaje.innerHTML = "Agregada nueva nota";
    mensaje.style.display = "block";
    let formu = document.getElementById("formulario");
    formu.hidden = true;
    getData(pagina);
}


function cambiar_pagina(numero){
    pagina+=numero;
    if(pagina < 0){
        pagina = 0
    }
    let formu = document.getElementById("formulario");
    formu.hidden = true;
    getData(pagina)
}


document.addEventListener("DOMContentLoaded", function() {
    pagina = 0;
    getData(pagina);
});

