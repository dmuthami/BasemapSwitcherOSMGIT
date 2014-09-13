//Global variable object store
var app = {};
//Othe varibales in the global variable store
app.map = null, app.center = null, app.zoom = null; 

require([
  "esri/map",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/dijit/BasemapGallery", "esri/arcgis/utils",
  "dojo/parser",

  "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/TitlePane",
  "dojo/domReady!"
], function (
  Map,ArcGISDynamicMapServiceLayer,
  BasemapGallery, arcgisUtils,
  parser
) {
    parser.parse();

    //----Initialize variables 
    app.center = [16.65, -20.475];
    app.zoom = 15;
    //--end of varibale intiliatization

    //Create map object
    app.map = new Map("map", {
        basemap: "topo", //specify default basemap
        center: app.center, //center to otjiwarongo town
        zoom: app.zoom //Specify zoom level
    });

    //Add operational layer

    //url
    var url = "http://localhost:6080/arcgis/rest/services/Otjiwarongo/MapServer";

    //create  parcel fabric object
    var layer = new ArcGISDynamicMapServiceLayer(url, {
        id: "Otjiwarongo",
        opacity: 0.5
    });

    //Add dynamic layer
    app.map.addLayer(layer);

    //add the basemap gallery, in this case we'll display maps from ArcGIS.com and OSM only
    var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true, //dispaly ArcGIS Basemaps
        map: app.map //set map object to reference map roperty of basemap class
    }, "basemapGallery");

    //launch basemap widget
    basemapGallery.startup();

    /*
     * Error handler for error event.
     * Writes to console if their are any erros switching between basemaps
     */
    basemapGallery.on("error", function (msg) {
        console.log("basemap gallery error:  ", msg);
    });
});