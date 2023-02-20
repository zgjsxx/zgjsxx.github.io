import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const t={},i=e(`<h1 id="linux-0-11-kernel目录exit-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录exit-c详解" aria-hidden="true">#</a> Linux-0.11 kernel目录exit.c详解</h1><h2 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> release</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token operator">*</span> p<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是去释放进程在任务数组中占用的位置， 并且将进程的描述符PCB占用的内存进行释放。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> i<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>p<span class="token punctuation">)</span> <span class="token comment">//如果p为空指针什么也不做</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">1</span> <span class="token punctuation">;</span> i<span class="token operator">&lt;</span>NR_TASKS <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">==</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//找到了对应的数组项</span>
        task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span><span class="token constant">NULL</span><span class="token punctuation">;</span><span class="token comment">//将该项置空</span>
        <span class="token function">free_page</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//释放该内存页</span>
        <span class="token function">schedule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//重新进行调用</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to release non-existent task&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="send-sig" tabindex="-1"><a class="header-anchor" href="#send-sig" aria-hidden="true">#</a> send_sig</h2><h2 id="kill-session" tabindex="-1"><a class="header-anchor" href="#kill-session" aria-hidden="true">#</a> kill_session</h2><h2 id="sys-kill" tabindex="-1"><a class="header-anchor" href="#sys-kill" aria-hidden="true">#</a> sys_kill</h2><h2 id="tell-father" tabindex="-1"><a class="header-anchor" href="#tell-father" aria-hidden="true">#</a> tell_father</h2><h2 id="do-exit" tabindex="-1"><a class="header-anchor" href="#do-exit" aria-hidden="true">#</a> do_exit</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">do_exit</span><span class="token punctuation">(</span><span class="token keyword">long</span> code<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="sys-exit" tabindex="-1"><a class="header-anchor" href="#sys-exit" aria-hidden="true">#</a> sys_exit</h2><h2 id="sys-waitpid" tabindex="-1"><a class="header-anchor" href="#sys-waitpid" aria-hidden="true">#</a> sys_waitpid</h2>`,13),p=[i];function c(o,l){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","Linux-0.11-kernel-exit.html.vue"]]);export{d as default};
