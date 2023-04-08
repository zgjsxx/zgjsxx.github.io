import{_ as s,V as n,W as a,a0 as e}from"./framework-c954d91f.js";const t={},p=e(`<h1 id="linux-0-11-boot目录setup-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录setup-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录setup.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>打印硬件信息</p><p>重新搬运system的位置</p><p>设置中断信息</p><p>切换32位保护模式</p><p>跳转到system.s中运行</p><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code># 获取内存信息

	mov	$<span class="token number">0x88</span><span class="token punctuation">,</span> <span class="token operator">%</span>ah 
	<span class="token keyword">int</span>	$<span class="token number">0x15</span>
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">2</span>

# 获取显卡显示模式

	mov	$<span class="token number">0x0f</span><span class="token punctuation">,</span> <span class="token operator">%</span>ah
	<span class="token keyword">int</span>	$<span class="token number">0x10</span>
	mov	<span class="token operator">%</span>bx<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">4</span>	# bh <span class="token operator">=</span> display page
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">6</span>	# al <span class="token operator">=</span> video mode<span class="token punctuation">,</span> ah <span class="token operator">=</span> window width

<span class="token macro property"><span class="token directive-hash">#</span> <span class="token directive keyword">check</span> <span class="token expression"><span class="token keyword">for</span> EGA<span class="token operator">/</span>VGA and some config parameters</span></span>

	mov	$<span class="token number">0x12</span><span class="token punctuation">,</span> <span class="token operator">%</span>ah
	mov	$<span class="token number">0x10</span><span class="token punctuation">,</span> <span class="token operator">%</span>bl
	<span class="token keyword">int</span>	$<span class="token number">0x10</span>
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">8</span>
	mov	<span class="token operator">%</span>bx<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">10</span>
	mov	<span class="token operator">%</span>cx<span class="token punctuation">,</span> <span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">12</span>

# 获取第<span class="token number">1</span>块硬盘的信息

	mov	$<span class="token number">0x0000</span><span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds
	lds	<span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">4</span><span class="token operator">*</span><span class="token number">0x41</span><span class="token punctuation">,</span> <span class="token operator">%</span>si
	mov	$INITSEG<span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es
	mov	$<span class="token number">0x0080</span><span class="token punctuation">,</span> <span class="token operator">%</span>di
	mov	$<span class="token number">0x10</span><span class="token punctuation">,</span> <span class="token operator">%</span>cx
	rep
	movsb

# 获取第<span class="token number">2</span>块硬盘的信息

	mov	$<span class="token number">0x0000</span><span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds
	lds	<span class="token operator">%</span>ds<span class="token operator">:</span><span class="token number">4</span><span class="token operator">*</span><span class="token number">0x46</span><span class="token punctuation">,</span> <span class="token operator">%</span>si
	mov	$INITSEG<span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es
	mov	$<span class="token number">0x0090</span><span class="token punctuation">,</span> <span class="token operator">%</span>di
	mov	$<span class="token number">0x10</span><span class="token punctuation">,</span> <span class="token operator">%</span>cx
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,19),o=[p];function i(l,r){return n(),a("div",null,o)}const d=s(t,[["render",i],["__file","Linux-0.11-boot-setup.html.vue"]]);export{d as default};
