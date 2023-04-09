import{_ as s,V as n,W as a,a0 as e}from"./framework-c954d91f.js";const t={},p=e(`<h1 id="linux-0-11-kernel目录进程管理sys-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理sys-c详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理sys.c详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="sys-ftime" tabindex="-1"><a class="header-anchor" href="#sys-ftime" aria-hidden="true">#</a> sys_ftime</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_ftime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-break" tabindex="-1"><a class="header-anchor" href="#sys-break" aria-hidden="true">#</a> sys_break</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_break</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-ptrace" tabindex="-1"><a class="header-anchor" href="#sys-ptrace" aria-hidden="true">#</a> sys_ptrace</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_ptrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用于当前进程对子进程进行调试。</p><h3 id="sys-stty" tabindex="-1"><a class="header-anchor" href="#sys-stty" aria-hidden="true">#</a> sys_stty</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_stty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>改变并打印终端设置。</p><p>未实现。</p><h3 id="sys-gtty" tabindex="-1"><a class="header-anchor" href="#sys-gtty" aria-hidden="true">#</a> sys_gtty</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_gtty</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>获取进程终端信息。</p><p>未实现。</p><h3 id="sys-rename" tabindex="-1"><a class="header-anchor" href="#sys-rename" aria-hidden="true">#</a> sys_rename</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_rename</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改文件名。</p><p>未实现。</p><h3 id="sys-prof" tabindex="-1"><a class="header-anchor" href="#sys-prof" aria-hidden="true">#</a> sys_prof</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_prof</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-setregid" tabindex="-1"><a class="header-anchor" href="#sys-setregid" aria-hidden="true">#</a> sys_setregid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setregid</span><span class="token punctuation">(</span><span class="token keyword">int</span> rgid<span class="token punctuation">,</span> <span class="token keyword">int</span> egid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用于设置进程的实际组id或者有效组id。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	<span class="token keyword">if</span> <span class="token punctuation">(</span>rgid<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>gid <span class="token operator">==</span> rgid<span class="token punctuation">)</span> <span class="token operator">||</span> 
		    <span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			current<span class="token operator">-&gt;</span>gid <span class="token operator">=</span> rgid<span class="token punctuation">;</span>
		<span class="token keyword">else</span>
			<span class="token keyword">return</span><span class="token punctuation">(</span><span class="token operator">-</span>EPERM<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>egid<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>gid <span class="token operator">==</span> egid<span class="token punctuation">)</span> <span class="token operator">||</span>
		    <span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>egid <span class="token operator">==</span> egid<span class="token punctuation">)</span> <span class="token operator">||</span>
		    <span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>sgid <span class="token operator">==</span> egid<span class="token punctuation">)</span> <span class="token operator">||</span>
		    <span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			current<span class="token operator">-&gt;</span>egid <span class="token operator">=</span> egid<span class="token punctuation">;</span>
		<span class="token keyword">else</span>
			<span class="token keyword">return</span><span class="token punctuation">(</span><span class="token operator">-</span>EPERM<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-setgid" tabindex="-1"><a class="header-anchor" href="#sys-setgid" aria-hidden="true">#</a> sys_setgid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setgid</span><span class="token punctuation">(</span><span class="token keyword">int</span> gid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用于设置进程组号。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">return</span><span class="token punctuation">(</span><span class="token function">sys_setregid</span><span class="token punctuation">(</span>gid<span class="token punctuation">,</span> gid<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-acct" tabindex="-1"><a class="header-anchor" href="#sys-acct" aria-hidden="true">#</a> sys_acct</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_acct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-phys" tabindex="-1"><a class="header-anchor" href="#sys-phys" aria-hidden="true">#</a> sys_phys</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_phys</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-lock" tabindex="-1"><a class="header-anchor" href="#sys-lock" aria-hidden="true">#</a> sys_lock</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-mpx" tabindex="-1"><a class="header-anchor" href="#sys-mpx" aria-hidden="true">#</a> sys_mpx</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_mpx</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-ulimit" tabindex="-1"><a class="header-anchor" href="#sys-ulimit" aria-hidden="true">#</a> sys_ulimit</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_ulimit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>未实现。</p><h3 id="sys-time" tabindex="-1"><a class="header-anchor" href="#sys-time" aria-hidden="true">#</a> sys_time</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_time</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token operator">*</span> tloc<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回从1970年1月1日 00：00：00开始到此刻的秒数。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> i<span class="token punctuation">;</span>

i <span class="token operator">=</span> CURRENT_TIME<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>tloc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">verify_area</span><span class="token punctuation">(</span>tloc<span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">put_fs_long</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span>tloc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> i<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-setreuid" tabindex="-1"><a class="header-anchor" href="#sys-setreuid" aria-hidden="true">#</a> sys_setreuid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setreuid</span><span class="token punctuation">(</span><span class="token keyword">int</span> ruid<span class="token punctuation">,</span> <span class="token keyword">int</span> euid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是设置实际用户id(ruid)和有效用户id(euid)。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> old_ruid <span class="token operator">=</span> current<span class="token operator">-&gt;</span>uid<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>ruid<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>euid<span class="token operator">==</span>ruid<span class="token punctuation">)</span> <span class="token operator">||</span>
                <span class="token punctuation">(</span>old_ruid <span class="token operator">==</span> ruid<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        current<span class="token operator">-&gt;</span>uid <span class="token operator">=</span> ruid<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token operator">-</span>EPERM<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>euid<span class="token operator">&gt;</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>old_ruid <span class="token operator">==</span> euid<span class="token punctuation">)</span> <span class="token operator">||</span>
                <span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>euid <span class="token operator">==</span> euid<span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        current<span class="token operator">-&gt;</span>euid <span class="token operator">=</span> euid<span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        current<span class="token operator">-&gt;</span>uid <span class="token operator">=</span> old_ruid<span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token operator">-</span>EPERM<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-setuid" tabindex="-1"><a class="header-anchor" href="#sys-setuid" aria-hidden="true">#</a> sys_setuid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用设置任务uid。其内部调用sys_setreuid函数实现。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">return</span><span class="token punctuation">(</span><span class="token function">sys_setreuid</span><span class="token punctuation">(</span>uid<span class="token punctuation">,</span> uid<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-stime" tabindex="-1"><a class="header-anchor" href="#sys-stime" aria-hidden="true">#</a> sys_stime</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_stime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是获取开机时间的秒数。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token operator">-</span>EPERM<span class="token punctuation">;</span>
startup_time <span class="token operator">=</span> <span class="token function">get_fs_long</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span>tptr<span class="token punctuation">)</span> <span class="token operator">-</span> jiffies<span class="token operator">/</span>HZ<span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-times" tabindex="-1"><a class="header-anchor" href="#sys-times" aria-hidden="true">#</a> sys_times</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_times</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">tms</span> <span class="token operator">*</span> tbuf<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是获取当前进程的时间统计值。</p><p>其通过put_fs_long将pcb中和时间相关的数据拷贝到tbuf中。utime代表用户态运行时间，stime代表内核态运行时间，cutime代表子进程用户运行时间，cstime代表子进程内核态运行时间。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>tbuf<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">verify_area</span><span class="token punctuation">(</span>tbuf<span class="token punctuation">,</span><span class="token keyword">sizeof</span> <span class="token operator">*</span>tbuf<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">put_fs_long</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>utime<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>tbuf<span class="token operator">-&gt;</span>tms_utime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">put_fs_long</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>stime<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>tbuf<span class="token operator">-&gt;</span>tms_stime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">put_fs_long</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>cutime<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>tbuf<span class="token operator">-&gt;</span>tms_cutime<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">put_fs_long</span><span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>cstime<span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>tbuf<span class="token operator">-&gt;</span>tms_cstime<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> jiffies<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-brk" tabindex="-1"><a class="header-anchor" href="#sys-brk" aria-hidden="true">#</a> sys_brk</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_brk</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> end_data_seg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用用于设置堆区的指针brk的值。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>end_data_seg <span class="token operator">&gt;=</span> current<span class="token operator">-&gt;</span>end_code <span class="token operator">&amp;&amp;</span>
    end_data_seg <span class="token operator">&lt;</span> current<span class="token operator">-&gt;</span>start_stack <span class="token operator">-</span> <span class="token number">16384</span><span class="token punctuation">)</span>
    current<span class="token operator">-&gt;</span>brk <span class="token operator">=</span> end_data_seg<span class="token punctuation">;</span>
<span class="token keyword">return</span> current<span class="token operator">-&gt;</span>brk<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-setpgid" tabindex="-1"><a class="header-anchor" href="#sys-setpgid" aria-hidden="true">#</a> sys_setpgid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setpgid</span><span class="token punctuation">(</span><span class="token keyword">int</span> pid<span class="token punctuation">,</span> <span class="token keyword">int</span> pgid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是将进程号等于pid的进程的组号设置为pgid。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> i<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pid<span class="token punctuation">)</span>
    pid <span class="token operator">=</span> current<span class="token operator">-&gt;</span>pid<span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pgid<span class="token punctuation">)</span>
    pgid <span class="token operator">=</span> current<span class="token operator">-&gt;</span>pid<span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">;</span> i<span class="token operator">&lt;</span>NR_TASKS <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>task<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>pid<span class="token operator">==</span>pid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>leader<span class="token punctuation">)</span><span class="token comment">//如果不是会话leader，则没有权限</span>
            <span class="token keyword">return</span> <span class="token operator">-</span>EPERM<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>session <span class="token operator">!=</span> current<span class="token operator">-&gt;</span>session<span class="token punctuation">)</span><span class="token comment">//必须要属于同一个会话</span>
            <span class="token keyword">return</span> <span class="token operator">-</span>EPERM<span class="token punctuation">;</span>
        task<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-&gt;</span>pgrp <span class="token operator">=</span> pgid<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token operator">-</span>ESRCH<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-getpgrp" tabindex="-1"><a class="header-anchor" href="#sys-getpgrp" aria-hidden="true">#</a> sys_getpgrp</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_getpgrp</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用于返回当前进程的进程组号。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">return</span> current<span class="token operator">-&gt;</span>pgrp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-setsid" tabindex="-1"><a class="header-anchor" href="#sys-setsid" aria-hidden="true">#</a> sys_setsid</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_setsid</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用于创建一个session，并设置进程为会话首领。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token operator">-&gt;</span>leader <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">suser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//该进程已经是leader，但是不是超级用户，则返回-EPERM。</span>
    <span class="token keyword">return</span> <span class="token operator">-</span>EPERM<span class="token punctuation">;</span>
current<span class="token operator">-&gt;</span>leader <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//设置leader = 1</span>
current<span class="token operator">-&gt;</span>session <span class="token operator">=</span> current<span class="token operator">-&gt;</span>pgrp <span class="token operator">=</span> current<span class="token operator">-&gt;</span>pid<span class="token punctuation">;</span><span class="token comment">//设置进程会话号</span>
current<span class="token operator">-&gt;</span>tty <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//设置进程没有控制中断</span>
<span class="token keyword">return</span> current<span class="token operator">-&gt;</span>pgrp<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-uname" tabindex="-1"><a class="header-anchor" href="#sys-uname" aria-hidden="true">#</a> sys_uname</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_uname</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">utsname</span> <span class="token operator">*</span> name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数用于获取系统名称等信息。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">struct</span> <span class="token class-name">utsname</span> thisname <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;linux .0&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;nodename&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;release &quot;</span><span class="token punctuation">,</span><span class="token string">&quot;version &quot;</span><span class="token punctuation">,</span><span class="token string">&quot;machine &quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> i<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>name<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">-</span>ERROR<span class="token punctuation">;</span>
<span class="token function">verify_area</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span><span class="token keyword">sizeof</span> <span class="token operator">*</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token keyword">sizeof</span> <span class="token operator">*</span>name<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token function">put_fs_byte</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span>thisname<span class="token punctuation">)</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>i<span class="token operator">+</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-umask" tabindex="-1"><a class="header-anchor" href="#sys-umask" aria-hidden="true">#</a> sys_umask</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_umask</span><span class="token punctuation">(</span><span class="token keyword">int</span> mask<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置当前进程创建文件的属性屏蔽码为<code>(mask &amp; 0777)</code>。</p><p><code>0777</code>代表数字是一个八进制数字，即000111111111。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> old <span class="token operator">=</span> current<span class="token operator">-&gt;</span>umask<span class="token punctuation">;</span>

current<span class="token operator">-&gt;</span>umask <span class="token operator">=</span> mask <span class="token operator">&amp;</span> <span class="token number">0777</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> <span class="token punctuation">(</span>old<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,97),o=[p];function c(i,l){return n(),a("div",null,o)}const r=s(t,[["render",c],["__file","Linux-0.11-kernel-sys.html.vue"]]);export{r as default};