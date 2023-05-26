import{_ as n,V as s,W as t,X as a,Y as i,$ as c,a0 as r,F as o}from"./framework-9a29aaa0.js";const d={},l=r(`<h1 id="c-面经" tabindex="-1"><a class="header-anchor" href="#c-面经" aria-hidden="true">#</a> c++面经</h1><h2 id="c-基础" tabindex="-1"><a class="header-anchor" href="#c-基础" aria-hidden="true">#</a> c++基础</h2><h3 id="i和i-哪个效率更高" tabindex="-1"><a class="header-anchor" href="#i和i-哪个效率更高" aria-hidden="true">#</a> ++i和i++哪个效率更高？</h3><p>对于<strong>内建数据类型</strong>，效率没有区别。</p><p>对于<strong>自定义的数据类型</strong>， 前缀式(++i)可以返回对象的引用，而后缀式(i++)必须返回对象的值，存在复制开销。因此++i效率更高。</p><h3 id="c-中const的作用" tabindex="-1"><a class="header-anchor" href="#c-中const的作用" aria-hidden="true">#</a> c++中const的作用</h3><ul><li>1.用于定义常量(注意修饰指针时的含义)</li><li>2.用于修饰函数形参</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>3.const修饰函数返回值</li><li>4.const修饰类的成员函数</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何禁用拷贝构造函数" tabindex="-1"><a class="header-anchor" href="#如何禁用拷贝构造函数" aria-hidden="true">#</a> 如何禁用拷贝构造函数</h3><ul><li><p>如果你的编译器支持 C++11，直接使用 delete</p></li><li><p>可以把拷贝构造函数和赋值操作符声明成private同时不提供实现。</p></li><li><p>可以通过一个基类来封装第二步，因为默认生成的拷贝构造函数会自动调用基类的拷贝构造函数，如果基类的拷贝构造函数是private，那么它无法访问，也就无法正常生成拷贝构造函数</p></li></ul><h2 id="类和对象" tabindex="-1"><a class="header-anchor" href="#类和对象" aria-hidden="true">#</a> 类和对象</h2><h2 id="stl" tabindex="-1"><a class="header-anchor" href="#stl" aria-hidden="true">#</a> STL</h2><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,15),p={href:"https://zhuanlan.zhihu.com/p/629336564(%E5%90%AB%E7%AD%94%E6%A1%88)",target:"_blank",rel:"noopener noreferrer"};function h(u,k){const e=o("ExternalLinkIcon");return s(),t("div",null,[l,a("p",null,[a("a",p,[i("https://zhuanlan.zhihu.com/p/629336564(含答案)"),c(e)])])])}const m=n(d,[["render",h],["__file","cpp.html.vue"]]);export{m as default};
