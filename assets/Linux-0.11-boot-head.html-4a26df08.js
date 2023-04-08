import{_ as e,V as a,W as i,a0 as n}from"./framework-c954d91f.js";const s={},d=n(`<h1 id="linux-0-11-boot目录head-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录head-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录head.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><p>在setup_paging执行完毕之后，会通过ret返回，ret指令会将栈顶的内容弹出到PC指针中去执行。此时esp指向的位置存放的是main函数的地址。因此接下来会执行main函数。</p><p>注意到在将main入栈时，还一同入栈了一些其他参数</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pushl $0		# These are the parameters to main :-)
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,11),t=[d];function r(l,c){return a(),i("div",null,t)}const m=e(s,[["render",r],["__file","Linux-0.11-boot-head.html.vue"]]);export{m as default};
