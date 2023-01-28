import{_ as n,V as s,W as a,a1 as t}from"./framework-d934f75f.js";const p={},e=t(`<p>当我们使用了new关键字去创建一个对象时，你知道背后做了哪些事情吗？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>Test<span class="token operator">*</span> a <span class="token operator">=</span> <span class="token keyword">new</span> Test；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上吗这样简单的一行语句， 背后做了一下三件事情：</p><ul><li>1.调用operator new 申请内存， 申请大小为Test类的大小</li><li>2.调用placement new调用构造函数，构造对象</li><li>3.返回对象的地址</li></ul><p>这里的三个步骤中出现了operator new和placement new，下面将对这两个语句进行详解。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;malloc.h&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">//student class</span>
<span class="token keyword">class</span> <span class="token class-name">stu</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">stu</span><span class="token punctuation">(</span>string name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        name_ <span class="token operator">=</span> name<span class="token punctuation">;</span>
        age_ <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;name = &quot;</span> <span class="token operator">&lt;&lt;</span> name_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
        cout<span class="token operator">&lt;&lt;</span> <span class="token string">&quot;age = &quot;</span> <span class="token operator">&lt;&lt;</span> age_ <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    string name_<span class="token punctuation">;</span>
    <span class="token keyword">int</span> age_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">void</span><span class="token operator">*</span> stu1 <span class="token operator">=</span> <span class="token punctuation">(</span>stu<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token double-colon punctuation">::</span><span class="token keyword">new</span> <span class="token punctuation">(</span>stu1<span class="token punctuation">)</span> <span class="token function">stu</span><span class="token punctuation">(</span><span class="token string">&quot;stu1&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">(</span><span class="token punctuation">(</span>stu<span class="token operator">*</span><span class="token punctuation">)</span>stu1<span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","placement_operator_new.html.vue"]]);export{r as default};
