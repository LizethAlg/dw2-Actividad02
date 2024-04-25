
//define una funcion constructora Estudiante, con seis parametros 
function Estudiante(codigo, nombre, nota, curso, grado, genero) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.nota = nota;
    this.curso = curso;//
    this.grado = grado;
    this.genero = genero;
}


var GestorEstudiantes = {
    // Array para almacenar los estudiantes
    estudiantes: [],
    // Variable para controlar el modo de edición
    modoEdicion: false,
     // Método de inicialización
    init: function () {
// Asociar eventos a los botones de la interfaz
        $('#registroEstudiante').on('click', this.registrarEstudiante); 
//es una función de jQuery que selecciona el elemento del DOM que tiene el ID "registroEstudiante".
//asigna un controlador de eventos, Cuando se hace clic en ese elemento, se llama a la función registrarEstudiante
        $('#calculoPromedio').on('click', this.calcularNotaPromedio);
        $('#calculoNotaMayor').on('click', this.calcularNotaMayor);
        $('#calculoNotaMenor').on('click', this.calcularNotaMenor);
        $('#calculoGeneros').on('click', this.calcularGeneros); // Agregado evento para el botón de calcular géneros
// Cargar estudiantes almacenados en el almacenamiento local
        this.cargarEstudiantes();
    },
    // Método para registrar un nuevo estudiante
    registrarEstudiante: function () {
        // Obtener los valores de los campos del formulario
        var codigo = $('#codigo');
        //declara una nueva variable... busca un elemento en el DOM 
        var nombre = $('#nombre');
        var nota = $('#nota');
        var curso = $('#curso');
        var grado = $('#grado');
        var genero = $('#genero');
//validaciones 
        if (!GestorEstudiantes.modoEdicion) {
      //se realizan varias validaciones,que todos los datos ingresados sean válidos
            if (codigo.val() && nombre.val() && nota.val() && curso.val() && grado.val() && genero.val()) {     
                if (parseInt(codigo.val()) > 0) {  //Se verifica que el código sea un número positivo            
                    if (parseFloat(nota.val()) >= 0 && parseFloat(nota.val()) <= 100.0) {//Se verifica que la nota esté dentro del rango correcto                  
                        if (!GestorEstudiantes.estudianteExiste(codigo.val())) {
 //se crea un nuevo objeto Estudiante con los datos ingresados,se almacena en (localStorage). 
 //se crea una nueva fila de tabla,) con datos del estudiante y se agregan botones de "Editar" y "Eliminar".                         
                            var nuevoEstudiante = new Estudiante(parseInt(codigo.val()), nombre.val(), parseFloat(nota.val()), parseInt(curso.val()), grado.val(), genero.val());
                            localStorage.setItem(codigo.val(), JSON.stringify(nuevoEstudiante));

                            var notasTBody = $('#notas');

                            var nuevoTr = $('<tr>');

                            var idTd = $('<td>');
                            idTd.text(nuevoEstudiante.codigo);
                            nuevoTr.append(idTd);

                            var nombreTd = $('<td>');
                            nombreTd.text(nuevoEstudiante.nombre);
                            nuevoTr.append(nombreTd);

                            var notaTd = $('<td>');
                            notaTd.text(nuevoEstudiante.nota);
                            nuevoTr.append(notaTd);

                            var cursoTd = $('<td>');
                            cursoTd.text(nuevoEstudiante.curso);
                            nuevoTr.append(cursoTd);

                            var gradoTd = $('<td>');
                            gradoTd.text(nuevoEstudiante.grado);
                            nuevoTr.append(gradoTd);

                            var generoTd = $('<td>');
                            generoTd.text(nuevoEstudiante.genero);
                            nuevoTr.append(generoTd);
                            var tdBtnEditar = $('<td>');
                            var btnEditar = $('<button>');
                            btnEditar.text('Editar');
                            btnEditar.click({codigo: nuevoEstudiante.codigo}, GestorEstudiantes.editarEstudiante);
                            tdBtnEditar.append(btnEditar);
                            nuevoTr.append(tdBtnEditar);

                            var tdBtnEliminar = $('<td>');
                            var btnEliminar = $('<button>');
                            btnEliminar.text('Eliminar');
                            btnEliminar.click({codigo: nuevoEstudiante.codigo}, GestorEstudiantes.eliminarEstudiante);
                            tdBtnEliminar.append(btnEliminar);
                            nuevoTr.append(tdBtnEliminar);

                            notasTBody.append(nuevoTr);
                        } else {
                            alert('Un estudiante con el código ' + String(codigo.val()) + ' ya existe.'); //estudiante
                        }
                    } else {
                        alert('La nota debe estar entre 0.0 y 100.0');
                    }
                } else {
                    alert('El código debe ser positivo');
                }
            } else {
                alert('Todos los campos son obligatorios');
            }
        } else {
    //Si el gestor de estudiantes está en modo de edición true
            GestorEstudiantes.modoEdicion = false; // se cambia a F
            $('#codigo').attr('disabled', false);//Se habilita el campo de código
                   //Se crea un nuevo objeto Estudiante
            var estudianteModificado = new Estudiante(parseInt(codigo.val()), nombre.val(), parseFloat(nota.val()), parseInt(curso.val()), grado.val(), genero.val());
            localStorage.setItem(codigo.val(), JSON.stringify(estudianteModificado));// se actualiza en el almacenamiento local.
            GestorEstudiantes.cargarEstudiantes();//Se llama a la función cargarEstudiantes, del objeto GestorEstudiantes.
        }

        GestorEstudiantes.limpiarCampos();
    },
    cargarEstudiantes: function () {
        var notasTBody = $('#notas');
        notasTBody.empty();

        for (var i = 0; i < localStorage.length; ++i) {
            var estudiante = JSON.parse(localStorage.getItem(localStorage.key(i)));

            var nuevoTr = $('<tr>');

            var idTd = $('<td>');
            idTd.text(estudiante.codigo);
            nuevoTr.append(idTd);

            var nombreTd = $('<td>');
            nombreTd.text(estudiante.nombre);
            nuevoTr.append(nombreTd);

            var notaTd = $('<td>');
            notaTd.text(estudiante.nota);
            nuevoTr.append(notaTd);

            var cursoTd = $('<td>');
            cursoTd.text(estudiante.curso);
            nuevoTr.append(cursoTd);

            var gradoTd = $('<td>');
            gradoTd.text(estudiante.grado);
            nuevoTr.append(gradoTd);

            var generoTd = $('<td>');
            generoTd.text(estudiante.genero);
            nuevoTr.append(generoTd);

            var tdBtnEditar = $('<td>');
            var btnEditar = $('<button>');
            btnEditar.text('Editar');
            btnEditar.click({codigo: estudiante.codigo}, GestorEstudiantes.editarEstudiante);
            tdBtnEditar.append(btnEditar);
            nuevoTr.append(tdBtnEditar);

            var tdBtnEliminar = $('<td>');
            var btnEliminar = $('<button>');
            btnEliminar.text('Eliminar');
            btnEliminar.click({codigo: estudiante.codigo}, GestorEstudiantes.eliminarEstudiante);
            tdBtnEliminar.append(btnEliminar);
            nuevoTr.append(tdBtnEliminar);

            notasTBody.append(nuevoTr);
        }
    },
    calcularNotaPromedio: function () {
        var sumaNotas = 0.0;

        for (var i = 0; i < localStorage.length; ++i) {
            var estudiante = JSON.parse(localStorage.getItem(localStorage.key(i)));

            sumaNotas += estudiante.nota;
        }

        alert("La nota promedio es: " + (sumaNotas / localStorage.length).toFixed(2));
    },
    calcularNotaMayor: function () {
        var indiceNotaMayor = 0;
        var notaMayor = JSON.parse(localStorage.getItem(localStorage.key(0))).nota;

        for (var i = 1; i < localStorage.length; ++i) {
            if (JSON.parse(localStorage.getItem(localStorage.key(i))).nota > notaMayor) {
                notaMayor = JSON.parse(localStorage.getItem(localStorage.key(i))).nota;
                indiceNotaMayor = i;
            }
        }

        alert("El estudiante " + JSON.parse(localStorage.getItem(localStorage.key(indiceNotaMayor))).nombre + " tiene la nota mayor: " + notaMayor);
    },
    calcularNotaMenor: function () {
        var indiceNotaMenor = 0;
        var notaMenor = JSON.parse(localStorage.getItem(localStorage.key(0))).nota;

        for (var i = 1; i < localStorage.length; ++i) {
            if (JSON.parse(localStorage.getItem(localStorage.key(i))).nota < notaMenor) {
                notaMenor = JSON.parse(localStorage.getItem(localStorage.key(i))).nota;
                indiceNotaMenor = i;
            }
        }

        alert("El estudiante " + JSON.parse(localStorage.getItem(localStorage.key(indiceNotaMenor))).nombre + " tiene la nota menor: " + notaMenor);
    },
    calcularGeneros: function () {
        var generos = {
            Femenino: 0,
            Masculino: 0
        };

        for (var i = 0; i < localStorage.length; ++i) {
            var estudiante = JSON.parse(localStorage.getItem(localStorage.key(i)));
            generos[estudiante.genero]++;
        }

        alert("Cantidad de estudiantes por género:\nFemenino: " + generos.Femenino + "\nMasculino: " + generos.Masculino);
    },
    estudianteExiste: function (codigo) {
        for (var i = 0; i < localStorage.length; ++i) {
            if (codigo === localStorage.key(i)) {
                return true;
            }
        }

        return false;
    },
    eliminarEstudiante: function (evt) {
        if (confirm("¿Está seguro que quiere eliminar este registro de estudiante?")) {
            localStorage.removeItem(evt.data.codigo);
            GestorEstudiantes.cargarEstudiantes();
        }
    },
    editarEstudiante: function (evt) {
        GestorEstudiantes.modoEdicion = true;
        $('#codigo').attr('disabled', true);

        $('#codigo').val(evt.data.codigo);

        var estudiante = JSON.parse(localStorage.getItem(evt.data.codigo));

        $('#nombre').val(estudiante.nombre);
        $('#nota').val(estudiante.nota);
        $('#curso').val(estudiante.curso);
        $('#grado').val(estudiante.grado);
        $('#genero').val(estudiante.genero);
    },
    limpiarCampos: function () {
        $('#codigo').val('');
        $('#nombre').val('');
        $('#nota').val('');
        $('#curso').val('');
        $('#grado').val('');
        $('#genero').val('');
    }
};

GestorEstudiantes.init();

//Esta línea importa el archivo CSS de Bootstrap,
  //  lo que proporciona estilos predefinidos para los elementos del HTML.
   // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    //      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    //Iconos de Glyphicons de Bootstrap:
      //Se utilizan iconos de Glyphicons de Bootstrap en los botones. Por ejemplo:
//<span class="glyphicon glyphicon-filter"></span>