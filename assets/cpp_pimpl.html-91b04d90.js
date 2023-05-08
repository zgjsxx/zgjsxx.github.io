import{_ as n,V as s,W as a,a0 as p}from"./framework-9a29aaa0.js";const t={},e=p(`<h1 id="c-中的编程技巧pimpl" tabindex="-1"><a class="header-anchor" href="#c-中的编程技巧pimpl" aria-hidden="true">#</a> c++中的编程技巧pImpl</h1><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// ----------------------</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span> <span class="token comment">// PImpl</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
 
<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// Constructor and Destructors</span>
 
    <span class="token operator">~</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">explicit</span> <span class="token function">User</span><span class="token punctuation">(</span>string name<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// Assignment Operator and Copy Constructor</span>
 
    <span class="token function">User</span><span class="token punctuation">(</span><span class="token keyword">const</span> User<span class="token operator">&amp;</span> other<span class="token punctuation">)</span><span class="token punctuation">;</span>
    User<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>User rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// Getter</span>
    <span class="token keyword">int</span> <span class="token function">getSalary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
 
    <span class="token comment">// Setter</span>
    <span class="token keyword">void</span> <span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">// Internal implementation class</span>
    <span class="token keyword">class</span> <span class="token class-name">Impl</span><span class="token punctuation">;</span>
 
    <span class="token comment">// Pointer to the internal implementation</span>
    unique_ptr<span class="token operator">&lt;</span>Impl<span class="token operator">&gt;</span> pimpl<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
 
<span class="token keyword">struct</span> <span class="token class-name">User</span><span class="token operator">:</span><span class="token base-clause"><span class="token operator">:</span><span class="token class-name">Impl</span></span> <span class="token punctuation">{</span>
 
    <span class="token function">Impl</span><span class="token punctuation">(</span>string name<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token function">move</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 
    <span class="token operator">~</span><span class="token function">Impl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 
    <span class="token keyword">void</span> <span class="token function">welcomeMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> 
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Welcome, &quot;</span>
             <span class="token operator">&lt;&lt;</span> name <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    string name<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> salary<span class="token punctuation">{</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token comment">// Constructor connected with our Impl structure</span>
<span class="token class-name">User</span><span class="token double-colon punctuation">::</span><span class="token function">User</span><span class="token punctuation">(</span>string name<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token function">pimpl</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token function">Impl</span><span class="token punctuation">(</span><span class="token function">move</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    pimpl<span class="token operator">-&gt;</span><span class="token function">welcomeMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// Default Constructor</span>
<span class="token class-name">User</span><span class="token double-colon punctuation">::</span><span class="token operator">~</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
 
<span class="token comment">// Assignment operator and Copy constructor</span>
 
<span class="token class-name">User</span><span class="token double-colon punctuation">::</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token keyword">const</span> User<span class="token operator">&amp;</span> other<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token function">pimpl</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token function">Impl</span><span class="token punctuation">(</span><span class="token operator">*</span>other<span class="token punctuation">.</span>pimpl<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span>
 
User<span class="token operator">&amp;</span> User<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>User rhs<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">swap</span><span class="token punctuation">(</span>pimpl<span class="token punctuation">,</span> rhs<span class="token punctuation">.</span>pimpl<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// Getter and setter</span>
<span class="token keyword">int</span> <span class="token class-name">User</span><span class="token double-colon punctuation">::</span><span class="token function">getSalary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> pimpl<span class="token operator">-&gt;</span>salary<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">void</span> <span class="token class-name">User</span><span class="token double-colon punctuation">::</span><span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token keyword">int</span> salary<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    pimpl<span class="token operator">-&gt;</span>salary <span class="token operator">=</span> salary<span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Salary set to &quot;</span>
         <span class="token operator">&lt;&lt;</span> salary <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    User <span class="token function">user</span><span class="token punctuation">(</span><span class="token string">&quot;demo&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setSalary</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pimpl的缺点" tabindex="-1"><a class="header-anchor" href="#pimpl的缺点" aria-hidden="true">#</a> pImpl的缺点</h2><ul><li>pImpl是C++程序员经常遇到的一种编程模式，主要用于建立“编译防火墙”。同时，带来了屏蔽私有接口、移动语义友好等优点；</li><li>对于const函数被非const指针所屏蔽的问题，可以通过std::experimental::propagate_const来解决。</li></ul>`,5),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","cpp_pimpl.html.vue"]]);export{r as default};
