import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-14-资源管理类中小心copying行为" tabindex="-1"><a class="header-anchor" href="#effective-c-14-资源管理类中小心copying行为" aria-hidden="true">#</a> effective c++ 14 资源管理类中小心copying行为</h1><p>本节还是继续讨论RAII这个设计模式。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>上节中讨论了RAII设计模式，但是该模式其实是有一些需要关注的点。本节讨论的便是RAII类中的复制行为需要特别关注。</p><p>通常RAII类对于copy行为实行两种方法，<strong>抑制copy</strong>和<strong>施行引用计数</strong>。</p><p>例如像互斥锁的RAII类型， 我们是不愿意其被复制的。 如果可以被复制，就意味着互斥锁可能被unlock两次，这不是我们想要的。因此对于互斥锁这样的类型，通常将其copy构造函数和赋值运算符delete掉， 避免其复制行为。delete方法在item-06中有讨论过。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;mutex&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>mutex mtx<span class="token punctuation">;</span>
		std<span class="token double-colon punctuation">::</span>lock_guard <span class="token function">lk</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
		std<span class="token double-colon punctuation">::</span>lock_guard <span class="token function">lk2</span><span class="token punctuation">(</span>lk<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//错误，拷贝构造函数已经delete</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种对于RAII类型copy的行为便是引用计数法。</p><p>这个典型的案例就是shared_ptr。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
	<span class="token operator">~</span><span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call ~A()&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>shared_ptr<span class="token operator">&lt;</span>A<span class="token operator">&gt;</span> ptrA <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">make_shared</span><span class="token generic class-name"><span class="token operator">&lt;</span>A<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		
		std<span class="token double-colon punctuation">::</span>shared_ptr<span class="token operator">&lt;</span>A<span class="token operator">&gt;</span> ptrB <span class="token operator">=</span> ptrA<span class="token punctuation">;</span>		
		std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> ptrB<span class="token punctuation">.</span><span class="token function">use_count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>复制RAII对象必须一并复制它所管理的资源，所以资源的copying行为决定RAII对象的copying行为。</li><li>普遍而常见的RAII class的copying行为是：抑制copying，施行引用计数法。不过其他行为也可能被实现。</li></ul>`,12),c=[p];function o(l,i){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","effective-cpp-14.html.vue"]]);export{r as default};