import{_ as n,V as a,W as t,X as i,Y as e,$ as l,a0 as d,F as c}from"./framework-9a29aaa0.js";const v={},r=d(`<h1 id="linux-0-11-boot目录setup-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录setup-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录setup.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>setup.s用于加载操作系统的一些信息，其主要处理了如下一些事情：</p><ul><li>打印硬件信息</li><li>重新搬运system的位置</li><li>设置IDT和GDT</li><li>打开A20地址线</li><li>切换32位保护模式</li><li>跳转到system.s中运行</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="step1-打印硬件信息" tabindex="-1"><a class="header-anchor" href="#step1-打印硬件信息" aria-hidden="true">#</a> step1：打印硬件信息</h3><p>下面是setup.s的30-41行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>entry start
start:

! ok, the read went well so we get current cursor position and save it for
! posterity.

	mov	ax,#INITSEG	! this is done in bootsect already, but...
	mov	ds,ax
	mov	ah,#0x03	! read cursor pos
	xor	bh,bh
	int	0x10		! save it in known place, con_init fetches
	mov	[0],dx		! it from 0x90000.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里将<code>ds</code>设置为<code>INITSEG</code>(<code>0x9000</code>)。这个值在bootsect.s中已经设置过，Linus认为目前程序是setup.s,因此这里重新设置了<code>ds</code>寄存器的值。</p><p>接下来利用<code>INT 0x10</code>中断读取光标所在的位置，并将其存储在了0x90000处。</p><p><code>0x10</code> 03号功能的中断号的功能如下：</p><ul><li><p>读光标位置，<code>ah=0x03</code></p><p>输入：</p><ul><li>bh = 页号</li></ul><p>输出：</p><ul><li>ch = 扫描开始线</li><li>cl = 扫描结束线</li><li>dh = 行号</li><li>dl = 列号</li></ul></li></ul><p>下面是setup.s的42-46行，这里利用了<code>0x88</code>中断去获取扩展内存的大小。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Get memory size (extended mem, kB)

	mov	ah,#0x88
	int	0x15
	mov	[2],ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>0x88</code>中断的功能的输出如下：</p><ul><li><code>ax</code>：从绝对地址 100000h(1M) 开始的连续KB数</li><li>如果出错， CF被设置， 如果成功CF被清除</li></ul><p>这里调用<code>0x88</code>中断之后，<code>ax</code>存储了返回信息，并将该信息存在了<code>0x90002</code>处。</p><p>下面是setup.s的48-53行，用于获取显卡的显示模式。这里利用的是<code>0x10</code>中断的<code>af</code>功能码。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Get video-card data:

	mov	ah,#0x0f
	int	0x10
	mov	[4],bx		! bh = display page
	mov	[6],ax		! al = video mode, ah = window width
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>0x10</code>中断<code>0f</code>功能码： 输出：</p><ul><li>AH： 字符列</li><li>AL： 显示模式</li><li>BH： 当前页</li></ul><p>在获取完信息之后，将当前页存储在<code>0x90004-0x90005</code>,将显示模式存储在<code>0x90006</code>,将字符列数存储在<code>0x90007</code>。</p><p>下面是setup.s的55-65行，主要用于检查显示方式。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! check for EGA/VGA and some config parameters

	mov	ah,#0x12
	mov	bl,#0x10
	int	0x10
	mov	[8],ax
	mov	[10],bx
	mov	[12],cx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用到的是0x10中断，其主功能码(AH)是<code>12h</code>，次功能码<code>10h</code>。其输出如下：</p><ul><li>BH：显示状态(0x00，彩色模式， I/O端口 3Dxh， 0x01， 单色模式， I/O端口 3bxh)</li><li>BL： 安装的显示内存(00h = 64k， 01h = 128K， 02h = 192k，03h = 256k)</li><li>CH：特征连接器位</li><li>CL：切换设置</li></ul>`,26),m={href:"https://www.youtube.com/watch?v=FpnGzLfIoz4&ab_channel=%E9%9F%B3%E4%B9%90%E7%A7%81%E8%97%8F%E9%A6%86",target:"_blank",rel:"noopener noreferrer"},o=d(`<p>最终在获取完这些信息之后，将其<code>AH</code>存储在了<code>0x90008</code>(<code>AH</code>返回新的BIOS移除了该返回值),将安装的显示内存存储在了<code>0x9000a</code>,将显卡的特性参数存储在了<code>0x9000c</code>。</p><p>下面是setup.s的64-74行，这里用于获取第一块硬盘的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>! Get hd0 data

	mov	ax,#0x0000
	mov	ds,ax
	lds	si,[4*0x41]
	mov	ax,#INITSEG
	mov	es,ax
	mov	di,#0x0080
	mov	cx,#0x10
	rep
	movsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一块硬盘的参数表的首地址和<code>0x41</code>中断向量地址重合。每个中断向量的长度是4个字节，因此其地址是<code>0x41*4 = 0x104</code>。</p><p>后面再次使用了<code>rep movsb</code>循环搬运数据， 数据的原始位置在<code>0x104</code>，数据的目的位置是<code>0x90080</code>。</p><p>下面是setup.s的76-86行，其用于获取第2块硬盘的信息，整个过程与上面类似，区别是第二块硬盘的信息与<code>0x46</code>中断向量重合。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Get hd1 data

	mov	ax,#0x0000
	mov	ds,ax
	lds	si,[4*0x46]
	mov	ax,#INITSEG
	mov	es,ax
	mov	di,#0x0090
	mov	cx,#0x10
	rep
	movsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里检查系统是否有第2块硬盘，如果没有，则把第2个表清零。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Check that there IS a hd1 :-)

	mov	ax,#0x01500
	mov	dl,#0x81
	int	0x13
	jc	no_disk1
	cmp	ah,#3
	je	is_disk1
no_disk1:
	mov	ax,#INITSEG
	mov	es,ax
	mov	di,#0x0090
	mov	cx,#0x10
	mov	ax,#0x00
	rep
	stosb
is_disk1:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就要进入保护模式了，进入保护模式之前，会先关闭中断。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! now we want to move to protected mode ...
	cli			! no interrupts allowed !
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step2-重新搬运system的位置" tabindex="-1"><a class="header-anchor" href="#step2-重新搬运system的位置" aria-hidden="true">#</a> step2：重新搬运system的位置</h3><p>此时ax = 0， 因此es = 0，</p><p>随后ax = 0x1000, ds = 0x1000。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! first we move the system to it&#39;s rightful place

	mov	ax,#0x0000
	cld			! &#39;direction&#39;=0, movs moves forward
do_move:
	mov	es,ax		! destination segment
	add	ax,#0x1000
	cmp	ax,#0x9000
	jz	end_move
	mov	ds,ax		! source segment
	sub	di,di
	sub	si,si
	mov 	cx,#0x8000
	rep
	movsw
	jmp	do_move
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step3-设置idt和gdt" tabindex="-1"><a class="header-anchor" href="#step3-设置idt和gdt" aria-hidden="true">#</a> step3：设置IDT和GDT</h3><p>因为将system模块搬运到了物理地址为0x0000处，这里原来是BIOS中断存放的位置，因此这个搬运操作实际上覆盖了BIOS中断，因此我们需要重新设置。</p><p>接下来，将加载gdt和idt的寄存器。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>end_move:
	mov	$SETUPSEG, %ax	# right, forgot this at first. didn&#39;t work :-)
	mov	%ax, %ds
	lidt	idt_48		# load idt with 0,0
	lgdt	gdt_48		# load gdt with whatever appropriate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step4-打开a20地址线" tabindex="-1"><a class="header-anchor" href="#step4-打开a20地址线" aria-hidden="true">#</a> step4：打开A20地址线</h3><p>下面这里是开启A20地址线。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	#call	empty_8042	# 8042 is the keyboard controller
	#mov	$0xD1, %al	# command write
	#out	%al, $0x64
	#call	empty_8042
	#mov	$0xDF, %al	# A20 on
	#out	%al, $0x60
	#call	empty_8042
	inb     $0x92, %al	# open A20 line(Fast Gate A20).
	orb     $0b00000010, %al
	outb    %al, $0x92
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step5-切换32位保护模式" tabindex="-1"><a class="header-anchor" href="#step5-切换32位保护模式" aria-hidden="true">#</a> step5: 切换32位保护模式</h3><p>切换到32位保护模式</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	#mov	$0x0001, %ax	# protected mode (PE) bit
	#lmsw	%ax		# This is it!
	mov	%cr0, %eax	# get machine status(cr0|MSW)	
	bts	$0, %eax	# turn on the PE-bit 
	mov	%eax, %cr0	# protection enabled
				
				# segment-descriptor        (INDEX:TI:RPL)
	.equ	sel_cs0, 0x0008 # select for code segment 0 (  001:0 :00) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跳转到system-s中运行" tabindex="-1"><a class="header-anchor" href="#跳转到system-s中运行" aria-hidden="true">#</a> 跳转到system.s中运行</h3><p>跳转到sytem模块执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	ljmp	$sel_cs0, $0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>文中如有表达不正确之处，欢迎大家与我交流，微信号codebuilding。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,30);function u(x,b){const s=c("ExternalLinkIcon");return a(),t("div",null,[r,i("p",null,[e("有关CH和CL的含义，可以参考"),i("a",m,[e("这里"),l(s)]),e("。")]),o])}const h=n(v,[["render",u],["__file","Linux-0.11-boot-setup.html.vue"]]);export{h as default};
