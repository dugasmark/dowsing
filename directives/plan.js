angular.module('dowsing').directive('plan', function() {


			function load (scope,data) {
				var w = scope.width,                        //width
				    h = scope.height,                            //height
				    r = scope.radius,                            //radius
				    ir = scope.inner,
				    pi = Math.PI,
				    color = d3.scale.category20c();     

				if (!data) return;

			    var vis = d3.select("svg")
			        .data([data])          
			            .attr("width", w)  
			            .attr("height", h)
			            .append("svg:g")       
			            	.attr("transform", "translate(" + w/2 + "," + h + ")");


			      if (scope.title) {


			      	vis.append("rect")
						.attr("width", w)
						.attr("height", 40)
						.attr("fill", "white")
						.attr("transform", "translate(" + -w/2 + "," + -h + ")"); 

			      	vis.append("svg:text")
						.attr("text-anchor", "middle") 
						.attr("transform","translate(0,-420)")
						.style("font-size","28px")                 
						.style("background-color","white")                 
				        .attr("fill", "black") 
						.text(scope.title);
			      }
				
			    
			 
			    var arc = d3.svg.arc()              
			        .outerRadius(r)
					.innerRadius(ir);
			 
			    var pie = d3.layout.pie()           
			        .value(function(d) { return d.value; })
			        .startAngle(-90 * (pi/180))
			        .endAngle(90 * (pi/180));
			 
			    var arcs = vis.selectAll("g.slice")     
			        .data(pie)                          
			        .enter()                            
			            .append("svg:g")                
			                .attr("class", "slice");    
			 
			        arcs.append("svg:g").append("svg:path")
			                .attr("fill", function(d, i) { return (data[i].color) ? data[i].color : color(i); } ) 
			                .attr("d", arc);                                    
			
			        arcs.append("svg:text")     
			                                      
			            .attr("transform", function(d) {                    
			                d.outerRadius = r + 50; // Set Outer Coordinate
		        			d.innerRadius = r + 45;
			                return "translate(" + arc.centroid(d) + ") rotate(" + angle(d) + ")";        
			            })

			            .attr("text-anchor", "middle")        
			            .style("font-size","16px")                 
			            .attr("fill", "black")                          
			            .text(function(d, i) { return data[i].label; });


			        function angle(d) {
						var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
						console.log('angle',a);
						return -a > 90 ? a - 180 : a;
					} 

			}


			return {
				restrict: 'E',
				//transclude: true,
				scope: {
					'data' : '=',
					'width' : '=',
					'height' : '=',
					'radius' : '=',
					'inner' : '=',
					'title' : '='
				},
				link: function(scope, elem, attrs) {
					console.log(scope);
					load(scope,scope.data);
					scope.$watch('data', function(newValue, oldValue) {
			        	if (newValue !== oldValue) {
			        		load(scope,newValue);
			        	}
				    }, true);

				    scope.$watch('title', function(newValue, oldValue) {
			        	if (newValue !== oldValue) {
			        		load(scope,scope.data);
			        	}
				    }, true);
				}
			};

		});