
Onion.widget.JSInject = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.items = [];
    this.name = "jsinject";
};

Onion.widget.JSInject.prototype = new Onion.widget.Control();

Onion.widget.JSInject.prototype.create = function(data) {	
    var controlid = "ctrl"+this.controlid;
    var self=this;   
	
    this.control = new zul.wnd.Window({
		id: controlid,
	});   
	
    this.handle_click = false;

    this.set_properties(data);
};


Onion.widget.JSInject.prototype.set_properties = function(data2) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if('value' in data2) {
		$('body').append(data2.value);	
	}
	var self = this;
/*
		var script = "<script type=\"text/javascript\"> alert('hello'); </script>";
		//var script = "<SCRIPT type=\"text/javascript\" src=\"./static/finif_files/highcharts.js\"></SCRIPT>";
		var script = "<SCRIPT type=\"text/javascript\"> var Search='AA'; var tweetSearch = '$'+Search;</SCRIPT>";
		$('body').append(script);	
	*/	
		//	zk.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  " + data.text);
		zk.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  " + Search);
	zk.log("jjjjjjjjjjj "+  data1 + " " + yfinance[1].name);
	
  //  self.jwin.add_task("sync", "sync", self.controlid, {'value':data1});
//    self.jwin.add_task("event", "change", self.controlid);
	
	
	
};



// register
Onion.widget.register("jsinject", Onion.widget.JSInject);
