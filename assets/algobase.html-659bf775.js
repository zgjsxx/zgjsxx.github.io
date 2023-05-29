import{_ as s,V as n,W as a,a0 as p}from"./framework-9a29aaa0.js";const e={},t=p(`<h1 id="algobase" tabindex="-1"><a class="header-anchor" href="#algobase" aria-hidden="true">#</a> algobase</h1><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h3 id="unchecked-copy" tabindex="-1"><a class="header-anchor" href="#unchecked-copy" aria-hidden="true">#</a> unchecked_copy</h3><p>unchecked_copy有两个版本，一个接受平凡的对象类型的参数，其他的类型则进入normal版本。</p><p><strong>1.normal版本</strong></p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">InputIter</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">OutputIter</span><span class="token operator">&gt;</span>
OutputIter 
<span class="token function">unchecked_copy</span><span class="token punctuation">(</span>InputIter first<span class="token punctuation">,</span> InputIter last<span class="token punctuation">,</span> OutputIter result<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">unchecked_copy_cat</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> last<span class="token punctuation">,</span> result<span class="token punctuation">,</span> <span class="token function">iterator_category</span><span class="token punctuation">(</span>first<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2.平凡类型</strong></p><p>由于平凡数据类型没有自定义的拷贝构造函数，因此直接可以使用memmove直接进行内存拷贝。</p><p>这里使用<code>std::is_trivially_copy_assignable&lt;Up&gt;::value</code>去判断类型U的拷贝构造函数是否是平凡的。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">Tp</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">Up</span><span class="token operator">&gt;</span>
<span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>enable_if<span class="token operator">&lt;</span>
  std<span class="token double-colon punctuation">::</span>is_same<span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">std</span><span class="token double-colon punctuation">::</span>remove_const<span class="token operator">&lt;</span>Tp<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type<span class="token punctuation">,</span> Up<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>value <span class="token operator">&amp;&amp;</span>
  std<span class="token double-colon punctuation">::</span>is_trivially_copy_assignable<span class="token operator">&lt;</span>Up<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>value<span class="token punctuation">,</span>
  Up<span class="token operator">*</span><span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>type
<span class="token function">unchecked_copy</span><span class="token punctuation">(</span>Tp<span class="token operator">*</span> first<span class="token punctuation">,</span> Tp<span class="token operator">*</span> last<span class="token punctuation">,</span> Up<span class="token operator">*</span> result<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token keyword">auto</span> n <span class="token operator">=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>size_t<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>last <span class="token operator">-</span> first<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        std<span class="token double-colon punctuation">::</span><span class="token function">memmove</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> first<span class="token punctuation">,</span> n <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>Up<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result <span class="token operator">+</span> n<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lexicographical-compare-字典序比较" tabindex="-1"><a class="header-anchor" href="#lexicographical-compare-字典序比较" aria-hidden="true">#</a> lexicographical_compare(字典序比较)</h3><p><strong>字典序</strong>是指按照单词首字母顺序在字典中进行排序的方法。</p><p>该方法有三个版本。第一个版本和第二个版本是比较通用的版本，区别在于第二个版本可以传入自定义的比较函数。第三个版本是一个针对const unsigned char*的特化版本。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">InputIter1</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">InputIter2</span><span class="token operator">&gt;</span>
<span class="token keyword">bool</span> <span class="token function">lexicographical_compare</span><span class="token punctuation">(</span>InputIter1 first1<span class="token punctuation">,</span> InputIter1 last1<span class="token punctuation">,</span>
                             InputIter2 first2<span class="token punctuation">,</span> InputIter2 last2<span class="token punctuation">)</span>

<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">InputIter1</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">InputIter2</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">Compred</span><span class="token operator">&gt;</span>
<span class="token keyword">bool</span> <span class="token function">lexicographical_compare</span><span class="token punctuation">(</span>InputIter1 first1<span class="token punctuation">,</span> InputIter1 last1<span class="token punctuation">,</span>
                             InputIter2 first2<span class="token punctuation">,</span> InputIter2 last2<span class="token punctuation">,</span> Compred comp<span class="token punctuation">)</span>

<span class="token keyword">bool</span> <span class="token function">lexicographical_compare</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token operator">*</span> first1<span class="token punctuation">,</span>
                             <span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token operator">*</span> last1<span class="token punctuation">,</span>
                             <span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token operator">*</span> first2<span class="token punctuation">,</span>
                             <span class="token keyword">const</span> <span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token operator">*</span> last2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="equal" tabindex="-1"><a class="header-anchor" href="#equal" aria-hidden="true">#</a> equal</h3><p>equal方法有两个办法，区别在于第二个版本可以传入自定义的比较函数。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">InputIter1</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">InputIter2</span><span class="token operator">&gt;</span>
<span class="token keyword">bool</span> <span class="token function">equal</span><span class="token punctuation">(</span>InputIter1 first1<span class="token punctuation">,</span> InputIter1 last1<span class="token punctuation">,</span> InputIter2 first2<span class="token punctuation">)</span>

<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token class-name">InputIter1</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">InputIter2</span><span class="token punctuation">,</span> <span class="token keyword">class</span> <span class="token class-name">Compared</span><span class="token operator">&gt;</span>
<span class="token keyword">bool</span> <span class="token function">equal</span><span class="token punctuation">(</span>InputIter1 first1<span class="token punctuation">,</span> InputIter1 last1<span class="token punctuation">,</span> InputIter2 first2<span class="token punctuation">,</span> Compared comp<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[t];function c(l,i){return n(),a("div",null,o)}const u=s(e,[["render",c],["__file","algobase.html.vue"]]);export{u as default};
