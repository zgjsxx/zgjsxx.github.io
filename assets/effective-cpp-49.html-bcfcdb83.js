import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-49-了解new-handler的行为" tabindex="-1"><a class="header-anchor" href="#effective-c-49-了解new-handler的行为" aria-hidden="true">#</a> effective c++ 49 了解new-handler的行为</h1><p>我们在编写代码时，经常会使用new来创建对象。如果内存不够了，new会是怎样的行为？</p><p>默认的行为是，new将抛出一个异常。然而有时候我们不希望这样的默认行为，这个时候我们就需要new-handler。</p><p>本章节主要探讨了如何自定义new-handler。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><h3 id="new-handler的介绍" tabindex="-1"><a class="header-anchor" href="#new-handler的介绍" aria-hidden="true">#</a> new-handler的介绍</h3><p>作者在item-51节从给出了<code>::operator new</code>的一个伪代码，这个伪代码就比较清晰地显示了new-handler是何时被调用的。从下面的伪代码中我们也可以看到，new-handler如果被设置了，它将被循环调用。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>bad_alloc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>size <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		size <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		尝试分配 size bytes<span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>分配成功<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token punctuation">(</span>一个指针，指向分配得来的内存<span class="token punctuation">)</span>；
		<span class="token punctuation">}</span>
		<span class="token comment">// 分配失败；找出目前的 new-handling 函数</span>
		new_handler globalHandler <span class="token operator">=</span> <span class="token function">set_new_handler</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//获取当前的new-handler</span>
		<span class="token function">set_new_handler</span><span class="token punctuation">(</span>globalHandler<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置new-handler</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>globalHandler<span class="token punctuation">)</span>
			<span class="token punctuation">(</span><span class="token operator">*</span>globalHandler<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span>
			<span class="token keyword">throw</span> std<span class="token double-colon punctuation">::</span><span class="token function">bad_alloc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-handler的例子" tabindex="-1"><a class="header-anchor" href="#new-handler的例子" aria-hidden="true">#</a> new-handler的例子</h3><p>下面就是演示如何设置new-handler。这个实验其实也暗含了很多知识点，我刚刚开始的时候始终不能触发new-handler， 每次都是被linux oom给干掉了。</p><p>下面我便总结了这个实验如何才能做的起来。我们使用三个实验。</p><ul><li>在案例1中，程序触发overcommit规则而直接引起new失败。可以查看<code>/proc/sys/vm/overcommit_memory</code>， 如果为0，它允许overcommit，但过于明目张胆的overcommit会被拒绝，比如malloc一次性申请的内存大小就超过了系统总内存。例如我们下面的例子，我一次性申请10G，就触发了该规则，new失败，调用new-handler。</li><li>在案例2中，程序虚拟内存用完触发new失败。new申请的都是虚拟内存，64位系统的虚拟内存高达128T，因此如果没有触发overcommit的话，就需要循环申请才有可能new失败，而且会需要很长时间，例如案例2。</li><li>在案例3中，程序被oom给干掉了。如果你一次申请的内存过小的话，还没有到虚拟内存申请到128T， 物理内存就用完了（申请虚拟内存也需要占用少量物理内存），这个时候程序就会被linux oom给杀掉，就触发不了new-handler。（在我的机器上就被killed了，可以使用dmesg查看）</li></ul><p>案例1：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// new_handler example</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span>     <span class="token comment">// std::cout</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdlib&gt;</span>      <span class="token comment">// std::exit</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span>          <span class="token comment">// std::set_new_handler</span></span>

<span class="token keyword">void</span> <span class="token function">no_memory</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to allocate memory!\\n&quot;</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">exit</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>no_memory<span class="token punctuation">)</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Attempting to allocate 10 GiB...&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Ok\\n&quot;</span><span class="token punctuation">;</span>
  <span class="token keyword">delete</span><span class="token punctuation">[</span><span class="token punctuation">]</span> p<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例2：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// new_handler example</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span>     <span class="token comment">// std::cout</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdlib&gt;</span>      <span class="token comment">// std::exit</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span>          <span class="token comment">// std::set_new_handler</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;chrono&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token double-colon punctuation">::</span>chrono_literals<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">no_memory</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to allocate memory!\\n&quot;</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">exit</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>no_memory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span> <span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        count<span class="token operator">++</span><span class="token punctuation">;</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;current used &quot;</span><span class="token operator">&lt;&lt;</span> count <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; G&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例3：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// new_handler example</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span>     <span class="token comment">// std::cout</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;cstdlib&gt;</span>      <span class="token comment">// std::exit</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span>          <span class="token comment">// std::set_new_handler</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;chrono&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token double-colon punctuation">::</span>chrono_literals<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">no_memory</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to allocate memory!\\n&quot;</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">exit</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>no_memory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token operator">*</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span> <span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-handler的设计原则" tabindex="-1"><a class="header-anchor" href="#new-handler的设计原则" aria-hidden="true">#</a> new-handler的设计原则</h3><p>从上面的伪代码中，我们知道，new-handler是嵌入在一个循环中的，因此当operator new无法满足内存申请时，它会不断调用new-handler函数，直到找到足够的内存。</p><p>由于会循环调用new-handler，因此设计new-handler时需要注意如下几点：</p><ul><li>让更多内存可被使用。</li><li>安全其他new-handler</li><li>卸载new-handler</li><li>抛出bad_alloc的异常</li><li>不返回，通常调用abort或者exit</li></ul><h3 id="为某个类设计new-handler" tabindex="-1"><a class="header-anchor" href="#为某个类设计new-handler" aria-hidden="true">#</a> 为某个类设计new-handler</h3><p>有时候我们需要为某个类的对象创建时候而自定义一个new-handler。我们通常可以像下面这样操作。</p><p>我们需要为Widget类重载operator new的操作符，并且在operator new操作符中使用RAII类NewHandlerHolder去自动resotre默认的new-handler。(RAII实现的一种auto-restore机制，很常用)</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">NewHandlerHolder</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler nh<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">handler</span><span class="token punctuation">(</span>nh<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>new_handler handler<span class="token punctuation">;</span>

	<span class="token comment">// Prevent copying</span>
	<span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	NewHandlerHolder<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler <span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler currentHandler<span class="token punctuation">;</span>
    <span class="token keyword">char</span> arr<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//10G</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

std<span class="token double-colon punctuation">::</span>new_handler Widget<span class="token double-colon punctuation">::</span>currentHandler <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


std<span class="token double-colon punctuation">::</span>new_handler <span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	std<span class="token double-colon punctuation">::</span>new_handler oldHandler <span class="token operator">=</span> currentHandler<span class="token punctuation">;</span>
	currentHandler <span class="token operator">=</span> p<span class="token punctuation">;</span>

	<span class="token keyword">return</span> oldHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> Widget<span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
	NewHandlerHolder <span class="token function">h</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>currentHandler<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">no_memory</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to allocate memory!\\n&quot;</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">exit</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>no_memory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        Widget<span class="token operator">*</span> w <span class="token operator">=</span> <span class="token keyword">new</span> Widget<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Failed to allocate memory!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="为某个类设计new-handler-更通用的做法" tabindex="-1"><a class="header-anchor" href="#为某个类设计new-handler-更通用的做法" aria-hidden="true">#</a> 为某个类设计new-handler（更通用的做法）</h3><p>如果做的更加通用一点，如果有很多个类都希望可以设置new-handler， 就可以使用模板的方法。让有需要的类去继承模板类。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;new&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">NewHandlerHolder</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler nh<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">handler</span><span class="token punctuation">(</span>nh<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
	<span class="token operator">~</span><span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	std<span class="token double-colon punctuation">::</span>new_handler handler<span class="token punctuation">;</span>

	<span class="token comment">// Prevent copying</span>
	<span class="token function">NewHandlerHolder</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	NewHandlerHolder<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewHandlerHolder<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">class</span> <span class="token class-name">NewHandlerSupport</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler <span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">static</span> <span class="token keyword">void</span><span class="token operator">*</span> <span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span> <span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">static</span> std<span class="token double-colon punctuation">::</span>new_handler currentHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
std<span class="token double-colon punctuation">::</span>new_handler NewHandlerSupport<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span>currentHandler <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
std<span class="token double-colon punctuation">::</span>new_handler <span class="token class-name">NewHandlerSupport</span><span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>new_handler p<span class="token punctuation">)</span> <span class="token keyword">throw</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	std<span class="token double-colon punctuation">::</span>new_handler oldHandler <span class="token operator">=</span> currentHandler<span class="token punctuation">;</span>
	currentHandler <span class="token operator">=</span> p<span class="token punctuation">;</span>

	<span class="token keyword">return</span> oldHandler<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span><span class="token operator">*</span> NewHandlerSupport<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>size_t size<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	NewHandlerHolder <span class="token function">h</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>currentHandler<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token double-colon punctuation">::</span><span class="token keyword">operator</span> <span class="token keyword">new</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Widget</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">NewHandlerSupport</span><span class="token operator">&lt;</span><span class="token class-name">Widget</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">char</span> arr<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token number">10</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">no_memory</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Failed to allocate memory!\\n&quot;</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span><span class="token function">exit</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name">Widget</span><span class="token double-colon punctuation">::</span><span class="token function">set_new_handler</span><span class="token punctuation">(</span>no_memory<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        Widget<span class="token operator">*</span> w <span class="token operator">=</span> <span class="token keyword">new</span> Widget<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Failed to allocate memory!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nothrow使得new不抛出异常" tabindex="-1"><a class="header-anchor" href="#nothrow使得new不抛出异常" aria-hidden="true">#</a> nothrow使得new不抛出异常</h3><p>我们可以使用<code>std::nothrow</code>来保证new不抛出异常。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Widget</span><span class="token punctuation">{</span><span class="token punctuation">}</span>；
Widget<span class="token operator">*</span> pw1 <span class="token operator">=</span> <span class="token keyword">new</span> Widget<span class="token punctuation">;</span><span class="token comment">//如果new失败， 抛出std::bad_alloc</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>pw1 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
Widget<span class="token operator">*</span> pw2 <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>nothrow<span class="token punctuation">)</span> Widget<span class="token punctuation">;</span><span class="token comment">//如果失败，返回空指针</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>pw2 <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是nothrow对异常的强制保证性并不高。因为后续的构造函数还是可能会抛出异常。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>set_new_handler允许客户指定一个函数，在内存分配无法获得满足时被调用。</li><li>Nothrow new是一个颇为局限的工具，因为它只使用与内存分配，后继的构造函数调用还是可能抛出异常。</li></ul>`,39),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","effective-cpp-49.html.vue"]]);export{d as default};
