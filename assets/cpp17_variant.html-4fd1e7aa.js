import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="std-variant" tabindex="-1"><a class="header-anchor" href="#std-variant" aria-hidden="true">#</a> std::variant</h1><p>需要一个求解某个类型在可变参数类型中的位置。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdexcept&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstring&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;utility&gt;</span> <span class="token comment">// For std::forward</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;type_traits&gt;</span> <span class="token comment">// For std::is_same, std::remove_reference</span></span>


<span class="token comment">//Position&lt;Ts...&gt; 从 Ts... 找到 T类型的下标</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">U</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>Ts<span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">Position</span> <span class="token punctuation">{</span>
    <span class="token keyword">constexpr</span> <span class="token keyword">static</span> <span class="token keyword">int</span> pos <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span>is_same<span class="token operator">&lt;</span>U<span class="token punctuation">,</span> T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>value <span class="token operator">?</span> id <span class="token operator">:</span> Position<span class="token operator">&lt;</span>id <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> U<span class="token punctuation">,</span> Ts<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>pos<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">U</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">Position</span><span class="token operator">&lt;</span>id<span class="token punctuation">,</span> U<span class="token punctuation">,</span> T<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">constexpr</span> <span class="token keyword">static</span> <span class="token keyword">int</span> pos <span class="token operator">=</span> id<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>Ts<span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
    <span class="token keyword">int</span> <span class="token function">get_index</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> Position<span class="token operator">&lt;</span><span class="token number">0</span><span class="token punctuation">,</span> T<span class="token punctuation">,</span> Ts<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>pos<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

A<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">float</span><span class="token punctuation">,</span> <span class="token keyword">double</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&gt;</span> a<span class="token punctuation">;</span>
std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> a<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get_index</span><span class="token generic class-name"><span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","cpp17_variant.html.vue"]]);export{u as default};
