export class Alumno {
    public id: number;
    public nombre: string;
    public apellidos: string;
    public nota: number;

    constructor();
    constructor(nombre:string,apellidos:string, nota: number,id?: number) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nota = nota;

    }

    // recibe un objeto Json y devuleve una instancia de tipo Alumno
    public static fromJson(json: any) {
        return new Alumno(json.Nombre, json.Apellidos, json.Nota, json.ID);
    }
    // recibe un objeto Json y devuelve una lista de objetos tipo Alumno
    public static fromJsonList(json: any) {
        var list = [];
        for (var i = 0; i < json.length; i++) {
            list.push(Alumno.fromJson(json[i]));
        }
        return list;
    }
}