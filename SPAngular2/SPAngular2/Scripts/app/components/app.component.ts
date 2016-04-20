import {Alumno}                 from '../models/alumno'
import {AlumnoService}          from '../services/alumno.service'
import {Component, OnInit}      from 'angular2/core'

// Aqui se definene los metadatos del propio componente
@Component({
    selector: 'app',  // es la etiqueta Html que hace referencia a este componente
    templateUrl: BASE_URL + '/templates/app.template.html', // es la localización del renderizado Html
    providers: [AlumnoService] // hacemos referencia del servicio que vamos a inyectar
})

export class AppComponent {

    public alumno: Alumno;
    public listaAlumnos: Alumno[];
    public accionForm: string; // es la accion CRUD que le indicara al formulario entre agregar, borrar editar o actualizar

    // aqui inyectamos el servicio AlumnoService
    constructor(private _alumnoService: AlumnoService) {
        this.alumno = new Alumno();
        this.listaAlumnos = [];
        this.accionForm = "Nuevo"; // es la accion por defecto para agregar un nuevo registro a la lista.
    }

    // se ejecuta justo despues del constructor y todas las peticiones de consulta o carga de datos se realizan aqui
    public ngOnInit() {
        this.getAlumnos();
    }

    // Get alumnos
    public getAlumnos() {
    // aqui vamos a devolver un observable (callback) que tiene 3 argumentos (ok,error, default)
        this._alumnoService.getData().subscribe(
            data => {
                this.listaAlumnos = Alumno.fromJsonList(data.d.results); // se transforman los datos JSON a objetos tipo Alumno
            },
            err => { console.log("GET Alumnos Error: " + err._body); }
        );
    }

    // Guardar alumno
    public guardarAlumno() {

        if (this.accionForm == "Nuevo") {
            this._alumnoService.addData(this.alumno).subscribe(
                data => {
                    this.listaAlumnos.push(Alumno.fromJson(data.d));
                    this.alumno = new Alumno();
                },
                err => { console.log("POST Alumnos Error: " + err._body); }
            );
        }
        else if (this.accionForm == "Editar") {
            this._alumnoService.putData(this.alumno).subscribe(
                data => {
                    this.accionForm = "Nuevo";
                    this.alumno = new Alumno();
                },
                err => { console.log("PUT Alumnos Error: " + err._body); }
            );
        }

    }

    // Editar alumno
    public editarAlumno(alumno: Alumno) {
        this.alumno = alumno;
        this.accionForm = "Editar";
    }

    // Borrar alumno
    public borrarAlumno(alumno: Alumno) {
        if (this.accionForm == "Editar" && this.alumno.id == alumno.id) {
            this.alumno = new Alumno();
            this.accionForm = "Nuevo";
        }
        // aqui nos evitamos llamar a getAlumnos 
        // por lo tanto borramos el registro de la lista
        this._alumnoService.deleteData(alumno).subscribe(
            data => {
                var i = this.listaAlumnos.map(function (e) { return e.id; }).indexOf(alumno.id);
                this.listaAlumnos.splice(i, 1);
            },
            err => { console.log("DELETE Alumnos Error: " + err._body); }
        );
    }
}