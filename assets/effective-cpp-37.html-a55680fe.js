import{_ as e,V as t,W as p,X as n,Y as s,$ as o,a0 as c,F as l}from"./framework-9a29aaa0.js";const i={},r=c(`<h1 id="effective-c-37-不重新定义继承而来的缺省参数值" tabindex="-1"><a class="header-anchor" href="#effective-c-37-不重新定义继承而来的缺省参数值" aria-hidden="true">#</a> effective c++ 37 不重新定义继承而来的缺省参数值</h1><p>本节主要讲解了和虚函数中的默认参数有关的话题。本节的话题在日常工作中使用到的频率不是很高。下面通过例子来具体说明。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>我们有一个Shape类，其中含有一个名为draw的虚函数，draw含有一个入参color， 其默认参数为Red。目前我们有两个派生类Rectangle和Circle，其中Rectangle的draw方法的入参设置了color的默认参数为Green， 而Circle的默认参数没有指定参数的默认值。</p><p>我们新建了Rectangle和Circle的对象，并使用Shape的指针指向它们，并调用draw方法，并且不指定参数，那么color值将会是多少呢？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">class</span> <span class="token class-name">Shape</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">enum</span> <span class="token class-name">ShapeColor</span> <span class="token punctuation">{</span> Red<span class="token punctuation">,</span> Green<span class="token punctuation">,</span> Blue <span class="token punctuation">}</span><span class="token punctuation">;</span>

	<span class="token comment">// All shapes must offer a function to draw themselves.</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span>ShapeColor color <span class="token operator">=</span> Red<span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Shape</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// Notice the different default parameter value = bad!</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span>ShapeColor color <span class="token operator">=</span> Green<span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;color is &quot;</span> <span class="token operator">&lt;&lt;</span> color <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Shape</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span>ShapeColor color<span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;color is &quot;</span> <span class="token operator">&lt;&lt;</span> color <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>        
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	Shape<span class="token operator">*</span> pr <span class="token operator">=</span> <span class="token keyword">new</span> Rectangle<span class="token punctuation">;</span>	<span class="token comment">// static type = Shape*		dynaminc type = Rectangle*</span>
	Shape<span class="token operator">*</span> pc <span class="token operator">=</span> <span class="token keyword">new</span> Circle<span class="token punctuation">;</span>		<span class="token comment">// static type = Shape*		dynaminc type = Circle*</span>

    pr<span class="token operator">-&gt;</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	pc<span class="token operator">-&gt;</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">delete</span> pc<span class="token punctuation">;</span>
	<span class="token keyword">delete</span> pr<span class="token punctuation">;</span>

	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),u={href:"https://godbolt.org/z/vc3o849Ws",target:"_blank",rel:"noopener noreferrer"},d=n("p",null,"通过结果，我们发现不传递参数进入draw方法时，其参数的默认值将使用基类中所定义入参的默认值，也就是说缺省参数的默认值都是静态绑定的。",-1),k=n("h2",{id:"总结",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),s(" 总结")],-1),v=n("ul",null,[n("li",null,"绝对不要重新定义一个继承而来的缺省参数值， 因为缺省参数值都是静态绑定， 而virtual函数-你唯一应该覆写的东西-确是动态绑定。")],-1);function m(b,h){const a=l("ExternalLinkIcon");return t(),p("div",null,[r,n("p",null,[n("a",u,[s("have a try"),o(a)])]),d,k,v])}const f=e(i,[["render",m],["__file","effective-cpp-37.html.vue"]]);export{f as default};
