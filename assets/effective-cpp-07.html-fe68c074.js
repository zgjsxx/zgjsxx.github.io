import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-07-为多态基类声明virtual析构函数" tabindex="-1"><a class="header-anchor" href="#effective-c-07-为多态基类声明virtual析构函数" aria-hidden="true">#</a> effective c++ 07 为多态基类声明virtual析构函数</h1><p>本章节主要讲解了c++中涉及多态时的一个很容易犯错误的点。也是面试题常问的点。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>涉及多态时，Base类需要在析构函数上需要加上virtual。</p><p>首先我们看一个例子，这个例子中基类的析构函数没有加上virtual。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Base</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;~Base&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Derived</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token operator">~</span><span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;~Derived&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token punctuation">{</span>
		Base<span class="token operator">*</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">delete</span> b<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token punctuation">{</span>
		Derived<span class="token operator">*</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">delete</span> b<span class="token punctuation">;</span>		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其执行结果如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token operator">~</span>Base
<span class="token operator">~</span>Derived
<span class="token operator">~</span>Base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从执行结果可以看到，如果涉及多态，当使用基类指针指向子类对象时，如果delete掉该指针，子类的析构函数并不会调用，这就可能造成一些资源不能很好的释放。</p><p>下面我们加上virtual关键字：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Base</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;~Base&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Derived</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token operator">~</span><span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;~Derived&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token punctuation">{</span>
		Base<span class="token operator">*</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">delete</span> b<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token punctuation">{</span>
		Derived<span class="token operator">*</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">delete</span> b<span class="token punctuation">;</span>		
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>~Derived
~Base
~Derived
~Base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上virtual关键字之后，当delete掉基类指针时，会首先调用子类的析构函数，在调用基类的析构函数。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>带有多态性质的基类应该声明一个virtual的析构函数。如果class带有任何virtual函数，它就应该用有一个virtual 析构函数。</li><li>class的设计目的如果不是作为base classes使用，或不是为了具备多态性，就不该声明virtual 析构函数。</li></ul>`,16),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","effective-cpp-07.html.vue"]]);export{d as default};
