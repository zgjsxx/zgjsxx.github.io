import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const c={},i=e(`<h1 id="effective-c-36-绝不重新定义继承而来的non-virtual函数" tabindex="-1"><a class="header-anchor" href="#effective-c-36-绝不重新定义继承而来的non-virtual函数" aria-hidden="true">#</a> effective c++ 36 绝不重新定义继承而来的non-virtual函数</h1><p>该条款比较简单，只需记住就可以。该条款和item33是相辅相成的。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>如下所示，如果在D内重新定义mf， 那么D就将基类中的mf给隐藏了。该条款是不建议这样做的，因为public继承是is-a的关系，D的对象也是一种B的对象，其mf方法里应该相同。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">B</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">mf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">D</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">B</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// hides B::mf() - Item33</span>
	<span class="token keyword">void</span> <span class="token function">mf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>绝对不要重新定义继承而来的non-virtual函数。</li></ul>`,7),t=[i];function p(l,o){return s(),a("div",null,t)}const u=n(c,[["render",p],["__file","effective-cpp-36.html.vue"]]);export{u as default};
