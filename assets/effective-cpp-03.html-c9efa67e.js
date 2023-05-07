import{_ as c,V as n,W as s,X as e,Y as t}from"./framework-c954d91f.js";const o={},a=e("h1",{id:"effective-c-03-尽可能使用const",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#effective-c-03-尽可能使用const","aria-hidden":"true"},"#"),t(" effective c++ 03 尽可能使用const")],-1),i=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),t(" 总结")],-1),l=e("ul",null,[e("li",null,"将某些东西声明为const可以帮助编译器检查出错误用法。const可被施加于任何作用域的对象，函数参数，函数返回值类型，成员函数本体。"),e("li",null,"编译器强制实施比特常量性bitwise constness， 但你编写的程序应该使用概念上的常量性（conceptual constness）"),e("li",null,"当const和non-const成员函数有着实质等价的实现时，令non-const版本调用const版本可避免代码重复。")],-1),r=[a,i,l];function d(_,f){return n(),s("div",null,r)}const u=c(o,[["render",d],["__file","effective-cpp-03.html.vue"]]);export{u as default};
