webpackJsonp([8],{527:function(e,t,n){"use strict";var r=n(12)["default"],o=n(7)["default"],a=n(11)["default"],i=n(6)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var l=n(1),u=s(l),c=n(22),d=n(102),f=n(13),p=n(20),h=n(93),m=s(h),v=function(e,t){return u["default"].createElement(p.Link,{to:"/instructors/"+t._id},t.name.first," ",t.name.last)},b=[{title:"Name",render:v},{title:"Email",prop:"email"},{title:"Classes",prop:"classes"},{title:"Privates",prop:"privates"},{title:"Balance",prop:"balance"}],g=function(e){function t(){i(this,t);for(var e=arguments.length,n=Array(e),o=0;e>o;o++)n[o]=arguments[o];r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,n),this.state={}}return o(t,e),a(t,[{key:"render",value:function(){var e=_.get(this.props,"instructors.allInstructors")||[],t=_.get(this.props,"instructors.isLoading")||!1;return u["default"].createElement("div",{className:"table-wrapper"},u["default"].createElement("div",{className:"row table-header"},u["default"].createElement(f.Col,{xs:12},u["default"].createElement("h1",null,"Instructors"))),t?u["default"].createElement(m["default"],null):e.length?u["default"].createElement(d.DataTable,{keys:["name","email"],columns:b,initialData:e,initialPageLength:15,initialSortBy:{prop:"name",order:"descending"},pageLengthOptions:[15,20,50],className:"table-body"}):u["default"].createElement("div",{className:"no-results"},"No Instructors Yet"))}}]),t}(u["default"].Component);t["default"]=c.branch(g,{facets:{instructors:"Instructors"}}),e.exports=t["default"]}});