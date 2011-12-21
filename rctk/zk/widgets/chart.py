from rctk.widgets.control import Control, Attribute

from rctk.task import Task
from rctk.event import Clickable

class Chart(Control, Clickable):
    name = "chart"

    # Array of all currently selected points in the chart.
    # selection synchronizes the selected state with the client. It's
    # not to be accessed directly. 
    selection = Attribute([], Attribute.NUMBER)
    
    # The default series type for the chart. Can be one of line, spline, area, 
    # areaspline, column, bar, pie and scatter. Defaults to "line".    
    chart_type = Attribute("line", Attribute.STRING)

    # The title of the chart. To disable the title, set the text to null. 
    # Defaults to "Chart title"
    chart_title = Attribute("Chart title", Attribute.STRING)
    
    # The actual text of the axis title. The Y axis title is disabled by setting the text 
    # option to null. Defaults to "Y-values".    
    yAxis_title = Attribute("Y-values", Attribute.STRING)
    
    def __init__(self, tk, items=(), **properties):
        self.items = items
        super(Chart, self).__init__(tk, **properties)

    def create(self):
        self.tk.create_control(self, items=self._items())

    def add(self, key, value):
        """ this adds a new entry to the bottom. Removing items or selecting
            an insertion position is not yet possible """
        # TODO

    def _items(self):
        return self.items

    ##
    ## The value property will map the user-defined keys
    ## to the internal indexes
    def _get_value(self):
        # TODO        
        for (idx, (key, value)) in self.items:
            if idx == self.selection:
                return key
        return None

    def _set_value(self, v):
        # TODO        
        for (idx, (key, value)) in self.items:
            if v == key:
                self.selection = idx
                return
        raise KeyError(v)

    value = property(_get_value, _set_value)

    def reset(self):
        # TODO        
        """ set the selection to the first value """
        pass
    
    def clear(self):
        # TODO        
        self._items = []
        self.selection = None # XXX this will create a redundant task
        ## no strict need to reset indexer
        self.tk.queue(Task("Dropdown cleared id %d" % self.id,
         {'control':self.name, "id":self.id, "action":"update", 
          "update":{"clear":True}}))

    def __repr__(self):
        return '<%s name="%s" id=%d items %s>' % (self.__class__.__name__, self.name, self.id, repr(self.items))
        

