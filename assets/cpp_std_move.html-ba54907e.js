import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},o=t(`<h1 id="std-move" tabindex="-1"><a class="header-anchor" href="#std-move" aria-hidden="true">#</a> std::move</h1><h2 id="std-move返回局部变量" tabindex="-1"><a class="header-anchor" href="#std-move返回局部变量" aria-hidden="true">#</a> std::move返回局部变量</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">A</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A()&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token operator">~</span><span class="token function">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;~A()&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">A</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span><span class="token string">&quot;A(const A&amp; other)&quot;</span><span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    A<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span><span class="token string">&quot;const A&amp; other&quot;</span><span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>        
    <span class="token punctuation">}</span>
    <span class="token function">A</span><span class="token punctuation">(</span>A<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span><span class="token string">&quot;A&amp;&amp; other&quot;</span><span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
    A<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>A<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span><span class="token string">&quot;A&amp; operator=(A&amp;&amp; other)&quot;</span><span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

A <span class="token function">GetA_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    A a<span class="token punctuation">;</span>
    <span class="token keyword">return</span> a<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

A <span class="token function">GetA_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    A a<span class="token punctuation">;</span>
    <span class="token keyword">return</span> std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

A <span class="token function">GetA_3</span><span class="token punctuation">(</span>A<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> other<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

A <span class="token function">GetA_4</span><span class="token punctuation">(</span>A<span class="token operator">&amp;&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>other<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    A a1 <span class="token operator">=</span> <span class="token function">GetA_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;===&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    A a2 <span class="token operator">=</span> <span class="token function">GetA_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;===&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span> 
    A a3<span class="token punctuation">;</span>
    A a4 <span class="token operator">=</span> <span class="token function">GetA_3</span><span class="token punctuation">(</span>a3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;===&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span> 
    A a5<span class="token punctuation">;</span>
    A a6 <span class="token operator">=</span> <span class="token function">GetA_4</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>a5<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;===&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),e=[o];function c(l,u){return s(),a("div",null,e)}const d=n(p,[["render",c],["__file","cpp_std_move.html.vue"]]);export{d as default};
