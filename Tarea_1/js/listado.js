const adoptionData = {
    0: {
        fechaPublicacion: '2025-08-30 12:00',
        fechaEntrega: '2025-09-05 15:00',
        region: 'Metropolitana',
        comuna: 'Santiago',
        sector: 'Beauchef 850, terraza',
        tipo: 'gato',
        cantidad: '2',
        edad: '2 meses',
        contacto: 'María González',
        telefono: '+56 9 1234 5678',
        email: 'maria.gonzalez@gmail.com',
        descripcion: 'Hermoso gatito rescatado de la calle. Es juguetón, cariñoso y está buscando un hogar permanente donde lo cuiden y lo amen.',
        fotos: ["../img/gato.jpeg", "../img/gato2.jpeg"]
    },
    1: {
        fechaPublicacion: '2025-08-23 19:00',
        fechaEntrega: '2025-08-30 12:00',
        region: 'Metropolitana',
        comuna: 'Ñuñoa',
        sector: 'Estadio Nacional',
        tipo: 'perro',
        cantidad: '1',
        edad: '6 meses',
        contacto: 'Juan Pérez',
        telefono: '+56 9 8765 4321',
        email: 'juan.perez@email.com',
        descripcion: 'Cachorro energético y amigable. Ya tiene todas sus vacunas al día y está esterilizado. Ideal para familia con niños.',
        fotos: ["../img/pegi.jpeg"]
    },
    2: {
        fechaPublicacion: '2025-08-20 09:00',
        fechaEntrega: '2025-08-27 10:00',
        region: 'Metropolitana',
        comuna: 'Providencia',
        sector: 'Plaza',
        tipo: 'gato',
        cantidad: '3',
        edad: '3 meses',
        contacto: 'Ana Silva',
        telefono: '+56 9 5555 1234',
        email: 'ana.silva@email.com',
        descripcion: 'Tres gatitos hermanos buscando hogar. Pueden adoptarse juntos o por separado. Todos son juguetones y están sanos.',
        fotos: ["../img/gato2.jpeg"]
    },
    3: {
        fechaPublicacion: '2025-08-18 14:00',
        fechaEntrega: '2025-08-25 16:00',
        region: 'Metropolitana',
        comuna: 'Santiago',
        sector: 'Morande con Compañia',
        tipo: 'perro',
        cantidad: '4',
        edad: '2 meses',
        contacto: 'Carlos López',
        telefono: '+56 9 9999 8888',
        email: 'carlos.lopez@email.com',
        descripcion: 'Camada de 4 cachorros mestizos. Todos están desparasitados y con primeras vacunas. Buscan hogares responsables.',
        fotos: ["../img/pegis.jpeg", "../img/pegi.jpeg"]
    },
    4: {
        fechaPublicacion: '2025-08-15 17:00',
        fechaEntrega: '2025-08-22 14:00',
        region: 'Metropolitana',
        comuna: 'Santiago',
        sector: 'Ministro Carvajar con Ministro Carvajal',
        tipo: 'perro',
        cantidad: '1',
        edad: '1 meses',
        contacto: 'Laura Martínez',
        telefono: '+56 9 7777 3333',
        email: 'laura.martinez@email.com',
        descripcion: 'Pequeño cachorro encontrado abandonado. Necesita cuidados especiales y mucho amor. Es tranquilo y se lleva bien con otros animales.',
        fotos: ["../img/pegi.jpeg"]
    }
    };


const to_portada = () => {
    window.location.href = "../html/principal.html";
}

var pagina = 0;

const set_section = (number) => {
    let fecha_publi = document.getElementById("fecha_publi_"+number); 
    let fecha_entrega = document.getElementById("fecha_entrega_"+number);
    let comuna = document.getElementById("comuna_"+number);
    let sector = document.getElementById("sector_"+number);
    let contacto = document.getElementById("contacto_"+number);
    let nombre = document.getElementById("nombre_"+number);
    let fotos = document.getElementById("fotos_"+number);


    let dato = number+5*pagina;
    fecha_publi.textContent = adoptionData[dato]["fechaPublicacion"];
    fecha_entrega.textContent = adoptionData[dato]["fechaEntrega"];
    comuna.textContent = adoptionData[dato]["comuna"];
    sector.textContent = adoptionData[dato]["sector"];
    contacto.textContent = adoptionData[dato]["cantidad"]+" "+adoptionData[dato]["tipo"]+","+adoptionData[dato]["edad"];
    nombre.textContent = adoptionData[dato]["contacto"];
    fotos.textContent = adoptionData[dato]["fotos"].length;

}

const change_pagina = () => {
    set_section(0);
    set_section(1);
    set_section(2);
    set_section(3);
    set_section(4);
}


var btn0 = document.getElementById("mostrar-0-btn");
var btn1 = document.getElementById("mostrar-1-btn");
var btn2 = document.getElementById("mostrar-2-btn");
var btn3 = document.getElementById("mostrar-3-btn");
var btn4 = document.getElementById("mostrar-4-btn");



var listado = document.getElementById("main-container");
var detalle = document.getElementById("detalle");
var portada_2 = document.getElementById("portada-btn");
var volver_listado = document.getElementById("listado-btn");


var dato_region = document.getElementById("region");
var dato_fEntrega = document.getElementById("fEntrega");
var dato_nombre = document.getElementById("nombre");
var dato_email = document.getElementById("email");
var dato_contacto = document.getElementById("contacto");
var dato_datos = document.getElementById("datos");
var dato_descripcion = document.getElementById("descripcion");

var seleccion = 0;

const image = (number) => {
    seleccion = number;
    let im_0 = document.getElementById("image0");
    let im_1 = document.getElementById("image1"); 
    let im_2 = document.getElementById("image2"); 
    let im_3 = document.getElementById("image3"); 
    let im_4 = document.getElementById("image4");
    let btn_0 = document.getElementById("btn-img-0")
    let btn_1 = document.getElementById("btn-img-1")
    let btn_2 = document.getElementById("btn-img-2")
    let btn_3 = document.getElementById("btn-img-3")
    let btn_4 = document.getElementById("btn-img-4")

    im_0.hidden = true;
    im_1.hidden = true;
    im_2.hidden = true;
    im_3.hidden = true;
    im_4.hidden = true;
    btn_0.hidden = true;
    btn_1.hidden = true;
    btn_2.hidden = true;
    btn_3.hidden = true;
    btn_4.hidden = true;

    let imagenes = adoptionData[number+5*pagina]["fotos"];

    if(imagenes.length>=1){
        im_0.src = imagenes[0];
        im_0.hidden = false;
        btn_0.hidden = false;
    }
    if(imagenes.length>=2){
        im_1.src = imagenes[1];
        im_1.hidden = false;
        btn_1.hidden = false;
    }
    if(imagenes.length>=3){
        im_2.src = imagenes[2];
        im_2.hidden = false;
        btn_2.hidden = false;
    }
    if(imagenes.length>=4){
        im_3.src = imagenes[3];
        im_3.hidden = false;
        btn_3.hidden = false;
    }
    if(imagenes.length>=5){
        im_4.src = imagenes[4];
        im_4.hidden = false;
        btn_4.hidden = false;
    }

}

const to_detalle = (number) => {
    listado.hidden = true;
    detalle.hidden = false;

    let pos = number+5*pagina;
    dato_region.textContent = "Dirección: "+adoptionData[pos]["region"]+","+adoptionData[pos]["comuna"],+","+adoptionData[pos]["sector"];
    dato_fEntrega.textContent = "Fecha de entrega: "+adoptionData[pos]["fechaEntrega"];

    dato_nombre.textContent = "Nombre: "+adoptionData[pos]["contacto"];
    dato_email.textContent = "Email: "+adoptionData[pos]["email"];
    dato_contacto.textContent = "Contacto: "+adoptionData[pos]["telefono"];

    dato_datos.textContent = "Datos de la mascota: "+adoptionData[pos]["cantidad"]+" "+adoptionData[pos]["tipo"]+","+adoptionData[pos]["edad"];
    dato_descripcion.textContent = "Descripción: "+adoptionData[pos]["descripcion"];
    image(number);
}
const to_listado = () => {
    listado.hidden = false;
    detalle.hidden = true;
}

const cerrar = () => {
    let solo_img = document.getElementById("solo-img");
    solo_img.hidden = true;
    let list = document.getElementById("detalle");
    list.hidden = false;
}

const solo_image = (number) => {
    let solo_img = document.getElementById("solo-img");
    solo_img.hidden = false;
    let list = document.getElementById("detalle");
    list.hidden = true;

    let sola = document.getElementById("solo");
    sola.src = adoptionData[seleccion+5*pagina]["fotos"][number];
}

let btn_portada = document.getElementById("volver-btn");
btn_portada.addEventListener("click",to_portada);

let btn_sgte = document.getElementById("sgte-btn");
btn_sgte.addEventListener("click",change_pagina);


btn0.addEventListener("click",() => {to_detalle(0)});
btn1.addEventListener("click",() => {to_detalle(1)});
btn2.addEventListener("click",() => {to_detalle(2)});
btn3.addEventListener("click",() => {to_detalle(3)});
btn4.addEventListener("click",() => {to_detalle(4)});

let btn_0 = document.getElementById("btn-img-0");
let btn_1 = document.getElementById("btn-img-1");
let btn_2 = document.getElementById("btn-img-2");
let btn_3 = document.getElementById("btn-img-3");
let btn_4 = document.getElementById("btn-img-4");
btn_0.addEventListener("click",() => {solo_image(0)});
btn_1.addEventListener("click",() => {solo_image(1)});
btn_2.addEventListener("click",() => {solo_image(2)});
btn_3.addEventListener("click",() => {solo_image(3)});
btn_4.addEventListener("click",() => {solo_image(4)});

let btn_portada_0 = document.getElementById("portada-btn");
btn_portada_0.addEventListener("click",to_portada);
let btn_listado = document.getElementById("listado-btn");
btn_listado.addEventListener("click",to_listado);

let cerrar_btn = document.getElementById("cerrar");
cerrar_btn.addEventListener("click",cerrar);

window.onload = () => {
    change_pagina();
};
