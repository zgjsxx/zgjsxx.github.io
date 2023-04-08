import{_ as e,V as i,W as n,a0 as s}from"./framework-c954d91f.js";const d={},a=s(`<h1 id="linux-0-11-boot目录head-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录head-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录head.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><p>在setup_paging执行完毕之后，会通过ret返回，ret指令会将栈顶的内容弹出到PC指针中去执行。此时esp指向的位置存放的是main函数的地址。因此接下来会执行main函数。</p><p>注意到在将main入栈时，还一同入栈了一些其他参数</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pushl $0		# These are the parameters to main :-)
	pushl $0
	pushl $0
	pushl $L6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就需要回顾一下c语言的调用规约，如下图所示： <img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/head_caller_stack.png" alt="启动中内存分布变化" loading="lazy"></p><p>因此这里可以得到L6是main函数的返回值。立即数0，0，0将会被作为main函数的入参。</p><p>接下来再看下面的代码就很清晰了，实际就是在建立好页表的映射关系后，就开始跳转到main函数去执行了(init/main.c)。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>after_page_tables:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到代码标号setup_page的起始地址是0000544e，而内存页表和页目录表的地址范围是0x0000-0x5000。因此当程序执行到setup_page时，将建立页目录表和页表， 这将会覆盖0x0000-0x5000的部分代码，即pg_dir，check_x87，setup_idt，rp_sidt，setup_gdt， 并不会覆盖到setup_page的代码，head.s在代码的分布计算上确实是费了一番功夫。</p>`,17),l=[a];function t(v,r){return i(),n("div",null,l)}const u=e(d,[["render",t],["__file","Linux-0.11-boot-head.html.vue"]]);export{u as default};
