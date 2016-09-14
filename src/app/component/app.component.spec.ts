import {it, beforeEachProviders} from "@angular/core/testing";
import {AppComponent} from "./app.component";

// Load the implementations that should be tested


describe("AppComponent", () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [AppComponent]);

    it("App component is loaded", () => {
        expect(AppComponent).toBeDefined();
    });

});