

var miJson = {
    nombre: 'diego',
    apellido: 'apugliese',
    edad: 25
}

var miArray = [
{
    nombre: 'diego',
    apellido: 'apugliese',
    edad: 25
},
{
    nombre: 'mario',
    apellido: 'rojas',
    edad: 19,
    mostrar:  () => {
        console.log(this.nombre)
    }
},

]

var elemento = miArray[1];

console.log(elemento.nombre);
elemento.mostrar();
