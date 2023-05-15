import{_ as n,V as a,W as s,a0 as e}from"./framework-9a29aaa0.js";const t={},c=e(`<h1 id="effective-c-34-区分接口实现和实现继承" tabindex="-1"><a class="header-anchor" href="#effective-c-34-区分接口实现和实现继承" aria-hidden="true">#</a> effective c++ 34 区分接口实现和实现继承</h1><p>本节内容比较简单， 对于一个写过一段时间c++代码同志不难理解。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Shape</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">int</span> <span class="token function">objectID</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>声明一个纯虚函数的目的是为了让派生类只继承函数接口，例如Shape类的draw方法。</li><li>声明非纯虚函数的目的， 是为了让派生类继承该函数的接口和缺省实现， 例如Shape类的error方法。</li><li>声明non-virtual函数的目的是为了令派生类继承函数的接口及一份强制实现， 例如Shape类的objectID方法。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>接口继承和实现继承不同。在public继承之下，derived classes总是继承base class的接口。</li><li>pure virtual函数只具体指定接口继承。</li><li>非纯虚函数具体指定接口继承及实现继承。</li><li>non-virtual函数具体指定接口继承以及强制性实现继承。</li></ul>`,7),p=[c];function i(o,l){return a(),s("div",null,p)}const u=n(t,[["render",i],["__file","effective-cpp-34.html.vue"]]);export{u as default};
