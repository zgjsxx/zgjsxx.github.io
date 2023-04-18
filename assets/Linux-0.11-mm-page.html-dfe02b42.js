import{_ as e,V as n,W as i,a0 as s}from"./framework-c954d91f.js";const d={},a=s(`<h1 id="linux-0-11-page-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-page-s详解" aria-hidden="true">#</a> Linux-0.11 page.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="page-fault" tabindex="-1"><a class="header-anchor" href="#page-fault" aria-hidden="true">#</a> _page_fault</h3><p>_page_fault: 页异常中断处理程序(中断14)， 主要分为两种情况处理。 一种是由于缺页引起的页异常中断，通过调用do_no_page(error_code, address)来处理， 二是由页写保护引起的页异常， 此时用页写保护处理函数do_wp_page(error_code, address)来处理。</p><p>如果对这里的汇编指令不熟悉的， 可以看一下另一篇文章<strong>Linux-0.11中的汇编</strong>进行学习。</p><div class="language-assemble line-numbers-mode" data-ext="assemble"><pre class="language-assemble"><code>.globl page_fault

page_fault:
	xchgl %eax,(%esp) //取出出错码到EAX
	pushl %ecx //保存寄存器
	pushl %edx
	push %ds
	push %es
	push %fs
	movl $0x10,%edx
	mov %dx,%ds
	mov %dx,%es
	mov %dx,%fs
	movl %cr2,%edx
	pushl %edx
	pushl %eax
	testl $1,%eax  //这里测试EAX寄存器的第0位是否为0，如果为0，那么说明是缺页中断
	jne 1f  //如果等于1，说明是写保护异常，因此调用do_wp_page
	call do_no_page//否则调用缺页中断处理函数
	jmp 2f
1:	call do_wp_page
2:	addl $8,%esp
	pop %fs   //寄存器回复
	pop %es
	pop %ds
	popl %edx
	popl %ecx
	popl %eax
	iret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),l=[a];function r(v,t){return n(),i("div",null,l)}const u=e(d,[["render",r],["__file","Linux-0.11-mm-page.html.vue"]]);export{u as default};
