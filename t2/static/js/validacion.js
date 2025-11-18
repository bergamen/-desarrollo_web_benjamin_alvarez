const validateSelect = (select) => {
  if(!select) return false;
  return true
}

const validateText = (nombre,min=3,max=200) => {
    if(!nombre) return false;
    else{
        let lengthValid = nombre.trim().length >= min && nombre.trim().length <= max;
        return lengthValid
    }
}


const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length > 15;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

const validateNumber = (number,min = 1) => {
    
    if(!number) return false;
    if(number<min){return false;}
    else return true;
}

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber);
  // validación de longitud
  let lengthValid = phoneNumber.length == 13;

  // validación de formato
  //let re = /[0-9]{3}+?\.^[0-9]$/;
  let re = /^[\\+][0-9]{3}[\.][0-9]{8}$/;
  let formatValid = re.test(phoneNumber);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

const validateDate = (date) => {
  //de la misma forma en que se autorellena la fecha, se verifica el momento actual
  //y se formatea de la misma manera, y se compara si es mayor

  fecha.setHours(fecha.getHours() + 3);
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  
  const fechaActual = `${anio}-${mes}-${dia}T${horas}:${minutos}`;


  if (fechaActual>date){
    return false
  }
  return true

}


const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 3;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateForm_1 = () => {
    let myForm = document.forms["myForm"];
    let region = myForm["select-region"].value;
    let comuna = myForm["select-comuna"].value;
    let isValid = true;
 
    let regionSelect = document.getElementById("select-region");
    if (!validateSelect(region)) {
        regionSelect.style.borderColor = "red";
        isValid &&= false;
    }
    else regionSelect.style.borderColor = "";

    let comunaSelect = document.getElementById("select-comuna");
    if (!validateSelect(comuna)) {
        comunaSelect.style.borderColor = "red";
        isValid &&=false;
    } else comunaSelect.style.borderColor = "";

    let caja = document.getElementById("val-box");

    if(!isValid){
        caja.hidden = false;
    }
    else caja.hidden = true;

    return isValid;
}

const validateForm_2 = () => {
    let myForm = document.forms["myForm"];
    let nombre = myForm["nombre"].value;
    let email = myForm["email"].value;
    let phone = myForm["phone"].value;

    let select0 = myForm["select-contacto-0"].value;
    let identidicador0 = myForm["identidicador-0"].value;

    let select1 = myForm["select-contacto-1"].value;
    let identidicador1 = myForm["identidicador-1"].value;

    let select2 = myForm["select-contacto-2"].value;
    let identidicador2 = myForm["identidicador-2"].value;

    let select3 = myForm["select-contacto-3"].value;
    let identidicador3 = myForm["identidicador-3"].value;

    let select4 = myForm["select-contacto-4"].value;
    let identidicador4 = myForm["identidicador-4"].value;

    let isValid = true;

    let nombreValidate = document.getElementById("nombre");
    if(!validateText(nombre)){
        nombreValidate.style.borderColor = "red";
        isValid &&=false;
    } else nombreValidate.style.borderColor = "";

    let emailValidate = document.getElementById("email");
    if(!validateEmail(email)){
        emailValidate.style.borderColor = "red";
        isValid &&=false;
    } else emailValidate.style.borderColor = "";

    let phoneValidate = document.getElementById("phone");
    if(!validatePhoneNumber(phone)){
        phoneValidate.style.borderColor = "red";
        isValid &&=false;
    } else phoneValidate.style.borderColor = "";
    ///////////////////////////////////////////////////////////////////
    let selectValidate0 = document.getElementById("select-contacto-0");
    if(!validateSelect(select0)){
        selectValidate0.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate0.style.borderColor = "";

    let contacto0 = document.getElementById("identidicador-0");
    
    if(!validateText(identidicador0,4,50)){
        contacto0.style.borderColor = "red";
        isValid &&=false;
    }else contacto0.style.borderColor = "";
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    if(contactos_agregados>=2){
    let selectValidate1 = document.getElementById("select-contacto-1");
    if(!validateSelect(select1)){
        selectValidate1.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate1.style.borderColor = "";

    let contacto1 = document.getElementById("identidicador-1");
    
    if(!validateText(identidicador1,4,50)){
        contacto1.style.borderColor = "red";
        isValid &&=false;
    }else contacto1.style.borderColor = "";}
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    if(contactos_agregados>=3){
    let selectValidate2 = document.getElementById("select-contacto-2");
    if(!validateSelect(select2)){
        selectValidate2.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate2.style.borderColor = "";

    let contacto2 = document.getElementById("identidicador-2");
    
    if(!validateText(identidicador2,4,50)){
        contacto2.style.borderColor = "red";
        isValid &&=false;
    }else contacto2.style.borderColor = "";}
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    if(contactos_agregados>=4){
    let selectValidate3 = document.getElementById("select-contacto-3");
    if(!validateSelect(select3)){
        selectValidate3.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate3.style.borderColor = "";

    let contacto3 = document.getElementById("identidicador-3");
    
    if(!validateText(identidicador3,4,50)){
        contacto3.style.borderColor = "red";
        isValid &&=false;
    }else contacto3.style.borderColor = "";}
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    if(contactos_agregados>=5){
    let selectValidate4 = document.getElementById("select-contacto-4");
    if(!validateSelect(select4)){
        selectValidate4.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate4.style.borderColor = "";

    let contacto4 = document.getElementById("identidicador-4");
    
    if(!validateText(identidicador4,4,50)){
        contacto4.style.borderColor = "red";
        isValid &&=false;
    }else contacto4.style.borderColor = "";}
    ///////////////////////////////////////////////////////////////////
    let caja = document.getElementById("val-box");


    if(!isValid){
        caja.hidden = false;
    }
    else caja.hidden = true;

    return isValid;
}

const validateForm_3 = () => {
    let myForm = document.forms["myForm"];
    let tipo = myForm["select-tipo"].value;
    let cantidad = myForm["cantidad"].value;
    let edad = myForm["edad"].value;
    let medida = myForm["select-medida"].value;
    let fecha = myForm["fecha"].value;
    let imagenes0 = myForm["files0"].files;
    let imagenes1 = myForm["files1"].files;
    let imagenes2 = myForm["files2"].files;
    let imagenes3 = myForm["files3"].files;
    let imagenes4 = myForm["files4"].files;

    let isValid = true;

    let tipo_1 = document.getElementById("select-tipo");
    if(!validateSelect(tipo)){
        tipo_1.style.borderColor = "red";
        isValid &&=false;
    } else tipo_1.style.borderColor = "";

    let valCantidad = document.getElementById("cantidad");
    if(!validateNumber(cantidad)){
        valCantidad.style.borderColor = "red";
        isValid &&= false;
    } else valCantidad.style.borderColor = "";

    let valEdad = document.getElementById("edad");
    if(!validateNumber(edad)){
        valEdad.style.borderColor = "red";
        isValid &&= false;
    } else valEdad.style.borderColor = "";

    let valFecha = document.getElementById("fecha");
    if(!validateDate(fecha)){
        valFecha.style.borderColor = "red";
        isValid &&=false;
    } else valFecha.style.borderColor = ";"

    let valMedida = document.getElementById("select-medida");
    if(!validateSelect(medida)){
        valMedida.style.borderColor = "red";
        isValid &&=false;
    } else valMedida.style.borderColor = "";
    ////////////////////////////////////////////////
    let valIman = document.getElementById("files0");
    if(!validateFiles(imagenes0)){
        valIman.style.borderColor = "red";
        isValid &&= false;
    } else valIman.style.borderColor = "";
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    if (fotos_agregadas>=2){
    let valIman1 = document.getElementById("files1");
    if(!validateFiles(imagenes1)){
        valIman1.style.borderColor = "red";
        isValid &&= false;
    } else valIman1.style.borderColor = "";}
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    if (fotos_agregadas>=3){
    let valIman2 = document.getElementById("files2");
    if(!validateFiles(imagenes2)){
        valIman2.style.borderColor = "red";
        isValid &&= false;
    } else valIman2.style.borderColor = "";}
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    if (fotos_agregadas>=4){
    let valIman3 = document.getElementById("files3");
    if(!validateFiles(imagenes3)){
        valIman3.style.borderColor = "red";
        isValid &&= false;
    } else valIman3.style.borderColor = "";}
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    if (fotos_agregadas>=5){
    let valIman4 = document.getElementById("files4");
    if(!validateFiles(imagenes4)){
        valIman4.style.borderColor = "red";
        isValid &&= false;
    } else valIman4.style.borderColor = "";}
    ////////////////////////////////////////////////
    let caja = document.getElementById("val-box");


    if(!isValid){
        caja.hidden = false;
    }
    else caja.hidden = true;

    return isValid;

}

// contactos

var contactos_agregados = 1;
var fotos_agregadas = 1;

const change_contacto = () => {
    let cont1 = document.getElementById("contacto-1");
    let cont2 = document.getElementById("contacto-2");
    let cont3 = document.getElementById("contacto-3");
    let cont4 = document.getElementById("contacto-4");
    if(contactos_agregados==2){
        cont1.hidden = false;
    }
    if(contactos_agregados==3){
        cont2.hidden = false;
    }
    if(contactos_agregados==4){
        cont3.hidden = false;
    }
    if(contactos_agregados==5){
        cont4.hidden = false;
    }
}

const change_foto = () => {
    let cont1 = document.getElementById("files1");
    let cont2 = document.getElementById("files2");
    let cont3 = document.getElementById("files3");
    let cont4 = document.getElementById("files4");
    if(fotos_agregadas==2){
        cont1.hidden = false;
    }
    if(fotos_agregadas==3){
        cont2.hidden = false;
    }
    if(fotos_agregadas==4){
        cont3.hidden = false;
    }
    if(fotos_agregadas==5){
        cont4.hidden = false;
    }
}

const sumar_contacto = () => {
    contactos_agregados = contactos_agregados+1;
    if (contactos_agregados == 5){
        let boton = document.getElementById("btn-conc-0");
        boton.hidden = true;
    }
    change_contacto();
}

const sumar_foto = () => {
    fotos_agregadas = fotos_agregadas+1;
    if (fotos_agregadas == 5){
        let boton = document.getElementById("btn-conc-1");
        boton.hidden = true;
    }
    change_foto();
}

var agregar = document.getElementById("btn-conc-0");
agregar.addEventListener("click",sumar_contacto);

var agregar1 = document.getElementById("btn-conc-1");
agregar1.addEventListener("click",sumar_foto);

// Cambio de estados
var estado = 0;

var sgte_btn = document.getElementById("sgte-btn");
var submit_btn = document.getElementById("submit-btn");
var back_btn = document.getElementById("back-btn");

var seguro = document.getElementById("seguro-btn");
var noseguro = document.getElementById("noseguro-btn");

var portada = document.getElementById("portada-btn")

var lugar = document.getElementById("lugar");
var contacto = document.getElementById("contacto");
var info = document.getElementById("info");
var enviar1 = document.getElementById("validar");
var titulo_1 = document.getElementById("titulo-1");
var titulo_2 = document.getElementById("titulo-2");

const form_state = () =>{

    back_btn.hidden=true;
    sgte_btn.hidden=true;
    submit_btn.hidden=true;

    seguro.hidden = true;
    noseguro.hidden = true;

    portada.hidden = true;

    lugar.hidden = true;
    contacto.hidden = true;
    info.hidden = true
    enviar1.hidden = true;
    titulo_1.hidden = true;
    titulo_2.hidden = true;

    if(estado==0){
        titulo_1.hidden = false;
        sgte_btn.hidden = false;
        lugar.hidden = false;
    }
    else if(estado==1){
        titulo_1.hidden = false;
        back_btn.hidden = false;
        sgte_btn.hidden = false;
        contacto.hidden = false;
    }
    else if(estado==2){
        titulo_1.hidden = false;
        back_btn.hidden = false;
        submit_btn.hidden = false;
        info.hidden = false;
    }
    else if(estado==3){
        titulo_1.hidden = false;
        seguro.hidden = false;
        noseguro.hidden = false;
        enviar1.hidden = false;

        const fecha_ac = new Date();
        fecha_ac.setMinutes(fecha_ac.getMinutes() - fecha_ac.getTimezoneOffset());

        fecha_actual = document.getElementById("fecha-actual");

        fecha_actual.value= fecha_ac.toISOString().slice(0,16);

        let env = document.getElementById("myForm");
        env.submit();
    }
    else if(estado==4){
        titulo_2.hidden = false;
        portada.hidden = false;
    }
}

const sgte_state = () =>{
    let aceptado = true;

    if(estado==0){
        aceptado &&= validateForm_1();
    }
    else if(estado==1){
        aceptado &&= validateForm_2();
    }
    else aceptado=false;

    let validationBox = document.getElementById("val-box");
    if (aceptado){
        estado = estado + 1;
        form_state();
        validationBox.hidden = true;
    }
}
const back_state = () =>{
    let validationBox = document.getElementById("val-box");
    estado = estado -1;
    form_state();
    validationBox.hidden = true;
}

const enviar = () => {
    let validationBox = document.getElementById("val-box");
    let validate = validateForm_3();
    if(validate){
        estado  = estado+1;
        form_state();
        validationBox.hidden = true;
    }
}

const sumar_1 = () => {
    estado = estado+1;
    form_state();
}


noseguro.addEventListener("click",back_state);
seguro.addEventListener("click",sumar_1);
sgte_btn.addEventListener("click",sgte_state);
back_btn.addEventListener("click",back_state);
submit_btn.addEventListener("click",enviar);

