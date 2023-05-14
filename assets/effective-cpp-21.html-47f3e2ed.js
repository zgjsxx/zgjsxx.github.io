import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-21-必须返回对象时-别妄想返回其reference" tabindex="-1"><a class="header-anchor" href="#effective-c-21-必须返回对象时-别妄想返回其reference" aria-hidden="true">#</a> effective c++ 21 必须返回对象时， 别妄想返回其reference</h1><p>本节主要讨论，函数的返回值如果需要返回引用时需要注意的点。下面将通过例子详细分析。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Rational</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Rational</span><span class="token punctuation">(</span><span class="token keyword">int</span> numerator <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">int</span> denominator <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">:</span>
	  <span class="token function">n</span><span class="token punctuation">(</span>numerator<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">d</span><span class="token punctuation">(</span>denominator<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">const</span> Rational <span class="token keyword">operator</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">const</span> Rational<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		Rational <span class="token function">result</span><span class="token punctuation">(</span>n <span class="token operator">*</span> rhs<span class="token punctuation">.</span>n<span class="token punctuation">,</span> d <span class="token operator">*</span> rhs<span class="token punctuation">.</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> result<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">int</span> n<span class="token punctuation">,</span> d<span class="token punctuation">;</span>

	<span class="token comment">//Bad code #1</span>
	<span class="token comment">//friend const Rational&amp; operator*(const Rational&amp; lhs, const Rational&amp; rhs)</span>
	<span class="token comment">//{</span>
	<span class="token comment">//	Rational result(lhs.n * rhs.n, lhs.d * rhs.d);</span>
	<span class="token comment">//	return result;</span>
	<span class="token comment">//}</span>

	<span class="token comment">//Bad code #2</span>
	<span class="token comment">//friend const Rational&amp; operator*(const Rational&amp; lhs, const Rational&amp; rhs)</span>
	<span class="token comment">//{</span>
	<span class="token comment">//	Rational* result = new Rational(lhs.n * rhs.n, lhs.d * rhs.d);</span>
	<span class="token comment">//	return *result;</span>
	<span class="token comment">//}</span>

	<span class="token comment">//Bad code #3</span>
	<span class="token comment">//friend const Rational&amp; operator*(const Rational&amp; lhs, const Rational&amp; rhs)</span>
	<span class="token comment">//{</span>
	<span class="token comment">//	static Rational result;</span>
	<span class="token comment">//	return result;</span>
	<span class="token comment">//}</span>

	<span class="token keyword">friend</span> <span class="token keyword">inline</span> <span class="token keyword">const</span> Rational <span class="token keyword">operator</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">const</span> Rational<span class="token operator">&amp;</span> lhs<span class="token punctuation">,</span> <span class="token keyword">const</span> Rational<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		Rational <span class="token function">result</span><span class="token punctuation">(</span>lhs<span class="token punctuation">.</span>n <span class="token operator">*</span> rhs<span class="token punctuation">.</span>n<span class="token punctuation">,</span> lhs<span class="token punctuation">.</span>d <span class="token operator">*</span> rhs<span class="token punctuation">.</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> result<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//bool operator==(const Rational&amp; lhs, const Rational&amp; rhs)</span>
	<span class="token keyword">friend</span> <span class="token keyword">bool</span> <span class="token keyword">operator</span><span class="token operator">==</span><span class="token punctuation">(</span><span class="token keyword">const</span> Rational<span class="token operator">&amp;</span> lhs<span class="token punctuation">,</span> <span class="token keyword">const</span> Rational<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token punctuation">(</span>lhs<span class="token punctuation">.</span>n <span class="token operator">==</span> rhs<span class="token punctuation">.</span>n <span class="token operator">&amp;&amp;</span> lhs<span class="token punctuation">.</span>d <span class="token operator">==</span> rhs<span class="token punctuation">.</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>绝对不要返回pointer或者reference指向一个local stack对象，或者返回reference指向一个heap-allocated对象，或返回pointer或reference指向一个local static对象而有可能同时需要多个这样的对象。条款4已经为单线程环境中合理返回reference指向一个local static对象提供了一份设计实例。</li></ul>`,6),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","effective-cpp-21.html.vue"]]);export{u as default};
