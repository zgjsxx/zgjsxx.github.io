import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},t=e(`<h1 id="c-原子变量中的内存序" tabindex="-1"><a class="header-anchor" href="#c-原子变量中的内存序" aria-hidden="true">#</a> c++原子变量中的内存序</h1><p>关于内存序，我们从下面这个例子看起，线程1首先设置a = 1, 再将c设置为3。 线程2判断c是否等于3， 等于3之后，则打印a是否等于1。</p><p>于是有人说，问这个问题，不是傻子吗，肯定等于1啊。然而事实是这样吗？我们使用<code>-O3</code>进行编译。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//g++ main.cpp -O3</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>

<span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span>a <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>thread <span class="token function">th1</span><span class="token punctuation">(</span>func1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>thread <span class="token function">th2</span><span class="token punctuation">(</span>func2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    th1<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    th2<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其执行结果如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1
1
0
1
0
0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，其结果可以为0。</p><p>这是因为下面的语句可能被重排，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    a = 1;
    c = 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>重排为</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>    c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>gcc提供的： __ATOMIC_RELAXED：最低约束等级，表示没有线程间排序约束</p><p>__ATOMIC_CONSUME：官方表示因为C++11的memory_order_consume语义不足，当前使用更强的__ATOMIC_ACQUIRE来实现。</p><p>__ATOMIC_ACQUIRE：对获取操作创建线程间happens-before限制，防止代码在操作前的意外hoisting</p><p>__ATOMIC_RELEASE：对释放操作创建线程间happens-before限制，防止代码在操作后的意外sinking</p><p>__ATOMIC_ACQ_REL：结合了前述两种限制</p><p>__ATOMIC_SEQ_CST：约束最强</p><p>c++11： memory_order_relaxed：松散序列，它仅仅只保证其成员函数操作本身是原子不可分割的，但是对于顺序性不做任何保证。</p><p>memory_order_consume: 是弱化版memory_order_acquire。acquire后的内存操作一定不能重排到其前，但是consume仅仅保证依赖该原子操作的内存操作不重排到其前，而对其它内存操作不做保证。</p><p>memory_order_acquire:原子操作后的内存操作不能重排到其前，但是其前的内存操作还是可能随便重排。一般与memory_order_release搭配使用，在多线程之间保证acquire后的数据一定能访问到release之前的数据。</p><p>memory_order_release：release操作前的内存操作保证对其它线程可见。其前的内存操作不能重排到其后，但是其后的内存操作还是可能随便重排。</p><p>memory_order_acq_rel: 有点像语法糖，被这个标记的原子操作，同时具有release和acquire的特点。</p><p>memory_order_seq_cst: 默认的模式，也是最严格顺序同步的模式。所有线程中的该类型原子操作有个全局排序。原子操作前的内存操作不能重排到其后，后面的内存操作不能重排到其前。多线程间，其前的内存操作对其它线程可见。【注意】：这里的原子变量是所有，可以是不同原子变量，下面其它模式都要求是同一个原子变量。</p>`,23),c=[t];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","cpp_memory_order.html.vue"]]);export{r as default};
