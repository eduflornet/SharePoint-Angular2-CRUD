// Aqui vamos indicar los componentes para el arranque de la aplicación
import {AppComponent }                      from './components/app.component'
import {bootstrap}                          from 'angular2/platform/browser'
import {HTTP_PROVIDERS}                     from 'angular2/http'

bootstrap(AppComponent, [HTTP_PROVIDERS]);