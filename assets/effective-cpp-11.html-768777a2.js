import{_ as a,V as c,W as o,X as e,Y as t}from"./framework-9a29aaa0.js";const r={},n=e("h1",{id:"effective-c-11-operator-处理自我赋值",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#effective-c-11-operator-处理自我赋值","aria-hidden":"true"},"#"),t(" effective c++ 11 operator= 处理自我赋值")],-1),s=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),t(" 总结")],-1),i=e("ul",null,[e("li",null,'确保当对象自我赋值时operator=有良好行为。其中技术包括比较"来源对象"和"目标对象"的地址、精心周到的语句顺序，以及copy-and-swap。'),e("li",null,"确定任何函数做过操作一个以上的对象，而其中多个对象是同一个对象时，其行为仍然正确。")],-1),d=[n,s,i];function l(_,f){return c(),o("div",null,d)}const p=a(r,[["render",l],["__file","effective-cpp-11.html.vue"]]);export{p as default};