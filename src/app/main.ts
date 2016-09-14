import  "reflect-metadata";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { HTTP_PROVIDERS } from "@angular/http";
import { AppComponent } from "./component/app.component";

bootstrap(AppComponent, [
    HTTP_PROVIDERS
]);