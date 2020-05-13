//Obtener las teclas
function caracter(e){
    let key= e.keyCode || e.which;
    return key;
}

//Validar que solo se ingresen letras en javascript
function soloLetras(e){
    tecla =  String.fromCharCode(caracter(e)).toLowerCase();
    letras="áéíóúabcdefghijklmnñopqrstuvwxyz",
    especiales= [8, 37, 39, 46];

    let tecla_especial= false;
    for(var i in especiales){
        if(caracter(e) == especiales[i]){
            tecla_especial= true;
            break;
        }
    }
    if(!tecla_especial && letras.indexOf(tecla)==-1){
        return false;
    }
}

//Validar que solo se ingresen números en javascript
function soloNumeros(e){
    if(caracter(e)<48 || caracter(e) >57 ){
        return false;
    }
}

//CrearElementos que identifiquen errores
function crearElemento(){
    let mensaje= document.createElement("p");
        let texto= document.createTextNode(" * Debe ingresar este campo");
        mensaje.appendChild(texto);

        mensaje.className="error";
    return mensaje;
}

//Validar existencia de de etiquetqa p.
function etiquetaP(elemento, valor){
    if(document.getElementById(elemento).nextSibling.innerHTML == " * Debe ingresar este campo" && valor ==1){
        document.getElementById(elemento).nextSibling.innerHTML="";
        console.log("entrer");
        return true;
    }

    if(document.getElementById(elemento).nextSibling.innerHTML == " * Debe ingresar este campo" && valor ==0){
        return true;
    }

    return false;
}
(function(){
    window.onload= function(){
        let contador=0;
        let flag=false;

        let form= this.document.getElementsByTagName("form")[0];
        let formas= document.getElementById("nombre");
        let fecha= document.getElementById("fecha");
        let hora= document.getElementById("hora");
        
        let momentoContacto;
        let fechaActual= new this.Date();
        //Selecciones
        let seleccion= document.getElementsByTagName("select")[0];
        //Radio
        let radio= document.getElementsByClassName("forma-contacto")[0];
        
        //Agregar elementos del DOM a un arreglo
        let elementos= [];
        let horario_label= document.getElementsByTagName("fieldset")[2].getElementsByTagName("label");
        let horario_input= document.getElementsByTagName("fieldset")[2].getElementsByTagName("input");

        for(var i=2; i<horario_label.length; i++){
            elementos.push(horario_label[i]);
            elementos.push(horario_input[i]);
        }

        for(var i in elementos){
            elementos[i].style.display="none";
        }
        
        //Cuando se selecciona teléfono
        (document.getElementsByClassName("forma-contacto")[0].getElementsByTagName("input")[0]).addEventListener("click", function(){
            for(var i in elementos){
                elementos[i].style.display="block";
                 flag=true;
            }
        });
        (document.getElementsByClassName("forma-contacto")[0].getElementsByTagName("input")[1]).addEventListener("click", function(){
            for(var i in elementos){
                elementos[i].style.display="none";
                 flag=false;
            }
        });


        //Validar que los registros se hayan ingresado bien
        let enviar= document.getElementsByClassName("boton")[0];
        enviar.addEventListener("click", function(e){
            contador=0;
            if( seleccion.value == "0"){
                if(seleccion.nextSibling.innerHTML != " * Debe ingresar este campo"){
                    (seleccion.parentElement).insertBefore(crearElemento(), seleccion.nextSibling);
                }
                contador++;
            }
            else{
                if(seleccion.nextSibling.innerHTML != " * Debe ingresar este campo"){
                    seleccion.nextSibling.innerHTML="";
                }
            }
            //////////////////////////////////////////////////////////////////////////
            if(!document.querySelector('input[name="contacto"]:checked')) {
                if(radio.nextSibling.innerHTML != " * Debe ingresar este campo"){
                    (radio.parentElement).insertBefore(crearElemento(), radio.nextSibling);
                }
                contador++;
            }else{
                if(radio.nextSibling.innerHTML == " * Debe ingresar este campo"){
                    radio.nextSibling.innerHTML="";
                }
            }
            //////////////////////////////////////////////////////////////////////////
            if(document.getElementById("cantidad").value==""){
                if(!etiquetaP("cantidad", 0)){
                    ((document.getElementById("cantidad")).parentElement).insertBefore(crearElemento(), (document.getElementById("cantidad")).nextSibling);
                }
                contador++;
            }else{
                etiquetaP("cantidad", 1);
            }
            //////////////////////////////////////////////////////////////////////////
            if(fecha.value=="" && flag){
                if(!etiquetaP("fecha", 0)){
                    ((document.getElementById("fecha")).parentElement).insertBefore(crearElemento(), (document.getElementById("fecha")).nextSibling);
                }
                contador++;
            }else{
                etiquetaP("fecha", 1);
            }
            //////////////////////////////////////////////////////////////////////////
            if(document.getElementById("hora").value=="" && flag){
                if(!etiquetaP("hora", 0)){
                    ((document.getElementById("hora")).parentElement).insertBefore(crearElemento(), (document.getElementById("hora")).nextSibling);
                }
                contador++;
            }else{
                etiquetaP("hora", 1);
            }
            if(document.getElementById("hora").value!="" && fecha.value!="" && flag){
                //////////////////////////////////////////////////////////////////////////
                console.log(momentoContacto + " | " + fechaActual);
                momentoContacto= new Date( fecha.value+":"+ hora.value);
                if(momentoContacto < fechaActual){
                    alert("No escoja una fecha del pasado.");
                }
            }
            //////////////////////////////////////////////////////////////////////////
            if(contador!=0){
                e.preventDefault();
            }
        });
        
    }
})();