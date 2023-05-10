import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-47-请使用trait-class-表现类型信息" tabindex="-1"><a class="header-anchor" href="#effective-c-47-请使用trait-class-表现类型信息" aria-hidden="true">#</a> effective c++ 47 请使用trait class 表现类型信息</h1><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression">once</span></span>

<span class="token comment">//http://www.cplusplus.com/reference/iterator/iterator_traits/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iterator&gt;</span></span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">IterT</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">DistT</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">doAdvance</span><span class="token punctuation">(</span>IterT<span class="token operator">&amp;</span> iter<span class="token punctuation">,</span> DistT d<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>random_access_iterator_tag<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	iter <span class="token operator">+=</span> d<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">IterT</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">DistT</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">doAdvance</span><span class="token punctuation">(</span>IterT<span class="token operator">&amp;</span> iter<span class="token punctuation">,</span> DistT d<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>bidirectional_iterator_tag<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>d<span class="token operator">--</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token operator">++</span>iter<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">while</span> <span class="token punctuation">(</span>d<span class="token operator">++</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token operator">--</span>iter<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">IterT</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">DistT</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">doAdvance</span><span class="token punctuation">(</span>IterT<span class="token operator">&amp;</span> iter<span class="token punctuation">,</span> DistT d<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>input_iterator_tag<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">throw</span> std<span class="token double-colon punctuation">::</span><span class="token function">out_of_range</span><span class="token punctuation">(</span><span class="token string">&quot;Negative distance&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span>d<span class="token operator">--</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token operator">++</span>iter<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">IterT</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">DistT</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">advance</span><span class="token punctuation">(</span>IterT<span class="token operator">&amp;</span> iter<span class="token punctuation">,</span> DistT d<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//doAdvance(iter, d, typename std::iterator_traits&lt;IterT&gt;::iterator_category());</span>

	<span class="token keyword">auto</span> category <span class="token operator">=</span> <span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span><span class="token class-name">iterator_traits</span><span class="token operator">&lt;</span>IterT<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token function">iterator_category</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">doAdvance</span><span class="token punctuation">(</span>iter<span class="token punctuation">,</span> d<span class="token punctuation">,</span> category<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>Trait classes使得&quot;类型相关信息&quot;在编译器可用。它们以templates和templates特化完成实现。</li><li>整合重载技术后。traits classes有可能在编译器对类型执行if-else测试。</li></ul>`,4),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","effective-cpp-47.html.vue"]]);export{r as default};
