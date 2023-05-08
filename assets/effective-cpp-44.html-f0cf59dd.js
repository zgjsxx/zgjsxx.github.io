import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="effective-c-44-与参数无关的代码抽离templates" tabindex="-1"><a class="header-anchor" href="#effective-c-44-与参数无关的代码抽离templates" aria-hidden="true">#</a> effective c++ 44 与参数无关的代码抽离templates</h1><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>如果模板中有类型无关的参数，那一定得小心，很容易就会出现模板膨胀的问题。</p><p>这里有一个矩阵类，并且有一个求逆的方法，这里我们假设这个invert方法有100行代码，为了便于下面进行计算。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">SquareMatrix</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">//这里有100行代码</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们生成几个对象，看看这个模板类生成了多少代码。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">&gt;</span> a1<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//100行invert代码</span>

SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token operator">&gt;</span> a2<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//100行invert代码</span>

SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">&gt;</span> a3<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//100行invert代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里这个invert函数就生成了300行，如果我们继续写下去，那将是非常可怕的膨胀。</p><p>这个非类型模板参数n导致了上述问题，我们可以尝试将n换为class成员变量。</p><p>这里我们将计算矩阵的逆的方法抽象到基类中来，invert函数拥有一个入参matrixSize，代表矩阵的大小。</p><p>我们派生出一个模板类SquareMatrix，在其中调用基类的invert方法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">SquareMatrixBase</span>
<span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">invert</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t matrixSize<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">//这里有100行</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">SquareMatrix</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">private</span> <span class="token class-name">SquareMatrixBase</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">using</span> SquareMatrixBase<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>invert<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">void</span> <span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再次进行统计，代码的膨胀将少了很多。是不是很有效！</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">&gt;</span> a1<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//1行派生类代码+100行基类invert代码</span>

SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token operator">&gt;</span> a2<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//1行派生类代码</span>

SquareMatrix<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token operator">&gt;</span> a3<span class="token punctuation">;</span>
a<span class="token punctuation">.</span><span class="token function">invert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//1行派生类代码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再继续往下，求逆所需要的数据放在那里呢？</p><p>一种方法就是给invert增加一个入参T*， 但是如果matrix类的内部有n多个类似的函数，就意味这会一次又一次的传递参数，没有必要，于是我们将T*放置到基类中。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>	<span class="token keyword">void</span> <span class="token function">invert</span><span class="token punctuation">(</span>T<span class="token operator">*</span> t<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">invert2</span><span class="token punctuation">(</span>T<span class="token operator">*</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert2</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">invert3</span><span class="token punctuation">(</span>T<span class="token operator">*</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert2</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">void</span> <span class="token function">invert4</span><span class="token punctuation">(</span>T<span class="token operator">*</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert2</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">void</span> <span class="token function">invert5</span><span class="token punctuation">(</span>T<span class="token operator">*</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token operator">-&gt;</span><span class="token function">invert2</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们给基类增加一个<code>T* pData</code>用于接受数据。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">SquareMatrixBase</span>
<span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
	<span class="token function">SquareMatrixBase</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t n<span class="token punctuation">,</span> T<span class="token operator">*</span> pMem<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">size</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">pData</span><span class="token punctuation">(</span>pMem<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">;</span>
	T<span class="token operator">*</span> pData<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>size_t n<span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">SquareMatrix</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">private</span> <span class="token class-name">SquareMatrixBase</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">SquareMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token generic-function"><span class="token function">SquareMatrixBase</span><span class="token generic class-name"><span class="token operator">&lt;</span>T<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	T data<span class="token punctuation">[</span>n <span class="token operator">*</span> n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>如果因非类型模板参数而造成的代码膨胀，往往可以消除，做法就是以函数参数或class成员变量替换模板参数。(重要)</li><li>如果因类型模板参数而造成的代码膨胀，往往可降低，做法是让带有完全相同的二进制表述的具体类型共享实现码。</li></ul>`,21),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","effective-cpp-44.html.vue"]]);export{r as default};
