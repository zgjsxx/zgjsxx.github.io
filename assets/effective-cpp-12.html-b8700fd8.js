import{_ as t,V as a,W as i,X as e,Y as c}from"./framework-9a29aaa0.js";const n={},s=e("h1",{id:"effective-c-12-复制对象时勿忘其每一个成分",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#effective-c-12-复制对象时勿忘其每一个成分","aria-hidden":"true"},"#"),c(" effective c++ 12 复制对象时勿忘其每一个成分")],-1),o=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),c(" 总结")],-1),r=e("ul",null,[e("li",null,'copying函数应该确保复制"对象内的所有成员变量"以及"所有base class成分"。'),e("li",null,"不要尝试以一个copying 函数去实现另一个copying函数。应该将共同机能放进第三个函数中，并又两个copying函数共同调用。")],-1),l=[s,o,r];function d(_,f){return a(),i("div",null,l)}const p=t(n,[["render",d],["__file","effective-cpp-12.html.vue"]]);export{p as default};