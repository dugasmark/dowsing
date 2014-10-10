angular.module('dowsing').directive('plan', function() {


			function load (data,w,h,r,ir,title) {
				var pi = Math.PI,
				    color = d3.scale.category20c();     

				if (!data) return;

			    var vis = d3.select("svg")
			        .data([data])          
			            .attr("width", w)  
			            .attr("height", h)
			            .append("svg:g")       
			            	.attr("transform", "translate(" + w/2 + "," + h + ")");


					if (title) {
						vis.append("svg:text")
						.attr("text-anchor", "middle") 
						.attr("transform","translate(0,-420)")
						.style("font-size","28px")                 
						.style("background-color","white")                 
					    .attr("fill", "black") 
						.text(title);
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
			                .style('stroke', 'black')
  							.style('stroke-width', '1.3')
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
					'inner' : '='
				},
				link: function(scope, elem, attrs) {

					load(scope.data.datas.outer,scope.width,scope.height,scope.radius,scope.inner,scope.data.title);
					load(scope.data.datas.inner,scope.width,scope.height,scope.radius/2,0,scope.title);

					
					scope.$watch('data', function(newValue, oldValue) {
			        	if (newValue !== oldValue) {
			        		d3.select("svg").html('');
			        		load(scope.data.datas.outer,scope.width,scope.height,scope.radius,scope.inner,scope.data.title);
							load(scope.data.datas.inner,scope.width,scope.height,scope.radius/2,0);
			        	}
				    }, true);
				}
			};

		});