(this.webpackJsonpphonebook2=this.webpackJsonpphonebook2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(13),o=t.n(r),c=t(2),l=t(3),i=t.n(l),s=function(){return i.a.get("/api/persons").then((function(e){return e.data}))},m=function(e){return i.a.post("/api/persons",e).then((function(e){return e.data}))},f=function(e,n){return i.a.put("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},d=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"message"},n)},h=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"messageError"},n)},p=function(e){var n=e.person;return u.a.createElement("div",null,n.name," ",n.phoneNumber," ",u.a.createElement("button",{onClick:e.buttonHandle},"delete"))},b=function(e){var n=e.phoneNumbers;return u.a.createElement("div",null,n.map((function(t){return u.a.createElement(p,{person:t,key:t.name,buttonHandle:function(){return function(t){var a="http://localhost:3001/persons/".concat(t),u=n.find((function(e){return e.id===t}));window.confirm("Delete ".concat(u.name,"?"))&&i.a.delete(a).then((function(){e.setPersons(n.filter((function(e){return e.id!==t}))),e.setMessage("Successfully removed ".concat(u.name)),setTimeout((function(){e.setMessage(null)}),3e3)})).catch((function(a){e.setMessageError("Failed ".concat(u.name," not found")),setTimeout((function(){e.setMessageError(null),e.setPersons(n.filter((function(e){return e.id!==t})))}),3e3)}))}(t.id)}})})))},E=function(e){return u.a.createElement("div",null,"filter shown with ",u.a.createElement("input",{value:e.newFilter,onChange:e.handleFilterChange}))},v=function(e){return u.a.createElement("form",{onSubmit:e.addName},u.a.createElement("div",null,u.a.createElement("div",null," name: ",u.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),u.a.createElement("div",null,"phoneNumber: ",u.a.createElement("input",{value:e.newphoneNumber,onChange:e.handlephoneNumberChange}))),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add")))},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],o=Object(a.useState)(""),l=Object(c.a)(o,2),i=l[0],p=l[1],g=Object(a.useState)(""),N=Object(c.a)(g,2),w=N[0],j=N[1],O=Object(a.useState)(""),C=Object(c.a)(O,2),S=C[0],F=C[1],k=Object(a.useState)(null),y=Object(c.a)(k,2),M=y[0],T=y[1],P=Object(a.useState)(null),D=Object(c.a)(P,2),H=D[0],J=D[1];Object(a.useEffect)((function(){s().then((function(e){r(e)})).catch((function(e){J("Failed. Resources not found"),setTimeout((function(){J(null)}),3e3)}))}),[]);var L=t.filter((function(e){var n=e.name.toLowerCase(),t=S.toLowerCase();return n.includes(t)}));return u.a.createElement("div",null,u.a.createElement(d,{message:M}),u.a.createElement(h,{message:H}),u.a.createElement("h2",null,"Phonebook"),u.a.createElement(E,{newFilter:S,handleFilterChange:function(e){F(e.target.value)}}),u.a.createElement("h2",null,"add a new"),u.a.createElement(v,{addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===i}));if("undefined"!==typeof n){var a=n.id;"http://localhost:3001/api/persons/".concat(a);if(window.confirm("".concat(i," replace the old phoneNumber with a new phoneNumber ?"))){var u={name:i,phoneNumber:w};f(a,u).then((function(e){r(t.map((function(n){return n.id!==a?n:e}))),T("Successfully updated ".concat(e.name)),setTimeout((function(){T(null)}),3e3)})).catch((function(e){J("Failed ".concat(u.name," not found")),setTimeout((function(){J(null)}),3e3)}))}p(""),j("")}else{var o={name:i,phoneNumber:w};m(o).then((function(e){r(t.concat(e)),p(""),j(""),T("Successfully added ".concat(o.name)),setTimeout((function(){T(null)}),3e3)})).catch((function(e){p(""),j(""),J("Failed ".concat(o.name," not found")),setTimeout((function(){T(null)}),3e3)}))}},newName:i,handleNameChange:function(e){p(e.target.value)},newphoneNumber:w,handlephoneNumberChange:function(e){j(e.target.value)}}),u.a.createElement("h2",null,"phoneNumbers"),u.a.createElement(b,{phoneNumbers:L,setPersons:r,message:M,setMessage:T,messageError:H,setMessageError:J}))};t(36);o.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(g,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.e15403ec.chunk.js.map