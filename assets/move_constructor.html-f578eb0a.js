import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h2 id="什么样的类需要自定义析构函数" tabindex="-1"><a class="header-anchor" href="#什么样的类需要自定义析构函数" aria-hidden="true">#</a> 什么样的类需要自定义析构函数?</h2><p>首先看下面这个类，这个类需要写自定义析构函数吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string name <span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token keyword">int</span> id<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">name_</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">age_</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">id</span><span class="token punctuation">(</span>id_<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>；
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> age_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> id_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> id_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Student</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> s <span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        name_ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">memcpy</span><span class="token punctuation">(</span>name_<span class="token punctuation">,</span> s<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//需要析构函数吗？</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>string <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> name_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> age_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> id_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","move_constructor.html.vue"]]);export{d as default};
