App.module("Tmpl", function(Tmpl, App) {
    Tmpl.TileItem=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<div class="tile">\r <div class="info">\r <a class="s-enlarge enlarge" href="#">Expand</a>\r <a class="more" href="/projects/'+((__t=( label ))==null?'':__t)+'">More</a>\r <h3>'+((__t=( title ))==null?'':__t)+'</h3>\r <h4>'+((__t=( short_description ))==null?'':__t)+'</h4>\r </div>\r</div>';}return __p;};
    Tmpl.Welcome=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<a href="/projects/">Templated link to projects</a>\r';}return __p;};
    Tmpl.Project=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<nav>\r <a href="/projects/">Back</a>\r</nav>\r<img src="static/img/featured/'+((__t=( label ))==null?'':__t)+'.png" alt="'+((__t=( title ))==null?'':__t)+'">\r<p>'+((__t=( short_description ))==null?'':__t)+'</p>';}return __p;};
});