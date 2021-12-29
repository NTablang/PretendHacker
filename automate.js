const TAB = "&nbsp;&nbsp;&nbsp;&nbsp;";
const INSIDE_BRACES_INDENT = TAB + TAB;
const BREAKLINE = "<br>";
let linePosition = 0;
let wordCounter = 0;

const indentInside = (num) => {
    let indent = "";
    for (let i = 0; i < num; i++) {
        indent += INSIDE_BRACES_INDENT;
    }
    return indent;
}

const sourceCode = [
    `// DIJKSTRA'S PSEUDOCODE`,
    `let findShortestPath = (graph, startNode, endNode) => {`,
    `${BREAKLINE}`,
    `// track distances from the start node using a hash object`,
    `let distances = {};`,
    `distances[endNode] = "Infinity";`,
    `distances = Object.assign(distances, graph[startNode]);`,
    `${BREAKLINE}`,
    `// track paths using a hash object`,
    `let parents = {endNode: null}`,
    `${indentInside(1)}for (let child in graph[startNode]) {`,
    `${indentInside(1)}parents[child] = startNode`,
    `}`,
    `${BREAKLINE}`,
    `let visited = [];`,
    `${BREAKLINE}`,
    `// find the nearest node`,
    `let node = shortestDistanceNode(distances, visited);`,
    `${BREAKLINE}`,
    `// for that node:`,
    `while (node) {`,
    // open-1
    `${indentInside(1)}// find its distance from the start node & its child nodes`,
    `${indentInside(1)}let distance = distances[node];`,
    `${indentInside(1)}let children = graph[node];`,
    `${BREAKLINE}`,
    `${indentInside(1)}// for each of those child nodes:`,
    `${indentInside(1)}for (let child in children) {`,
    // open-2
    `${indentInside(2)}// make sure each child node is not the start node`,
    `${indentInside(2)}if (String(child) === String(startNode)) {`,
    // open-3
    `${indentInside(3)}continue;`,
    // back to open-2
    `${indentInside(2)}} else {`,
    // open-3
    `${indentInside(3)}// save the distance from the start node to the child node`,
    `${indentInside(3)}let newDistance = distance + distance[child];`,
    `${BREAKLINE}`,
    `${indentInside(3)}// if there's no recorded distance from the start node to the child`,
    `${indentInside(3)}node in the distances object`,
    `${indentInside(3)}// or if the recorded distance is the shorter than the previously stored`,
    `${indentInside(3)}distance from the start node to the child node`,
    `${indentInside(3)}if (!distance[child] || distance[child] > newdistance) {`,
    // open-4
    `${indentInside(4)}// save the distance to the object`,
    `${indentInside(4)}distances[child] = newdistance;`,
    `${indentInside(4)}// record the path`,
    `${indentInside(4)}parents[child] = node;`,
    // back to open-3
    // back to open-2
    `${indentInside(2)}}`,
    // back to open-1
    `${indentInside(1)}}`,
    `${indentInside(1)}// move the current node to the visited set`,
    `${indentInside(1)}visited.push(node);`,
    `${BREAKLINE}`,
    `${indentInside(1)}// move to the nearest neighbor node`,
    `${indentInside(1)}node = shortestDistanceNode(distances, visited);`,
    `}`,
    `${BREAKLINE}`,
    `};`,
    `${BREAKLINE}`
];

let line = sourceCode[linePosition].split(" ");

document.addEventListener("keypress", e => {
    console.log(e.timeStamp);
    typeCode();
    automaticallyScrollDown();

    if (linePosition == sourceCode.length) {
        linePosition = 0;
        wordCounter = 0;
        line = sourceCode[linePosition].split(" ");
        typeCode();
        automaticallyScrollDown();
    }
});


const automaticallyScrollDown = () => {
    let newlyAddedText = document.body.lastElementChild;
    newlyAddedText.scrollIntoView();
}
const typeCode = () => {
    let cursors1 = document.querySelectorAll(".cursor");
    for (let k = 0; k < cursors1.length; k++) {
        if (k != cursors1.length) {
            cursors1.item(k).classList.add("invisible");
        }
    }


    let divToBeModified; // div for new lines
    let currentLine;

    
    // do these if there are still lines of code to be printed
    while (linePosition < sourceCode.length) {
        
        // start of new line
        if (wordCounter == 0) {
            divToBeModified = document.createElement("div");
            divToBeModified.classList.add("flexed");
            //divToBeModified.classList.add("test");

            // every line inside should be indented
            if (linePosition > 1 && wordCounter == 0) {
                divToBeModified.innerHTML = TAB + TAB + "   " + line[wordCounter];
            }
            // except the method header
            else {
                divToBeModified.innerHTML = line[wordCounter];
            }
            // and the end curly brace of the method
            if (line[wordCounter] == "};"){
                divToBeModified.innerHTML = line[wordCounter];
            }
            wordCounter++;

            cursorDiv = document.createElement("div");
            cursorDiv.classList.add("cursor");
            //cursorDiv.classList.add("test");
            divToBeModified.appendChild(cursorDiv);
        }
        // same line
        else {
            // if there are still words in that same line
            if (wordCounter < line.length) {
                console.log("last: " + document.body.lastElementChild.classList);

                currentLine = document.body.lastElementChild;
                currentLine.innerHTML += " " + line[wordCounter];
                wordCounter++;

                cursorDiv = document.createElement("div");
                cursorDiv.classList.add("cursor");
                //cursorDiv.classList.add("test");
                currentLine.appendChild(cursorDiv);
            }
            // else, move to the next line: reset everything except the linePosition pointer
            else {
                console.log("================= END LINE =================");
                linePosition++;
                wordCounter = 0;
                if (linePosition < sourceCode.length) {
                    line = sourceCode[linePosition].split(" ");
                }
            }
        }
        
        // appending to the body has different situations because one is new div 
        // and another is altering that newly added div
        if (wordCounter - 1 == 0) {
            document.body.appendChild(divToBeModified);
        }
        else if (wordCounter == line.length) {
            continue;
        }
        else {
            try {
                document.body.appendChild(currentLine);
            }
            catch(err) {
                // do nothing
            }
        }
        break;
    }
}