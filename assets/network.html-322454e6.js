import{_ as n,V as a,W as o,X as e,Y as t}from"./framework-9a29aaa0.js";const r={},s=e("h1",{id:"network",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#network","aria-hidden":"true"},"#"),t(" Network")],-1),_=e("h2",{id:"time-wait的状态是在哪一端产生的-它的作用是什么",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#time-wait的状态是在哪一端产生的-它的作用是什么","aria-hidden":"true"},"#"),t(" TIME_WAIT的状态是在哪一端产生的？它的作用是什么？")],-1),i=e("p",null,"TIME_WAIT状态在主动关闭端产生。主要作用如下：",-1),c=e("ul",null,[e("li",null,"可靠的关闭连接。保证最后一个确认消息能被对方收到。如果直接关闭连接，那么对方可能会因为没有收到确认消息而无法关闭连接。"),e("li",null,"避免旧的重复分组在新的连接中被错误接收。由于网络原因，有可能会有一些旧的重复分组在网络中滞留。如果没有TIME_WAIT，在连接关闭后如果直接开启新的连接，这些旧的重复分组可能会被新的连接误认为是自己的数据。")],-1),l=[s,_,i,c];function d(h,u){return a(),o("div",null,l)}const m=n(r,[["render",d],["__file","network.html.vue"]]);export{m as default};
