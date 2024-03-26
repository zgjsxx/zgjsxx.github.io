import{_ as e,V as i,W as n,a0 as s}from"./framework-9a29aaa0.js";const a={},d=s(`<h1 id="linux-0-11-boot目录head-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录head-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录head.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>从这里开始，内核完全是在保护模式下运行了。head.s汇编程序与前面的语法格式不同，它采用的是AT&amp;T汇编格式，需要使用GNU的gas和gld进行编译链接。</p><p>在head.s中，操作系统主要做了如下几件事：</p><ul><li>重新设置中断描述符和全局描述符</li><li>检查A20地址线是否开启</li><li>检查数学协处理器</li><li>初始化页表并开启分页</li><li>跳转到main函数执行</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="step1-重新设置idt和gdt" tabindex="-1"><a class="header-anchor" href="#step1-重新设置idt和gdt" aria-hidden="true">#</a> step1：重新设置IDT和GDT</h3><p>在setup.s中我们已经设置过了IDT和GDT， 为什么还要再设置一遍？</p><p>因为setup.s中设置的IDT和GDT后面会被覆盖，因此在head.s中会重新设置一遍。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>startup_32:
	movl $0x10,%eax      ！0x10 = 0000000000010_00_0, GDT表中的第2项，即内核数据段
	mov %ax,%ds
	mov %ax,%es
	mov %ax,%fs
	mov %ax,%gs
	lss stack_start,%esp   ！定义在sched.c中 
	call setup_idt     !设置中断
	call setup_gdt     !设置全局描述符表
	movl $0x10,%eax		# reload all the segment registers
	mov %ax,%ds		# after changing gdt. CS was already
	mov %ax,%es		# reloaded in &#39;setup_gdt&#39;
	mov %ax,%fs
	mov %ax,%gs
	lss stack_start,%esp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中断门描述符的格式如下所示:</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head_idt.png" alt="中断门描述符格式" tabindex="0" loading="lazy"><figcaption>中断门描述符格式</figcaption></figure><h3 id="step2-检查a20地址线是否开启" tabindex="-1"><a class="header-anchor" href="#step2-检查a20地址线是否开启" aria-hidden="true">#</a> step2：检查A20地址线是否开启</h3><p>下面用于检测A20地址线是否已经开启。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	xorl %eax,%eax
1:	incl %eax		# check that A20 really IS enabled
	movl %eax,0x000000	# loop forever if it isn&#39;t
	cmpl %eax,0x100000
	je 1b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有开启A20地址线，那么其寻址空间是0-fffff。超过fffff的部分的地址的高位将会被移除，这就会产生地址环绕。</p><p>例如<code>1_00000</code>去除了高位的1之后，就是<code>000000</code>。对<code>00000</code>处写一个值，然后看<code>1_00000</code>处的值是否相同，如果相同，则代表产生了地址环绕，A20没有开启。如果不相同，则代表没有地址环绕，A20成功开启。</p><h3 id="step3-检查数学协处理器" tabindex="-1"><a class="header-anchor" href="#step3-检查数学协处理器" aria-hidden="true">#</a> step3: 检查数学协处理器</h3><p>下面用于检查数学协处理器芯片是否存在</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl %cr0,%eax		# check math chip
	andl $0x80000011,%eax	# Save PG,PE,ET
/* &quot;orl $0x10020,%eax&quot; here for 486 might be good */
	orl $2,%eax		# set MP
	movl %eax,%cr0
	call check_x87
	jmp after_page_tables

/*
 * We depend on ET to be correct. This checks for 287/387.
 */
check_x87:
	fninit          !向协处理发出初始化命令
	fstsw %ax       !取协处理器状态字到ax寄存器中
	cmpb $0,%al
	je 1f			/* no coprocessor: have to set bits */
	movl %cr0,%eax
	xorl $6,%eax		/* reset MP, set EM */
	movl %eax,%cr0
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化页表并开启分页" tabindex="-1"><a class="header-anchor" href="#初始化页表并开启分页" aria-hidden="true">#</a> 初始化页表并开启分页</h3><p>下面这里将进行页表的安装，安装的过程参考下面这张图： <img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head_setup_paging.png" alt="页表的设置" loading="lazy"></p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>after_page_tables:
	pushl $0		# These are the parameters to main :-)
	pushl $0
	pushl $0
	pushl $L6		# return address for main, if it decides to.
	pushl $main
	jmp setup_paging

setup_paging:
	movl $1024*5,%ecx		/* 5 pages - pg_dir+4 page tables */
	xorl %eax,%eax
	xorl %edi,%edi			/* pg_dir is at 0x000 */
	cld;rep;stosl
	movl $pg0+7,pg_dir		/* set present bit/user r/w */
	movl $pg1+7,pg_dir+4		/*  --------- &quot; &quot; --------- */
	movl $pg2+7,pg_dir+8		/*  --------- &quot; &quot; --------- */
	movl $pg3+7,pg_dir+12		/*  --------- &quot; &quot; --------- */
	movl $pg3+4092,%edi
	movl $0xfff007,%eax		/*  16Mb - 4096 + 7 (r/w user,p) */
	std
1:	stosl			/* fill pages backwards - more efficient :-) */
	subl $0x1000,%eax
	jge 1b
	cld
	xorl %eax,%eax		 !设置页目录表基址寄存器cr3的值
	movl %eax,%cr3		
	movl %cr0,%eax       !设置启动使用分页处理
	orl $0x80000000,%eax
	movl %eax,%cr0		/* set paging (PG) bit */
	ret			/* this also flushes prefetch-queue */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跳转到main函数执行" tabindex="-1"><a class="header-anchor" href="#跳转到main函数执行" aria-hidden="true">#</a> 跳转到main函数执行</h3><p>在setup_paging执行完毕之后，会通过ret返回，ret指令会将栈顶的内容弹出到PC指针中去执行。此时esp指向的位置存放的是main函数的地址。因此接下来会执行main函数。</p><p>注意到在将main入栈时，还一同入栈了一些其他参数</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pushl $0		# These are the parameters to main :-)
	pushl $0
	pushl $0
	pushl $L6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就需要回顾一下c语言的调用规约，如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head_caller_stack.png" alt="启动中内存分布变化" tabindex="0" loading="lazy"><figcaption>启动中内存分布变化</figcaption></figure><p>因此这里可以得到L6是main函数的返回值。立即数0，0，0将会被作为main函数的入参。</p><p>接下来再看下面的代码就很清晰了，实际就是在建立好页表的映射关系后，就开始跳转到main函数去执行了(init/main.c)。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>after_page_tables:
	pushl $0		# These are the parameters to main :-)
	pushl $0
	pushl $0
	pushl $L6		# return address for main, if it decides to.
	pushl $main
	jmp setup_paging

setup_paging:
   ...
   ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2><h3 id="setup-paging在建立页表时会将head-s的部分代码覆盖-怎么保证不会把正在执行的代码覆盖" tabindex="-1"><a class="header-anchor" href="#setup-paging在建立页表时会将head-s的部分代码覆盖-怎么保证不会把正在执行的代码覆盖" aria-hidden="true">#</a> setup_paging在建立页表时会将head.s的部分代码覆盖，怎么保证不会把正在执行的代码覆盖？</h3><p>可以通过反汇编查看一下system模块的内存分布</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>objdump <span class="token parameter variable">-d</span> tools/system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>00000000 &lt;pg_dir&gt;:
       0:	b8 10 00 00 00       	mov    $0x10,%eax
       5:	8e d8                	mov    %eax,%ds
	   ...
0000005a &lt;check_x87&gt;:
      5a:	db e3                	fninit 
      5c:	9b df e0             	fstsw  %ax
      5f:	3c 00                	cmp    $0x0,%al
	  ...
00000071 &lt;setup_idt&gt;:
      71:	8d 15 28 54 00 00    	lea    0x5428,%edx
      77:	b8 00 00 08 00       	mov    $0x80000,%eax
	  ...
0000008e &lt;rp_sidt&gt;:
      8e:	89 07                	mov    %eax,(%edi)
      90:	89 57 04             	mov    %edx,0x4(%edi)
	  ...
000000a1 &lt;setup_gdt&gt;:
      a1:	0f 01 15 b2 54 00 00 	lgdtl  0x54b2
      a8:	c3                   	ret    
	...
00001000 &lt;pg0&gt;:
	...

00002000 &lt;pg1&gt;:
	...

00003000 &lt;pg2&gt;:
	...

00004000 &lt;pg3&gt;:
	...
00005000 &lt;tmp_floppy_area&gt;:
	...
00005400 &lt;after_page_tables&gt;:
    5400:	6a 00                	push   $0x0
    5402:	6a 00                	push   $0x0
	...
00005412 &lt;L6&gt;:
    5412:	eb fe                	jmp    5412 &lt;L6&gt;
00005414 &lt;int_msg&gt;:
    5414:	55                   	push   %ebp
    5415:	6e                   	outsb  %ds:(%esi),(%dx)
	...
00005428 &lt;ignore_int&gt;:
    5428:	50                   	push   %eax
    5429:	51                   	push   %ecx
	...
0000544e &lt;setup_paging&gt;:
    544e:	b9 00 14 00 00       	mov    $0x1400,%ecx
    5453:	31 c0                	xor    %eax,%eax
    5455:	31 ff                	xor  
	...
000054aa &lt;idt_descr&gt;:
    54aa:	ff 07                	incl   (%edi)
    54ac:	b8 54 00 00 00       	mov    $0x54,%eax
	...

000054b2 &lt;gdt_descr&gt;:
    54b2:	ff 07                	incl   (%edi)
    54b4:	b8                   	.byte 0xb8
    54b5:	5c                   	pop    %esp
	...

000054b8 &lt;idt&gt;:
	...

00005cb8 &lt;gdt&gt;:
	...
    5cc0:	ff 0f                	decl   (%edi)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到代码标号setup_page的起始地址是0000544e，而内存页表和页目录表的地址范围是0x0000-0x5000。因此当程序执行到setup_page时，将建立页目录表和页表， 这将会覆盖0x0000-0x5000的部分代码，即pg_dir，check_x87，setup_idt，rp_sidt，setup_gdt， 并不会覆盖到setup_page的代码，head.s在代码的分布计算上确实是费了一番功夫。</p><hr><p>文中如有表达不正确之处，欢迎大家与我交流, 微信号codebuilding。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,42),l=[d];function t(v,r){return i(),n("div",null,l)}const u=e(a,[["render",t],["__file","Linux-0.11-boot-head.html.vue"]]);export{u as default};
