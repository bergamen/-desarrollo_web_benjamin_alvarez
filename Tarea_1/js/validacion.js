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
    let contac = document.getElementById("select-contacto").value;
  if (!phoneNumber) return (true && !(contac=="whatsapp"));
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
  const ahora = new Date();
  ahora.setHours(ahora.getHours() + 3);
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  
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
    let select = myForm["select-contacto"].value;
    let otros = myForm["otro-contacto"].value;

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

    let selectValidate = document.getElementById("select-contacto");
    if(!validateSelect(select)){
        selectValidate.style.borderColor = "red";
        isValid &&=false;
    } else selectValidate.style.borderColor = "";

    let contacto = document.getElementById("otro-contacto");
    
    if(select != "whatsapp" || !select){
        if(!validateText(otros,4,50)){
            contacto.style.borderColor = "red";
            isValid &&=false;
        }else contacto.style.borderColor = "";
    }

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
    let imagenes = myForm["files"].files;

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

    let valIman = document.getElementById("files");
    if(!validateFiles(imagenes)){
        valIman.style.borderColor = "red";
        isValid &&= false;
    } else valIman.style.borderColor = "";

    let caja = document.getElementById("val-box");


    if(!isValid){
        caja.hidden = false;
    }
    else caja.hidden = true;

    return isValid;

}

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

const go_to_portada = () => {
    window.location.href = "../html/principal.html";
}

portada.addEventListener("click",go_to_portada);
noseguro.addEventListener("click",back_state);
seguro.addEventListener("click",sumar_1);
sgte_btn.addEventListener("click",sgte_state);
back_btn.addEventListener("click",back_state);
submit_btn.addEventListener("click",enviar);

