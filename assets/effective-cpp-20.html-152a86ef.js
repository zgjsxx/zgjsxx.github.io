import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="effective-c-20-传引用代替传值" tabindex="-1"><a class="header-anchor" href="#effective-c-20-传引用代替传值" aria-hidden="true">#</a> effective c++ 20 传引用代替传值</h1><p>本节，作者开始讨论引用。我们知道c语言已经有了指针，通过指针我们也就可以修改变量本身，而不是修改变量的副本（传值）， 那么在c++中又搞出来个引用， 那么其是不是有点重复？</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>我们知道在函数的传参中，如果传递的是指针， 那么就不可避免的要进行取地址和解引用，如下面的这段代码所示，就需要使用&quot;&amp;&quot;和&quot;*&quot;。这就可给我们的代码增加了一定的复杂性。其实c++引入引用也就是为了简化这种写法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token operator">*</span>a <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token operator">*</span>a <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码修改成用引用的方式，是不是就简化了很多。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">&amp;</span> a<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> a <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们在c++中，涉及传参的时候，要尽量使用引用。但是要强调的是，引用并不能取代指针，设计内存的操作的时候，指针还是不可替代的。</p><p>由于引用有指针的特性，在传参的时候是没有copy的行为的。例如下面这个validateStudent函数，使用了常引用作为入参，避免了对象的拷贝。如果用传值的方式， 其内部有多个string对象要涉及拷贝，这将是低效的。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token string">&quot;AAAA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">addr</span><span class="token punctuation">(</span><span class="token string">&quot;BBBB&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">;</span>
	std<span class="token double-colon punctuation">::</span>string addr<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Person</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">schoolName</span><span class="token punctuation">(</span><span class="token string">&quot;CCCC&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">schoolAddr</span><span class="token punctuation">(</span><span class="token string">&quot;DDDD&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>string schoolName<span class="token punctuation">;</span>
	std<span class="token double-colon punctuation">::</span>string schoolAddr<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">bool</span> <span class="token function">validateStudent</span><span class="token punctuation">(</span><span class="token keyword">const</span> Student<span class="token operator">&amp;</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外， 由于引用的背后是由指针实现的，所以其将拥有&quot;多态&quot;的功能。 如下面中的printNameAndDisplay函数， 其入参是一个Window类的引用，在类的继承关系上，WindowWithScrollBars继承于Window。因此当传入的对象是Window对象时，w.display将调用window类的display方法，当传入的参数是WindowWithScrollBars类的对象时，w.display将调用WindowWithScrollBars类的display方法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Window</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>string <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&quot;WINDOW&quot;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
	<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Display: window&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">WindowWithScrollBars</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Window</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Display: window with scroll bars&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">printNameAndDisplay</span><span class="token punctuation">(</span><span class="token keyword">const</span> Window<span class="token operator">&amp;</span> w<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> w<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    w<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面主要讲解了传引用的好处， 那么什么时候我们引用考虑传值呢？</p><p>作者这里也给出了解答， 下面三种场景可以考虑直接传值：</p><ul><li>内置类型（只读不修改时）</li><li>STL迭代器</li><li>函数对象</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>尽量以传常引用去替代传值。前者通常比较高效，并且可以避免切割问题。</li><li>以上规则并不适用于内置类型 ，以及STL的迭代器和函数对象，对它们而言，传值往往比较合适。</li></ul>`,17),o=[e];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","effective-cpp-20.html.vue"]]);export{d as default};
