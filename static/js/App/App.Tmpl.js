App.module("Tmpl", function(Tmpl, App) {
    Tmpl.About=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<section class="profile"></section><h2 class="transformed">I\'ve been building apps using these technologies</h2><section class="techList"><img src="/static/img/ajax-loader.gif" width="16" height="16"></section><h2 class="transformed">Find me on these networks</h2><section class="networkList"><img src="/static/img/ajax-loader.gif" width="16" height="16"></section><h2 class="transformed">I\'ve been reading these books</h2><section class="bookList"><img src="/static/img/ajax-loader.gif" width="16" height="16"></section>';return __p};
    Tmpl.Blog=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<p>this is the blog page</p>';return __p};
    Tmpl.BookItem=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<a class="book-' +((__t = ( obj.label )) == null ? '' : __t) +'" href="//' +((__t = ( obj.link )) == null ? '' : __t) +'" target="_blank"> <span class="tip"> ' +((__t = ( obj.title )) == null ? '' : __t) +' </span></a>';return __p};
    Tmpl.BookRow=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<td>' +((__t = ( obj.title )) == null ? '' : __t) +'</td><td>' +((__t = ( obj.author )) == null ? '' : __t) +'</td><td>' +((__t = ( obj.link )) == null ? '' : __t) +'</td><td>' +((__t = ( obj.label )) == null ? '' : __t) +'</td>';return __p};
    Tmpl.Footer=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<li><a href="/about/">About / Contact</li><li><a href="/projects/">Projects</li>';return __p};
    Tmpl.Header=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<h1 class="titleTransformed">' +((__t = ( title )) == null ? '' : __t) +'</h2>'; if (typeof short_description !== 'undefined') { ;__p += '<h2 class="subTitleTransformed">' +((__t = ( short_description )) == null ? '' : __t) +'</h2>'; } ;__p += '';}return __p};
    Tmpl.NetworkItem=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<a class="network-' +((__t = ( obj.label )) == null ? '' : __t) +'" href="//' +((__t = ( obj.url )) == null ? '' : __t) +'" target="_blank"> <span class="tip"> ' +((__t = ( obj.platform )) == null ? '' : __t) +' </span></a>';return __p};
    Tmpl.Profile=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<figure class="s-avatar-' +((__t = ( obj.label)) == null ? '' : __t) +'"></figure><h2>' +((__t = ( obj.firstname )) == null ? '' : __t) +' ' +((__t = ( obj.lastname )) == null ? '' : __t) +'</h2><a href="//' +((__t = ( obj.url )) == null ? '' : __t) +'" class="transformed"><span class="icon-link-30"></span>' +((__t = ( obj.url )) == null ? '' : __t) +'</a><a href="mailto:' +((__t = ( obj.email )) == null ? '' : __t) +'" class="transformed"><span class="icon-email-30"></span>' +((__t = ( obj.email )) == null ? '' : __t) +'</a><a href="/projects/" class="btn-go transformed"><span class="icon-right-30"></span>Look at my project gallery</a><a href="/downloads/' +((__t = ( obj.label )) == null ? '' : __t) +'.vcf" target="_blank" class="transformed"><span class="icon-download-30"></span>Download my contact details</a><a href="/downloads/' +((__t = ( obj.label )) == null ? '' : __t) +'.docx" target="_blank" class="transformed"><span class="icon-download-30"></span>Download my CV (.docx)</a><a href="/downloads/' +((__t = ( obj.label )) == null ? '' : __t) +'.pdf" target="_blank" class="transformed"><span class="icon-download-30"></span>Download my CV (.pdf)</a>';return __p};
    Tmpl.Project=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<nav>\r <a class="btn-back" href="/projects/"><span class="icon-up-30"></span>Projects</a>\r <a class="btn-prev "href="/prev"><span class="icon-left-30"></span>Previous</a>\r <a class="btn-next" href="/next"><span class="icon-right-30"></span>Next</a>\r '; if (href_available) { ;__p += '\r <a class="btn-link" href="//' +((__t = ( href )) == null ? '' : __t) +'" target="_blank"><span class="icon-link-30"></span>Visit ' +((__t = ( title )) == null ? '' : __t) +'</a>\r '; } ;__p += '\r</nav>\r<div class="content projectTransformed">\r <img src="/static/img/featured/' +((__t = ( label )) == null ? '' : __t) +'.png" alt="' +((__t = ( title )) == null ? '' : __t) +'">\r <p>' +((__t = ( long_description )) == null ? '' : __t) +'</p>\r <ul class="techList tipList">\r '; for(tech in technology) { ;__p += '\r <li class="logo-' +((__t = ( technology[tech] )) == null ? '' : __t) +' transformed"><span class="tip">' +((__t = ( dictionary[technology[tech]].label )) == null ? '' : __t) +'</span></li>\r '; } ;__p += '\r </ul>\r</div>\r';}return __p};
    Tmpl.Projects=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<nav> <a href="/about/"><span class="icon-up-30"></span>About / Contacts</a></nav><ul class="tileList"></ul>';return __p};
    Tmpl.TechItem=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<span class="tip">' +((__t = ( obj.name )) == null ? '' : __t) +'</span>';return __p};
    Tmpl.TileEmpty=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<img src="static/img/ajax-load.gif" width="16" height="16" alt="Loading"/>';return __p};
    Tmpl.TileItem=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div class="tile transformed">\r <div class="front"></div>\r <div class="back">\r <a class="btn-enlarge" href="#" title="Enlarge"><span class="icon-zoom-in-30"></span>Enlarge</a>\r <a class="btn-more" href="/projects/' +((__t = ( label )) == null ? '' : __t) +'" title="More information"><span class="icon-info-30"></span>More</a>\r </div>\r</div>\r\r<div class="info">\r <a class="btn-shrink" href="#" title="Shrink"><span class="icon-zoom-out-30"></span>Shrink</a>\r '; if (href_available) { ;__p += '\r <a class="btn-external" href="//' +((__t = ( href )) == null ? '' : __t) +'", target="_blank" title="Visit ' +((__t = ( title )) == null ? '' : __t) +'"><span class="icon-link-30"></span>Link</a>\r '; } ;__p += '\r <a class="btn-more" href="/projects/' +((__t = ( label )) == null ? '' : __t) +'" title="More information"><span class="icon-info-30"></span>More</a>\r <h3>' +((__t = ( title )) == null ? '' : __t) +'</h3>\r <h4>' +((__t = ( short_description )) == null ? '' : __t) +'</h4>\r</div>\r';}return __p};
    Tmpl.Welcome=function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape, __d = obj.obj || obj;__p += '<a href="/projects/"><span class="icon-right-30"></span>Projects</a>\r<a href="/about/"><span class="icon-right-30"></span>About / Contact</a>\r';return __p};
});