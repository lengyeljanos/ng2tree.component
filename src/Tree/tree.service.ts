import { Injectable } from "@angular/core";



@Injectable()
export class TreeService {

    public getTree(): any {
        return {
            id: 0,
            children: []
        };
    }

    public addNodeItem(parentNode: any, newNode: any): any {
        if (parentNode.children === undefined) {
            parentNode.children = [];
        }
        parentNode.children.push(newNode);
    }

    public removeNodeItem(currentNode: any): any {
        let parentNode =  currentNode.parent;
        console.log(parentNode);
        let id = currentNode.id;
        for (let i = 0; i < parentNode.children.length; i++) {
            if (parentNode.children[i].id === id) {
                parentNode.children.splice(i, 1);
            }
            }
    }

}