import{_ as t,V as o,W as c,X as n,Y as e,$ as p,a0 as s,F as l}from"./framework-9a29aaa0.js";const i={},u=s(`<h1 id="effective-c-43-处理模板化基类的名称" tabindex="-1"><a class="header-anchor" href="#effective-c-43-处理模板化基类的名称" aria-hidden="true">#</a> effective c++ 43-处理模板化基类的名称</h1><p>该节主要分析了一个写模板时常常会遇到的一个编译错误。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>这里有一个模板基类，有派生类继承了模板基类，并调用了基类中的方法，但是编译器却会报找不该方法，这是怎么回事？</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">class</span> <span class="token class-name">CompanyA</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendCleartext</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A sendCleartext&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">sendEncrypted</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;A sendEncrypted&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">CompanyB</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendCleartext</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;B sendCleartext&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">sendEncrypted</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> 
    <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;B sendEncrypted&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">MsgInfo</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">MsgInfo</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string msg<span class="token punctuation">)</span><span class="token operator">:</span><span class="token function">msg_</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>string msg_<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">Company</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">MsgSender</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>

	<span class="token keyword">void</span> <span class="token function">sendClear</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>string msg<span class="token punctuation">;</span>
		Company c<span class="token punctuation">;</span>
		c<span class="token punctuation">.</span><span class="token function">sendCleartext</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">void</span> <span class="token function">sendSecret</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">Company</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">LoggingMsgSender</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span><span class="token class-name">Company</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendClearMsg</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        <span class="token function">sendClear</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    MsgInfo <span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    LoggingMsgSender<span class="token operator">&lt;</span>CompanyB<span class="token operator">&gt;</span> loggingMsgSender<span class="token punctuation">;</span>
    loggingMsgSender<span class="token punctuation">.</span><span class="token function">sendClearMsg</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译输出如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/home/work/cpp_proj/test2/main.cpp: In member <span class="token keyword">function</span> ‘void LoggingMsgSender<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>::sendClearMsg<span class="token punctuation">(</span>const MsgInfo<span class="token operator">&amp;</span><span class="token punctuation">)</span>’:
/home/work/cpp_proj/test2/main.cpp:63:9: error: there are no arguments to ‘sendClear’ that depend on a template parameter, so a declaration of ‘sendClear’ must be available <span class="token punctuation">[</span>-fpermissive<span class="token punctuation">]</span>
         sendClear<span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
         ^~~~~~~~~
/home/work/cpp_proj/test2/main.cpp:63:9: note: <span class="token punctuation">(</span>if you use ‘-fpermissive’, G++ will accept your code, but allowing the use of an undeclared name is deprecated<span class="token punctuation">)</span>
/home/work/cpp_proj/test2/main.cpp: In instantiation of ‘void LoggingMsgSender<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span>::sendClearMsg<span class="token punctuation">(</span>const MsgInfo<span class="token operator">&amp;</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>with Company <span class="token operator">=</span> CompanyB<span class="token punctuation">]</span>’:
/home/work/cpp_proj/test2/main.cpp:71:39:   required from here
/home/work/cpp_proj/test2/main.cpp:63:18: error: ‘sendClear’ was not declared <span class="token keyword">in</span> this scope, and no declarations were found by argument-dependent lookup at the point of instantiation <span class="token punctuation">[</span>-fpermissive<span class="token punctuation">]</span>
         sendClear<span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
         ~~~~~~~~~^~~~~~
/home/work/cpp_proj/test2/main.cpp:63:18: note: declarations <span class="token keyword">in</span> dependent base ‘MsgSender<span class="token operator">&lt;</span>CompanyB<span class="token operator">&gt;</span>’ are not found by unqualified lookup
/home/work/cpp_proj/test2/main.cpp:63:18: note: use ‘this-<span class="token operator">&gt;</span>sendClear’ instead
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从编译的输出也可以看出，原因是编译器觉得<code>sendClear</code>含义不明确，编译器也给出了解决办法，使用<code>this-&gt;sendClear</code>，这里我们要思考的是，为什么编译器会找不到<code>sendClear</code>函数呢？ 不是就定义在模板基类中吗？</p><p>实际上原因就是基类是一个模板类， 而模板类是可以被特化的，例如这里又有了一个<code>CompanyZ</code>，而MsgSender对于CompanyZ的特化版本可能就没有<code>sendClear</code>方法，因此编译器才会说<code>sendClear</code>含义不明确。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">CompanyZ</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendEncrypted</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string<span class="token operator">&amp;</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span>CompanyZ<span class="token operator">&gt;</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendSecret</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，知道了原因之后，那么就可以给出解决办法了，其实上面编译器也已经给出来一种办法。</p><p><strong>第一种</strong>就是在派生类中调用模板基类中的方法时加上<code>this-&gt;</code>。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">Company</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">LoggingMsgSender</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span><span class="token class-name">Company</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendClearMsg</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">sendClear</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),d={href:"https://godbolt.org/z/hMEcPoEPf",target:"_blank",rel:"noopener noreferrer"},r=s(`<p><strong>第二种</strong>就是在派生类中调用模板基类中的方法时加上使用<code>using</code></p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">Company</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">LoggingMsgSender</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span><span class="token class-name">Company</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">using</span> MsgSender<span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>sendClear<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendClearMsg</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token function">sendClear</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),k={href:"https://godbolt.org/z/M6TYofo6n",target:"_blank",rel:"noopener noreferrer"},v=s(`<p><strong>第三种</strong>就是在派生类中明确指出使用<code>MsgSender&lt;Company&gt;::sendClear(info)</code>。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">Company</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">LoggingMsgSender</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span><span class="token class-name">Company</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendClearMsg</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token class-name">MsgSender</span><span class="token operator">&lt;</span>Company<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token function">sendClear</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),m={href:"https://godbolt.org/z/e43z7T7rc",target:"_blank",rel:"noopener noreferrer"},b=s(`<p>最后提一句，如果子类不是一个模板类，编译时也是不会有问题的，因为很明确。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">LoggingMsgSender</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MsgSender</span><span class="token operator">&lt;</span><span class="token class-name">CompanyB</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">sendClearMsg</span><span class="token punctuation">(</span><span class="token keyword">const</span> MsgInfo<span class="token operator">&amp;</span> info<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        <span class="token function">sendClear</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>在派生类模板中如果需要调用模板基类的方法，需要使用this-&gt;，或者明确指出名称。</li></ul>`,4);function g(y,f){const a=l("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[n("a",d,[e("have a try"),p(a)])]),r,n("p",null,[n("a",k,[e("have a try"),p(a)])]),v,n("p",null,[n("a",m,[e("have a try"),p(a)])]),b])}const h=t(i,[["render",g],["__file","effective-cpp-43.html.vue"]]);export{h as default};
