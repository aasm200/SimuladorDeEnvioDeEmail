//variables 

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



eventListener();
function eventListener() {
  //cuando app arranca
  document.addEventListener('DOMContentLoaded', btnDisabled);
  //campos del formulario
  email.addEventListener('blur',validarFormulario);
  asunto.addEventListener('blur',validarFormulario);
  mensaje.addEventListener('blur',validarFormulario);

  //resetear formulario
  btnReset.addEventListener('click',resetForm);

  //enviar mail
  formulario.addEventListener ('submit',enviarEmail);
}


//funciones 

function btnDisabled() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed','opacity-50');  
}

function resetForm(e) {
  if(e){
    e.preventDefault();
  }
  formulario.reset();
  btnDisabled();
  borrarErrores ()

  if(email.classList.contains('border-red-500') || email.classList.contains('border-green-500')) {
   
    if (email.classList.contains('border-red-500') ){
        email.classList.remove('border-red-500');
    } else {
      email.classList.remove('border-green-500');
    }
  }
  if(asunto.classList.contains('border-red-500') || asunto.classList.contains('border-green-500')) {
   
    if (asunto.classList.contains('border-red-500') ){
        asunto.classList.remove('border-red-500');
    } else {
      asunto.classList.remove('border-green-500');
    }
  }
  if(mensaje.classList.contains('border-red-500') || mensaje.classList.contains('border-green-500')) {
   
    if (mensaje.classList.contains('border-red-500') ){
        mensaje.classList.remove('border-red-500');
    } else {
      mensaje.classList.remove('border-green-500');
    }
  }

  
}

function validarFormulario(e) {

  if(e.target.value.length > 0 && e.target.value.trim() !== "" )  {
    //elimina errores

    borrarErrores ();

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  } else {

    btnDisabled();

    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
      
      mostrarError('Todo Los Campos Son Obligatorios');
    }
    
  if(e.target.type === 'email') {
    
      if( er.test(e.target.value)){


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
      } else {

      btnDisabled();

      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');

      mostrarError('Email no Valido');
    }
  }

  if(er.test(email.value) && asunto.value.trim() !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false; 
    btnEnviar.classList.remove('cursor-not-allowed','opacity-50');  
  } 

}

function mostrarError(mensaje) {
  const error = document.createElement('p');
  error.textContent = mensaje;
  error.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

  const errores = document.querySelectorAll('.error');

  if(errores.length === 0) {

    formulario.appendChild(error);
  }

}

function enviarEmail(e) {
  e.preventDefault();

  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';
  
  setTimeout(() => {
    spinner.style.display = 'none';
    
    const parrafo = document.createElement('p');
    parrafo.textContent = 'Mensaje enviado Correctamente';
    parrafo.classList.add('border','border-green-500','background-green-100','text-green-500','p-3','mt-5', 'mb-5','text-center');
    formulario.insertBefore(parrafo,spinner);


    setTimeout(() => {
      parrafo.remove();
      resetForm();  
    }, 3000);
    
  }, 3000);

}
function borrarErrores () {
  const eliminaErrores = document.querySelector('p.error');
 
  if(eliminaErrores !== null){

    eliminaErrores.remove();
  }
}