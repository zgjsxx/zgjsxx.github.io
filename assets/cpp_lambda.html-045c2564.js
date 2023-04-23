import{_ as s,V as e,W as t,X as a,Y as p,$ as c,a0 as l,F as o}from"./framework-c954d91f.js";const i={},r=l(`<h1 id="c-中的lambda表达式" tabindex="-1"><a class="header-anchor" href="#c-中的lambda表达式" aria-hidden="true">#</a> c++中的lambda表达式</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>在c++11中引入了Lambda表达式，利用Lambda表达式可以方便的定义和创建匿名函数。</p><p>为什么需要匿名函数这种语法呢？我个人觉得主要有以下一些原因：</p><ul><li>程序员起名字是个麻烦事，有时候有的函数只在有限的地方调用，希望不通过名字调用。</li><li>避免命名冲突(当然避免命名冲突有很多种方法)</li><li>丰富c++11的语法类型，就像写作文的同义词一样，同样的事情可以有不同的实现方式，本身就可以丰富代码的多样性。</li></ul><p>so， 下面就看看Lambda表达式具体的写法吧。</p><h2 id="声明lambda表达式" tabindex="-1"><a class="header-anchor" href="#声明lambda表达式" aria-hidden="true">#</a> 声明Lambda表达式</h2><p>Lambda表达式完整的声明格式如下：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token punctuation">[</span>capture list<span class="token punctuation">]</span> <span class="token punctuation">(</span>params list<span class="token punctuation">)</span> <span class="token keyword">mutable</span> exception<span class="token operator">-&gt;</span> <span class="token keyword">return</span> type <span class="token punctuation">{</span> function body <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>各项具体含义如下:</p><ul><li>capture list：捕获外部变量列表</li><li>params list：形参列表</li><li>mutable指示符：用来说用是否可以修改捕获的变量</li><li>exception：异常设定</li><li>return type：返回类型</li><li>function body：函数体</li></ul><h2 id="捕获外部变量" tabindex="-1"><a class="header-anchor" href="#捕获外部变量" aria-hidden="true">#</a> 捕获外部变量</h2><h3 id="值捕获" tabindex="-1"><a class="header-anchor" href="#值捕获" aria-hidden="true">#</a> 值捕获</h3><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">111</span><span class="token punctuation">;</span>
    <span class="token keyword">auto</span> f <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token punctuation">{</span> std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> a <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> 
    a <span class="token operator">=</span> <span class="token number">222</span><span class="token punctuation">;</span>
    <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果：</p><div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,17),d={href:"https://www.cnblogs.com/DswCnblog/p/5629165.html",target:"_blank",rel:"noopener noreferrer"};function u(k,m){const n=o("ExternalLinkIcon");return e(),t("div",null,[r,a("p",null,[a("a",d,[p("https://www.cnblogs.com/DswCnblog/p/5629165.html"),c(n)])])])}const b=s(i,[["render",u],["__file","cpp_lambda.html.vue"]]);export{b as default};