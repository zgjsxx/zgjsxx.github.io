import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-04-确定对象被使用前已被初始化" tabindex="-1"><a class="header-anchor" href="#effective-c-04-确定对象被使用前已被初始化" aria-hidden="true">#</a> effective c++ 04 确定对象被使用前已被初始化</h1><p>在本节中，作者主要强调了对象使用前一定要进行显式的初始化。其中要区分构造函数中的赋值和初始化。另外跨编译模块的初始化问题需要引起注意(通常可以使用单例模式解决)。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h3 id="使用成员变量初始化列表进行初始化" tabindex="-1"><a class="header-anchor" href="#使用成员变量初始化列表进行初始化" aria-hidden="true">#</a> 使用成员变量初始化列表进行初始化</h3><p>在构造函数中，下面的形式是赋值:</p><div class="language-CPP line-numbers-mode" data-ext="CPP"><pre class="language-CPP"><code>//01. Assignments
ABEntry::ABEntry(const std::string&amp; name, const std::string&amp; address, const std::list&lt;PhoneNumber&gt;&amp; phones)
{
	// these are all assignments.
	theName = name;
	theAddress = address;
	thePhones = phones;
	numTimesConsulted = 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面这样的形式才是初始化：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//02. Initialization list.</span>
<span class="token class-name">ABEntry</span><span class="token double-colon punctuation">::</span><span class="token function">ABEntry</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> name<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> address<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>list<span class="token operator">&lt;</span>PhoneNumber<span class="token operator">&gt;</span><span class="token operator">&amp;</span> phones<span class="token punctuation">)</span> <span class="token operator">:</span>
	<span class="token function">theName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token function">theAddress</span><span class="token punctuation">(</span>address<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token function">thePhones</span><span class="token punctuation">(</span>phones<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token function">numTimesConsulted</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">// the ctor body is empty.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="确保全局变量已经初始化" tabindex="-1"><a class="header-anchor" href="#确保全局变量已经初始化" aria-hidden="true">#</a> 确保全局变量已经初始化</h3><p>Directory的对象构造时会调用tfs对象的方法，然而此时tfs可能还没有初始化：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Directory</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Directory</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>size_t disks <span class="token operator">=</span> tfs<span class="token punctuation">.</span><span class="token function">numDisks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用单例模式的思想去进行修改，这里调用tfs去返回FileSystem的对象，在tfs函数内部，创建了一个静态变量fs，这就确保了对象的创建。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Directory</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>

	<span class="token function">Directory2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>size_t disks <span class="token operator">=</span> <span class="token function">tfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">numDisks</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

FileSystem<span class="token operator">&amp;</span> <span class="token function">tfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">static</span> FileSystem fs<span class="token punctuation">;</span>
	<span class="token keyword">return</span> fs<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>为内置型对象进行手工初始化，因为c++不保证初始化它们。</li><li>构造函数最好使用成员函数初始化列表进行初始化，而不是在构造函数内部使用赋值操作。初值列列出的成员变量，其排列顺序应该和它们在class中的声明次序相同。</li><li>为免除&quot;跨编译单元的初始化次序&quot;问题，请以local static对象替换non-local static对象。</li></ul>`,15),c=[p];function i(o,l){return s(),a("div",null,c)}const d=n(t,[["render",i],["__file","effective-cpp-04.html.vue"]]);export{d as default};
