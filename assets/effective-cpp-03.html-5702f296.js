import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},o=t(`<h1 id="effective-c-03-尽可能使用const" tabindex="-1"><a class="header-anchor" href="#effective-c-03-尽可能使用const" aria-hidden="true">#</a> effective c++ 03 尽可能使用const</h1><h2 id="在可以使用const的地方尽量使用const-可以避免很多错误" tabindex="-1"><a class="header-anchor" href="#在可以使用const的地方尽量使用const-可以避免很多错误" aria-hidden="true">#</a> 在可以使用const的地方尽量使用const，可以避免很多错误</h2><h2 id="如果在const函数内部需要修改成员变量-则需要使用mutable" tabindex="-1"><a class="header-anchor" href="#如果在const函数内部需要修改成员变量-则需要使用mutable" aria-hidden="true">#</a> 如果在const函数内部需要修改成员变量， 则需要使用mutable</h2><p>下面是一个例子，如果不适用mutable， 则不能通过编译。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">CTextBlock3</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">CTextBlock3</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> t<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">pText</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">lengthIsValid</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	std<span class="token double-colon punctuation">::</span>size_t <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> pText<span class="token punctuation">;</span>

	<span class="token keyword">mutable</span> std<span class="token double-colon punctuation">::</span>size_t textLength<span class="token punctuation">;</span>
	<span class="token keyword">mutable</span> <span class="token keyword">bool</span> lengthIsValid<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

std<span class="token double-colon punctuation">::</span>size_t <span class="token class-name">CTextBlock3</span><span class="token double-colon punctuation">::</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lengthIsValid<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		textLength <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>pText<span class="token punctuation">)</span><span class="token punctuation">;</span>
		lengthIsValid <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> textLength<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    CTextBlock3 <span class="token function">block</span><span class="token punctuation">(</span><span class="token string">&quot;chinese&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    block<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更常见的一个场景，在一个类中有一个互斥锁的成员变量，在const函数中要对这个互斥锁加锁，那这个时候不加mutable是会失败的。</p><h2 id="当const和non-const成员函数有着实质等价的实现时-令non-const版本调用const版本可避免代码重复" tabindex="-1"><a class="header-anchor" href="#当const和non-const成员函数有着实质等价的实现时-令non-const版本调用const版本可避免代码重复" aria-hidden="true">#</a> 当const和non-const成员函数有着实质等价的实现时，令non-const版本调用const版本可避免代码重复</h2><p>这个点可以参考书本中的实现，但是我觉得这个点使用的频率不是很高。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">TextBlock</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">TextBlock</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string t<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">text</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// operator[] for const objects.</span>
	<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t position<span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call const&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
		<span class="token keyword">return</span> text<span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// operator[] for non-const objects.</span>
	<span class="token keyword">char</span><span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t position<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;call non-const&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
		<span class="token comment">// In order for the non-const operator[] to call const operator[].</span>
		<span class="token keyword">return</span> <span class="token generic-function"><span class="token function">const_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&amp;</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">const</span> TextBlock<span class="token operator">&amp;</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">[</span>position<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>string text<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    TextBlock <span class="token function">book</span><span class="token punctuation">(</span><span class="token string">&quot;chinese&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> book<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token keyword">const</span> TextBlock <span class="token function">book2</span><span class="token punctuation">(</span><span class="token string">&quot;chinese&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> book2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="%22https://godbolt.org/z/nGdoPrqd4%22">have a try</a></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>将某些东西声明为const可以帮助编译器检查出错误用法。const可被施加于任何作用域的对象，函数参数，函数返回值类型，成员函数本体。</li><li>编译器强制实施比特常量性bitwise constness， 但你编写的程序应该使用概念上的常量性（conceptual constness）</li><li>当const和non-const成员函数有着实质等价的实现时，令non-const版本调用const版本可避免代码重复。</li></ul>`,12),p=[o];function c(l,i){return s(),a("div",null,p)}const r=n(e,[["render",c],["__file","effective-cpp-03.html.vue"]]);export{r as default};
