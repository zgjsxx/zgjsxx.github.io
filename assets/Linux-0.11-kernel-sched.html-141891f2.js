import{_ as n,V as s,W as a,a0 as p}from"./framework-c954d91f.js";const t={},e=p(`<h1 id="linux-0-11-kernel目录进程管理sched-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理sched-c详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理sched.c详解</h1><h2 id="schedule" tabindex="-1"><a class="header-anchor" href="#schedule" aria-hidden="true">#</a> schedule</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">schedule</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span><span class="token punctuation">(</span>p <span class="token operator">=</span> <span class="token operator">&amp;</span>LAST_TASK <span class="token punctuation">;</span> p <span class="token operator">&gt;</span> <span class="token operator">&amp;</span>FIRST_TASK <span class="token punctuation">;</span> <span class="token operator">--</span>p<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>alarm <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>alarm <span class="token operator">&lt;</span> jiffies<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//如果设置了任务定时的值alarm， 并且已经过期</span>
                <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>signal <span class="token operator">|=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token punctuation">(</span>SIGALRM<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//将信号的SIGALARM位置为1</span>
                <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>alarm <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>signal <span class="token operator">&amp;</span> <span class="token operator">~</span><span class="token punctuation">(</span>_BLOCKABLE <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>blocked<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>state<span class="token operator">==</span>TASK_INTERRUPTIBLE<span class="token punctuation">)</span><span class="token comment">//如果信号位图中除了被阻塞的信号外还有其他信号， 并且任务处于可终端状态</span>
            <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>state<span class="token operator">=</span>TASK_RUNNING<span class="token punctuation">;</span> <span class="token comment">//修改任务的状态为就绪态</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	next <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	i <span class="token operator">=</span> NR_TASKS<span class="token punctuation">;</span>
	p <span class="token operator">=</span> <span class="token operator">&amp;</span>task<span class="token punctuation">[</span>NR_TASKS<span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//从最后一个任务开始</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">--</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">//遍历所有的task， 取出其中counter最大的task</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">*</span><span class="token operator">--</span>p<span class="token punctuation">)</span>
			<span class="token keyword">continue</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>state <span class="token operator">==</span> TASK_RUNNING <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>counter <span class="token operator">&gt;</span> c<span class="token punctuation">)</span>
			c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>counter<span class="token punctuation">,</span> next <span class="token operator">=</span> i<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span>p <span class="token operator">=</span> <span class="token operator">&amp;</span>LAST_TASK <span class="token punctuation">;</span> p <span class="token operator">&gt;</span> <span class="token operator">&amp;</span>FIRST_TASK <span class="token punctuation">;</span> <span class="token operator">--</span>p<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span>
			<span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>counter <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>counter <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span>
					<span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token operator">-&gt;</span>priority<span class="token punctuation">;</span><span class="token comment">//更新counter值</span>
<span class="token punctuation">}</span>
<span class="token function">switch_to</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sys-pause" tabindex="-1"><a class="header-anchor" href="#sys-pause" aria-hidden="true">#</a> sys_pause</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_pause</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="sleep-on" tabindex="-1"><a class="header-anchor" href="#sleep-on" aria-hidden="true">#</a> sleep_on</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">sleep_on</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token operator">*</span><span class="token operator">*</span>p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="sched-init" tabindex="-1"><a class="header-anchor" href="#sched-init" aria-hidden="true">#</a> sched_init</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">sched_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">outb_p</span><span class="token punctuation">(</span><span class="token number">0x36</span><span class="token punctuation">,</span><span class="token number">0x43</span><span class="token punctuation">)</span><span class="token punctuation">;</span>		<span class="token comment">/* binary, mode 3, LSB/MSB, ch 0 */</span>
<span class="token function">outb_p</span><span class="token punctuation">(</span>LATCH <span class="token operator">&amp;</span> <span class="token number">0xff</span> <span class="token punctuation">,</span> <span class="token number">0x40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">/* LSB */</span>
<span class="token function">outb</span><span class="token punctuation">(</span>LATCH <span class="token operator">&gt;&gt;</span> <span class="token number">8</span> <span class="token punctuation">,</span> <span class="token number">0x40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">/* MSB */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","Linux-0.11-kernel-sched.html.vue"]]);export{r as default};
