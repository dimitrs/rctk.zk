zul.wgt.Chart = zk.$extends(zul.Widget, {
	_chart_type: "line",
	_chart_title: "",
	_yAxis_title: "",
	_series: null,
    
	$init: function () {
		this.$supers("$init", arguments);
	},
	
	$define: {﻿  ﻿  
		chart_type: "line",
		chart_title: "",
		yAxis_title: "",
		series: null,
		
		chart_type: function (v) {
			this.chart_type = v;		
		},
﻿		chart_title: function (v) {
			this.chart_title = v;		
		},
﻿		yAxis_title: function (v) {
			this.yAxis_title = v;		
		},
﻿		series: function (v) {
			this.series = v;		
		},		
	},

	bind_: function () {
		this.$supers('bind_', arguments);

		var _chart1 =  new Highcharts.Chart({
			chart: {
	            //renderTo: 'container',
	            renderTo: "" + this.uuid,				
				
	            type: this.chart_type
			},
			title: {
				text: this.chart_title
			},
			xAxis: {
			    categories: ['Apples', 'Bananas', 'Oranges']
			},
			yAxis: {
			   title: {
			      text: this.yAxis_title
			   }
			},
			series: this.series
		});
	},

﻿	unbind_: function () {﻿  ﻿  ﻿
		this.$supers('unbind_', arguments);
	},
	
	redraw: function (out) {
		out.push('<div', " id=\"" + this.uuid + "\"", " style=\"width: 100%; height: 400px\">");
		out.push('</div>');
﻿	}﻿  
});

zkreg('zul.wgt.Chart',true);zk._m={};


Onion.widget.Chart = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.items = [];
    this.name = "chart";
};

Onion.widget.Chart.prototype = new Onion.widget.Control();

Onion.widget.Chart.prototype.create = function(data) {	
    var controlid = "ctrl"+this.controlid;
    var self=this;   
	
	var series = [];
    if(data.items) {			
        for(var i = 0; i < data.items.length; i++) {
			series.push({
				name: data.items[i][0],
				data: data.items[i][1]
			});			
        }
	}
			
    this.control = new zul.wgt.Chart({
		id: controlid, 		
		chart_type: data.chart_type,
		chart_title: data.chart_title,
		series: series,
	});
	
    this.handle_click = false;
    this.set_properties(data);
};


Onion.widget.Chart.prototype.set_properties = function(data2) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);	
};


// register
Onion.widget.register("chart", Onion.widget.Chart);
