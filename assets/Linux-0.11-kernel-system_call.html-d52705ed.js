import{_ as s,V as n,W as a,a0 as e}from"./framework-c954d91f.js";const t={},p=e(`<h1 id="linux-0-11-kernel目录进程管理system-call-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理system-call-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理system_call.s详解</h1><h2 id="system-call" tabindex="-1"><a class="header-anchor" href="#system-call" aria-hidden="true">#</a> system_call</h2><p>当0x80号中断发生的时候，CPU除了切入内核态之外，还会自动完成下列几件事：</p><p>1.找到当前进程的内核栈, 通过tss中的esp0 ss0定位</p><p>2.在内核栈中依次压入用户态的寄存器SS、ESP、EFLAGS、CS、EIP</p><p>当内核从系统调用中返回的时候，需要调用&quot;iret&quot;指令来返回用户态，显然iret代表的是内核栈中一系列的寄存器SS、ESP、EFLAGS、CS、EIP弹出操作。</p><p>在system_call中会将DS、ES、FS、EDX、ECX、EBX入栈。</p><p>在调用sys_call函数时，会将系统调用号传给eax， 因此首先判断eax是否超过了最大的系统调用号。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>cmpl $nr_system_calls-1,%eax
ja bad_sys_call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来将一些寄存器压栈</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>push %ds
push %es
push %fs
pushl %edx
pushl %ecx		# push %ebx,%ecx,%edx as parameters
pushl %ebx		# to the system call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将es和ds指向了内核的数据段， 将fs指向了用户的数据段。 0x10 = |0 0 0 0 0 0 0 0 0 0 0 1 0| 0 | 0 0|</p><p>段选择子 = 2 TI = 0 RPL = 0</p><p>0x17 = |0 0 0 0 0 0 0 0 0 0 0 1 0| 1 | 1 1|</p><p>段选择子 = 2 TI = 1 RPL = 3</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>movl $0x10,%edx		# set up ds,es to kernel space
mov %dx,%ds
mov %dx,%es
movl $0x17,%edx		# fs points to local data space
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面根据系统调用号去找到对应的调用函数</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *sys_call_table(,%eax,4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>sys_call_table在sys.h中定义</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>fn_ptr sys_call_table<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> sys_setup<span class="token punctuation">,</span> sys_exit<span class="token punctuation">,</span> sys_fork<span class="token punctuation">,</span> sys_read<span class="token punctuation">,</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面判断进程的状态，</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>	movl current,%eax
	cmpl $0,state(%eax)		# state
	jne reschedule
	cmpl $0,counter(%eax)		# counter
	je reschedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果进程状态是ok的，也就意味着程序可以继续运行而不必被挂起， 那么就开始执行ret_from_sys_call</p><p>这段代码的作用就是将sys_call压入栈中的寄存器出栈</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>3:	popl %eax
	popl %ebx
	popl %ecx
	popl %edx
	pop %fs
	pop %es
	pop %ds
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),i=[p];function c(l,u){return n(),a("div",null,i)}const d=s(t,[["render",c],["__file","Linux-0.11-kernel-system_call.html.vue"]]);export{d as default};
