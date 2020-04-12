
strs = {
	
REST:'\
||(controller) indicate will return full response - serialized domain objects - not just name of view\
|<pre> @RequestMapping (value="/users", method=ReqMethod.GET) <br> public <b>@ResponseBody</b> List<User> listAllUsers() {<br> return userService.findAllUsers();}</pre>\
||how does servlet engine know to parse input as JSON and respond with XML?\
|client sends <br> Content-Type Header <br> Accept Header\
',

}
