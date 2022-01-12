window.onload = function(){

   const formulario = document.querySelector('.cajaPrincipal');
   /* const nombreProducto = document.querySelector=('#name');
   */

//INICIO DE VALIDACIONES
    let form = document.querySelector('#formLabel');
    form.name.focus();

    form.addEventListener('submit', function (e){
        let errors =[];

        //SELECCIONAMOS LOS ELEMENTOS
    let nombre = document.querySelector('#name');
    let categoria = document.querySelector('#category');
    let precio = document.querySelector('#price');
    let descuento = document.querySelector('#discount');
    let capacidad = document.querySelector('.capacity');
    let descripcion = document.querySelector('#description');
    let imagenUno = document.querySelector('#file-1');

        //NOMBRE DEL PRODUCTO
        if (nombre.value == '') {
            errors.push('El nombre del producto no puede estar vacio');
            nombre.classList.add('is-invalid');
        }else{
            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            
        };

        //CATEGORIA DEL PRODUCTO
        if (categoria.value == '') {
            errors.push('La categoría del producto no puede estar vacia');
            categoria.classList.add('is-invalid');
        }else{
            categoria.classList.add('is-valid');
            categoria.classList.remove('is-invalid');
            
        };
        //PRECIO DEL PRODUCTO
        if (precio.value <= 0) {
            errors.push('El precio del producto no puede estar vacio');
            precio.classList.add('is-invalid');
        }else{
            precio.classList.add('is-valid');
            precio.classList.remove('is-invalid');
          
        };
        //DESCUENTO DEL PRODUCTO
        if (descuento.value == '') {
            errors.push('El descuento del producto no puede estar vacio');
            descuento.classList.add('is-invalid');
        }else{
            descuento.classList.add('is-valid');
            descuento.classList.remove('is-invalid');
         
        };
        //CAPACIDAD DEL PRODUCTO
        if (capacidad.value != true) {
            errors.push('La capacidad del producto no puede estar vacia');
            capacidad.classList.add('is-invalid');
        }else{
            capacidad.classList.add('is-valid');
            capacidad.classList.remove('is-invalid');
            // FALTA TERMINAR ESTA VALIDACION
        };
        //DESCRIPCION DEL PRODUCTO
        if (descripcion.value == '') {
            errors.push('La descripción del producto no puede estar vacia');
            descripcion.classList.add('is-invalid');
        }else{
            descripcion.classList.add('is-valid');
            descripcion.classList.remove('is-invalid');
            
        };
        //IMAGEN DEL PRODUCTO



if(errors.length > 0) {
e.preventDefault();
let ulErrors = document.querySelector('.errores');
ulErrors.classList.add('warning');
ulErrors.innerHTML = '';
    for(let i = 0; i < errors.length; i++){
        ulErrors.innerHTML += '<li>' + errors[i] + '</li>';
    }
}else{
        alert('Se agregó el producto correctamente')
        form.submit();
    }
});

}