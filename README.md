![Node js](./assets/nodejs-logo.png)

# LandScan API
This is a project related to GIS (Geographical Information Systems). Assume that we have a GIS dataset containing a georeferenced, high-resolution map of a region. This dataset also includes vectors that are drawn over the region. Both the map and the vectors have a certain set of attributes associated with them. 
For example, consider Bangalore as a region and there can be certain polygons drawn on its map, like houses, parking areas, shopping malls, etc. So each of these polygons will have a class id and class name. These class id and class names are just a mapping to each other. For example, a house can have a (class id, class name) = (101, house).
So, each of these polygons will have certain additional attributes that are computed run time, i.e they should not be in the database. They are like area, perimeter, center of mass, etc.



## Setup Locally
1. Clone ```landscanAPI-v1``` from ```https://github.com/meghna512/landscanAPI-v1.git```
2. Go to terminal inside ```landscanAPI-v1``` directory and run npm install.
3. Create a .env semilar to .env.example.
4. Run ```node index.js``` command.

A link to Postman collections is given here: [Postman Links](https://www.getpostman.com/collections/b9f1a508b17533a2d6bb)

## References
1. [GeoJSON](http://geojson.io/)
2. [TurfJS](http://turfjs.org/)