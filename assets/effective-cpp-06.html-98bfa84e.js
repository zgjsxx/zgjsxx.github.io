import{_ as n,V as a,W as s,a0 as e}from"./framework-9a29aaa0.js";const p={},t=e(`<h1 id="effective-c-06-不自动生成的函数-就明确拒绝" tabindex="-1"><a class="header-anchor" href="#effective-c-06-不自动生成的函数-就明确拒绝" aria-hidden="true">#</a> effective c++ 06 不自动生成的函数，就明确拒绝</h1><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h2 id="方法1-将成员函数声明为private并不予实现" tabindex="-1"><a class="header-anchor" href="#方法1-将成员函数声明为private并不予实现" aria-hidden="true">#</a> 方法1:将成员函数声明为private并不予实现</h2><p>下面是一个例子，这个例子如果进行赋值编译将不会通过。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">HomeForSale</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">HomeForSale</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token function">HomeForSale</span><span class="token punctuation">(</span><span class="token keyword">const</span> HomeForSale<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	HomeForSale<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> HomeForSale<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    HomeForSale h1<span class="token punctuation">;</span>
    HomeForSale h2 <span class="token operator">=</span> h1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法2-继承uncopyable" tabindex="-1"><a class="header-anchor" href="#方法2-继承uncopyable" aria-hidden="true">#</a> 方法2：继承Uncopyable</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Uncopyable</span>
<span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
	<span class="token function">Uncopyable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">Uncopyable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token function">Uncopyable</span><span class="token punctuation">(</span><span class="token keyword">const</span> Uncopyable<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	Uncopyable<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Uncopyable<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">HomeForSale2</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">private</span> <span class="token class-name">Uncopyable</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">HomeForSale2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    HomeForSale2 h1<span class="token punctuation">;</span>
    HomeForSale2 h2 <span class="token operator">=</span> h1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>某些场景，我们不愿意让编译器自动生成一些函数，可以将成员函数声明为private并不予实现。另外使用Uncopyable这样的base class也是一种方法。</li><li>在更新的c++标准中，可以使用<code>= delete</code>。</li></ul>`,9),o=[t];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","effective-cpp-06.html.vue"]]);export{r as default};
