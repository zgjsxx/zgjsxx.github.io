import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<hr><p>category:</p><ul><li>Linux tag:</li><li>协程</li></ul><hr><h1 id="无栈协程和有栈协程的对比" tabindex="-1"><a class="header-anchor" href="#无栈协程和有栈协程的对比" aria-hidden="true">#</a> 无栈协程和有栈协程的对比</h1><h2 id="有栈协程" tabindex="-1"><a class="header-anchor" href="#有栈协程" aria-hidden="true">#</a> 有栈协程</h2><h2 id="无栈协程" tabindex="-1"><a class="header-anchor" href="#无栈协程" aria-hidden="true">#</a> 无栈协程</h2><h3 id="无栈协程兼容同步代码会导致async-await关键字的传染" tabindex="-1"><a class="header-anchor" href="#无栈协程兼容同步代码会导致async-await关键字的传染" aria-hidden="true">#</a> 无栈协程兼容同步代码会导致async/await关键字的传染</h3><p>下面的例子是python的一个例子，由于sleep函数是一个异步函数，而sum函数调用了它，则sum函数需要添加async/await。而sum_wrapper1调用了sum函数，因此 sum_wrapper1也需要添加async/await。sum_wrapper2和sum_wrapper_final也是相同的原因，都添加上了async/await。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Time: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">:</span><span class="token format-spec">.2f</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">sum</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">:</span>
    total <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> number <span class="token keyword">in</span> numbers<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Task </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">: Computing </span><span class="token interpolation"><span class="token punctuation">{</span>total<span class="token punctuation">}</span></span><span class="token string">+</span><span class="token interpolation"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">await</span> sleep<span class="token punctuation">(</span><span class="token punctuation">)</span>
        total <span class="token operator">+=</span> number
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Task </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">: Sum = </span><span class="token interpolation"><span class="token punctuation">{</span>total<span class="token punctuation">}</span></span><span class="token string">\\n&#39;</span></span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">sum_wrapper1</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">sum_wrapper2</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> sum_wrapper1<span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">sum_wrapper_final</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> sum_wrapper2<span class="token punctuation">(</span>name<span class="token punctuation">,</span> numbers<span class="token punctuation">)</span>

start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>

loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
    loop<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>sum_wrapper_final<span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    loop<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>sum_wrapper_final<span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>tasks<span class="token punctuation">)</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;Time: </span><span class="token interpolation"><span class="token punctuation">{</span>end<span class="token operator">-</span>start<span class="token punctuation">:</span><span class="token format-spec">.2f</span><span class="token punctuation">}</span></span><span class="token string"> sec&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","stackful-stackless.html.vue"]]);export{k as default};