import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-49-了解new-handler的行为" tabindex="-1"><a class="header-anchor" href="#effective-c-49-了解new-handler的行为" aria-hidden="true">#</a> effective c++ 49 了解new-handler的行为</h1><p>本章节主要探讨了如何自定义new-handler。 new-handler是当operator new抛出异常时会调用的一个处理函数。</p><p>当没有设定时，operator new在无法获取内存时将抛出异常。当设定了new-handler时， operator new在无法获取内存时将调用设定的new-handler。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>我们在编写代码时，经常会使用new来创建对象。如果内存不够了，new会怎样？ 默认的行为是，new将抛出一个异常。然而有时候我们不希望这样的默认行为，这个时候我们就需要new-handler。</p><p>我们可以通过set_new_handler设置一个handler。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">outofMem</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cerr <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Unable to satisfy request for memory\\n&quot;</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>outofMem<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token operator">*</span> bigDataArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">1000000000000000000</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当operator new无法满足内存申请时，它会不断调用new-handler函数，直到找到足够的内存。由于会循环调用new-handler，因此设计new-handler时需要注意如下几点：</p><ul><li>让更多内存可被使用。</li><li>安全其他new-handler</li><li>卸载new-handler</li><li>抛出bad_alloc的异常</li><li>不返回，通常调用abort或者exit</li></ul><p>有时候我们需要为某个类的对象创建时候而自定义一个new-handler。我们通常可以像下面这样操作。</p><p>我们需要为Widget类重载operator new的操作符，并且在operator new操作符中使用RAII类NewHandlerHolder去自动resotre默认的new-handler。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">NewHandlerHolder</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler nh<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">handler</span><span class="token punctuation">(</span>nh<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>new_handler handler<span class="token punctuation">;</span>

	<span class="token comment">// Prevent copying</span>
	<span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	NewHandlerHolder<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler <span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler currentHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

std<span class="token double-colon punctuation">::</span>new_handler Widget<span class="token double-colon punctuation">::</span>currentHandler <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


std<span class="token double-colon punctuation">::</span>new_handler <span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	std<span class="token double-colon punctuation">::</span>new_handler oldHandler <span class="token operator">=</span> currentHandler<span class="token punctuation">;</span>
	currentHandler <span class="token operator">=</span> p<span class="token punctuation">;</span>

	<span class="token keyword">return</span> oldHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> Widget<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//std::new_handler handler = std::set_new_handler(currentHandler);</span>
	<span class="token comment">//NewHandlerHolder h(handler);</span>

	NewHandlerHolder <span class="token function">h</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>currentHandler<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果做的更加通用一点，如果有很多个类都希望可以设置new-handler， 就可以使用模板的方法。让有需要的类去继承模板类。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span></span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">NewHandlerSupport</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler <span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler currentHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
std<span class="token double-colon punctuation">::</span>new_handler NewHandlerSupport<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>currentHandler <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
std<span class="token double-colon punctuation">::</span>new_handler <span class="token class-name">NewHandlerSupport</span><span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	std<span class="token double-colon punctuation">::</span>new_handler oldHandler <span class="token operator">=</span> currentHandler<span class="token punctuation">;</span>
	currentHandler <span class="token operator">=</span> p<span class="token punctuation">;</span>

	<span class="token keyword">return</span> oldHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span><span class="token operator">*</span> NewHandlerSupport<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//class Widget : public NewHandlerSupport&lt;Widget&gt; {};</span>
	<span class="token comment">//std::new_handler handler = std::set_new_handler(currentHandler);</span>
	<span class="token comment">//NewHandlerSupport h;</span>
	<span class="token comment">//h.set_new_handler(handler);</span>

	NewHandlerHolder <span class="token function">h</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>currentHandler<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">NewHandlerSupport</span><span class="token operator">&lt;</span><span class="token class-name">Widget</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>set_new_handler允许客户指定一个函数，在内存分配无法获得满足时被调用。</li><li>Nothrow new是一个颇为局限的工具，因为它只使用与内存分配，后继的构造函数调用还是可能抛出异常。</li></ul>`,16),o=[p];function l(c,i){return s(),a("div",null,o)}const d=n(t,[["render",l],["__file","effective-cpp-49.html.vue"]]);export{d as default};
