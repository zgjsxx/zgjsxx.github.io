import{_ as l,V as n,W as s,X as e,Y as t}from"./framework-9a29aaa0.js";const o={},_=e("p",null,"线性一致性",-1),c=e("p",null,"有些论文提到了强一致性，它基本等同于线性一致性。",-1),u=e("p",null,[e("strong",null,"线性一致性"),t("的描述的是一个分布式系统表现的就像只有一台服务器一样(假设其不会崩溃)，该服务器可以按照顺序逐一执行客户端请求，且期间没有任何异常情况发生时的行为。")],-1),i=e("p",null,"其定义如下：",-1),r=e("ul",null,[e("li",null,"客户端的一系列请求构成一个执行历史，执行历史整体可以按照一个顺序排列，要求排列顺序与客户端的实际时间相符合。"),e("li",null,"对于非并发请求，即那些在时间上没有重叠的请求，其先后顺序已经确定的，要求排列顺序不能与这些确定的顺序冲突。例如所以如果一个客户端发送请求并收到响应，随后在某个时间点，另一个客户端发送请求并收到响应，那么这两个请求时有序的，因为其中一个是在另一个完成后开始的，所以它是线性化的。(happen-before关系)"),e("li",null,"每个读操作都能看到最近一次对该同一个数据进行写入之后的值。")],-1),a=e("p",null,"这里的定义相对而言是抽象的，后续会使用例子进行讲解。",-1),d=[_,c,u,i,r,a];function h(p,f){return n(),s("div",null,d)}const x=l(o,[["render",h],["__file","lesson7.html.vue"]]);export{x as default};
