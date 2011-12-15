from rctk.widgets.control import Control, Attribute
from rctk.widgets import Dropdown
from rctk.task import Task
from rctk.event import Clickable

class Combo(Dropdown):
    name = "combo"

    # selection synchronizes the selected state with the client. It's
    # not to be accessed directly since it doesn't directly contain the
    # items configured on the Dropdown
    selection = Attribute(None, Attribute.NUMBER)

    # The paging feature allows large data to be distributed in a page representation.
    # The paging value set the the page size, aka., the number rows per page.
    paging = Attribute(None, Attribute.NUMBER)
    
    # Defines a header of a column of a list
    header = Attribute(None, Attribute.STRING)

