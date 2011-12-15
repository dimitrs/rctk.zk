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
    });    
	
	this.paging = null;
	this.head = null;
	this.header = null;	
    this.handle_click = false;

    this.set_properties(data);
};

Onion.widget.Combo.prototype.append_item = function(key, label) {
    var item = new ComboIndexedListitem({label: label});	
    item.key = key;
    this.items.push({'key':key, 'item':item});   
	
	if (this.paging != null) {
		if (this.listbox.getPageSize() - this.listbox.nChildren > 0) {
			this.listbox.appendChild(item);
		}
		this.paging.setTotalSize(this.items.length);
	}
	else {
		this.listbox.appendChild(item);	
	}
};

Onion.widget.Combo.prototype.reattach_items = function(offset) {
	this.listbox.clear(); 
	this.listbox.appendChild(this.paging);	
	if (this.head != null) {		
		this.listbox.appendChild(this.head);					
	}
    for(var i=0; i < this.listbox.getPageSize(); i++) {
	    if (this.items.length < i+offset) break;
        var c = this.items[i+offset]['item'];
		this.listbox.appendChild(c);		
	}	
	this.paging.setTotalSize(this.items.length);	
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
    var self=this;   	
    if('paging' in data && data.paging > 0) {
		if (this.paging == null) {
			this.paging = new zul.mesh.Paging({
				onPaging: function (evt) {
					var ofs = evt.data * this.getPageSize();				
					this.setActivePage(evt.data);
					self.reattach_items(ofs);
				},			
			});	
			this.listbox.appendChild(this.paging);			
			this.listbox.setMold("paging");
			this.listbox.setPageSize(data.paging);			
			this.reattach_items(0);
		}
		else {
			this.listbox.setPageSize(data.paging);
		}
    }	
    else if('paging' in data && data.paging) {
		this.listbox.removeChild(this.paging);			
		this.listbox.setMold("rounded");			
		this.paging = null;
	}
	
    if('header' in data && data.header) {	
		this.header = new zul.sel.Listheader({label: data.header});
		this.head = new zul.sel.Listhead({children: [this.header]});
		this.listbox.appendChild(this.head);				
		//this.header.setSortDirection("ascending");		
	}	

    if(data.items) {
        for(var i = 0; i < data.items.length; i++) {
            this.append_item(data.items[i][0], data.items[i][1]);
        }
    }
	
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
        this.listbox.clear(); 
        this.items = [];
    }
};

// register
Onion.widget.register("combo", Onion.widget.Combo);
