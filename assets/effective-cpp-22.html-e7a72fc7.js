import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-22-将成员变量声明为private" tabindex="-1"><a class="header-anchor" href="#effective-c-22-将成员变量声明为private" aria-hidden="true">#</a> effective c++ 22 将成员变量声明为private</h1><p>成员变量通常需要声明为private， 这使得我们的类具有更好的封装性。</p><p>在讲解之前，我们可以回忆一下三种类型以及对应不同的继承时的行为。</p><table><thead><tr><th>继承方式</th><th>基类public成员</th><th>基类protected成员</th><th>基类private成员</th></tr></thead><tbody><tr><td>public继承</td><td>public</td><td>protected</td><td>不可见</td></tr><tr><td>protected继承</td><td>protected</td><td>protected</td><td>不可见</td></tr><tr><td>private继承</td><td>private</td><td>private</td><td>不可见</td></tr></tbody></table><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>将变量设置为private， 我们可以提供更好的封装性。我们可以控制变量的读写权限。如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">AccessLevels</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">int</span> <span class="token function">getReadOnly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> readOnly<span class="token punctuation">;</span> <span class="token punctuation">}</span>

	<span class="token keyword">int</span> <span class="token function">getReadWrite</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> readWrite<span class="token punctuation">;</span> <span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">setReadWrite</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span> readWrite <span class="token operator">=</span> value<span class="token punctuation">;</span> <span class="token punctuation">}</span>

	<span class="token keyword">void</span> <span class="token function">setWriteOnly</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span> writeOnly <span class="token operator">=</span> value<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">int</span> noAccess<span class="token punctuation">;</span>
	<span class="token keyword">int</span> readOnly<span class="token punctuation">;</span>
	<span class="token keyword">int</span> readWrite<span class="token punctuation">;</span>
	<span class="token keyword">int</span> writeOnly<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>切记将成员变量声明为private， 这可赋予客户访问数据的一致性，可细微划分访问控制、允诺约束条件获得保证，并提供class作者以充分的实现弹性。</li><li>protected并不比public更具封装性。</li></ul>`,9),c=[p];function i(o,l){return s(),a("div",null,c)}const r=n(e,[["render",i],["__file","effective-cpp-22.html.vue"]]);export{r as default};