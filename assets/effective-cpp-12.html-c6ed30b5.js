import{_ as p,V as t,W as e,X as n,Y as s,$ as o,a0 as c,F as l}from"./framework-9a29aaa0.js";const i={},u=c(`<h1 id="effective-c-12-复制对象时勿忘其每一个成分" tabindex="-1"><a class="header-anchor" href="#effective-c-12-复制对象时勿忘其每一个成分" aria-hidden="true">#</a> effective c++ 12 复制对象时勿忘其每一个成分</h1><p>本文也是主要讲解的是赋值构造函数需要复制应该复制的每一个成分，这里面最容易忘记<strong>复制的就是基类的成分</strong>。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>本例主要强调在自定义复制构造函数和赋值运算符时一定要检查是否复制了所需要的元素。尤其是派生类中不能忘记复制基类的成分。</p><p>下面便是一个例子，其中的派生类中处理了复制基类的成分。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Base</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Base</span><span class="token punctuation">(</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">b_</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token function">Base</span><span class="token punctuation">(</span><span class="token keyword">const</span> Base<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
	Base<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Base<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">getB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> b_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">int</span> b_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Base</span><span class="token double-colon punctuation">::</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token keyword">const</span> Base<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span> <span class="token operator">:</span>
	<span class="token function">b_</span><span class="token punctuation">(</span>rhs<span class="token punctuation">.</span>b_<span class="token punctuation">)</span>
<span class="token punctuation">{</span>

<span class="token punctuation">}</span>

Base<span class="token operator">&amp;</span> Base<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Base<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
<span class="token punctuation">{</span>

	b_ <span class="token operator">=</span> rhs<span class="token punctuation">.</span>b_<span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Derived</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Base</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Derived</span><span class="token punctuation">(</span><span class="token keyword">int</span> d<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">d_</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Base</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
	<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token function">Derived</span><span class="token punctuation">(</span><span class="token keyword">const</span> Derived<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
	Derived<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Derived<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">printVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;d_ = &quot;</span> <span class="token operator">&lt;&lt;</span> d_ <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;, b_ = &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token function">getB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">int</span> d_<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name">Derived</span><span class="token double-colon punctuation">::</span><span class="token function">Derived</span><span class="token punctuation">(</span><span class="token keyword">const</span> Derived<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span><span class="token operator">:</span>
    <span class="token function">d_</span><span class="token punctuation">(</span>rhs<span class="token punctuation">.</span>d_<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Base</span><span class="token punctuation">(</span>rhs<span class="token punctuation">)</span>
<span class="token punctuation">{</span>

<span class="token punctuation">}</span>

Derived<span class="token operator">&amp;</span> Derived<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> Derived<span class="token operator">&amp;</span> rhs<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	d_ <span class="token operator">=</span> rhs<span class="token punctuation">.</span>d_<span class="token punctuation">;</span>
    Base<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span>rhs<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Derived <span class="token function">d1</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d1<span class="token punctuation">.</span><span class="token function">printVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Derived <span class="token function">d2</span><span class="token punctuation">(</span>d1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    d2<span class="token punctuation">.</span><span class="token function">printVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Derived <span class="token function">d3</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d3<span class="token punctuation">.</span><span class="token function">printVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    d3 <span class="token operator">=</span> d1<span class="token punctuation">;</span>
    d3<span class="token punctuation">.</span><span class="token function">printVal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),r={href:"https://godbolt.org/z/r7sxqEzba",target:"_blank",rel:"noopener noreferrer"},k=n("h2",{id:"总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),s(" 总结")],-1),d=n("ul",null,[n("li",null,'copying函数应该确保复制"对象内的所有成员变量"以及"所有base class成分"。'),n("li",null,"不要尝试以一个copying 函数去实现另一个copying函数。应该将共同机能放进第三个函数中，并又两个copying函数共同调用。")],-1);function v(b,m){const a=l("ExternalLinkIcon");return t(),e("div",null,[u,n("p",null,[n("a",r,[s("have a try"),o(a)])]),k,d])}const y=p(i,[["render",v],["__file","effective-cpp-12.html.vue"]]);export{y as default};
