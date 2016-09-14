import {Component, Inject, OnInit} from "@angular/core";

// Nested components
import {CampaignTree} from "../../Tree/tree.component";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    directives: [CampaignTree]
})
export class AppComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}