import{_ as n,V as s,W as a,a0 as t}from"./framework-c954d91f.js";const p={},e=t(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;functional&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;mutex&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">DEFER_LINENAME_CAT</span><span class="token expression"><span class="token punctuation">(</span>name<span class="token punctuation">,</span> line<span class="token punctuation">)</span> name</span><span class="token punctuation">##</span><span class="token expression">line</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">DEFER_LINENAME</span><span class="token expression"><span class="token punctuation">(</span>name<span class="token punctuation">,</span> line<span class="token punctuation">)</span> <span class="token function">DEFER_LINENAME_CAT</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> line<span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">defer</span><span class="token expression"><span class="token punctuation">(</span>deferFunction<span class="token punctuation">)</span> RAIIDefer <span class="token function">DEFER_LINENAME</span><span class="token punctuation">(</span>DEFER_NAME_<span class="token punctuation">,</span> <span class="token constant">__LINE__</span><span class="token punctuation">)</span><span class="token punctuation">(</span>deferFunction<span class="token punctuation">)</span></span></span>

<span class="token keyword">class</span> <span class="token class-name">RAIIDefer</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">RAIIDefer</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> fDeferFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		m_fDeferFunction <span class="token operator">=</span> fDeferFunction<span class="token punctuation">;</span>
	<span class="token punctuation">}</span> 
	<span class="token operator">~</span><span class="token function">RAIIDefer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>m_fDeferFunction<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token function">m_fDeferFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token function">RAIIDefer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	std<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> m_fDeferFunction<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>   
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;lock&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	std<span class="token double-colon punctuation">::</span>mutex mutex<span class="token punctuation">;</span>
	mutex<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">defer</span> <span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
            std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;unlock&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
			mutex<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token comment">/*
        equals to 
        RAIIDefer DEFER_NAME_36([&amp;] { std::cout &lt;&lt; &quot;unlock&quot; &lt;&lt; std::endl; mutex.unlock(); })
    */</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;doing something&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>res <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;will exit..&quot;</span> <span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>    
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","cpp_realize_defer.html.vue"]]);export{r as default};
