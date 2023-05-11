import{_ as e,V as a,W as r,a0 as i}from"./framework-9a29aaa0.js";const h={},t=i('<h1 id="c-面经" tabindex="-1"><a class="header-anchor" href="#c-面经" aria-hidden="true">#</a> c++面经</h1><h2 id="c-基础" tabindex="-1"><a class="header-anchor" href="#c-基础" aria-hidden="true">#</a> c++基础</h2><h3 id="如何禁用拷贝构造函数" tabindex="-1"><a class="header-anchor" href="#如何禁用拷贝构造函数" aria-hidden="true">#</a> 如何禁用拷贝构造函数</h3><ul><li><p>如果你的编译器支持 C++11，直接使用 delete</p></li><li><p>可以把拷贝构造函数和赋值操作符声明成private同时不提供实现。</p></li><li><p>可以通过一个基类来封装第二步，因为默认生成的拷贝构造函数会自动调用基类的拷贝构造函数，如果基类的拷贝构造函数是private，那么它无法访问，也就无法正常生成拷贝构造函数</p></li></ul><h2 id="类和对象" tabindex="-1"><a class="header-anchor" href="#类和对象" aria-hidden="true">#</a> 类和对象</h2><h2 id="stl" tabindex="-1"><a class="header-anchor" href="#stl" aria-hidden="true">#</a> STL</h2>',6),c=[t];function d(n,s){return a(),r("div",null,c)}const o=e(h,[["render",d],["__file","cpp.html.vue"]]);export{o as default};
