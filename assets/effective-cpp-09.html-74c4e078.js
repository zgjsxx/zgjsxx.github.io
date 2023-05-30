import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-09-绝不要在构造和析构过程中调用virtual函数" tabindex="-1"><a class="header-anchor" href="#effective-c-09-绝不要在构造和析构过程中调用virtual函数" aria-hidden="true">#</a> effective c++ 09 绝不要在构造和析构过程中调用virtual函数</h1><p>本文主要介绍的是一个误区，即在基类的构造函数中调用虚函数，该调用不会下降到派生类中的虚函数中执行。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>看下面的一个例子，我们在main函数中创建了Derived对象， 该对象会首先调用Base类的构造函数去初始化基类的成分。在Base类的构造函数中，其调用了虚函数doSomething，试想我们最终会调用那个版本的doSomething？ <code>Base::doSomething</code>还是<code>Derived::doSomething</code>?</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token comment">// Base class for all transactions.</span>
<span class="token keyword">class</span> <span class="token class-name">Base</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Base::doSomething&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// Implementation of base class ctor.</span>
<span class="token class-name">Base</span><span class="token double-colon punctuation">::</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Derived</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Derived</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Derived::doSomething&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	Derived d<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终的执行结果是打印了<code>Base::doSomething</code>的日志, 为何如此？</p><p>在构造基类成分的时候，对象还是一个Base对象，可以想象在构造函数的开始，编译器帮我们生成了一条vptr的赋值语句，如下所示:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token class-name">Base</span><span class="token double-colon punctuation">::</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	vptr <span class="token operator">=</span> <span class="token operator">&amp;</span>Base<span class="token double-colon punctuation">::</span>vftable<span class="token punctuation">;</span><span class="token comment">//编译器帮我们生成的</span>
	<span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于其vptr(虚表指针)还是指向Base类的虚表， 因此其调用并不会下降到派生类中。</p><p>在基类的析构函数中调用virtual函数的话也不会下降到调用派生类的虚函数，因为这个时候，对象的派生类成分已经被析构，此时的对象已经是只含有基类成分的对象，因此这个时候其调用也不会下降到派生类中。</p><p>这个点是很容易犯的错误。因此作者提醒我们在<strong>构造函数</strong>和<strong>析构函数</strong>中千万不要调用virtual函数！</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>在构造和析构期间不要调用virtual函数，因为这类调用从不下降至derived class运行。</li></ul>`,13),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","effective-cpp-09.html.vue"]]);export{d as default};
