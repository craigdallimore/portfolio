App.module("Tmpl", function(Tmpl, App) {
    Tmpl.TileItem=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<div class="tile">\r <div class="info">\r <a class="s-icon-enlarge enlarge" href="#">Expand</a>\r '; if (href_available) { __p+='\r <a class="s-icon-forward external" href="//'+((__t=( href ))==null?'':__t)+'", target="_blank">Link</a>\r '; } __p+='\r <a class="s-icon-info more" href="/projects/'+((__t=( label ))==null?'':__t)+'">More</a>\r <h3>'+((__t=( title ))==null?'':__t)+'</h3>\r <h4>'+((__t=( short_description ))==null?'':__t)+'</h4>\r </div>\r</div>';}return __p;};
    Tmpl.Welcome=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<a href="/projects/">Templated link to projects</a>\r<a href="/about/">About / Contact</a>\r<a href="/blog/">Blog</a>\r';}return __p;};
    Tmpl.Project=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<a class="btn-back s-icon-back" href="/projects/">Back</a>\r<img src="static/img/featured/'+((__t=( label ))==null?'':__t)+'.png" alt="'+((__t=( title ))==null?'':__t)+'">\r'; if (href_available) { __p+='\r<a class="btn-link" href="//'+((__t=( href ))==null?'':__t)+'" target="_blank"><span class="s-icon-forward"></span>Visit '+((__t=( title ))==null?'':__t)+'</a>\r'; } __p+='\r<p>'+((__t=( long_description ))==null?'':__t)+'</p>';}return __p;};
    Tmpl.About=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<p>this is the about page</p>';}return __p;};
    Tmpl.Blog=function(obj){var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};with(obj||{}){__p+='<p>this is the blog page</p>';}return __p;};
});