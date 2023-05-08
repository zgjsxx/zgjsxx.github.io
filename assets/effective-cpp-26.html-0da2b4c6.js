import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="effective-c-26-尽量延后变量定义式的出现时间" tabindex="-1"><a class="header-anchor" href="#effective-c-26-尽量延后变量定义式的出现时间" aria-hidden="true">#</a> effective c++ 26 尽量延后变量定义式的出现时间</h1><p>本节主要介绍，在很多时候，<strong>如果变量定义的过早，可能变量的定义将无效</strong>。</p><p>例如下面的例子，如果password长度小于8，函数将会抛出异常， 那么定义的encrypted的构造和析构将毫无意义。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>std<span class="token double-colon punctuation">::</span>string <span class="token function">encryptPassword</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> password<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>string encrypted<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">throw</span> std<span class="token double-colon punctuation">::</span><span class="token function">logic_error</span><span class="token punctuation">(</span><span class="token string">&quot;Password too short&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

    encrypted <span class="token operator">=</span> password<span class="token punctuation">;</span>
	<span class="token function">encrypt</span><span class="token punctuation">(</span>encrypted<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">return</span> encrypted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的函数应该修改为下面的形式，延后变量encrypted的定义。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>std<span class="token double-colon punctuation">::</span>string <span class="token function">encryptPassword</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> password<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>password<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">8</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">throw</span> std<span class="token double-colon punctuation">::</span><span class="token function">logic_error</span><span class="token punctuation">(</span><span class="token string">&quot;Password too short&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	std<span class="token double-colon punctuation">::</span>string <span class="token function">encrypted</span><span class="token punctuation">(</span>password<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">encrypt</span><span class="token punctuation">(</span>encrypted<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">return</span> encrypted<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>尽量延后变量定义式的出现。这样做可以增加程序的清晰度并改善程序效率。</li></ul>`,8),c=[e];function o(i,l){return s(),a("div",null,c)}const d=n(p,[["render",o],["__file","effective-cpp-26.html.vue"]]);export{d as default};
