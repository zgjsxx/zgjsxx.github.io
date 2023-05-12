import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-10-令operator-返回一个reference-to-this" tabindex="-1"><a class="header-anchor" href="#effective-c-10-令operator-返回一个reference-to-this" aria-hidden="true">#</a> effective c++ 10 令operator= 返回一个reference to * this</h1><p>本章节也是作者的一个建议，并无强制性，不这样做并不会造成编译上的问题。</p><p>作者建议我们在operator=的运算符返回指向自身的引用，这样可以使用连等形式的运算。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>看下面的一个例子，为了能让<code>w3 = w2 = w1</code>的表达式成立，我们需要在赋值运算符中返回<code>*this</code>。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">a_</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">a_</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// Standard copy assignment operators.</span>
	Widget<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Widget<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        a_ <span class="token operator">=</span> rhs<span class="token punctuation">.</span>a_<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Convention applies to +=, -=, *=, etc.</span>
	Widget<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">+=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Widget<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        a_ <span class="token operator">+=</span> rhs<span class="token punctuation">.</span>a_<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Applies even if operator&#39;s parameter is unconventional.</span>
	Widget<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">int</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        a_ <span class="token operator">+=</span> rhs<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> a_<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Widget <span class="token function">w1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Widget w2<span class="token punctuation">;</span>
    Widget w3<span class="token punctuation">;</span>

    w3 <span class="token operator">=</span> w2 <span class="token operator">=</span> w1<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w3<span class="token punctuation">.</span><span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w2<span class="token punctuation">.</span><span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w1<span class="token punctuation">.</span><span class="token function">getA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在日常开发中，应该记得这样做，这不仅有代码上的意义，也能让你的老板对你高看一眼。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>令赋值操作符返回一个reference to *this。</li></ul>`,9),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","effective-cpp-10.html.vue"]]);export{r as default};
