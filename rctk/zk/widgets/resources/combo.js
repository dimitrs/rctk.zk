ComboIndexedListitem = zk.$extends(zul.sel.Listitem, {
	key: -1,
});

Onion.widget.Combo = function(jwin, parent, controlid) {
    Onion.widget.Control.apply(this, arguments);
    this.items = [];
    this.name = "combo";
};

Onion.widget.Combo.prototype = new Onion.widget.Control();

Onion.widget.Combo.prototype.create = function(data) {
    var controlid = "ctrl"+this.controlid;
    var self=this;   

    this.listbox = new zul.sel.Listbox({
		onSelect: function (evnt) {
		    this.parent.parent.setValue(this.getSelectedItem().getLabel());
            this.parent.parent.setOpen(false, null);
			self.changed(evnt); 
			self.jwin.flush();					
		}
    });
		
    this.control = new zul.inp.Bandbox({
		id: controlid, 	
		mold: "rounded", 
		autocomplete: false, 
		autodrop: false, 
		onError: false,
		onChange: false, 
		children: [	
            new zul.inp.Bandpopup({
                children: [
					this.listbox
				]
			})
		]
		//readonly: false,
		/*
		onSelect: function (evnt) {  
		    self.changed(evnt); 
		    self.jwin.flush();		
		},
		onPaging: function () {        
		},
		children: [	
		    new zul.sel.Listbox({
				onSelect: function () {
				    this.control.setValue(this.getSelectedItem().getLabel());
		            this.control.setOpen(false, null);
				}
		    })
		]
		*/
    });    
	
   	zk.log("2 aaaaaaaaaaaaa ");	

    this.handle_click = false;

    if(data.items) {
        for(var i = 0; i < data.items.length; i++) {
            this.append_item(data.items[i][0], data.items[i][1]);
        }
    }

    this.set_properties(data);
};

Onion.widget.Combo.prototype.append_item = function(key, label) {
    var item = new ComboIndexedListitem({label: label});	
    item.key = key;
    this.listbox.appendChild(item);
    this.items.push({'key':key, 'item':item});   
};

Onion.widget.Combo.prototype.changed = function(evnt) {
	if (evnt.items.length != 1) return;
	this.jwin.add_task("sync", "sync", this.controlid, {'selection':evnt.items[0].key});
    if(this.handle_click) {
        // find current selection.
        if(!this.busy) {
            // XXX Not sure if this is 100% correct behaviour. We're
            // mostly avoiding doubleclicks here, which means the selection
            // can't really have changed. Else we might actually miss a
            // relevant event!

            this.jwin.add_task("event", "click", this.controlid);
            this.jwin.register_busy(this);
        }
    }
};

Onion.widget.Combo.prototype.set_properties = function(data) {
    Onion.widget.Control.prototype.set_properties.apply(this, arguments);
    if(data.item) {
        this.append_item(data.item[0], data.item[1]);
    }
	
    if('selection' in data && data.selection != null) {
		var item = this.items[data.selection];
		if (item) {
			this.control.setValue(item['item'].getLabel());		
		}
    }
    if('clear' in data && data.clear) {
        this.control.clear(); 
        this.items = [];
    }
    if('paging' in data && data.paging) {
		this.control.setMold("paging");
		this.control.setPageSize(data.paging.toString());
		zk.log("pppppppppppppppppppppppppppppppp " + data.paging);
    }	
	else {
		this.control.setMold("rounded");	
	}
};

// register
Onion.widget.register("combo", Onion.widget.Combo);
