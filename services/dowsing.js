angular.module('dowsing').provider("dowsing", function(){
 
    // Un provider, au final, c'est juste une fonction anonyme qu'on relie
    // à un nom :)
 
    // Cette fonction DOIT avoir une méthode nommé "$get" attachée à son "this"
    this.$get = function() {
 
        // Et la méthode "$get" DOIT retourner l'objet qu'on veut créer.
        return {
            'title': 'Titre',
            'datas': {
                outer: [
                    {"label":"Extérieur 1", "value":60, "color": "#2682c7"}, 
                    {"label":"Extérieur 2", "value":60, "color": "#55a8e6"}, 
                    {"label":"Extérieur 3", "value":60,"color":"#9dcbed"}
                ],
                inner: [
                    {"label":"Intérieur 1", "value":60, "color": "#2682c7"}, 
                    {"label":"Intérieur 2", "value":60, "color": "#55a8e6"}, 
                    {"label":"Intérieur 3", "value":60,"color":"#9dcbed"}
                ]
            },
            setColor: function (color,index) {
                this.datas.inner[index].color = color;
            },

            add : function () {
                this.datas.inner.push({"label":'Intérieur '+ (parseInt(this.datas.inner.length,10) + 1), "value":60})
                this.datas.outer.push({"label":'Extérieur '+ (parseInt(this.datas.outer.length,10) + 1), "value":60})
            },

            remove : function (index) {
                this.datas.outer.splice(index, 1);  
                this.datas.inner.splice(index, 1);  
            },

            modifyOuter : function(value, index) {
                this.datas.outer[index].label = value;
            },

            modifyInner : function(value, index) {
                this.datas.inner[index].label = value;
            },

            modifyTitle : function(value) {
                this.datas.title = value;
            },

            minusOuterPositionX : function (index) {
            	var p = (this.datas.outer[index].labelX) ? this.datas.outer[index].labelX : 0;
            	this.datas.outer[index].labelX = p - 1;
            },

            plusOuterPositionX : function (index) {
            	var p = (this.datas.outer[index].labelX) ? this.datas.outer[index].labelX : 0;
            	this.datas.outer[index].labelX = p + 1;
            },

            minusOuterPositionY : function (index) {
            	var p = (this.datas.outer[index].labelY) ? this.datas.outer[index].labelY : 0;
            	this.datas.outer[index].labelY = p - 1;
            },

            plusOuterPositionY : function (index) {
            	var p = (this.datas.outer[index].labelY) ? this.datas.outer[index].labelY : 0;
            	this.datas.outer[index].labelY = p + 1;
            },

            minusInnerPositionX : function (index) {
            	var p = (this.datas.inner[index].labelX) ? this.datas.inner[index].labelX : 0;
            	this.datas.inner[index].labelX = p - 1;
            },

            plusInnerPositionX : function (index) {
            	var p = (this.datas.inner[index].labelX) ? this.datas.inner[index].labelX : 0;
            	this.datas.inner[index].labelX = p + 1;
            },

            minusInnerPositionY : function (index) {
            	var p = (this.datas.inner[index].labelY) ? this.datas.inner[index].labelY : 0;
            	this.datas.inner[index].labelY = p - 1;
            },

            plusInnerPositionY : function (index) {
            	var p = (this.datas.inner[index].labelY) ? this.datas.inner[index].labelY : 0;
            	this.datas.inner[index].labelY = p + 1;
            },


            save : function() {
                var html = d3.select("svg")
                    .attr("version", 1.1)
                    .attr("xmlns", "http://www.w3.org/2000/svg")
                    .node().parentNode.innerHTML;

                var imgsrc = 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(html)));
                console.log(imgsrc);
                var canvas = document.querySelector("canvas"),
                context = canvas.getContext("2d");
                context.fillStyle= "#ffffff";
                context.fillRect(0,0,850,500);

                var image = new Image;
                image.src = imgsrc;
                image.onload = function() {
                    context.drawImage(image, 25, 25);
                    var canvasdata = canvas.toDataURL("image/png");
                    var pngimg = '<img src="'+canvasdata+'">'; 

                    var a = document.createElement("a");
                    a.download = "planche.png";
                    a.href = canvasdata;

                    var evt = document.createEvent('MouseEvents');
                    evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                    a.dispatchEvent(evt);
                };
            }
        }
    }
});