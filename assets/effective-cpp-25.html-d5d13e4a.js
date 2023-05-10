import{_ as t,V as a,W as c,X as e,Y as s}from"./framework-9a29aaa0.js";const n={},i=e("h1",{id:"effective-c-25-考虑写一个不抛出任何异常的swap函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#effective-c-25-考虑写一个不抛出任何异常的swap函数","aria-hidden":"true"},"#"),s(" effective c++ 25 考虑写一个不抛出任何异常的swap函数")],-1),l=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),s(" 总结")],-1),d=e("ul",null,[e("li",null,"当std::swap对你的类型效率不高时，提供一个swap成员函数，并确定函数不抛出异常"),e("li",null,"如果你提供一个member swap， 也该提供一个non-member swap用来调用前者。"),e("li",null,'调用swap时应针对std::swap使用using 声明式， 然后调用swao并且不带任何"命名空间资格修饰"'),e("li",null,'为"用户定义类型"进行std template全特化时好的，但千万不要尝试在std内加入某些std而言全新的东西。')],-1),r=[i,l,d];function o(_,f){return a(),c("div",null,r)}const h=t(n,[["render",o],["__file","effective-cpp-25.html.vue"]]);export{h as default};