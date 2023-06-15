import{_ as o,V as l,W as s,X as e,Y as t,$ as c,F as i}from"./framework-9a29aaa0.js";const _={},a=e("h1",{id:"effective-stl-04-用empty来代替检查size-是否为0",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#effective-stl-04-用empty来代替检查size-是否为0","aria-hidden":"true"},"#"),t(" effective STL-04 用empty来代替检查size()是否为0")],-1),r=e("p",null,"事实上empty的典型实现是一个返回size是否返回0的内联函数，对所有的标准容器",-1),f=e("ul",null,[e("li",null,[e("p",null,"empty()总是常数时间(因为只检查有没有)")]),e("li",null,[e("p",null,"size()不一定是常数时间(可能需要遍历所有的成员比如list)")])],-1),p=e("p",null,"参考文章：",-1),h={href:"https://www.cnblogs.com/yan1345/p/Note_of_Effective_STL.html#02-%E5%B0%8F%E5%BF%83%E5%AF%B9%E5%AE%B9%E5%99%A8%E6%97%A0%E5%85%B3%E4%BB%A3%E7%A0%81%E7%9A%84%E5%B9%BB%E6%83%B3",target:"_blank",rel:"noopener noreferrer"};function E(d,m){const n=i("ExternalLinkIcon");return l(),s("div",null,[a,r,f,p,e("p",null,[e("a",h,[t("https://www.cnblogs.com/yan1345/p/Note_of_Effective_STL.html#02-小心对容器无关代码的幻想"),c(n)])])])}const B=o(_,[["render",E],["__file","effective-STL-4.html.vue"]]);export{B as default};