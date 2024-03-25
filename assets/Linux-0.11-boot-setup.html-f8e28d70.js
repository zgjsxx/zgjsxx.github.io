import{_ as n,V as l,W as d,X as s,Y as e,$ as a,a0 as i,F as m}from"./framework-9a29aaa0.js";const c={},r=i(`<h1 id="linux-0-11-boot目录setup-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录setup-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录setup.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>setup.s用于加载操作系统的一些信息，其主要处理了如下一些事情：</p><ul><li>打印硬件信息</li><li>重新搬运system的位置</li><li>设置IDT和GDT</li><li>打开A20地址线</li><li>切换32位保护模式</li><li>跳转到system.s中运行</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="step1-打印硬件信息" tabindex="-1"><a class="header-anchor" href="#step1-打印硬件信息" aria-hidden="true">#</a> step1：打印硬件信息</h3><p>下面是setup.s的30-41行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>entry start
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里用到的是0x10中断，其主功能码(AH)是<code>12h</code>，次功能码<code>10h</code>。其输出如下：</p><ul><li>BH：显示状态(0x00，彩色模式， I/O端口 3Dxh， 0x01， 单色模式， I/O端口 3bxh)</li><li>BL： 安装的显示内存(00h = 64k， 01h = 128K， 02h = 192k，03h = 256k)</li><li>CH：特征连接器位</li><li>CL：切换设置</li></ul>`,26),o={href:"https://www.youtube.com/watch?v=FpnGzLfIoz4&ab_channel=%E9%9F%B3%E4%B9%90%E7%A7%81%E8%97%8F%E9%A6%86",target:"_blank",rel:"noopener noreferrer"},v=i(`<p>最终在获取完这些信息之后，将其<code>AH</code>存储在了<code>0x90008</code>(<code>AH</code>返回新的BIOS移除了该返回值),将安装的显示内存存储在了<code>0x9000a</code>,将显卡的特性参数存储在了<code>0x9000c</code>。</p><p>下面是setup.s的64-74行，这里用于获取第一块硬盘的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>! Get hd0 data

	mov	ax,#0x0000
	mov	ds,ax
	lds	si,[4*0x41]
	mov	ax,#INITSEG
	mov	es,ax
	mov	di,#0x0080
	mov	cx,#0x10
	rep
	movsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一块硬盘的参数表的首地址和<code>0x41</code>中断向量地址重合。每个中断向量的长度是4个字节，因此其地址是<code>0x41*4 = 0x104</code>。使用<code>lds</code>指令即可读出第一块硬盘的实际位置。</p><p>后面再次使用了<code>rep movsb</code>循环搬运数据， 数据的原始位置在<code>ds:si</code>中(通过lds获取)，数据的目的位置是<code>0x90080</code>。</p><p>下面是setup.s的76-86行，其用于获取第2块硬盘的信息，整个过程与上面类似，区别是第二块硬盘的信息与<code>0x46</code>中断向量重合。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Get hd1 data

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step2-重新搬运system的位置" tabindex="-1"><a class="header-anchor" href="#step2-重新搬运system的位置" aria-hidden="true">#</a> step2：重新搬运system的位置</h3><p>下面是setup.s的的110-125行，其作用是给system模块移动位置。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! first we move the system to it&#39;s rightful place

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次进入这里时<code>ax = 0</code>， 因此<code>es = 0</code>，接着<code>ax</code>加上了<code>0x1000</code>，结果为<code>0x1000</code>, 将<code>ax</code>与\`\`\`\`0x9000<code>比较，判断是否全部移动。因为system模块存储在</code>0x10000-0x90000<code>,因此</code>cmp ax,#0x9000\`\`\`可以作为循环终止条件。</p><p>下面的代码则是为<code>rep movsw</code>构建循环的条件，<code>movsw</code>的作用是从<code>DS:(E)SI</code>拷贝一个字到<code>ES:（E)DI</code>，将<code>di</code>和<code>si</code>设置为0，<code>ds</code>设置为<code>0x1000</code>，<code>es</code>设置为<code>0x0</code>，循环次数为0x8000次。</p><p>这里最终的效果就是按照每64kb为一个移动单元将system模块搬运到0x0出的位置。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	ds,ax		! source segment
	sub	di,di
	sub	si,si
	mov 	cx,#0x8000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step3-设置idt和gdt" tabindex="-1"><a class="header-anchor" href="#step3-设置idt和gdt" aria-hidden="true">#</a> step3：设置IDT和GDT</h3><p>因为将system模块搬运到了物理地址为<code>0x0</code>处，这里原来是BIOS中断存放的位置，因此这个搬运操作实际上覆盖了BIOS中断，因此我们需要重新设置。</p><p>接下来，将加载gdt和idt的寄存器。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>end_move:
	mov	ax,#SETUPSEG	! right, forgot this at first. didn&#39;t work :-)
	mov	ds,ax
	lidt	idt_48		! load idt with 0,0
	lgdt	gdt_48		! load gdt with whatever appropriate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>idt_48和gdt_48的值定义在下面：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>idt_48:
	.word	0			! idt limit=0
	.word	0,0			! idt base=0L

gdt_48:
	.word	0x800		! gdt limit=2048, 256 GDT entries
	.word	512+gdt,0x9	! gdt base = 0X9xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step4-打开a20地址线" tabindex="-1"><a class="header-anchor" href="#step4-打开a20地址线" aria-hidden="true">#</a> step4：打开A20地址线</h3><p>下面这里是开启A20地址线。</p><p>后面涉及了对于中断芯片8259a的编程，这个过程参考附录1。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	call	empty_8042
	mov	al,#0xD1		! command write
	out	#0x64,al
	call	empty_8042
	mov	al,#0xDF		! A20 on
	out	#0x60,al
	call	empty_8042

! well, that went ok, I hope. Now we have to reprogram the interrupts :-(
! we put them right after the intel-reserved hardware interrupts, at
! int 0x20-0x2F. There they won&#39;t mess up anything. Sadly IBM really
! messed this up with the original PC, and they haven&#39;t been able to
! rectify it afterwards. Thus the bios puts interrupts at 0x08-0x0f,
! which is used for the internal hardware interrupts as well. We just
! have to reprogram the 8259&#39;s, and it isn&#39;t fun.

	mov	al,#0x11		! initialization sequence
	out	#0x20,al		! send it to 8259A-1
	.word	0x00eb,0x00eb		! jmp $+2, jmp $+2
	out	#0xA0,al		! and to 8259A-2
	.word	0x00eb,0x00eb
	mov	al,#0x20		! start of hardware int&#39;s (0x20)
	out	#0x21,al
	.word	0x00eb,0x00eb
	mov	al,#0x28		! start of hardware int&#39;s 2 (0x28)
	out	#0xA1,al
	.word	0x00eb,0x00eb
	mov	al,#0x04		! 8259-1 is master
	out	#0x21,al
	.word	0x00eb,0x00eb
	mov	al,#0x02		! 8259-2 is slave
	out	#0xA1,al
	.word	0x00eb,0x00eb
	mov	al,#0x01		! 8086 mode for both
	out	#0x21,al
	.word	0x00eb,0x00eb
	out	#0xA1,al
	.word	0x00eb,0x00eb
	mov	al,#0xFF		! mask off all interrupts for now
	out	#0x21,al
	.word	0x00eb,0x00eb
	out	#0xA1,al
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step5-切换32位保护模式" tabindex="-1"><a class="header-anchor" href="#step5-切换32位保护模式" aria-hidden="true">#</a> step5: 切换32位保护模式</h3><p>切换到32位保护模式</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	#mov	$0x0001, %ax	# protected mode (PE) bit
	#lmsw	%ax		# This is it!
	mov	%cr0, %eax	# get machine status(cr0|MSW)	
	bts	$0, %eax	# turn on the PE-bit 
	mov	%eax, %cr0	# protection enabled
				
				# segment-descriptor        (INDEX:TI:RPL)
	.equ	sel_cs0, 0x0008 # select for code segment 0 (  001:0 :00) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跳转到system-s中运行" tabindex="-1"><a class="header-anchor" href="#跳转到system-s中运行" aria-hidden="true">#</a> 跳转到system.s中运行</h3><p>跳转到sytem模块执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	ax,#0x0001	! protected mode (PE) bit
	lmsw	ax		! This is it!
	jmpi	0,8		! jmp offset 0 of segment 8 (cs)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>文中如有表达不正确之处，欢迎大家与我交流，微信号codebuilding。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2><h3 id="_1-8259工作方式" tabindex="-1"><a class="header-anchor" href="#_1-8259工作方式" aria-hidden="true">#</a> 1.8259工作方式</h3><p>8259的命令字分为两部分：初始化命令字（ICW = initial command words）和操作命令字(OCW = operate command words)</p><p>A0 = 0， 操作端口为0x20和0xA0。</p><p>ICW1的格式如下</p><table><tr><th>位</th><th>名称</th><th>含义</th></tr><tr><td><math><msub><mi>D</mi><mn>7</mn></msub></math></td><td>A7</td><td rowspan="3">A7-A5表示在MCS80/85中用于中断服务过程的页面起始地址。与ICW2中的A15-A8共同组成。这几位对于8086/88处理器无用。</td></tr><tr><td><math><msub><mi>D</mi><mn>6</mn></msub></math></td><td>A6</td></tr><tr><td><math><msub><mi>D</mi><mn>5</mn></msub></math></td><td>A5</td></tr><tr><td><math><msub><mi>D</mi><mn>4</mn></msub></math></td><td>1</td><td>恒为1</td></tr><tr><td><math><msub><mi>D</mi><mn>3</mn></msub></math></td><td>LTIM</td><td>1-电平触发中断方式；0-边沿触发方式</td></tr><tr><td><math><msub><mi>D</mi><mn>2</mn></msub></math></td><td>0</td>ADI<td>MCS80/85系统用于CALL指令地址间隔。对于8086/88处理器无用</td></tr><tr><td><math><msub><mi>D</mi><mn>1</mn></msub></math></td><td>SNGL</td><td>1-单片8259A；0-多片级联 </td></tr><tr><td><math><msub><mi>D</mi><mn>0</mn></msub></math></td><td>IC4</td><td>1-需要ICW4； 0-不需要</td></tr></table><p>在Linux系统中ICW1被设置为0x11，表示中断请求是边沿触发、多篇8259A级联，并且最后需要发送到ICW4。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/setup/ICW1.png" alt="ICW1" tabindex="0" loading="lazy"><figcaption>ICW1</figcaption></figure><p>ICW2主要设置了中断号的取值范围。其设置芯片送出的中断号的高5位。当A0 = 1时表示对ICW2进行设置</p><p>A0 = 1， 操作端口为0x21和0xA1。</p><p>ICW2的格式如下：</p><p>Linux 0.11系统把主片的ICW2设置为0x20，表示主片中断请求的0级-7级对应的中断号范围是0x20-0x27。 而从片的ICW2被设置为0x28，表示从片的中断请求8级-15级对应的中断号范围是0x28-0x2f。</p><p>ICW3指定了主从8259芯片的连接关系。</p><p>A0 = 1， 操作端口为0x21和0xA1。</p><p>ICW3格式：</p><p>Linux 0.11内核将8259A主片的ICW3设置为0x04，即s2 = 1，其余各位为0。</p><p>ICW4：</p>`,53),u=s("p",null,[e("|位|名称|含义| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"7")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{7}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"7")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|0|恒为0| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"6")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{6}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"6")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|0|恒为0| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"5")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{5}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"5")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|0|恒为0| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"4")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{4}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"4")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|SFNM|1-选择特殊全嵌套方式 0-普通全嵌套方式| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"3")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{3}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"3")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|BUF|恒为0|1-缓冲方式 0-缓冲方式下从片| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"2")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{2}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"2")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|M/S|1-缓冲方式下主片； 0-缓冲方式下从片| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"1")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{1}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"1")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|AEOI|1-自动结束中断方式；0-非自动结束方式| |"),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msub",null,[s("mi",null,"D"),s("mn",null,"0")])]),s("annotation",{encoding:"application/x-tex"},"{D}_{0}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8333em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"0")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])])])])]),e("|uPM|1-8086/88处理器系统； 0-MCS80/85系统|")],-1),p={href:"https://blog.csdn.net/weixin_42214698/article/details/125036960",target:"_blank",rel:"noopener noreferrer"};function h(x,b){const t=m("ExternalLinkIcon");return l(),d("div",null,[r,s("p",null,[e("有关CH和CL的含义，可以参考"),s("a",o,[e("这里"),a(t)]),e("。")]),v,u,s("p",null,[s("a",p,[e("https://blog.csdn.net/weixin_42214698/article/details/125036960"),a(t)])])])}const w=n(c,[["render",h],["__file","Linux-0.11-boot-setup.html.vue"]]);export{w as default};
