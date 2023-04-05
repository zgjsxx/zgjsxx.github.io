import{_ as e,V as d,W as a,a0 as i}from"./framework-c954d91f.js";const n={},s=i(`<h1 id="linux-0-11-kernel目录进程管理asm-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理asm-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理asm.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>该模块和CPU异常处理相关，在代码结构上asm.s和traps.c强相关。 CPU探测到异常时，主要分为两种处理方式，一种是有错误码，另一种是没有错误码，对应的方法就是<strong>error_code</strong>和<strong>no_error_code</strong>。在下面的函数详解中，将主要以两个函数展开。</p><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="no-error-code" tabindex="-1"><a class="header-anchor" href="#no-error-code" aria-hidden="true">#</a> no_error_code</h3><p>对于一些异常而言，CPU在出现这些异常时不会将error code压入栈中。其和一般的中断类似，会将ss,esp,eflags,cs,eip这几个寄存器的值压入内核栈中。如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/trap/no_error.png" alt="无错误码的情景" tabindex="0" loading="lazy"><figcaption>无错误码的情景</figcaption></figure><p>接下来，以divide_error为例，其会将do_divide_error的地址压入内核栈中， no_error_code第一步便是将do_divide_error的值存入eax中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>no_error_code:
	xchgl %eax,(%esp)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>no_error_code接下来就是保存一些CPU上下文，</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl %ebx
pushl %ecx
pushl %edx
pushl %edi
pushl %esi
pushl %ebp
push %ds
push %es
push %fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在保护好CPU上下文之后，接下来就是为调用do_divide_error做一些准备，将入参压入栈。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl $0		# &quot;error code&quot;
lea 44(%esp),%edx
pushl %edx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将下来初始化段寄存器，加载内核的数据段选择符。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>movl $0x10,%edx
mov %dx,%ds
mov %dx,%es
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些工作都准备完成之后，就通过call去调用do_divide_error这个c函数。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *%eax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>调用完毕之后，恢复现场。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>addl $8,%esp
pop %fs
pop %es
pop %ds
popl %ebp
popl %esi
popl %edi
popl %edx
popl %ecx
popl %ebx
popl %eax
iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="error-code" tabindex="-1"><a class="header-anchor" href="#error-code" aria-hidden="true">#</a> error_code</h3><p>对于一些异常而言，CPU在出现这些异常除了会将ss,esp,eflags,cs,eip这几个寄存器的值压入内核栈中以外，还会将error_code压入内核栈中。如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/trap/has_error.png" alt="有错误码的情景" tabindex="0" loading="lazy"><figcaption>有错误码的情景</figcaption></figure><p>以double_fault为例，出现该异常时，会将do_double_fault的地址压入栈中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>double_fault:
	pushl $do_double_fault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>error_code最初会将error_code的值写入eax寄存器中，将do_double_fault的地址写入ebx寄存器中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>error_code:
	xchgl %eax,4(%esp)		# error code &lt;-&gt; %eax
	xchgl %ebx,(%esp)		# &amp;function &lt;-&gt; %ebx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来保存CPU的上下文</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl %ecx
pushl %edx
pushl %edi
pushl %esi
pushl %ebp
push %ds
push %es
push %fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来做的也是为调用c函数做准备，首先将error_code和出错的地址压入栈中</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl %eax			# error code
lea 44(%esp),%eax		# offset
pushl %eax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将下来初始化段寄存器，加载内核的数据段选择符。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>movl $0x10,%edx
mov %dx,%ds
mov %dx,%es
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些工作都准备完成之后，就通过call去调用do_divide_error这个c函数。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *%ebx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后的工作便是用于恢复CPU上下文，</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>addl $8,%esp
pop %fs
pop %es
pop %ds
popl %ebp
popl %esi
popl %edi
popl %edx
popl %ecx
popl %ebx
popl %eax
iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="divide-error" tabindex="-1"><a class="header-anchor" href="#divide-error" aria-hidden="true">#</a> divide_error:</h3><p>无error code，其将do_divide_error的地址压入栈中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl $do_divide_error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="debug" tabindex="-1"><a class="header-anchor" href="#debug" aria-hidden="true">#</a> debug</h3><p>无error code，其将do_int3的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>debug:
	pushl $do_int3		# _do_debug
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nmi" tabindex="-1"><a class="header-anchor" href="#nmi" aria-hidden="true">#</a> nmi</h3><p>无error code，其将do_nmi的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>nmi:
	pushl $do_nmi
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="int3" tabindex="-1"><a class="header-anchor" href="#int3" aria-hidden="true">#</a> int3</h3><p>无error code，其将do_int3的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>int3:
	pushl $do_int3
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="overflow" tabindex="-1"><a class="header-anchor" href="#overflow" aria-hidden="true">#</a> overflow</h3><p>无error code，其将do_overflow的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>overflow:
	pushl $do_overflow
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bounds" tabindex="-1"><a class="header-anchor" href="#bounds" aria-hidden="true">#</a> bounds</h3><p>无error code，其将do_bounds的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>bounds:
	pushl $do_bounds
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-op" tabindex="-1"><a class="header-anchor" href="#invalid-op" aria-hidden="true">#</a> invalid_op</h3><p>无error code，其将do_invalid_op的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>invalid_op:
	pushl $do_invalid_op
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="coprocessor-segment-overrun" tabindex="-1"><a class="header-anchor" href="#coprocessor-segment-overrun" aria-hidden="true">#</a> coprocessor_segment_overrun</h3><p>无error code，其将coprocessor_segment_overrun的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>coprocessor_segment_overrun:
	pushl $do_coprocessor_segment_overrun
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reserved" tabindex="-1"><a class="header-anchor" href="#reserved" aria-hidden="true">#</a> reserved</h3><p>无error code，其将reserved的地址压入栈中，进而调用no_error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>reserved:
	pushl $do_reserved
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="double-fault" tabindex="-1"><a class="header-anchor" href="#double-fault" aria-hidden="true">#</a> double_fault</h3><p>有error code，其将do_double_fault的地址压入栈中，进而调用error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>double_fault:
	pushl $do_double_fault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="invalid-tss" tabindex="-1"><a class="header-anchor" href="#invalid-tss" aria-hidden="true">#</a> invalid_TSS</h3><p>有error code，其将do_invalid_TSS的地址压入栈中，进而调用error_code</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>invalid_TSS:
	pushl $do_invalid_TSS
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="segment-not-present" tabindex="-1"><a class="header-anchor" href="#segment-not-present" aria-hidden="true">#</a> segment_not_present</h3><p>有error code，其将do_segment_not_present的地址压入栈中，进而调用error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>segment_not_present:
	pushl $do_segment_not_present
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stack-segment" tabindex="-1"><a class="header-anchor" href="#stack-segment" aria-hidden="true">#</a> stack_segment</h3><p>有error code，其将do_stack_segment的地址压入栈中，进而跳转执行error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>stack_segment:
	pushl $do_stack_segment
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="general-protection" tabindex="-1"><a class="header-anchor" href="#general-protection" aria-hidden="true">#</a> general_protection</h3><p>有error code，其将do_general_protection的地址压入栈中，进而跳转执行error_code</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>general_protection:
	pushl $do_general_protection
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,79),r=[s];function l(o,c){return d(),a("div",null,r)}const u=e(n,[["render",l],["__file","Linux-0.11-kernel-asm.html.vue"]]);export{u as default};
