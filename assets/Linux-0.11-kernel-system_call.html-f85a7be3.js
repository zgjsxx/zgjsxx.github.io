import{_ as s,V as n,W as e,a0 as a}from"./framework-9a29aaa0.js";const i={},d=a(`<ul><li><a href="#linux-011-kernel%E7%9B%AE%E5%BD%95%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86system_calls%E8%AF%A6%E8%A7%A3">Linux-0.11 kernel目录进程管理system_call.s详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E8%BF%87%E7%A8%8B%E5%88%86%E6%9E%90">过程分析</a><ul><li><a href="#system_call">system_call</a></li><li><a href="#ret_from_sys_call">ret_from_sys_call</a></li><li><a href="#sys_fork">sys_fork</a></li><li><a href="#sys_execve">sys_execve</a></li><li><a href="#coprocessor_error">coprocessor_error</a></li><li><a href="#device_not_available">device_not_available</a></li><li><a href="#timer_interrupt">timer_interrupt</a></li><li><a href="#hd_interrupt">hd_interrupt</a></li><li><a href="#floppy_interrupt">floppy_interrupt</a></li><li><a href="#parallel_interrupt">parallel_interrupt</a></li></ul></li></ul></li></ul><h1 id="linux-0-11-kernel目录进程管理system-call-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理system-call-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理system_call.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>本节主要介绍了在Linux-0.11中关于系统调用的相关实现。Linux-0.11使用<code>int 0x80</code>中断以及<code>eax</code>寄存器中存储的功能号去调用内核中所提供的功能，在系统调用发生的过程中伴随着用户态向内核态的主动切换。</p><p>需要注意的时，用户通常并不是直接使用系统调用的中断，而是libc中所提供的接口函数实现。</p><p>系统调用处理过程的整个流程如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/system_call/syscall_flow.png" alt="系统调用" tabindex="0" loading="lazy"><figcaption>系统调用</figcaption></figure><h2 id="过程分析" tabindex="-1"><a class="header-anchor" href="#过程分析" aria-hidden="true">#</a> 过程分析</h2><h3 id="system-call" tabindex="-1"><a class="header-anchor" href="#system-call" aria-hidden="true">#</a> system_call</h3><p>当0x80号中断发生的时候，CPU除了切入内核态之外，还会自动完成下列几件事：</p><p>1.找到当前进程的内核栈, 通过<code>tss</code>中的<code>esp0</code> <code>ss0</code>定位</p><p>2.在内核栈中依次压入用户态的寄存器<code>SS</code>、<code>ESP</code>、<code>EFLAGS</code>、<code>CS</code>、<code>EIP</code></p><p>当内核从系统调用中返回的时候，需要调用<code>iret</code>指令来返回用户态，显然iret代表的是内核栈中一系列的寄存器<code>SS</code>、<code>ESP</code>、<code>EFLAGS</code>、<code>CS</code>、<code>EIP</code>弹出操作。</p><p>在<code>system_call</code>中会将DS、ES、FS、EDX、ECX、EBX入栈。</p><p>在调用<code>sys_call</code>函数时，会将系统调用号传给<code>eax</code>， 因此首先判断<code>eax</code>是否超过了最大的系统调用号, 如果超出了，就跳到 <code>bad_sys_call</code> 标签处处理错误。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmpl $nr_system_calls-1,%eax
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果进程状态是ok的，也就意味着程序可以继续运行而不必被挂起， 那么就开始执行<code>ret_from_sys_call</code>。</p><h3 id="ret-from-sys-call" tabindex="-1"><a class="header-anchor" href="#ret-from-sys-call" aria-hidden="true">#</a> ret_from_sys_call</h3><p>当系统调用执行完毕之后，会执行<code>ret_from_sys_call</code>的代码，从而返回用户态。</p><p>这里首先判别当前任务是否是初始任务task0,如果是则不比对其进行信号量方面的处理，直接返回。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl current,%eax		# task[0] cannot have signals
	cmpl task,%eax
	je 3f                   # 向前(forward)跳转到标号3处退出中断处理
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过对原调用程序代码选择符的检查来判断调用程序是否是用户任务。如果不是则直接退出中断。这是因为任务在内核态执行时不可抢占。否则对任务进行信号量的识别处理。这里比较选择符是否为用户代码段的选择符0x000f(RPL=3,局部表，第一个段(代码段))来判断是否为用户任务。如果不是则说明是某个中断服务程序跳转到上面的，于是跳转退出中断程序。如果原堆栈段选择符不为0x17(即原堆栈不在用户段中)，也说明本次系统调用的调用者不是用户任务，则也退出。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	cmpw $0x0f,CS(%esp)		# was old code segment supervisor ?
	jne 3f
	cmpw $0x17,OLDSS(%esp)		# was stack segment = 0x17 ?
	jne 3f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在系统调用返回之前，这里还要做的一件事情就是处理进程收到的信号。寄存器中存储的是当前运行的进程current的pcb的地址。这里可以回顾一下pcb的结构，signal的偏移量是16，而blocked的偏移量是33*16。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
<span class="token comment">/* these are hardcoded - don&#39;t touch */</span>
	<span class="token keyword">long</span> state<span class="token punctuation">;</span>	<span class="token comment">/* -1 unrunnable, 0 runnable, &gt;0 stopped */</span>
	<span class="token keyword">long</span> counter<span class="token punctuation">;</span>
	<span class="token keyword">long</span> priority<span class="token punctuation">;</span>
	<span class="token keyword">long</span> signal<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">sigaction</span> sigaction<span class="token punctuation">[</span><span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">long</span> blocked<span class="token punctuation">;</span>	
	<span class="token comment">/*....*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此这里定义了两个常量<code>singal=16</code>，<code>blocked=33*16</code>，通过这样的操作将signal的内容存到<code>ebx</code>寄存器中，将<code>blocked</code>的内容存到ecx寄存器中。然后将<code>blocked</code>信号取反和进程收到的信号做与运算（!block &amp; signal），就可以得到进程收到的有效的信号。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl signal(%eax),%ebx
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在信号处理完毕之后，就是将<code>sys_call</code>压入栈中的寄存器出栈，最后调用<code>iret</code>返回用户态执行的位置。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>3:	popl %eax
	popl %ebx
	popl %ecx
	popl %edx
	pop %fs
	pop %es
	pop %ds
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sys-fork" tabindex="-1"><a class="header-anchor" href="#sys-fork" aria-hidden="true">#</a> sys_fork</h3><p>在sys_fork中将调用<code>copy_process</code>完成最后的进程fork的过程，下面是<code>sys_fork</code>的代码，其是一段汇编代码，这是少数用汇编写的sys_开头的函数，大多数sys_开头的内核方法都是c语言编写的。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sys_fork:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>sys_fork</code>首先调用<code>find_empty_process</code>去进程<code>task_struct</code>数组中寻找一个空位，如果寻找不到就直接返回。如果寻找到了，就将一些寄存器压栈，进而调用<code>copy_process</code>方法。在调用<code>sys_fork</code>方法时，内核栈的状态如下所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/fork/system_call_stack.png" alt="内核栈的状态" tabindex="0" loading="lazy"><figcaption>内核栈的状态</figcaption></figure><h3 id="sys-execve" tabindex="-1"><a class="header-anchor" href="#sys-execve" aria-hidden="true">#</a> sys_execve</h3><p>这是sys_execve系统调用。取中断调用程序的代码指针作为参数调用C函数<code>do_execve()</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sys_execve:
	lea EIP(%esp),%eax  # eax指向堆栈中保存用户程序的eip指针处(EIP+%esp)
	pushl %eax
	call do_execve
	addl $4,%esp        # 丢弃调用时压入栈的EIP值
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="coprocessor-error" tabindex="-1"><a class="header-anchor" href="#coprocessor-error" aria-hidden="true">#</a> coprocessor_error</h3><p>这段代码是一个处理协处理器错误的中断处理程序。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>coprocessor_error:
	push %ds
	push %es
	push %fs
	pushl %edx
	pushl %ecx
	pushl %ebx
	pushl %eax
	movl $0x10,%eax                 # ds,es置为指向内核数据段
	mov %ax,%ds
	mov %ax,%es
	movl $0x17,%eax                 # fs置为指向局部数据段(出错程序的数据段)
	mov %ax,%fs
	pushl $ret_from_sys_call        # 把下面调用返回的地址入栈。
	jmp math_error                  # 执行C函数math_error(在math/math_emulate.c中)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，它保存了当前的数据段寄存器<code>ds</code>、<code>es</code>、<code>fs</code> 到堆栈中，以便后续恢复。</p><p>接着，它将 <code>edx</code>、<code>ecx</code>、<code>ebx</code>、<code>eax</code> 寄存器的值依次压入堆栈中，保存了这些寄存器的内容。</p><p>然后，它将 <code>ds</code> 和 <code>es</code> 寄存器设置为指向内核数据段，即将数据段选择符设置为 <code>0x10</code>，以确保后续操作在内核数据段中进行。</p><p><code>fs</code> 寄存器被设置为指向局部数据段，即设置数据段选择符为 <code>0x17</code>，这可能是为了在错误处理中访问特定于错误情况的数据。</p><p>接着，它将一个返回地址 ret_from_sys_call 压入堆栈，该地址指示了错误处理程序返回后要返回的位置。</p><p>最后，它通过 <code>jmp</code> 指令跳转到 <code>math_error</code> 函数，执行实际的错误处理。这个函数在 math/math_emulate.c 中实现。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">math_error</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">__asm__</span><span class="token punctuation">(</span><span class="token string">&quot;fnclex&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>last_task_used_math<span class="token punctuation">)</span>
		last_task_used_math<span class="token operator">-&gt;</span>signal <span class="token operator">|=</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token punctuation">(</span>SIGFPE<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fnclex</code> 指令用于清除数学协处理器状态字（FP status word），确保在处理错误之前清除任何悬而未决的数学操作结果，以避免错误状态的传播。</p><p>然后，它检查变量 <code>last_task_used_math</code> 是否为真（非空）。如果上一个使用数学协处理器的任务存在，它将设置该任务的信号字段中的 <code>SIGFPE</code> 位，通过位运算 1&lt;&lt;<code>(SIGFPE-1)</code> 来设置该位，<code>SIGFPE</code> 是表示浮点运算错误的信号。这样做是为了标记任务曾经发生过浮点运算错误，以便后续处理。</p><p>总的来说，这段代码是在处理协处理器错误时执行的，它准备了一些寄存器和数据段，然后跳转到特定的错误处理函数。</p><h3 id="device-not-available" tabindex="-1"><a class="header-anchor" href="#device-not-available" aria-hidden="true">#</a> device_not_available</h3><p>设备不存在或协处理器不存在。类型：错误；无错误码。</p><p>如果控制寄存器CRO中EM(模拟)标志置位，则当CPU执行一个协处理器指令时就会引发该中断，这样CPU就可以有机会让这个中断处理程序模拟协处理器指令。CRO的交换标志TS是在CPU执行任务转换时设置的。TS可以用来确定什么时候协处理器中的内容与CPU正在执行的任务不匹配了。当CPU在运行一个协处理器转义指令时发现TS置位时，就会引发该中断。此时就可以保存前一个任务的协处理器内容，并恢复新任务的协处理器执行状态。该中断最后将转移到标号ret_from_sys_call处执行下去(检测并处理信号)。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>device_not_available:
	push %ds
	push %es
	push %fs
	pushl %edx
	pushl %ecx
	pushl %ebx
	pushl %eax
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
	movl $0x17,%eax
	mov %ax,%fs
	pushl $ret_from_sys_call    # 把下面跳转或调用的返回地址入栈。
	clts				# clear TS so that we can use math
	movl %cr0,%eax
	testl $0x4,%eax			# EM (math emulation bit)
	je math_state_restore   # 执行C函数
	pushl %ebp
	pushl %esi
	pushl %edi
	call math_emulate
	popl %edi
	popl %esi
	popl %ebp
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，它保存了当前的数据段寄存器 <code>ds</code>、<code>es</code>、<code>fs</code> 到堆栈中，以便后续恢复。</p><p>接着，它将 <code>edx</code>、<code>ecx</code>、<code>ebx</code>、<code>eax</code> 寄存器的值依次压入堆栈中，保存了这些寄存器的内容。</p><p>然后，它将 <code>ds</code> 和 <code>es</code> 寄存器设置为指向内核数据段，即将数据段选择符设置为 <code>0x10</code>，以确保后续操作在内核数据段中进行。</p><p><code>fs</code> 寄存器被设置为指向局部数据段，即设置数据段选择符为 <code>0x17</code>，这可能是为了在错误处理中访问特定于错误情况的数据。</p><p>接着，它将一个返回地址 <code>ret_from_sys_call</code> 压入堆栈，该地址指示了中断处理程序返回后要返回的位置。</p><p><code>clts</code> 指令用于清除任务切换标志位（TS），以允许使用数学协处理器。</p><p>接下来，它通过读取控制寄存器 <code>CR0</code> 来检查数学仿真位<code>EM</code>，如果未设置，即协处理器为可用状态，则跳转到 <code>math_state_restore</code> 执行相应的 C 函数。</p><p>如果数学仿真位被设置，即协处理器不可用，则调用 <code>math_emulate</code> 函数来模拟数学操作。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">math_emulate</span><span class="token punctuation">(</span><span class="token keyword">long</span> edi<span class="token punctuation">,</span> <span class="token keyword">long</span> esi<span class="token punctuation">,</span> <span class="token keyword">long</span> ebp<span class="token punctuation">,</span> <span class="token keyword">long</span> sys_call_ret<span class="token punctuation">,</span>
	<span class="token keyword">long</span> eax<span class="token punctuation">,</span><span class="token keyword">long</span> ebx<span class="token punctuation">,</span><span class="token keyword">long</span> ecx<span class="token punctuation">,</span><span class="token keyword">long</span> edx<span class="token punctuation">,</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">short</span> fs<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">short</span> es<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">short</span> ds<span class="token punctuation">,</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">long</span> eip<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">short</span> cs<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> eflags<span class="token punctuation">,</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">short</span> ss<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> esp<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">unsigned</span> <span class="token keyword">char</span> first<span class="token punctuation">,</span> second<span class="token punctuation">;</span>

<span class="token comment">/* 0x0007 means user code space */</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>cs <span class="token operator">!=</span> <span class="token number">0x000F</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;math_emulate: %04x:%08x\\n\\r&quot;</span><span class="token punctuation">,</span>cs<span class="token punctuation">,</span>eip<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;Math emulation needed in kernel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	first <span class="token operator">=</span> <span class="token function">get_fs_byte</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token operator">&amp;</span>eip<span class="token punctuation">)</span><span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	second <span class="token operator">=</span> <span class="token function">get_fs_byte</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token operator">&amp;</span>eip<span class="token punctuation">)</span><span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;%04x:%08x %02x %02x\\n\\r&quot;</span><span class="token punctuation">,</span>cs<span class="token punctuation">,</span>eip<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span>first<span class="token punctuation">,</span>second<span class="token punctuation">)</span><span class="token punctuation">;</span>
	current<span class="token operator">-&gt;</span>signal <span class="token operator">|=</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token punctuation">(</span>SIGFPE<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数接受了一系列参数，包括寄存器的值和当前的代码段、指令指针等信息。</p><p>首先，它检查当前的代码段是否为用户代码空间（<code>0x000F</code>）。如果不是，则打印错误消息并引发 panic。这表示内核中出现了需要数学模拟的情况，这通常是不允许的，因此会导致内核崩溃。</p><p>如果当前代码段确实为用户代码空间，它会依次从指令指针处读取两个字节的数据，即模拟执行用户空间的指令。然后，它打印所读取的指令的地址、内容。</p><p>最后，它将当前任务的信号字段中的 <code>SIGFPE</code> 位设置为1，表示发生了浮点运算错误。</p><h3 id="timer-interrupt" tabindex="-1"><a class="header-anchor" href="#timer-interrupt" aria-hidden="true">#</a> timer_interrupt</h3><p>这里是<code>int 0x20</code>时钟中断处理程序。中断频率被设置为100Hz。</p><p>下面这里是中断处理函数的一个固定套路。</p><p>首先，它保存了当前的数据段寄存器 <code>ds</code>、<code>es</code>、<code>fs</code> 到堆栈中，以便后续恢复。</p><p>接着，它将 <code>edx</code>、<code>ecx</code>、<code>ebx</code>、<code>eax</code> 寄存器的值依次压入堆栈中，保存了这些寄存器的内容。</p><p>然后，它将 <code>ds</code> 和 <code>es</code> 寄存器设置为指向内核数据段，即将数据段选择符设置为 <code>0x10</code>，以确保后续操作在内核数据段中进行。</p><p><code>fs</code> 寄存器被设置为指向局部数据段，即设置数据段选择符为 <code>0x17</code>，这可能是为了在中断处理中访问特定于定时器的数据。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>timer_interrupt:
	push %ds		# save ds,es and put kernel data space
	push %es		# into them. %fs is used by _system_call
	push %fs
	pushl %edx		# we save %eax,%ecx,%edx as gcc doesn&#39;t
	pushl %ecx		# save those across function calls. %ebx
	pushl %ebx		# is saved as we use that in ret_sys_call
	pushl %eax
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
	movl $0x17,%eax
	mov %ax,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>incl jiffies</code> 增加了全局变量 <code>jiffies</code>，它用于跟踪系统运行时间。</p><p>接下来，它向中断控制器发送 <code>End-of-Interrupt（EOI）</code>信号，以告知硬件中断处理已完成。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	incl jiffiesss
	movb $0x20,%al		# EOI to interrupt controller #1
	outb %al,$0x20      # 操作命令字OCW2送0x20端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，它从堆栈中取出当前特权级别（CPL），并将其压入堆栈，作为参数传递给 <code>do_timer()</code> 函数。<code>do_timer()</code>函数负责执行任务切换、计时等工作。</p><p>最后，它调用 <code>do_timer()</code> 函数，并通过 <code>ret_from_sys_call</code> 返回到系统调用的返回路径。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl CS(%esp),%eax
	andl $3,%eax		# %eax is CPL (0 or 3, 0=supervisor)
	pushl %eax
	call do_timer		# &#39;do_timer(long CPL)&#39; does everything from
	addl $4,%esp		# task switching to accounting ...
	jmp ret_from_sys_call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hd-interrupt" tabindex="-1"><a class="header-anchor" href="#hd-interrupt" aria-hidden="true">#</a> hd_interrupt</h3><p><code>hd_interrupt</code>是<code>int 0x2E</code>硬盘中断处理函数，相应硬件请求IRQ14。</p><p>首先将 %eax、%ecx、%edx 寄存器的值压入堆栈。这是为了保存这些寄存器的值，在处理中断后恢复它们的原始值。</p><p>接着将 %ds、%es、%fs 寄存器的值压入堆栈。同样，这是为了保存这些寄存器的值。</p><p>设置数据段寄存器 %ds 和 %es 以及附加段寄存器 %fs 为指向内核数据段，即将数据段选择符设置为 0x10 和 0x17</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>hd_interrupt:
	pushl %eax
	pushl %ecx
	pushl %edx
	push %ds
	push %es
	push %fs
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
	movl $0x17,%eax
	mov %ax,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将立即数 <code>0x20</code> 移动到 <code>al</code> 寄存器中。这个操作是为了向<strong>从中断控制器</strong>发送 End-of-Interrupt（EOI）信号，告知它当前处理的硬盘中断已经完成。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movb $0x20,%al
	outb %al,$0xA0		# EOI to interrupt controller #1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code>do_hd</code> 变量和 <code>edx</code> 寄存器的值进行交换。<code>do_hd</code> 是一个函数指针，用于处理硬盘中断。这个操作将 <code>do_hd</code> 变量置空，并将原来 <code>do_hd</code> 的值（可能是一个函数指针）存储在 <code>edx</code> 中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	jmp 1f			# give port chance to breathe 延时作用
1:	jmp 1f
1:	xorl %edx,%edx
	xchgl do_hd,%edx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来测试 <code>edx</code> 寄存器的值是否为零。如果 <code>edx</code> 不为零，则跳转到标签 1f。否则将地址<code>unexpected_hd_interrupt</code> 存储到 <code>edx</code> 寄存器中，准备调用一个处理软盘中断的 C 函数。调用前会向主8259A发用EOI指令。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	testl %edx,%edx             
	jne 1f                      
	movl $unexpected_hd_interrupt,%edx
1:	outb %al,$0x20              
	call *%edx	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用完毕之后弹出栈中保存的寄存器的值。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pop %fs                     
	pop %es
	pop %ds
	popl %edx
	popl %ecx
	popl %eax
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="floppy-interrupt" tabindex="-1"><a class="header-anchor" href="#floppy-interrupt" aria-hidden="true">#</a> floppy_interrupt</h3><p>这里是<code>int 0x26</code>软盘驱动器中断处理程序。相应硬件请求IRQ6。</p><p>这里的处理流程与hd_interrupt的流程很相似。</p><p>首先将 %eax、%ecx、%edx 寄存器的值压入堆栈。这是为了保存这些寄存器的值，在处理中断后恢复它们的原始值。</p><p>接着将 %ds、%es、%fs 寄存器的值压入堆栈。同样，这是为了保存这些寄存器的值。</p><p>设置数据段寄存器 %ds 和 %es 以及附加段寄存器 %fs 为指向内核数据段，即将数据段选择符设置为 0x10 和 0x17</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>floppy_interrupt:
	pushl %eax
	pushl %ecx
	pushl %edx
	push %ds
	push %es
	push %fs
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
	movl $0x17,%eax
	mov %ax,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将立即数 <code>0x20</code> 移动到 <code>al</code> 寄存器中。这个操作是为了向主中断控制器发送 End-of-Interrupt（EOI）信号，告知它当前处理的软盘中断已经完成。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movb $0x20,%al
	outb %al,$0x20		# EOI to interrupt controller #1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code>do_floppy</code> 变量和 <code>eax</code> 寄存器的值进行交换。<code>do_floppy</code> 是一个函数指针，用于处理软盘中断。这个操作将 <code>do_floppy</code> 变量置空，并将原来 <code>do_floppy</code> 的值（可能是一个函数指针）存储在 <code>eax</code> 中。</p><p>读到这里会产生一个疑问，交换过后do_floppy就被清空了，那么下一次<code>floppy_interrupt</code>产生时，岂不是无法触发了？</p><p>在<code>do_floppy</code>的内部还会重新设置一次<code>do_floppy</code>的指向。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	xorl %eax,%eax
	xchgl do_floppy,%eax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来测试 <code>eax</code> 寄存器的值是否为零。如果 <code>eax</code> 不为零，则跳转到标签 1f。否则将地址<code>unexpected_floppy_interrupt</code> 存储到 <code>eax</code> 寄存器中，准备调用一个处理软盘中断的 C 函数。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	testl %eax,%eax
	jne 1f
	movl $unexpected_floppy_interrupt,%eax
1:	call *%eax		# &quot;interesting&quot; way of handling intr.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用完毕之后弹出栈中保存的寄存器的值。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pop %fs
	pop %es
	pop %ds
	popl %edx
	popl %ecx
	popl %eax
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="parallel-interrupt" tabindex="-1"><a class="header-anchor" href="#parallel-interrupt" aria-hidden="true">#</a> parallel_interrupt</h3><p>该方法是<code>int 0x27</code>并行口中断处理程序，对硬件中断请求信号IRQ7。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>parallel_interrupt:
	pushl %eax
	movb $0x20,%al
	outb %al,$0x20
	popl %eax
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>pushl %eax</code>: 将 <code>%eax</code> 寄存器的值压入堆栈。这是为了在执行 <code>iret</code> 指令之前保存 <code>%eax</code> 寄存器的值。</p><p><code>movb $0x20,%al</code>: 将立即数 0x20 移动到 %al 寄存器中。这个操作是为了向主中断控制器发送 End-of-Interrupt（EOI）信号，告知它当前处理的中断已经完成。</p><p><code>outb %al,$0x20</code>: 将 %al 寄存器的值（即 0x20）写入 I/O 端口 <code>0x20</code>，以向主中断控制器发送 EOI 信号，表示中断处理已经完成。</p><p><code>popl %eax</code>: 从堆栈中弹出之前保存的 %eax 寄存器的值，恢复到中断处理程序执行之前的状态。</p><p><code>iret</code>: 执行中断返回指令，从堆栈中弹出标志寄存器、代码段寄存器和指令指针的值，恢复到中断发生时的执行现场，并继续执行中断点之后的指令。</p><p>可以看出在Linux-0.11版本内核还未实现，这里只是发送EOI指令。</p>`,138),c=[d];function t(l,o){return n(),e("div",null,c)}const u=s(i,[["render",t],["__file","Linux-0.11-kernel-system_call.html.vue"]]);export{u as default};
