const turf = require('@turf/turf');

const classMapping = [{ classId: 123, className: "House" },
{ classId: 456, className: "Shopping Mall" },
{ classId: 789, className: "Hospital" }]

const getClassName = (classId) => {
   const filteredClassName = classMapping.filter((c) => {
        if (c.classId == classId) {
            return c;
        }
    });
    if(filteredClassName.length == 0){
        return "House";
    }else {
        return filteredClassName[0].className;
    }
}

const parseVectors = (vectors, query) => {
    for( let v of vectors){
        if(query.area){
            v.area = turf.area(v.polygon.geometry);
        }
        if(query.perimeter){
            v.perimeter = turf.length(v.polygon.geometry);
        } 
    }
    return vectors;
}

module.exports = {
    classMapping,
    getClassName,
    parseVectors
}