import { Injectable } from "@angular/core";

import * as d3 from "d3";

@Injectable()
export class TreeNodeService {
    rectH = 50;
    rectW = 120;

    public setNode(nodeItem: any, sourceItem: any, callbackList: any): any {
        let nodeEnter = nodeItem.enter().append("g")
            .attr("class", "node")
            .attr("transform", () => {
                return "translate(" + sourceItem.x0 + "," + sourceItem.y0 + ")";
            })
            .on("click", callbackList.click)
            .on("contextmenu", (d) => {
                d3.event.preventDefault();
                callbackList.rclick(d);
            });

        nodeEnter.append("rect")
            .attr("width", this.rectW)
            .attr("height", this.rectH)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .style("fill", (d: any) => {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", this.rectW / 2)
            .attr("y", this.rectH / 2)
            .attr("dy", ".30em")
            .attr("text-anchor", "middle")
            .text((d: any) => {
                return d.name;
            });
    }

    public updateNode(nodeItem: any, duration: any): any {
        let nodeUpdate = nodeItem.transition()
            .duration(duration)
            .attr("transform", (d) => {
                return "translate(" + d.x + "," + d.y + ")";
            });

        nodeUpdate.select("rect")
            .attr("width", this.rectW)
            .attr("height", this.rectH)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);
    }

    public exitNode(nodeItem: any, sourceItem: any, duration: any): any {
        let nodeExit = nodeItem.exit().transition()
            .duration(duration)
            .attr("transform", () => {
                return "translate(" + sourceItem.x + "," + sourceItem.y + ")";
            }).remove();

        nodeExit.select("rect")
            .attr("width", this.rectW)
            .attr("height", this.rectH)
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        nodeExit.select("text");
    }
}