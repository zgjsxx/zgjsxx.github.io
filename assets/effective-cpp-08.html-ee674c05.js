import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="effective-c-08-别让异常逃离析构函数" tabindex="-1"><a class="header-anchor" href="#effective-c-08-别让异常逃离析构函数" aria-hidden="true">#</a> effective c++ 08 别让异常逃离析构函数</h1><p>本文主要讲解了在日常编码中需要注意的一个原则，即在类的析构函数中不要抛出异常。因为类的析构函数的作用是对对象的资源 进行释放。而一旦在析构函数中抛出了异常，那么某些资源就可能无法正常释放。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>作者使用的例子是一个数据库连接的例子。如下所示， DBConnection是一个数据库连接的类，create方法可以创建一个连接， 而close方法就用于关闭该连接，但是关闭过程中可会失败，这个时候就会抛出异常。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">DBConnection</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// Function to return DBConnection objects.</span>
	<span class="token keyword">static</span> DBConnection <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">static</span> DBConnection db<span class="token punctuation">;</span>
		<span class="token keyword">return</span> db<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Close connection; throw an exception if closing fails.</span>
	<span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">throw</span> <span class="token number">5</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们为了避免忘记close， 通常会使用RAII设计模式进行封装。如下所示， 我们新建了一个DBconn的类，该类的析构函数中会调用DBConnection的close方法。 但是由于db.close方法会抛出异常，一方面会造成db.close之后的代码无法执行，另一方面，该异常会扩散到析构函数以外。因此我们不可以这样处理。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">DBConn</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">DBConn</span><span class="token punctuation">(</span>DBConnection database<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">db</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token operator">~</span><span class="token function">DBConn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
        db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	DBConnection db<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优化方法有两种，一种是直接在析构函数的异常处使用abort，避免异常的扩散。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">DBConn</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">DBConn</span><span class="token punctuation">(</span>DBConnection database<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">db</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token operator">~</span><span class="token function">DBConn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">try</span>
		<span class="token punctuation">{</span>
			db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">// make log entry.</span>
			std<span class="token double-colon punctuation">::</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	DBConnection db<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种是吞下异常：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">DBConn</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">DBConn</span><span class="token punctuation">(</span>DBConnection database<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">db</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token operator">~</span><span class="token function">DBConn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">try</span>
		<span class="token punctuation">{</span>
			db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">// make log entry.</span>

		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	DBConnection db<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般而言，将异常吞掉是个坏注意，因为其让数据库连接是否正常关闭变得无法感知。但是有时候吞掉异常，也会比&quot;草率结束程序&quot;要好。</p><p>正确的做法是，DBConn需要让用户感知，连接是否正常关闭。为此我们需要为DBConn添加close接口，该接口所抛出的异常由调用者进行处理。并且如果关闭失败的情况下，析构函数仍然会处理。这种做法就是既使得用户可以感知连接状态，又使得关闭行为变得更加的安全。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;DBConnection.h&quot;</span></span>

<span class="token keyword">class</span> <span class="token class-name">DBConn</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token function">DBConn</span><span class="token punctuation">(</span>DBConnection database<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">db</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token function">closed</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token operator">~</span><span class="token function">DBConn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>closed<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">// Try to close connection if client didn&#39;t</span>
			<span class="token keyword">try</span>
			<span class="token punctuation">{</span>
				db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">// make log entry.</span>
				std<span class="token double-colon punctuation">::</span><span class="token function">abort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>

	<span class="token comment">// New function for client to use.</span>
	<span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		closed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	DBConnection db<span class="token punctuation">;</span>
	<span class="token keyword">bool</span> closed<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>析构函数绝对不要吐出异常。如果一个被析构函数调用的函数可能抛出异常，析构函数应该捕捉任何异常，然后吞下它们(不传播)或结束程序。</li><li>如果客户需要对某个操作函数运行期间抛出的异常做出反应，那么class应该提供一个普通函数(而非在析构函数中)执行该操作。</li></ul>`,16),c=[p];function i(o,l){return s(),a("div",null,c)}const d=n(e,[["render",i],["__file","effective-cpp-08.html.vue"]]);export{d as default};
