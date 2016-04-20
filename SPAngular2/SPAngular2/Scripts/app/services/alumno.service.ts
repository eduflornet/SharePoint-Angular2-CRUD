import {Alumno}                     from '../models/alumno'
import {Http, Headers, Response}    from 'angular2/http'
import {Injectable}                 from 'angular2/core'
import 'rxjs/add/operator/map';

@Injectable()
export class AlumnoService {
    private spApiUrl: string;
    private spListName: string;

    constructor(private http: Http) {
        this.spListName = "Alumno";
        // aqui guardamos la url de la aplicación, es decir la dirección de sharepoint online en donde se ha desplegado
        // ademas accedemos a la REST API de SharePoint mediante /_api/web/lists/getByTitle, indicando el nombre de la lista
        this.spApiUrl = _spPageContextInfo.webServerRelativeUrl + "/_api/web/lists/getByTitle('" + this.spListName + "')";
    }

        
        // GET HEADERS, esta función resuelve las cabeceras segun el verbo que estemos utilizando
        private getHeaders(verb?:string)
        {
            var headers = new Headers();
            var digest = document.getElementById('__REQUESTDIGEST').value;
            headers.set('X-RequestDigest', digest);
            headers.set('Accept', 'application/json;odata=verbose');

            switch (verb) {
                case "POST":
                    headers.set('Content-type', 'application/json;odata=verbose');
                    break;
                case "PUT":
                    headers.set('Content-type', 'application/json;odata=verbose');
                    headers.set("IF-MATCH", "*");
                    headers.set("X-HTTP-Method", "MERGE");
                    break;
                case "DELETE":
                    headers.set("IF-MATCH", "*");
                    headers.set("X-HTTP-Method", "DELETE");
                    break;
            }
            return headers;
        }
        // GET, 
        public getData()
        {
            // va a devolver un objeto de tipo observable
            return this.http.get(this.spApiUrl + "/items", { headers: this.getHeaders() }).map((res: Response) => res.json());
        }

        // POST
        public addData(model: Alumno) {

            var obj = {
                '__metadata': { 'type': "SP.Data." + this.spListName + "ListItem" },
                'Nombre': model.nombre,
                'Apellidos': model.apellidos,
                'Nota': model.nota
            };
            // transformamos el objeto en string
            var data = JSON.stringify(obj);

            // hacemos la petición POST para  agregar el registro a la lista de SharePoint
            return this.http.post(this.spApiUrl + "/items", data, { headers: this.getHeaders("POST") }).map((res: Response) => res.json());
            
        }

        // PUT
        public putData(model: Alumno) {

            var obj = {
                '__metadata': { 'type': "SP.Data." + this.spListName + "ListItem" },
                'Nombre': model.nombre,
                'Apellidos': model.apellidos,
                'Nota': model.nota
            };

            var data = JSON.stringify(obj);
            // en la petición agregamos el model.ID y no es necesario utilizar el map
            return this.http.post(this.spApiUrl + "/items(" + model.id + ")", data, { headers: this.getHeaders("PUT") });
        }

        // DELETE
        public deleteData(model: Alumno) {
            return this.http.post(this.spApiUrl + "/items(" + model.id + ")", null, { headers: this.getHeaders("DELETE") });
        }
}