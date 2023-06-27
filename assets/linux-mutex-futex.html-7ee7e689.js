import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="深入了解glibc的互斥锁" tabindex="-1"><a class="header-anchor" href="#深入了解glibc的互斥锁" aria-hidden="true">#</a> 深入了解glibc的互斥锁</h1><p>互斥锁是多线程同步时常用的手段，本文以glibc中mutex的实现为例，讲解其背后的实现原理。</p><h2 id="glibc-mutex" tabindex="-1"><a class="header-anchor" href="#glibc-mutex" aria-hidden="true">#</a> glibc mutex</h2><p>pthread_mutex_t变量有四种属性</p><ul><li>PTHREAD_MUTEX_TIMED_NP： 普通锁</li><li>PTHREAD_MUTEX_RECURSIVE_NP: 可重入锁</li><li>PTHREAD_MUTEX_ERRORCHECK_NP: 检错锁</li><li>PTHREAD_MUTEX_ADAPTIVE_NP: 自适应锁</li></ul><p>看看最简单的类型PTHREAD_MUTEX_TIMED_NP：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">__glibc_likely</span> <span class="token punctuation">(</span>type <span class="token operator">==</span> PTHREAD_MUTEX_TIMED_NP<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token function">FORCE_ELISION</span> <span class="token punctuation">(</span>mutex<span class="token punctuation">,</span> <span class="token keyword">goto</span> elision<span class="token punctuation">)</span><span class="token punctuation">;</span>
    simple<span class="token operator">:</span>
      <span class="token comment">/* Normal mutex.  */</span>
      <span class="token function">LLL_MUTEX_LOCK</span> <span class="token punctuation">(</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">assert</span> <span class="token punctuation">(</span>mutex<span class="token operator">-&gt;</span>__data<span class="token punctuation">.</span>__owner <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当锁的类型是最简单的类型时，会进入上面的分支，最后调用了LLL_MUTEX_LOCK方法。</p><p>LLL_MUTEX_LOCK的定义如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">LLL_MUTEX_LOCK</span></span>
<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">define</span> <span class="token macro-name function">LLL_MUTEX_LOCK</span><span class="token expression"><span class="token punctuation">(</span>mutex<span class="token punctuation">)</span> </span><span class="token punctuation">\\</span>
  <span class="token expression"><span class="token function">lll_lock</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>mutex<span class="token punctuation">)</span><span class="token operator">-&gt;</span>__data<span class="token punctuation">.</span>__lock<span class="token punctuation">,</span> <span class="token function">PTHREAD_MUTEX_PSHARED</span> <span class="token punctuation">(</span>mutex<span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>lll_lock定义在lowlevellock.h中</p><div class="language-C line-numbers-mode" data-ext="C"><pre class="language-C"><code>#define lll_lock(futex, private) \\
  (void)								      \\
    ({ int ignore1, ignore2;						      \\
       if (__builtin_constant_p (private) &amp;&amp; (private) == LLL_PRIVATE)	      \\
	 __asm __volatile (__lll_lock_asm_start				      \\
			   &quot;jz 18f\\n\\t&quot;				      \\
			   &quot;1:\\tleal %2, %%ecx\\n&quot;			      \\
			   &quot;2:\\tcall __lll_lock_wait_private\\n&quot; 	      \\
			   &quot;18:&quot;					      \\
			   : &quot;=a&quot; (ignore1), &quot;=c&quot; (ignore2), &quot;=m&quot; (futex)     \\
			   : &quot;0&quot; (0), &quot;1&quot; (1), &quot;m&quot; (futex),		      \\
			     &quot;i&quot; (MULTIPLE_THREADS_OFFSET)		      \\
			   : &quot;memory&quot;);					      \\
       else								      \\
	 {								      \\
	   int ignore3;							      \\
	   __asm __volatile (__lll_lock_asm_start			      \\
			     &quot;jz 18f\\n\\t&quot;			 	      \\
			     &quot;1:\\tleal %2, %%edx\\n&quot;			      \\
			     &quot;0:\\tmovl %8, %%ecx\\n&quot;			      \\
			     &quot;2:\\tcall __lll_lock_wait\\n&quot;		      \\
			     &quot;18:&quot;					      \\
			     : &quot;=a&quot; (ignore1), &quot;=c&quot; (ignore2),		      \\
			       &quot;=m&quot; (futex), &quot;=&amp;d&quot; (ignore3) 		      \\
			     : &quot;1&quot; (1), &quot;m&quot; (futex),			      \\
			       &quot;i&quot; (MULTIPLE_THREADS_OFFSET), &quot;0&quot; (0),	      \\
			       &quot;g&quot; ((int) (private))			      \\
			     : &quot;memory&quot;);				      \\
	 }								      \\
    })

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span>
<span class="token function">__lll_lock_wait_private</span> <span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>futex<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>futex <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token function">lll_futex_wait</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> LLL_PRIVATE<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* Wait if *futex == 2.  */</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">atomic_exchange_acq</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token function">lll_futex_wait</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> LLL_PRIVATE<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* Wait if *futex == 2.  */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span>
<span class="token function">__lll_lock_wait</span> <span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>futex<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token keyword">private</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>futex <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token function">lll_futex_wait</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">private</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* Wait if *futex == 2.  */</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">atomic_exchange_acq</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token function">lll_futex_wait</span> <span class="token punctuation">(</span>futex<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">private</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* Wait if *futex == 2.  */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),i=[p];function o(l,c){return s(),a("div",null,i)}const d=n(e,[["render",o],["__file","linux-mutex-futex.html.vue"]]);export{d as default};
