import{_ as e,V as t,W as c,a0 as a}from"./framework-9a29aaa0.js";const o={},s=a(`<h1 id="effective-stl-48-总是include适当的头文件" tabindex="-1"><a class="header-anchor" href="#effective-stl-48-总是include适当的头文件" aria-hidden="true">#</a> effective STL-48 总是include适当的头文件</h1><p>有的时候即使漏掉了必要的头文件，程序同样可以编译，这是因为C++标准并没有规定标准库中头文件之间的相互包含关系。这就导致了某个头文件可能会包含其他头文件。</p><p>例如，A平台的STL版本中<code>&lt;vector&gt;</code>可能包含了<code>&lt;string&gt;</code>,那么下面的代码在A平台就是可以编译通过的。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>
std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token operator">&gt;</span> a<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是B平台的STL版本中<code>&lt;vector&gt;</code>可能就不包含<code>&lt;string&gt;</code>。</p><p>那这个时候上述代码编译就会出错。</p><p>因此解决此类问题的一条原则就是总是include必要的头文件。</p><p>这就需要我们对STL常用的组件对应的头文件有一定的了解。</p><p>下面便是关于常用的STL以及对应的组件的头文件的总结。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>几乎所有的容器都在同名的头文件里，比如， vector在<code>&lt;vector&gt;</code>中声明，list在<code>&lt;list&gt;</code>中声明等。例外的是<code>&lt;set&gt;</code>和<code>&lt;map&gt;</code>。<code>&lt;set&gt;</code>声明了set和multiset，<code>&lt;map&gt;</code>声明了map和multimap。</li><li>除了四个算法外，所有的算法都在<code>&lt;algorithm&gt;</code>中声明。例外的是accumulate、inner_product、adjacent_difference和partial_sum。这些算法在<code>&lt;numeric&gt;</code>中声明。</li><li>特殊的迭代器，包括istream_iterators和istreambuf_iterators，在<code>&lt;iterator&gt;</code>中声明。</li><li>标准仿函数（比如<code>less&lt;T&gt;</code>）和仿函数适配器（比如not1、bind2nd）在<code>&lt;functional&gt;</code>中声明。</li></ul>`,11),n=[s];function d(l,i){return t(),c("div",null,n)}const p=e(o,[["render",d],["__file","effective-STL-48.html.vue"]]);export{p as default};
