import{_ as n,V as s,W as e,a0 as i}from"./framework-c954d91f.js";const a={},t=i(`<h1 id="linux-0-11-boot目录setup-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录setup-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录setup.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>setup.s用于加载操作系统的一些信息，其主要处理了如下一些事情：</p><ul><li>打印硬件信息</li><li>重新搬运system的位置</li><li>设置中断信息</li><li>切换32位保护模式</li><li>跳转到system.s中运行</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code># 获取内存信息

	mov	$0x88, %ah 
	int	$0x15
	mov	%ax, %ds:2

# 获取显卡显示模式

	mov	$0x0f, %ah
	int	$0x10
	mov	%bx, %ds:4	# bh = display page
	mov	%ax, %ds:6	# al = video mode, ah = window width

# check for EGA/VGA and some config parameters

	mov	$0x12, %ah
	mov	$0x10, %bl
	int	$0x10
	mov	%ax, %ds:8
	mov	%bx, %ds:10
	mov	%cx, %ds:12

# 获取第1块硬盘的信息

	mov	$0x0000, %ax
	mov	%ax, %ds
	lds	%ds:4*0x41, %si
	mov	$INITSEG, %ax
	mov	%ax, %es
	mov	$0x0080, %di
	mov	$0x10, %cx
	rep
	movsb

# 获取第2块硬盘的信息

	mov	$0x0000, %ax
	mov	%ax, %ds
	lds	%ds:4*0x46, %si
	mov	$INITSEG, %ax
	mov	%ax, %es
	mov	$0x0090, %di
	mov	$0x10, %cx
	rep
	movsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时ax = 0， 因此es = 0，</p><p>随后ax = 0x1000, ds = 0x1000。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>do_move<span class="token operator">:</span>
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es	# destination segment
	add	$<span class="token number">0x1000</span><span class="token punctuation">,</span> <span class="token operator">%</span>ax
	cmp	$<span class="token number">0x9000</span><span class="token punctuation">,</span> <span class="token operator">%</span>ax
	jz	end_move
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds	# source segment
	sub	<span class="token operator">%</span>di<span class="token punctuation">,</span> <span class="token operator">%</span>di
	sub	<span class="token operator">%</span>si<span class="token punctuation">,</span> <span class="token operator">%</span>si
	mov 	$<span class="token number">0x8000</span><span class="token punctuation">,</span> <span class="token operator">%</span>cx
	rep
	movsw
	jmp	do_move
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，将加载gdt和idt的寄存器。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>end_move:
	mov	$SETUPSEG, %ax	# right, forgot this at first. didn&#39;t work :-)
	mov	%ax, %ds
	lidt	idt_48		# load idt with 0,0
	lgdt	gdt_48		# load gdt with whatever appropriate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>切换到32位保护模式</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	#mov	$0x0001, %ax	# protected mode (PE) bit
	#lmsw	%ax		# This is it!
	mov	%cr0, %eax	# get machine status(cr0|MSW)	
	bts	$0, %eax	# turn on the PE-bit 
	mov	%eax, %cr0	# protection enabled
				
				# segment-descriptor        (INDEX:TI:RPL)
	.equ	sel_cs0, 0x0008 # select for code segment 0 (  001:0 :00) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>跳转到sytem模块执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	ljmp	$sel_cs0, $0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,16),d=[t];function l(v,r){return s(),e("div",null,d)}const m=n(a,[["render",l],["__file","Linux-0.11-boot-setup.html.vue"]]);export{m as default};
