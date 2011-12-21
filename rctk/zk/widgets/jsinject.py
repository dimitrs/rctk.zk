from rctk.widgets.control import Control, Attribute

from rctk.task import Task
from rctk.event import Changable, Submittable, Keypressable

class JSInject(Control, Changable):
    name = "jsinject"

    value = Attribute()

    def __init__(self, tk, value="", **attrs):
        super(JSInject, self).__init__(tk, value=value, **attrs)

