import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="c-20实用小特性之原子变量的wait-signal" tabindex="-1"><a class="header-anchor" href="#c-20实用小特性之原子变量的wait-signal" aria-hidden="true">#</a> c++20实用小特性之原子变量的wait/signal</h1><blockquote><p>These functions are guaranteed to return only if value has changed, even if the underlying implementation unblocks spuriously.</p></blockquote><p>仅当值发生更改时，这些函数才保证返回，即使底层实现虚假地解除阻塞</p><p>也就是说原子变量的wait在应用层可以确保不会虚假唤醒， 这就可以避免条件变量那样的循环测试条件。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;atomic&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;chrono&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;future&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token double-colon punctuation">::</span>literals<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">bool</span><span class="token operator">&gt;</span> all_tasks_completed<span class="token punctuation">{</span><span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">unsigned</span><span class="token operator">&gt;</span> completion_count<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>future<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> task_futures<span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">unsigned</span><span class="token operator">&gt;</span> outstanding_task_count<span class="token punctuation">{</span><span class="token number">16</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// Spawn several tasks which take different amounts of</span>
    <span class="token comment">// time, then decrement the outstanding task count.</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>future<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span> task_future <span class="token operator">:</span> task_futures<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        task_future <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">async</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token punctuation">]</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// This sleep represents doing real work...</span>
            std<span class="token double-colon punctuation">::</span>this_thread<span class="token double-colon punctuation">::</span><span class="token function">sleep_for</span><span class="token punctuation">(</span><span class="token number">2000</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token operator">++</span>completion_count<span class="token punctuation">;</span>
            <span class="token operator">--</span>outstanding_task_count<span class="token punctuation">;</span>

            <span class="token comment">// When the task count falls to zero, notify</span>
            <span class="token comment">// the waiter (main thread in this case).</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>outstanding_task_count<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                all_tasks_completed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                all_tasks_completed<span class="token punctuation">.</span><span class="token function">notify_one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    all_tasks_completed<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Tasks completed = &quot;</span> <span class="token operator">&lt;&lt;</span> completion_count<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token char">&#39;\\n&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，想要使用这样的特性也是需要c++的编译器支持到c++20标准。</p>`,6),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","cpp_cpp20_atomic_wait.html.vue"]]);export{r as default};