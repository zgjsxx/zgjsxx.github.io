import{_ as s,V as n,W as a,a0 as e}from"./framework-9a29aaa0.js";const i={},c=e(`<ul><li><a href="#linux-011-kernel%E7%9B%AE%E5%BD%95%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86system_calls%E8%AF%A6%E8%A7%A3">Linux-0.11 kernel目录进程管理system_call.s详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E8%BF%87%E7%A8%8B%E5%88%86%E6%9E%90">过程分析</a><ul><li><a href="#system_call">system_call</a></li><li><a href="#ret_from_sys_call">ret_from_sys_call</a></li><li><a href="#sys_fork">sys_fork</a></li></ul></li></ul></li></ul><h1 id="linux-0-11-kernel目录进程管理system-call-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理system-call-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理system_call.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>本节主要介绍了在Linux-0.11中关于系统调用的相关实现。Linux-0.11使用<code>int 0x80</code>中断以及<code>eax</code>寄存器中存储的功能号去调用内核中所提供的功能，在系统调用发生的过程中伴随着用户态向内核态的主动切换。</p><p>需要注意的时，用户通常并不是直接使用系统调用的中断，而是libc中所提供的接口函数实现。</p><p>系统调用处理过程的整个流程如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/kernel/system_call/syscall_flow.png" alt="系统调用" tabindex="0" loading="lazy"><figcaption>系统调用</figcaption></figure><h2 id="过程分析" tabindex="-1"><a class="header-anchor" href="#过程分析" aria-hidden="true">#</a> 过程分析</h2><h3 id="system-call" tabindex="-1"><a class="header-anchor" href="#system-call" aria-hidden="true">#</a> system_call</h3><p>当0x80号中断发生的时候，CPU除了切入内核态之外，还会自动完成下列几件事：</p><p>1.找到当前进程的内核栈, 通过<code>tss</code>中的<code>esp0</code> <code>ss0</code>定位</p><p>2.在内核栈中依次压入用户态的寄存器<code>SS</code>、<code>ESP</code>、<code>EFLAGS</code>、<code>CS</code>、<code>EIP</code></p><p>当内核从系统调用中返回的时候，需要调用<code>iret</code>指令来返回用户态，显然iret代表的是内核栈中一系列的寄存器<code>SS</code>、<code>ESP</code>、<code>EFLAGS</code>、<code>CS</code>、<code>EIP</code>弹出操作。</p><p>在system_call中会将DS、ES、FS、EDX、ECX、EBX入栈。</p><p>在调用sys_call函数时，会将系统调用号传给eax， 因此首先判断eax是否超过了最大的系统调用号, 如果超出了，就跳到 bad_sys_call 标签处处理错误。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmpl $nr_system_calls-1,%eax
ja bad_sys_call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来的几行代码保存了原来的段寄存器值，因为系统调用会改变这些寄存器的值。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>push %ds
push %es
push %fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面入栈的ebx、ecx和edx中放着系统调用相应C语言函数的调用函数。这几个寄存器入栈的顺序是由GNU GCC规定的，ebx 中可存放第1个参数，ecx中存放第2个参数，edx中存放第3个参数。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>pushl %edx
pushl %ecx		# push %ebx,%ecx,%edx as parameters
pushl %ebx		# to the system call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来将<code>es</code>和<code>ds</code>设置为<code>0x10</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movl $0x10,%edx		# set up ds,es to kernel space
mov %dx,%ds
mov %dx,%es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>0x10</code>多次出现，可以分解为<code>0x10 = 0000000000010_0_00</code>，即段选择子 = 2，TI = 0，RPL = 0。这里之际就是让<code>ds</code>和<code>es</code>指向了内核数据段。</p><p>接下来将<code>fs</code>设置为<code>0x17</code>。可以分解为<code>0x17 = 0000000000010_1_11</code>。即段选择子 = 2，TI = 1，RPL = 3。这里之际就是让\`\`\`fs\`\`指向了用户数据段。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movl $0x17,%edx		# fs points to local data space
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面根据系统调用号去找到对应的调用函数。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *sys_call_table(,%eax,4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在AT&amp;T的标准中，<code>_array(,%eax,4)</code>所代表的地址是<code>[_sys_call_table + %eax * 4]</code>,即功能号所对应的内核系统调用函数的地址。</p><p><code>sys_call_table</code>在<code>sys.h</code>中定义</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>fn_ptr sys_call_table<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> sys_setup<span class="token punctuation">,</span> sys_exit<span class="token punctuation">,</span> sys_fork<span class="token punctuation">,</span> sys_read<span class="token punctuation">,</span>
sys_write<span class="token punctuation">,</span> sys_open<span class="token punctuation">,</span> sys_close<span class="token punctuation">,</span> sys_waitpid<span class="token punctuation">,</span> sys_creat<span class="token punctuation">,</span> sys_link<span class="token punctuation">,</span>
sys_unlink<span class="token punctuation">,</span> sys_execve<span class="token punctuation">,</span> sys_chdir<span class="token punctuation">,</span> sys_time<span class="token punctuation">,</span> sys_mknod<span class="token punctuation">,</span> sys_chmod<span class="token punctuation">,</span>
sys_chown<span class="token punctuation">,</span> sys_break<span class="token punctuation">,</span> sys_stat<span class="token punctuation">,</span> sys_lseek<span class="token punctuation">,</span> sys_getpid<span class="token punctuation">,</span> sys_mount<span class="token punctuation">,</span>
sys_umount<span class="token punctuation">,</span> sys_setuid<span class="token punctuation">,</span> sys_getuid<span class="token punctuation">,</span> sys_stime<span class="token punctuation">,</span> sys_ptrace<span class="token punctuation">,</span> sys_alarm<span class="token punctuation">,</span>
sys_fstat<span class="token punctuation">,</span> sys_pause<span class="token punctuation">,</span> sys_utime<span class="token punctuation">,</span> sys_stty<span class="token punctuation">,</span> sys_gtty<span class="token punctuation">,</span> sys_access<span class="token punctuation">,</span>
sys_nice<span class="token punctuation">,</span> sys_ftime<span class="token punctuation">,</span> sys_sync<span class="token punctuation">,</span> sys_kill<span class="token punctuation">,</span> sys_rename<span class="token punctuation">,</span> sys_mkdir<span class="token punctuation">,</span>
sys_rmdir<span class="token punctuation">,</span> sys_dup<span class="token punctuation">,</span> sys_pipe<span class="token punctuation">,</span> sys_times<span class="token punctuation">,</span> sys_prof<span class="token punctuation">,</span> sys_brk<span class="token punctuation">,</span> sys_setgid<span class="token punctuation">,</span>
sys_getgid<span class="token punctuation">,</span> sys_signal<span class="token punctuation">,</span> sys_geteuid<span class="token punctuation">,</span> sys_getegid<span class="token punctuation">,</span> sys_acct<span class="token punctuation">,</span> sys_phys<span class="token punctuation">,</span>
sys_lock<span class="token punctuation">,</span> sys_ioctl<span class="token punctuation">,</span> sys_fcntl<span class="token punctuation">,</span> sys_mpx<span class="token punctuation">,</span> sys_setpgid<span class="token punctuation">,</span> sys_ulimit<span class="token punctuation">,</span>
sys_uname<span class="token punctuation">,</span> sys_umask<span class="token punctuation">,</span> sys_chroot<span class="token punctuation">,</span> sys_ustat<span class="token punctuation">,</span> sys_dup2<span class="token punctuation">,</span> sys_getppid<span class="token punctuation">,</span>
sys_getpgrp<span class="token punctuation">,</span> sys_setsid<span class="token punctuation">,</span> sys_sigaction<span class="token punctuation">,</span> sys_sgetmask<span class="token punctuation">,</span> sys_ssetmask<span class="token punctuation">,</span>
sys_setreuid<span class="token punctuation">,</span>sys_setregid<span class="token punctuation">,</span> sys_iam<span class="token punctuation">,</span> sys_whoami <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>找到系统调用号之后，call命令就将转到相应的地址执行。</p><p>当系统调用执行完毕之后，下面判断进程的状态：</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>	movl current,%eax
	cmpl $0,state(%eax)		# state
	jne reschedule
	cmpl $0,counter(%eax)		# counter
	je reschedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果进程状态是ok的，也就意味着程序可以继续运行而不必被挂起， 那么就开始执行<code>ret_from_sys_call</code>。</p><h3 id="ret-from-sys-call" tabindex="-1"><a class="header-anchor" href="#ret-from-sys-call" aria-hidden="true">#</a> ret_from_sys_call</h3><p>当系统调用执行完毕之后，会执行<code>ret_from_sys_call</code>的代码，从而返回用户态。</p><p>在系统调用返回之前，这里还要做的一件事情就是处理进程收到的信号。寄存器中存储的是当前运行的进程current的pcb的地址。这里可以回顾一下pcb的结构，signal的偏移量是16，而blocked的偏移量是33*16。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
<span class="token comment">/* these are hardcoded - don&#39;t touch */</span>
	<span class="token keyword">long</span> state<span class="token punctuation">;</span>	<span class="token comment">/* -1 unrunnable, 0 runnable, &gt;0 stopped */</span>
	<span class="token keyword">long</span> counter<span class="token punctuation">;</span>
	<span class="token keyword">long</span> priority<span class="token punctuation">;</span>
	<span class="token keyword">long</span> signal<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">sigaction</span> sigaction<span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">long</span> blocked<span class="token punctuation">;</span>	
	<span class="token comment">/*....*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此这里定义了两个常量singal=16，blocked=33*16，通过这样的操作将signal的内容存到ebx寄存器中，将blocked的内容存到ecx寄存器中。然后将blocked信号取反和进程收到的信号做与运算（!block &amp; signal），就可以得到进程收到的有效的信号。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl signal(%eax),%ebx
	movl blocked(%eax),%ecx
	notl %ecx
	andl %ebx,%ecx
	bsfl %ecx,%ecx
	je 3f
	btrl %ecx,%ebx
	movl %ebx,signal(%eax)
	incl %ecx
	pushl %ecx
	call do_signal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在信号处理完毕之后，就是将sys_call压入栈中的寄存器出栈，最后调用iret返回用户态执行的位置。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>3:	popl %eax
	popl %ebx
	popl %ecx
	popl %edx
	pop %fs
	pop %es
	pop %ds
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-fork" tabindex="-1"><a class="header-anchor" href="#sys-fork" aria-hidden="true">#</a> sys_fork</h3><p>在sys_fork中将调用copy_process完成最后的进程fork的过程，下面是sys_fork的编码，其是一段汇编代码，这是少数用汇编写的sys_开头的函数，大多数sys_开头的内核方法都是c语言编写的。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sys_fork:
	call find_empty_process
	testl %eax,%eax
	js 1f
	push %gs
	pushl %esi
	pushl %edi
	pushl %ebp
	pushl %eax
	call copy_process
	addl $20,%esp
1:	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sys_fork首先调用find_empty_process去进程task_struct数组中寻找一个空位，如果寻找不到就直接返回。如果寻找到了，就将一些寄存器压栈，进而调用copy_process方法。在调用sys_fork方法时，内核栈的状态如下所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/fork/system_call_stack.png" alt="内核栈的状态" tabindex="0" loading="lazy"><figcaption>内核栈的状态</figcaption></figure>`,47),t=[c];function l(p,d){return n(),a("div",null,t)}const u=s(i,[["render",l],["__file","Linux-0.11-kernel-system_call.html.vue"]]);export{u as default};
