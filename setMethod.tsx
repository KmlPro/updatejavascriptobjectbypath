function set(obj, path, value, replace) {
    var schema = obj;  // refrence to main object
    var pList = path.split('.');
    var len = pList.length;

    // in this iteration we skip first element (if u want include first element in this iterations, change var i=1 to 0) 
    for (var i = 1; i < len - 1; i++) {
        var elem = pList[i];
        var indexOfTable = elem.indexOf("[");
        if (indexOfTable !== -1) {
            var tableElementName = elem.substring(0, indexOfTable);
            var indexName = elem.substring(indexOfTable + 1, elem.length - 1);

            if (!schema[tableElementName][indexName]) {
                schema[tableElementName][indexName] = {};
            }
            else {
                schema = schema[tableElementName][indexName];
            }
        }
        else {
            if (!schema[elem]) {
                schema[elem] = {};
            }
            else {
                schema = schema[elem];
            }
        }
    }

    var indexOfTableReplace = pList[len - 1].indexOf("[");

    if (indexOfTableReplace !== -1) {
        var tableElementNameReplace = pList[len - 1].substring(0, indexOfTableReplace);
        var indexNameReplace = pList[len - 1].substring(indexOfTableReplace + 1, pList[len - 1].length - 1);
        if (indexNameReplace === "") {
            schema[tableElementNameReplace].push(value);
        }
        else {
            if (replace) {
                schema[tableElementNameReplace][indexNameReplace] = value;
            }
            else {
                if (Array.isArray(schema[tableElementNameReplace][indexNameReplace])) {
                    schema[tableElementNameReplace][indexNameReplace] = [...schema[tableElementNameReplace][indexNameReplace], ...value];
                }
                else {
                    schema[tableElementNameReplace][indexNameReplace] = { ...schema[tableElementNameReplace][indexNameReplace], ...value };
                }
            }

        }
    }
    else {
        if (Array.isArray(value)) {
            if (replace) {
                schema[pList[len - 1]] = value;
            }
            else {
                schema[pList[len - 1]] = [...schema[pList[len - 1]], ...value];
            }
        }
        else {
            if (replace) {
                schema[pList[len - 1]] = value;
            } else {
                if (typeof value === 'object') {
                    schema[pList[len - 1]] = { ...schema[pList[len - 1]], ...value };
                } else {
                    schema[pList[len - 1]] = value;
                }
            }
        }

    }
}
