webpackJsonp([7],{631:function(e,t,n){"use strict";var r=n(12)["default"],o=n(6)["default"],a=n(11)["default"],i=n(5)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var l=n(1),u=s(l),c=n(14),d=n(46),f=n(13),p=n(15),h=n(31),m=s(h),v=function(e,t){return u["default"].createElement(p.Link,{to:"/instructors/"+t._id},u["default"].createElement("div",{className:"image",style:t.image?{backgroundImage:"url("+t.image+")"}:{backgroundImage:"url('src/images/profile.png')"}}),t.name.first," ",t.name.last)},b=function(e,t){return u["default"].createElement("a",{className:"email-link",href:"mailto:"+t.email},t.email)},g=[{title:"Name",render:v,prop:"name"},{title:"Email",render:b,prop:"email"},{title:"Phone Number",prop:"phone"}],y=function(e){function t(){i(this,t);for(var e=arguments.length,n=Array(e),o=0;e>o;o++)n[o]=arguments[o];r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,n),this.state={}}return o(t,e),a(t,[{key:"render",value:function(){var e=_.get(this.props,"instructors.allInstructors")||[],t=_.get(this.props,"instructors.isLoading")||!1;return u["default"].createElement("div",{className:"table-wrapper"},u["default"].createElement("div",{className:"row table-header"},u["default"].createElement(f.Col,{xs:12},u["default"].createElement("h1",null,"Instructors"))),t?u["default"].createElement(m["default"],null):e.length?u["default"].createElement(d.DataTable,{keys:["name","email"],columns:g,initialData:e,initialPageLength:1e3,className:"table-body"}):u["default"].createElement("div",{className:"no-results"},"No Instructors Yet"))}}]),t}(u["default"].Component);t["default"]=c.branch(y,{facets:{instructors:"Instructors"}}),e.exports=t["default"]}});