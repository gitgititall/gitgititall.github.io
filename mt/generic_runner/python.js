//Python Programming Language Live Lessons
//Safari video with bespectacled guru in blue tshirt

var strs = {

package:'\
||why do <pre> import sys </pre>|to access inside other module\
<br>but also INITIALIZE and load!\
||what does <br>  import sys  <br> give me?| binds name "sys" to module sys<br>\
makes it available e.g. <br> sys.exit()\
||what if I do <br> from sys import * <br>?|this brings all names \
inside of sys into your module. \
Now you can do exit() without a sys prefix.\
||why not always do <pre>from sys import *<pre>| collisions! <br> \
you might have a variable called exit as well! \
and multiple libraries will all collide!\
||can I still do <br>from foo import bar, baz | yes, as long as you do it for a few names only\
||when I import a module what happens? | python runs the entire file! any print() will get printed!\
<br>see __name__ check\
||our library has 20 files ... how to package it? | place in a directory \
(package) <br> then call as <br>portie.parser.parse_csv()\
||how do modules within a package import each other?| <pre> from . import parser </pre> \
better than harcoding the package name\
||can I collect some symbols from sub modules in one place to simplify|\
<pre> from .reader import read_csv </pre>\
use package __init__.py file\
',



}
