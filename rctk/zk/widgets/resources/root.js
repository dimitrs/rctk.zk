/*
 * The root is the root window, the first control where
 * everything starts with id 0
 *
 * The root is always there - there is exactly one root window,
 * not more, not less. This also means that there's no actual
 * create.
 */
Onion.widget.Root = function(jwin) {
    this.toproot = new zul.wnd.Window();
    jq('#toproot').replaceWith(this.toproot);
    
    this.control = new zul.wnd.Window();
    jq('#main').replaceWith(this.control);    
    this.container = this.control;
    Onion.widget.Container.apply(this, [jwin, this, 0]);
    this.name = "root";
}

Onion.widget.Root.prototype = new Onion.widget.Container()

Onion.widget.Root.prototype.create = function(data) {
    this.set_properties(data);
}

Onion.widget.Root.prototype.append = function(control, data) {
zk.log("1 rrrrrrrrrrrrrrr " + control.name);
    this.layout.append(control, data);
}

Onion.widget.Root.prototype.remove = function(control, options) {
zk.log("2 rrrrrrrrrrrrr " + control.name + " " + this.layout.name);
    this.layout.remove(control, options);
    //this.layoutcontrol.removeChild(control.control);
    //control.containingparent = null;
}


Onion.widget.Root.prototype.set_properties = function(data) {
    Onion.widget.Container.prototype.set_properties.apply(this, arguments);
    if(data === undefined) {
        return;
    }/* DIMITRI
    if('title' in data) {
        this.control.setTitle(data.title);
    }
    if('width' in data && data.width) {
        this.control.setWidth(data.width);
    }
    if('height' in data && data.height) {
        this.control.setHeight(data.height);        
    }*/
}

/*
 * rctk supports "calling" methods on controls. Root probably makes
 * the most sense for a open_url control, but perhaps it should
 * just be in the core.
 */
Onion.widget.Root.prototype.open_url = function(url) {
    window.open(url);
}
Onion.widget.register("root", Onion.widget.Root);

