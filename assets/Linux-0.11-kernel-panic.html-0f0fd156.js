import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const t={},c=e(`<h1 id="linux-0-11-kernel目录panic-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录panic-c详解" aria-hidden="true">#</a> Linux-0.11 kernel目录panic.c详解</h1><p>该模块只有一个函数， 即panic函数， 用于显示内核错误信息并使系统进入死循环。</p><p>在内核中，如果内核代码执行时遇到了严重的错误就会调用该函数。</p><h2 id="panic" tabindex="-1"><a class="header-anchor" href="#panic" aria-hidden="true">#</a> panic</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">panic</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;Kernel panic: %s\\n\\r&quot;</span><span class="token punctuation">,</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//打印内核错误日志</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">==</span> task<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token comment">//如果当前是任务0，则不进行同步</span>
    <span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;In swapper task - not syncing\\n\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    <span class="token function">sys_sync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//运行文件系统同步函数</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//进入死循环</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),p=[c];function o(i,l){return s(),a("div",null,p)}const r=n(t,[["render",o],["__file","Linux-0.11-kernel-panic.html.vue"]]);export{r as default};
