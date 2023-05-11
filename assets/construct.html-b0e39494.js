import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},c=t(`<hr><p>category:</p><ul><li>C++ tag:</li><li>C++</li><li>MyTinySTL</li></ul><hr><h1 id="construct" tabindex="-1"><a class="header-anchor" href="#construct" aria-hidden="true">#</a> construct</h1><h2 id="construct-1" tabindex="-1"><a class="header-anchor" href="#construct-1" aria-hidden="true">#</a> construct</h2><p>construct有多个重载的模板。</p><p>下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">Ty</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">construct</span><span class="token punctuation">(</span>Ty<span class="token operator">*</span> ptr<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token double-colon punctuation">::</span><span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>ptr<span class="token punctuation">)</span> <span class="token function">Ty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面这个版本则是利用完美转发，直接调用Ty的有参的构造函数。构造时也是利用了全局的placement new方法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">Ty</span><span class="token punctuation">,</span> <span class="token keyword">class</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">construct</span><span class="token punctuation">(</span>Ty<span class="token operator">*</span> ptr<span class="token punctuation">,</span> Args<span class="token operator">&amp;&amp;</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token double-colon punctuation">::</span><span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>ptr<span class="token punctuation">)</span> <span class="token function">Ty</span><span class="token punctuation">(</span>mystl<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span>Args<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),e=[c];function o(l,u){return s(),a("div",null,e)}const r=n(p,[["render",o],["__file","construct.html.vue"]]);export{r as default};
