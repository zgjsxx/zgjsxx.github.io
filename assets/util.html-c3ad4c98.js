import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},t=e(`<h1 id="util" tabindex="-1"><a class="header-anchor" href="#util" aria-hidden="true">#</a> util</h1><p>util.h主要实现了一些通用的模板方法，例如move， forward， swap等函数， 以及pair等。</p><h2 id="remove-reference" tabindex="-1"><a class="header-anchor" href="#remove-reference" aria-hidden="true">#</a> remove_reference</h2><p>util.h并没有自己实现自己的remove_reference版本，而是直接调用了<code>std::remove_reference</code>。这里还是有必要了解其实现的原理。</p><p>首先讲解一下remove_reference的作用，其作用是为了去除&amp;的标记。</p><p>例如，T&amp;&amp; -&gt; T， T&amp; -&gt; T， T -&gt; T。</p><p>这里定义了类模板，并为其创建了两个特化版本。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">_Tp</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">remove_reference</span>
<span class="token punctuation">{</span> <span class="token keyword">typedef</span> _Tp   type<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token comment">// 特化版本</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">_Tp</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">remove_reference</span><span class="token operator">&lt;</span>_Tp<span class="token operator">&amp;</span><span class="token operator">&gt;</span>
<span class="token punctuation">{</span> <span class="token keyword">typedef</span> _Tp   type<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">_Tp</span><span class="token operator">&gt;</span>
<span class="token keyword">struct</span> <span class="token class-name">remove_reference</span><span class="token operator">&lt;</span>_Tp<span class="token operator">&amp;&amp;</span><span class="token operator">&gt;</span>
<span class="token punctuation">{</span> <span class="token keyword">typedef</span> _Tp   type<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="move" tabindex="-1"><a class="header-anchor" href="#move" aria-hidden="true">#</a> move</h2><p>标准库中有<code>std::move</code>,作者这里自己实现了一遍，便于读者理解其原理。</p><p>move的作用是:</p><ul><li>当传递一个左值时，入参arg为一个左值引用，这个时候将强转为右值引用。</li><li>当传递一个右值时，入参arg为一个右值引用，这个时候仍然强转为右值引用。</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>remove_reference<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type<span class="token operator">&amp;&amp;</span> <span class="token function">move</span><span class="token punctuation">(</span>T<span class="token operator">&amp;&amp;</span> arg<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
<span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">static_cast</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>remove_reference<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type<span class="token operator">&amp;&amp;</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后还需要补充一点：</p><p>从函数的形式中看出，<code>move</code>最终会返回一个右值引用<code>T &amp;&amp;</code>，那么它是左值还是右值呢?</p><p>看下面的例子这个：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token operator">&amp;&amp;</span>ref <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">move</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>右值引用ref指向的必须是右值，所以move返回的<code>T &amp;&amp;</code>是个右值。而ref本身又是左值。</p><p>所以右值引用既可能是左值，又可能是右值吗？</p><p>确实如此：右值引用既可以是左值也可以是右值，如果有名称则为左值，否则是右值。</p><p>作为函数返回值的 &amp;&amp; 是右值，直接声明出来的 &amp;&amp; 是左值。</p><p>因此<code>std::move</code>返回的是一个右值引用，但是该右值引用是一个右值。</p><h2 id="forward" tabindex="-1"><a class="header-anchor" href="#forward" aria-hidden="true">#</a> forward</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//转发左值</span>
<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
T<span class="token operator">&amp;&amp;</span> <span class="token function">forward</span><span class="token punctuation">(</span><span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>remove_reference<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type<span class="token operator">&amp;</span> arg<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>T<span class="token operator">&amp;&amp;</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//转发右值</span>
<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
T<span class="token operator">&amp;&amp;</span> <span class="token function">forward</span><span class="token punctuation">(</span><span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>remove_reference<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type<span class="token operator">&amp;&amp;</span> arg<span class="token punctuation">)</span> <span class="token keyword">noexcept</span>
<span class="token punctuation">{</span>
    <span class="token keyword">static_assert</span><span class="token punctuation">(</span><span class="token operator">!</span>std<span class="token double-colon punctuation">::</span>is_lvalue_reference<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>value<span class="token punctuation">,</span> <span class="token string">&quot;bad forward&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>T<span class="token operator">&amp;&amp;</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从搭配情况下来看，应该有下面四种组合：</p><ul><li>接受左值 -&gt; T为左值引用 -&gt; 转发成左值引用(左值)</li><li>接受右值 -&gt; T为右值引用 -&gt; 转发成右值引用(右值)</li><li>接受左值 -&gt; T右值引用 -&gt; 转发成右值引用</li><li>接受右值 -&gt; T左值引用 -&gt; 转发成左值引用(static_assert)</li></ul><p>前两点便是我们所认识的完美转发，搭配万能引用，从而完美转发给调用的函数。(完美转发 = 引用折叠 + 万能引用 + std::forward)</p><ul><li>接受左值 -&gt; T为左值引用 -&gt; 转发成左值引用(左值)</li><li>接受右值 -&gt; T为右值引用 -&gt; 转发成右值引用(右值)</li></ul><p>关于第三点和第四点，第四点明确拒绝了。为什么第三点却被允许呢？</p><ul><li>接受左值 -&gt; T右值引用 -&gt; 转发成右值引用</li><li>接受右值 -&gt; T左值引用 -&gt; 转发成左值引用(static_assert)</li></ul><p>实际上第三点和<code>std::move</code>的功能是一样的，所以可以被允许。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">&amp;&amp;</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;right value&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">&amp;</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;left value&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">func</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&amp;&amp;</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//ok print right value a</span>
    <span class="token comment">// func(std::forward&lt;int&amp;&gt;(7));//fail</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面看一个完美转发的例子：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">PrintV</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout<span class="token operator">&lt;&lt;</span><span class="token string">&quot;lvalue&quot;</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">PrintV</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">&amp;&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout<span class="token operator">&lt;&lt;</span><span class="token string">&quot;rvalue&quot;</span><span class="token operator">&lt;&lt;</span>std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">Test</span><span class="token punctuation">(</span>T <span class="token operator">&amp;&amp;</span>t<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">PrintV</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span>T<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> argv<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// insert code here...</span>
    <span class="token function">Test</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// lvalue rvalue rvalue</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">Test</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// lvalue lvalue rvalue</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","util.html.vue"]]);export{u as default};