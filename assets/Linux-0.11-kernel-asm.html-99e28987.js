import{_ as e,V as d,W as a,a0 as i}from"./framework-9a29aaa0.js";const r={},n=i(`<ul><li><a href="#linux-011-kernel%E7%9B%AE%E5%BD%95%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86asms%E8%AF%A6%E8%A7%A3">Linux-0.11 kernel目录进程管理asm.s详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E5%87%BD%E6%95%B0%E8%AF%A6%E8%A7%A3">函数详解</a><ul><li><a href="#no_error_code">no_error_code</a></li><li><a href="#error_code">error_code</a></li><li><a href="#intel%E4%BF%9D%E7%95%99%E4%B8%AD%E6%96%AD%E5%8F%B7%E7%9A%84%E5%90%AB%E4%B9%89">Intel保留中断号的含义</a><ul><li><a href="#divide_error">divide_error:</a></li><li><a href="#debug">debug</a></li><li><a href="#nmi">nmi</a></li><li><a href="#int3">int3</a></li><li><a href="#overflow">overflow</a></li><li><a href="#bounds">bounds</a></li><li><a href="#invalid_op">invalid_op</a></li><li><a href="#coprocessor_segment_overrun">coprocessor_segment_overrun</a></li><li><a href="#reserved">reserved</a></li><li><a href="#double_fault">double_fault</a></li><li><a href="#invalid_tss">invalid_TSS</a></li><li><a href="#segment_not_present">segment_not_present</a></li><li><a href="#stack_segment">stack_segment</a></li><li><a href="#general_protection">general_protection</a></li></ul></li></ul></li></ul></li></ul><h1 id="linux-0-11-kernel目录进程管理asm-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录进程管理asm-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录进程管理asm.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>该模块和CPU异常处理相关，在代码结构上<code>asm.s</code>和<code>traps.c</code>强相关。 CPU探测到异常时，主要分为两种处理方式，一种是有错误码，另一种是没有错误码，对应的方法就是<strong>error_code</strong>和<strong>no_error_code</strong>。在下面的函数详解中，将主要以两个函数展开。</p><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="no-error-code" tabindex="-1"><a class="header-anchor" href="#no-error-code" aria-hidden="true">#</a> no_error_code</h3><p>对于一些异常而言，CPU在出现这些异常时不会将error code压入栈中。其和一般的中断类似，会将<code>ss</code>,<code>esp</code>,<code>eflags</code>,<code>cs</code>,<code>eip</code>这几个寄存器的值压入内核栈中。如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/trap/no_error.png" alt="无错误码的情景" tabindex="0" loading="lazy"><figcaption>无错误码的情景</figcaption></figure><p>接下来，以<code>divide_error</code>为例，详细解释这一过程。</p><p><code>divide_error</code>也就是所谓的0号中断，通常指的是<strong>除零异常</strong>或<strong>除法错误</strong>。这个中断在进行除法运算时如果被除数为0时会触发。</p><p>在x86架构的处理器上，除零异常会引发中断，中断向量号为0。当除零异常发生时，CPU会转移控制权到预定义的中断处理程序。在操作系统内核中，可以通过注册一个特定的中断处理程序来处理这个异常，通常是在中断描述符表（IDT）中指定中断向量0对应的处理程序地址。</p><p>Linux-0.11中在trap.c中设置0x0号中断的处理方法是<code>divide_error</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	set_trap_gate(0,&amp;divide_error);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>divide_error</code>具体的定义是在<code>asm.s</code>中，首先会将<code>do_divide_error</code>的地址压入内核栈中。</p><p><code>xchgl</code> 汇编指令用于交换指定寄存器和指定内存地址处的值。在这里，<code>xchgl %eax,(%esp)</code> 的作用是将 <code>%eax</code> 寄存器的值与栈顶指针指向的内存位置处的值进行交换，也就是将 <code>%eax</code> 的值压入栈中，并将栈顶位置处的值存入 <code>%eax</code> 中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>divide_error:
	pushl $do_divide_error
no_error_code:
	xchgl %eax,(%esp)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就是需要保存一些CPU上下文，将 <code>%ebx</code>、<code>%ecx</code>、<code>%edx</code>、<code>%edi</code>、<code>%esi</code>、<code>%ebp</code>、<code>%ds</code>、<code>%es</code> 和 <code>%fs</code> 推入栈中，保存它们的值以便稍后恢复。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl %ebx
pushl %ecx
pushl %edx
pushl %edi
pushl %esi
pushl %ebp
push %ds
push %es
push %fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在保护好CPU上下文之后，接下来就是为调用<code>do_divide_error</code>做一些准备，将入参压入栈。<code>void do_divide_error</code>的原型是<code>void do_divide_error(long esp, long error_code)</code>。这里入参<code>esp</code>是指中断调用之后堆栈指针的指向，<code>esp</code>指向的位置存储的是原<code>eip</code>。</p><p>在<code>do_divide_error</code>方法中，通过<code>esp</code>的值打印一些信息。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl $0		# &quot;error code&quot;
lea 44(%esp),%edx
pushl %edx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将下来初始化段寄存器，加载内核的数据段选择符。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>movl $0x10,%edx
mov %dx,%ds
mov %dx,%es
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些工作都准备完成之后，就通过call去调用<code>do_divide_error</code>这个c函数。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *%eax
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>divide_error</code>的例子，我们知道当0号中断发生时，会在栈上构建出一些参数，最后将调用<code>do_divide_error</code>打印一些出错信息以提示用户发生中断的信息以用于检查问题。打印完毕之后，将栈上的环境恢复到中断之前的样子。</p><h3 id="error-code" tabindex="-1"><a class="header-anchor" href="#error-code" aria-hidden="true">#</a> error_code</h3><p>对于一些异常而言，CPU在出现这些异常除了会将<code>ss</code>,<code>esp</code>,<code>eflags</code>,<code>cs</code>,<code>eip</code>这几个寄存器的值压入内核栈中以外，还会将<code>error_code</code>压入内核栈中。如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-kernel/trap/has_error.png" alt="有错误码的情景" tabindex="0" loading="lazy"><figcaption>有错误码的情景</figcaption></figure><p>下面会以<code>double_fault</code>为例，来理解带有错误码的处理过程。</p><p>在计算机体系结构中，&quot;double fault&quot;（双重故障）是一种处理器异常的情况，它发生在处理一个异常时又发生了另一个异常。在 x86 架构中，通常指的是处理器在处理一个异常时（如页面错误或非法指令），由于某种原因（通常是由于处理第一个异常时的问题），导致触发了第二个异常。这个第二个异常就是双重故障。</p><p>出现该异常时，会将<code>do_double_fault</code>的地址压入栈中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>double_fault:
	pushl $do_double_fault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>随后会将<code>error_code</code>的值写入<code>eax</code>寄存器中，将<code>do_double_fault</code>的地址写入<code>ebx</code>寄存器中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>error_code:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来做的也是为调用c函数做准备。</p><p><code>do_double_fault</code>有2个入参，因此需要将<code>error_code</code>和<code>esp</code>压入栈中</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">do_double_fault</span><span class="token punctuation">(</span><span class="token keyword">long</span> esp<span class="token punctuation">,</span> <span class="token keyword">long</span> error_code<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这段汇编就是将<code>error_code</code>和出错的地址压入栈中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl %eax			    # error code
lea 44(%esp),%eax		# offset
pushl %eax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将下来初始化段寄存器，加载内核的数据段选择符。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>movl $0x10,%edx
mov %dx,%ds
mov %dx,%es
mov %dx,%fs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些工作都准备完成之后，就调用<code>do_double_fault</code>这个c函数。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>call *%ebx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后的工作便是用于恢复CPU上下文，</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>addl $8,%esp
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="intel保留中断号的含义" tabindex="-1"><a class="header-anchor" href="#intel保留中断号的含义" aria-hidden="true">#</a> Intel保留中断号的含义</h3><p><code>asm.s</code>剩下的部分定义了每种中断号的入口方法，例如上面我们举例的divide_error和double_fault。</p><p>下面总结了Linux-0.11中对于不同中断号的定义。</p><table><thead><tr><th>中断号</th><th>名称</th><th>类型</th><th>信号</th><th>说明</th></tr></thead><tbody><tr><td>0</td><td>Divide error</td><td>故障</td><td>SIGFPE</td><td>进行除以0操作时产生</td></tr><tr><td>1</td><td>Debug</td><td>陷阱/故障</td><td>SIGTRAP</td><td>当进行程序单步跟踪调试时，设置了标志寄存器eflags的T标志时产生这个中断</td></tr><tr><td>2</td><td>nmi</td><td>硬件</td><td></td><td>有不可屏蔽中断NMI产生</td></tr><tr><td>3</td><td>Breakpoint</td><td>陷阱</td><td>SIGTRAP</td><td>由断点指令int3产生，与debug处理相同</td></tr><tr><td>4</td><td>Overflow</td><td>陷阱</td><td>SIGSEGV</td><td>eflags的溢出标志OF引起</td></tr><tr><td>5</td><td>Bounds check</td><td>故障</td><td>SIGSEGV</td><td>寻址到有效地址以外时引起</td></tr><tr><td>6</td><td>Invalid Opcode</td><td>故障</td><td>SIGILL</td><td>CPU执行时发现一个无效的指令操作码</td></tr><tr><td>7</td><td>Device not available</td><td>故障</td><td>SIGSEGV</td><td>设备不存在，指协处理器。在两种情况下会产生该中断：(a)CPU遇到一个转义指令并且EM置位时。在这种情况下处理程序应该模拟导致异常的指令：(b)MP和TS都在置位状态时，CPU遇到WAIT或一个转义指令。在这种情况下，处理程序在必要时应该更新协处理器的状态。</td></tr><tr><td>8</td><td>Double fault</td><td>异常终止</td><td>SEGSEGV</td><td>双故障错误</td></tr><tr><td>9</td><td>Coprocessor segment overrun</td><td>异常终止</td><td>SIGFPE</td><td>协处理器段超出。</td></tr><tr><td>10</td><td>Invalid TSS</td><td>故障</td><td>SIGSEGV</td><td>CPU切换时发现TSS无效</td></tr><tr><td>11</td><td>Segment not present</td><td>故障</td><td>SIGBUS</td><td>描述符指定的段不存在</td></tr><tr><td>12</td><td>Stack segment</td><td>故障</td><td>SIGBUS</td><td>堆栈段不存在或寻址超出堆栈段</td></tr><tr><td>13</td><td>General protection</td><td>故障</td><td>SIGSEGV</td><td>没有符合80386保护机制的操作引起</td></tr><tr><td>14</td><td>Page fault</td><td>故障</td><td>SIGSEGV</td><td>页不存在内存</td></tr><tr><td>15</td><td>Reserved</td><td></td><td></td><td></td></tr><tr><td>16</td><td>Coprocessor error</td><td>故障</td><td>SIGFPE</td><td>协处理器发出的出错信息引起。</td></tr></tbody></table><p>下面我们梳理下每个中断方法的定义。</p><h4 id="divide-error" tabindex="-1"><a class="header-anchor" href="#divide-error" aria-hidden="true">#</a> divide_error:</h4><p>无error code，其将<code>do_divide_error</code>的地址压入栈中。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>pushl $do_divide_error
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>随后进入<code>no_error_code</code>的处理流程。</p><h4 id="debug" tabindex="-1"><a class="header-anchor" href="#debug" aria-hidden="true">#</a> debug</h4><p>无<code>error code</code>，其将<code>do_int3</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>debug:
	pushl $do_int3		# _do_debug
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nmi" tabindex="-1"><a class="header-anchor" href="#nmi" aria-hidden="true">#</a> nmi</h4><p>无<code>error code</code>，其将<code>do_nmi</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>nmi:
	pushl $do_nmi
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="int3" tabindex="-1"><a class="header-anchor" href="#int3" aria-hidden="true">#</a> int3</h4><p>无<code>error code</code>，其将<code>do_int3</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>int3:
	pushl $do_int3
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="overflow" tabindex="-1"><a class="header-anchor" href="#overflow" aria-hidden="true">#</a> overflow</h4><p>无<code>error code</code>，其将<code>do_overflow</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>overflow:
	pushl $do_overflow
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bounds" tabindex="-1"><a class="header-anchor" href="#bounds" aria-hidden="true">#</a> bounds</h4><p>无<code>error code</code>，其将<code>do_bounds</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>bounds:
	pushl $do_bounds
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="invalid-op" tabindex="-1"><a class="header-anchor" href="#invalid-op" aria-hidden="true">#</a> invalid_op</h4><p>无<code>error code</code>，其将<code>do_invalid_op</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>invalid_op:
	pushl $do_invalid_op
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="coprocessor-segment-overrun" tabindex="-1"><a class="header-anchor" href="#coprocessor-segment-overrun" aria-hidden="true">#</a> coprocessor_segment_overrun</h4><p>无error code，其将<code>coprocessor_segment_overrun</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>coprocessor_segment_overrun:
	pushl $do_coprocessor_segment_overrun
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="reserved" tabindex="-1"><a class="header-anchor" href="#reserved" aria-hidden="true">#</a> reserved</h4><p>无<code>error code</code>，其将<code>reserved</code>的地址压入栈中，进而进入<code>no_error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>reserved:
	pushl $do_reserved
	jmp no_error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="double-fault" tabindex="-1"><a class="header-anchor" href="#double-fault" aria-hidden="true">#</a> double_fault</h4><p>有<code>error code</code>，其将<code>do_double_fault</code>的地址压入栈中，进而进入<code>error_code</code>的流程。</p><div class="language-asm line-numbers-mode" data-ext="asm"><pre class="language-asm"><code>double_fault:
	pushl $do_double_fault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="invalid-tss" tabindex="-1"><a class="header-anchor" href="#invalid-tss" aria-hidden="true">#</a> invalid_TSS</h4><p>有<code>error code</code>，其将<code>do_invalid_TSS</code>的地址压入栈中，进而进入<code>error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>invalid_TSS:
	pushl $do_invalid_TSS
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="segment-not-present" tabindex="-1"><a class="header-anchor" href="#segment-not-present" aria-hidden="true">#</a> segment_not_present</h4><p>有<code>error code</code>，其将<code>do_segment_not_present</code>的地址压入栈中，进而进入<code>error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>segment_not_present:
	pushl $do_segment_not_present
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="stack-segment" tabindex="-1"><a class="header-anchor" href="#stack-segment" aria-hidden="true">#</a> stack_segment</h4><p>有<code>error code</code>，其将<code>do_stack_segment</code>的地址压入栈中，进而进入<code>error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>stack_segment:
	pushl $do_stack_segment
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="general-protection" tabindex="-1"><a class="header-anchor" href="#general-protection" aria-hidden="true">#</a> general_protection</h4><p>有<code>error code</code>，其将<code>do_general_protection</code>的地址压入栈中，进而进入<code>error_code</code>的流程。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>general_protection:
	pushl $do_general_protection
	jmp error_code
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,98),s=[n];function o(l,c){return d(),a("div",null,s)}const u=e(r,[["render",o],["__file","Linux-0.11-kernel-asm.html.vue"]]);export{u as default};
