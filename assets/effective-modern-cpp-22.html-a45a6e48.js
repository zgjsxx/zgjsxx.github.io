import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="item22-当使用pimpl惯用法-请在实现文件中定义特殊成员函数" tabindex="-1"><a class="header-anchor" href="#item22-当使用pimpl惯用法-请在实现文件中定义特殊成员函数" aria-hidden="true">#</a> Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数</h1><p>亲测，下面这种写法在gcc编译器上，不会报delete incomplete 的问题。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//widget.h</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token punctuation">{</span>                     
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">struct</span> <span class="token class-name">Impl</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>unique_ptr<span class="token operator">&lt;</span>Impl<span class="token operator">&gt;</span> pImpl<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>

<span class="token keyword">struct</span> <span class="token class-name">Widget</span><span class="token operator">:</span><span class="token base-clause"><span class="token operator">:</span><span class="token class-name">Impl</span></span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">double</span><span class="token operator">&gt;</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">Widget</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                    <span class="token comment">//根据条款21，通过std::make_unique</span>
<span class="token operator">:</span> <span class="token function">pImpl</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">make_unique</span><span class="token generic class-name"><span class="token operator">&lt;</span>Impl<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>   <span class="token comment">//来创建std::unique_ptr</span>
<span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    Widget w<span class="token punctuation">;</span>      
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","effective-modern-cpp-22.html.vue"]]);export{d as default};
