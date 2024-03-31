import{_ as a,V as d,W as t,X as n,Y as e,$ as l,a0 as s,F as r}from"./framework-9a29aaa0.js";const c={},v=s(`<ul><li><a href="#linux-011-boot%E7%9B%AE%E5%BD%95heads%E8%AF%A6%E8%A7%A3">Linux-0.11 boot目录head.s详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E8%BF%87%E7%A8%8B%E8%AF%A6%E8%A7%A3">过程详解</a><ul><li><a href="#step1%E9%87%8D%E6%96%B0%E8%AE%BE%E7%BD%AEidt%E5%92%8Cgdt">step1：重新设置IDT和GDT</a></li><li><a href="#step2%E6%A3%80%E6%9F%A5a20%E5%9C%B0%E5%9D%80%E7%BA%BF%E6%98%AF%E5%90%A6%E5%BC%80%E5%90%AF">step2：检查A20地址线是否开启</a></li><li><a href="#step3-%E6%A3%80%E6%9F%A5%E6%95%B0%E5%AD%A6%E5%8D%8F%E5%A4%84%E7%90%86%E5%99%A8">step3: 检查数学协处理器</a></li><li><a href="#step4%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B5%E8%A1%A8%E5%B9%B6%E5%BC%80%E5%90%AF%E5%88%86%E9%A1%B5">step4：初始化页表并开启分页</a></li><li><a href="#step5%E8%B7%B3%E8%BD%AC%E5%88%B0main%E5%87%BD%E6%95%B0%E6%89%A7%E8%A1%8C">step5：跳转到main函数执行</a></li></ul></li><li><a href="#q--a">Q &amp; A</a><ul><li><a href="#setup_paging%E5%9C%A8%E5%BB%BA%E7%AB%8B%E9%A1%B5%E8%A1%A8%E6%97%B6%E4%BC%9A%E5%B0%86heads%E7%9A%84%E9%83%A8%E5%88%86%E4%BB%A3%E7%A0%81%E8%A6%86%E7%9B%96%E6%80%8E%E4%B9%88%E4%BF%9D%E8%AF%81%E4%B8%8D%E4%BC%9A%E6%8A%8A%E6%AD%A3%E5%9C%A8%E6%89%A7%E8%A1%8C%E7%9A%84%E4%BB%A3%E7%A0%81%E8%A6%86%E7%9B%96">setup_paging在建立页表时会将head.s的部分代码覆盖，怎么保证不会把正在执行的代码覆盖？</a></li></ul></li></ul></li></ul><h1 id="linux-0-11-boot目录head-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录head-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录head.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>从这里开始，内核完全是在保护模式下运行了。head.s汇编程序与前面的语法格式不同，它采用的是AT&amp;T汇编格式，需要使用GNU的gas和gld进行编译链接。</p><p>在head.s中，操作系统主要做了如下几件事：</p><ul><li>重新设置中断描述符和全局描述符</li><li>检查A20地址线是否开启</li><li>检查x87数学协处理器</li><li>初始化页表并开启分页</li><li>跳转到main函数执行</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="step1-重新设置idt和gdt" tabindex="-1"><a class="header-anchor" href="#step1-重新设置idt和gdt" aria-hidden="true">#</a> step1：重新设置IDT和GDT</h3><p>下面是head.s的17-32行，其作用是重新设置IDT和GDT。</p><p>在setup.s中我们已经设置过了IDT和GDT， 为什么还要再设置一遍？</p><p>因为setup.s中设置的IDT和GDT后面会被覆盖，因此在head.s中会重新设置一遍。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.globl startup_32
startup_32:
	movl $0x10,%eax      ！0x10 = 0000000000010_00_0, GDT表中的第2项，即内核数据段
	mov %ax,%ds
	mov %ax,%es
	mov %ax,%fs
	mov %ax,%gs
	lss stack_start,%esp   ！定义在sched.c中 
	call setup_idt     !设置中断
	call setup_gdt     !设置全局描述符表
	movl $0x10,%eax		# reload all the segment registers
	mov %ax,%ds		    # after changing gdt. CS was already
	mov %ax,%es		    # reloaded in &#39;setup_gdt&#39;
	mov %ax,%fs
	mov %ax,%gs
	lss stack_start,%esp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的开始依次将<code>ds</code>,<code>es</code>，<code>fs</code>和<code>gs</code>设置为<code>0x10</code>。</p><p>接下来设置了栈指针。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>lss stack_start,%esp   ！定义在sched.c中 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>栈顶指针的位置定义在了sched.c中，因此这样操作之后，<code>ss = 0x10</code>, <code>esp</code>指向了user_stack的最后一个元素。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">long</span> user_stack <span class="token punctuation">[</span> PAGE_SIZE<span class="token operator">&gt;&gt;</span><span class="token number">2</span> <span class="token punctuation">]</span> <span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token keyword">long</span> <span class="token operator">*</span> a<span class="token punctuation">;</span>
	<span class="token keyword">short</span> b<span class="token punctuation">;</span>
	<span class="token punctuation">}</span> stack_start <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">&amp;</span> user_stack <span class="token punctuation">[</span>PAGE_SIZE<span class="token operator">&gt;&gt;</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">,</span> <span class="token number">0x10</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着调用<code>setup_idt</code>方法对中断描述符进行初始化，<code>setup_idt</code>方法位于head.s的88-95行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>setup_idt:
	lea ignore_int,%edx        // 将ignore_int的地址传递给edx
	movl $0x00080000,%eax      // 将选择符0x0008放入eax的高16位中
	movw %dx,%ax		       // 将偏移值的低16位移入ax中
	movw $0x8E00,%dx	       /* interrupt gate - dpl=0, present */

	lea idt,%edi
	mov $256,%ecx
rp_sidt:
	movl %eax,(%edi)
	movl %edx,4(%edi)
	addl $8,%edi
	dec %ecx
	jne rp_sidt
	lidt idt_descr
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在阅读该段代码之前，需要首先了解中断门描述符的格式，如下所示:</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head_idt.png" alt="中断门描述符格式" tabindex="0" loading="lazy"><figcaption>中断门描述符格式</figcaption></figure><p>代码中使用<code>eax</code>作为中断门的0-31位， <code>edx</code>作为中断门的32-63位。</p><p>首先观察对于<code>eax</code>的操作。将ignore_int的地址赋给了<code>edx</code>，随后将<code>0x0008</code>赋值给<code>eax</code>。最后将<code>ignore_int</code>的低16位放到的<code>eax</code>中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	lea ignore_int,%edx        // 将ignore_int的地址传递给edx
	movl $0x00080000,%eax      // 将选择符0x0008放入eax的高16位中
	movw %dx,%ax		       // 将偏移值的低16位移入ax中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作结束之后<code>eax</code>的构成如下所示，其实就是组装好了中断描述符的低31位。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">31</span>                                     <span class="token number">0</span>
+------------------+-------------------+
+     段描述符      +   偏移地址低16位   +
+------------------+-------------------+
+       0x8        + ignore_int<span class="token punctuation">[</span><span class="token number">15</span>：0<span class="token punctuation">]</span> +
+------------------+-------------------+
+                 EAX                  +
+--------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来构建<code>edx</code>。<code>edx</code>的高16位先前已经组装好，存储的是<code>ignore_int[31：16]</code>。 <code>edx</code>的低16位存储的是中断描述符的属性，设置存在位P为1， DPL=0。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movw $0x8E00,%dx	 // 0x8E00 = 1_00_0111000000000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>组装好之后的<code>edx</code>的布局如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">63</span>                                      <span class="token number">32</span> 
+------------------+-+-+------+---+-----+
+                  <span class="token operator">|</span> <span class="token operator">|</span>D <span class="token operator">|</span>     <span class="token operator">|</span>   <span class="token operator">|</span>     +
+  偏移地址高16位   <span class="token operator">|</span>P<span class="token operator">|</span>P <span class="token operator">|</span>01110<span class="token operator">|</span>000<span class="token operator">|</span>     +
+                  <span class="token operator">|</span> <span class="token operator">|</span>L <span class="token operator">|</span>     <span class="token operator">|</span>   <span class="token operator">|</span>     +
+------------------+-+--+-----+---+-----+
+ ignore<span class="token punctuation">[</span><span class="token number">31</span>：16<span class="token punctuation">]</span>   <span class="token operator">|</span><span class="token number">1</span><span class="token operator">|</span>00<span class="token operator">|</span>01110<span class="token operator">|</span>000<span class="token operator">|</span>00000+
+------------------+-+--+-----+---+-----+
+                 EDX                   +
+---------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来的事情就比较简单了，循环的给中断表中的256项内容都设置成哑中断(<code>ignore_int</code>)。最后使用<code>lidt idt_descr</code>加载中断描述符表<code>ldit</code>要求6字节操作数，前2字节是idt表的限长，后4字节是idt表在线性空间的32位基地址。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	lea idt,%edi
	mov $256,%ecx
rp_sidt:
	movl %eax,(%edi)
	movl %edx,4(%edi)
	addl $8,%edi
	dec %ecx
	jne rp_sidt
	lidt idt_descr
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下图显示了<code>setup_idt</code>的之后，中断描述符的情况：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/setup_idt.png" alt="setup_idt" tabindex="0" loading="lazy"><figcaption>setup_idt</figcaption></figure><p>这里再看一下哑中断(<code>ignore_int</code>)做了些什么，其位于head.s的148-172行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>/* This is the default interrupt &quot;handler&quot; :-) */
int_msg:
	.asciz &quot;Unknown interrupt\\n\\r&quot;
.align 2
ignore_int:
	pushl %eax
	pushl %ecx
	pushl %edx
	push %ds
	push %es
	push %fs
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
	mov %ax,%fs
	pushl $int_msg
	call printk
	popl %eax
	pop %fs
	pop %es
	pop %ds
	popl %edx
	popl %ecx
	popl %eax
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法其实只是会调用<code>printk</code>向中断打印一句<code>Unknown interrupt</code>。</p><p>接下来继续看<code>setup_gdt</code>，其比较简单，直接使用<code>lgdt</code>将<code>gdt_descr</code>加载进全局描述符寄存器。</p><div class="language-setup_gdt line-numbers-mode" data-ext="setup_gdt"><pre class="language-setup_gdt"><code>	lgdt gdt_descr
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gdt_descr</code>内容如下所示，设置了长度为256*8字节， 地址位于<code>gdt</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>gdt_descr:
	.word 256*8-1		# so does gdt (not that that&#39;s any
	.long gdt		# magic number, but it works for me :^)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gdt处定义的内容如下所示：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>gdt:	.quad 0x0000000000000000	/* NULL descriptor */
	.quad 0x00c09a0000000fff	/* 16Mb */ 0x08
	.quad 0x00c0920000000fff	/* 16Mb */  0x10
	.quad 0x0000000000000000	/* TEMPORARY - don&#39;t use */
	.fill 252,8,0			/* space for LDT&#39;s and TSS&#39;s etc */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gdt</code>表中第一项是一个空置。第二项和第三项是内核代码段和数据段。其含义如下所示：</p><p>0x00c09a00_00000fff</p><ul><li>段基址 = 0x00000000</li><li>段长度 = 0xfff+1 = 4096 * 4Kb = 16MB</li><li>段类型值 = 9a， 代表存在于内存中，段特权级别为0，可读可执行代码段，段代码是32位，颗粒度是4KB</li></ul><p>0x00c09200_00000fff</p><ul><li>段基址 = 0x00000000</li><li>段长度 = 0xfff+1 = 4096 * 4Kb = 16MB</li><li>段类型值 = 92， 代表存在于内存中，段特权级别为0，可读可写数据段，段代码是32位，颗粒度是4KB</li></ul><p>后续的252项是<code>LDT</code>和<code>TSS</code>，这里为其开启存储空间，后续会对其进行操作。</p><p>程序的最后，重新给段寄存器进行赋值。再次设置为0x10。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl $0x10,%eax		# reload all the segment registers
	mov %ax,%ds		    # after changing gdt. CS was already
	mov %ax,%es		    # reloaded in &#39;setup_gdt&#39;
	mov %ax,%fs
	mov %ax,%gs
	lss stack_start,%esp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step2-检查a20地址线是否开启" tabindex="-1"><a class="header-anchor" href="#step2-检查a20地址线是否开启" aria-hidden="true">#</a> step2：检查A20地址线是否开启</h3><p>下面用于检测A20地址线是否已经开启。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	xorl %eax,%eax
1:	incl %eax		# check that A20 really IS enabled
	movl %eax,0x000000	# loop forever if it isn&#39;t
	cmpl %eax,0x100000
	je 1b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有开启A20地址线，那么其寻址空间是<code>0-fffff</code>。超过<code>fffff</code>的部分的地址的高位将会被移除，这就会产生地址环绕。</p><p>例如<code>1_00000</code>去除了高位的1之后，就是<code>000000</code>。对<code>00000</code>处写一个值，然后看<code>1_00000</code>处的值是否相同，如果相同，则代表产生了地址环绕，A20没有开启。如果不相同，则代表没有地址环绕，A20成功开启。</p><h3 id="step3-检查数学协处理器" tabindex="-1"><a class="header-anchor" href="#step3-检查数学协处理器" aria-hidden="true">#</a> step3: 检查数学协处理器</h3>`,57),u={href:"https://zgjsxx.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture10-float-point.html#x87%E6%B5%AE%E7%82%B9%E6%95%B0%E6%8C%87%E4%BB%A4",target:"_blank",rel:"noopener noreferrer"},o=s(`<div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl %cr0,%eax		# check math chip
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里检查的主要思路是修改控制寄存器CRO，假设协处理器存在，执行一个协处理器指令，如果出错则说明协处理器不存在。</p><p>这里首先修改了cr0寄存器，将MP位为设置为1。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl %cr0,%eax		# check math chip
	andl $0x80000011,%eax	# Save PG,PE,ET
/* &quot;orl $0x10020,%eax&quot; here for 486 might be good */
	orl $2,%eax		# set MP
	movl %eax,%cr0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要了解一下cr0寄存器的结构：</p><table><thead><tr><th>比特位</th><th>名称</th><th>完整的名称</th><th>描述</th></tr></thead><tbody><tr><td>0</td><td>PE</td><td>启用保护模式</td><td>如果为1，则启用保护模式，否则系统处于实模式</td></tr><tr><td>1</td><td>MP</td><td>监控协处理器</td><td>控制 WAIT/FWAIT 指令与 CR0 中 TS 标志的交互</td></tr><tr><td>2</td><td>EM</td><td>仿真</td><td>如果设置，则不存在 x87 浮点单元，如果清除，则存在 x87 FPU</td></tr><tr><td>3</td><td>TS</td><td>任务切换</td><td>仅在使用 x87 指令后才允许在任务切换时保存 x87 任务上下文</td></tr><tr><td>4</td><td>ET</td><td>扩展类型</td><td>在 386 上，它允许指定外部数学协处理器是 80287 还是 80387</td></tr><tr><td>5</td><td>NE</td><td>数学错误</td><td>设置时启用内部 x87 浮点错误报告，否则启用 PC 风格 x87 错误检测</td></tr><tr><td>16</td><td>WP</td><td>写保护</td><td>设置后，当特权级别为 0 时，CPU 无法写入只读页</td></tr><tr><td>18</td><td>AM</td><td>对齐掩码</td><td>如果设置了 AM、设置了 AC 标志（在 EFLAGS 寄存器中）且特权级别为 3，则启用对齐检查</td></tr><tr><td>29</td><td>NW</td><td>非直写</td><td>全局启用/禁用直写式缓存</td></tr><tr><td>30</td><td>CD</td><td>缓存禁用</td><td>全局启用/禁用缓存</td></tr><tr><td>32</td><td>PG</td><td>分页</td><td>如果为 1，则启用分页并使用 § CR3 寄存器，否则禁用分页。</td></tr></tbody></table><p>这里向协处理器发出初始化命令，取协处理器状态字到ax寄存器中，如果协处理器储不存在，则<code>al = 0</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	fninit
	fstsw %ax
	cmpb $0,%al
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果存在，则将80287设置为保护模式，这里不用过多理解，大概了解即可。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.align 2
1:	.byte 0xDB,0xE4		/* fsetpm for 287, ignored by 387 */
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果协处理器不存在，需要将MP位设置为0， 将EM位设置为1。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl %cr0,%eax
	xorl $6,%eax		/* reset MP, set EM */
	movl %eax,%cr0
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step4-初始化页表并开启分页" tabindex="-1"><a class="header-anchor" href="#step4-初始化页表并开启分页" aria-hidden="true">#</a> step4：初始化页表并开启分页</h3><p>下面是head.s的200-220行，其作用是初始化页表，并开启分页功能。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>after_page_tables:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>建立页表的第一步是对<strong>页目录表</strong>和<strong>页表项</strong>进行清零的初始化操作。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>setup_paging:
	movl $1024*5,%ecx		/* 5 pages - pg_dir+4 page tables */
	xorl %eax,%eax
	xorl %edi,%edi			/* pg_dir is at 0x000 */
	cld;rep;stosl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于后面会使用<code>rep</code>前缀，因此首先需要设置循环的次数。页目录表和页表的总大小是<code>1024*4*(4+1)</code>，由于我们使用的是<code>stosl</code>，即一次进行4个字节的初始化操作，于是<code>ecx</code>设置为<code>1024*5</code>。</p><p><code>xorl %eax,%eax</code>和 <code>xorl %edi,%edi</code>将<code>eax</code>和<code>edi</code>设置为0。</p><p>最后使用<code>cld;rep;stosl</code>进行循环赋值。将<code>eax</code>的值依次赋值给<code>0x0， 0x4， 0x8 ...</code>。</p><p>总结起来，这里的作用就是将页目录表和页表全部清零。</p><p>接下来的操作是给页目录表进行赋值。这里我们回顾一下页目录项和页表项的结构。其中高20位代表的是帧地址。第0位表示存在位，第1位表示读写标志位，第2位表示用户超级用户标志。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">31</span>                 <span class="token number">12</span>   <span class="token number">9</span>   <span class="token number">7</span> <span class="token number">6</span> <span class="token number">5</span> <span class="token number">4</span> <span class="token number">3</span>   <span class="token number">2</span>   <span class="token number">1</span> <span class="token number">0</span>
+--------------------+---+-+-+-+-+-+-+---+---+-+
+ Frame Address      +   <span class="token operator">|</span><span class="token number">0</span> <span class="token number">0</span><span class="token operator">|</span>D<span class="token operator">|</span>A<span class="token operator">|</span><span class="token number">0</span> <span class="token number">0</span>+U/S<span class="token operator">|</span>R/W<span class="token operator">|</span>P<span class="token operator">|</span>
+--------------------+---+-+-+-+-+-+-+---+---+-+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个页表所在的地址是<code>0x00001007 &amp; 0xfffff000 = 0x1000</code>，属性标志是<code>0x00001007 &amp; 0x00000fff = 0x07</code>。</p><p>第一个页表所在的地址是<code>0x00002007 &amp; 0xfffff000 = 0x2000</code>，属性标志是<code>0x00002007 &amp; 0x00000fff = 0x07</code>。</p><p>第一个页表所在的地址是<code>0x00003007 &amp; 0xfffff000 = 0x3000</code>，属性标志是<code>0x00003007 &amp; 0x00000fff = 0x07</code>。</p><p>第一个页表所在的地址是<code>0x00004007 &amp; 0xfffff000 = 0x4000</code>，属性标志是<code>0x00004007 &amp; 0x00000fff = 0x07</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl $pg0+7,pg_dir		/* set present bit/user r/w */
	movl $pg1+7,pg_dir+4		/*  --------- &quot; &quot; --------- */
	movl $pg2+7,pg_dir+8		/*  --------- &quot; &quot; --------- */
	movl $pg3+7,pg_dir+12		/*  --------- &quot; &quot; --------- */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一番操作使得页目录表中的四个元素指向了对应的页表,如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/setup-pagetable-1.png" alt="页目录表初始化" tabindex="0" loading="lazy"><figcaption>页目录表初始化</figcaption></figure><p>接下俩就是初始化四个页表中的内容了，这里的构建方式是物理地址和线性地址一一对应的关系。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	movl $pg3+4092,%edi
	movl $0xfff007,%eax		/*  16Mb - 4096 + 7 (r/w user,p) */
	std
1:	stosl			/* fill pages backwards - more efficient :-) */
	subl $0x1000,%eax
	jge 1b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终初始化后的页表如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head_setup_paging.png" alt="页表的设置" tabindex="0" loading="lazy"><figcaption>页表的设置</figcaption></figure><p>下面设置<code>cr3</code>指向全局页目录表，并且开启分页。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	xorl %eax,%eax		/* pg_dir is at 0x0000 */
	movl %eax,%cr3		/* cr3 - page directory start */
	movl %cr0,%eax
	orl $0x80000000,%eax
	movl %eax,%cr0		/* set paging (PG) bit */
	ret			/* this also flushes prefetch-queue */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step5-跳转到main函数执行" tabindex="-1"><a class="header-anchor" href="#step5-跳转到main函数执行" aria-hidden="true">#</a> step5：跳转到main函数执行</h3><p>在setup_paging执行完毕之后，会通过ret返回，ret指令会将栈顶的内容弹出到PC指针中去执行。此时esp指向的位置存放的是main函数的地址。因此接下来会执行main函数。</p><p>注意到在将main入栈时，还一同入栈了一些其他参数</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pushl $0		# These are the parameters to main :-)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在阅读main的内容之前，我们回顾一下此时内存中的数据状态，如下所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head/head-memoryview.png" alt="head.s结束之后内存分布" tabindex="0" loading="lazy"><figcaption>head.s结束之后内存分布</figcaption></figure><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2><h3 id="setup-paging在建立页表时会将head-s的部分代码覆盖-怎么保证不会把正在执行的代码覆盖" tabindex="-1"><a class="header-anchor" href="#setup-paging在建立页表时会将head-s的部分代码覆盖-怎么保证不会把正在执行的代码覆盖" aria-hidden="true">#</a> setup_paging在建立页表时会将head.s的部分代码覆盖，怎么保证不会把正在执行的代码覆盖？</h3><p>可以通过反汇编查看一下system模块的内存分布</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>objdump <span class="token parameter variable">-d</span> tools/system
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到代码标号setup_page的起始地址是0000544e，而内存页表和页目录表的地址范围是0x0000-0x5000。因此当程序执行到setup_page时，将建立页目录表和页表， 这将会覆盖0x0000-0x5000的部分代码，即pg_dir，check_x87，setup_idt，rp_sidt，setup_gdt， 并不会覆盖到setup_page的代码，head.s在代码的分布计算上确实是费了一番功夫。</p><hr><p>文中如有表达不正确之处，欢迎大家与我交流, 微信号codebuilding。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg" alt="wechat" tabindex="0" loading="lazy"><figcaption>wechat</figcaption></figure>`,57);function p(m,b){const i=r("ExternalLinkIcon");return d(),t("div",null,[v,n("p",null,[e("下面head.s的45-65行，用于检查x87数学协处理器芯片是否存在, x87数学协处理器主要用于浮点数的计算，x86_64下浮点数运算的指令有xmm和x87两种。我的另一篇文章"),n("a",u,[e("汇编语言-浮点数"),l(i)]),e("中有相关介绍。")]),o])}const g=a(c,[["render",p],["__file","Linux-0.11-boot-head.html.vue"]]);export{g as default};