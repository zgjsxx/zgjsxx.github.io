import{_ as s,V as a,W as n,a0 as e}from"./framework-c954d91f.js";const p={},t=e(`<h1 id="enable-if" tabindex="-1"><a class="header-anchor" href="#enable-if" aria-hidden="true">#</a> enable_if</h1><p>C++11中引入了std::enable_if函数，函数原型如下:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span> <span class="token keyword">bool</span> B<span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">T</span> <span class="token operator">=</span> <span class="token keyword">void</span> <span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">enable_if</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可能的函数实现:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">bool</span> B<span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">T</span> <span class="token operator">=</span> <span class="token keyword">void</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">enable_if</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">enable_if</span><span class="token operator">&lt;</span><span class="token boolean">true</span><span class="token punctuation">,</span> T<span class="token operator">&gt;</span> <span class="token punctuation">{</span> <span class="token keyword">typedef</span> T type<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由上可知，只有当第一个模板参数为true时，enable_if会包含一个type=T的公有成员，否则没有该公有成员。</p><p>头文件:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;type_traits&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8),o=[t];function c(l,i){return a(),n("div",null,o)}const d=s(p,[["render",c],["__file","cpp_enable_if.html.vue"]]);export{d as default};
