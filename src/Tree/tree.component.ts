import {Component, OnInit, ElementRef, ViewEncapsulation} from "@angular/core";

import * as d3 from "d3";

import {TreeService} from "./tree.service";
import {TreeNodeService} from "../TreeNodeService/tree-node.service";



@Component({
    moduleId: module.id,
    selector: "tree",
    styleUrls: ["tree.component.css"],
    templateUrl: "tree.component.html",
    encapsulation: ViewEncapsulation.None, /// for proper css include
    providers: [TreeService, TreeNodeService]
})
export class CampaignTree implements OnInit {

    elementRef: ElementRef;
    treeData: any;
    treeNodeService: any;
    treeService: any;

    margin = {top: 10, right: 10, bottom: 10, left: 10};
    width = window.innerWidth * 0.9 - this.margin.right - this.margin.left;
    height = window.innerHeight * 0.9 - this.margin.top - this.margin.bottom;

    rectH: any;
    rectW: any;

    i = 0;
    duration = 750;
    root: any;
    minZoomRatio = 0.7;
    maxZoomRatio = 5;

    onZoom = () => {
        this.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    };

    collapse = (d: any) => {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;
        }
    };

    click = (d: any, root: any, tree: any, duration: any, svg: any, diagonal: any) => {
        let canvas = d3.select("tree");
        let parentDimension: any = {
            width: this.width,
            height: this.height
        };

        let nodeDimension: any = {
            width: this.treeNodeService.rectW,
            height: this.treeNodeService.rectH
        };

        let item: any = {};
        item.name = "";
        item.type = "";
        this.treeService.addNodeItem(d, item);
        this.update(d);
    };

    rclick = (d: any) => {
        let canvas = d3.select("tree");
        this.treeService.removeNodeItem(d);
        this.update(d);
    };

    tree = d3.layout.tree()
        .size([this.height, this.width]);

    zoom =  d3.behavior.zoom()
        .scaleExtent([this.minZoomRatio, this.maxZoomRatio])
        .on("zoom", this.onZoom);

    svg = d3.select("tree")
        .append("svg")
        .attr("width", this.width + this.margin.right + this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .call(this.zoom)
        .append("g");

    diagonal = d3.svg.diagonal()
        .projection((d: any) : any => {
            return [d.x + this.treeNodeService.rectW / 2, d.y + this.treeNodeService.rectH / 2];
        });

    public update = (source: any) => {
        console.log("Updating...");


        // Compute the new tree layout.
        let nodes = this.tree.nodes(this.root).reverse(),
            links = this.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach((d) => {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        let node = this.svg.selectAll("g.node")
            .data(nodes, (d: any) => {
                return d.id || (d.id = ++this.i);
            });

        // Enter any new nodes at the parent's previous position.
        let functionList: any = {};
        functionList.click = this.click;
        functionList.rclick = this.rclick;
        this.treeNodeService.setNode(node, source, functionList);


        // Update nodes
        this.treeNodeService.updateNode(node, this.duration);


        // Exit nodes
        this.treeNodeService.exitNode(node, source, this.duration);


        // Update the links…
        let link = this.svg.selectAll("path.link")
            .data(links, (d: any) => {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("x", this.treeNodeService.rectH / 2)
            .attr("y", this.treeNodeService.rectW / 2)
            .attr("d", () => {
                let o = {x: source.x0, y: source.y0};
                return this.diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(this.duration)
            .attr("d", this.diagonal);


        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this.duration)
            .attr("d", () => {
                let o = {x: source.x, y: source.y};
                return this.diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach((d: any) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    };

    draw(data: Object) {
        this.root = data;
        this.root.x0 = this.width / 2;
        this.root.y0 = 0;
        console.log("Drawing...");

        this.svg.append("rect")
            .attr("class", "overlay")
            .attr("width", this.width)
            .attr("height", this.height)
            .on("click", this.popupRemove);

        this.root.children.forEach(this.collapse);
        this.update(this.root);
    }

    constructor(elementRef: ElementRef,
                treeService: TreeService,
                treeNodeService: TreeNodeService,
    ) {
        this.elementRef = elementRef;
        this.treeData = treeService.getTree();

        this.treeNodeService = treeNodeService;
        this.treeService = treeService;
    }

    ngOnInit() {
        this.draw(this.treeData);

    }
}