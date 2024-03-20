import{_ as d,V as t,W as l,X as e,Y as s,$ as i,a0 as a,F as c}from"./framework-9a29aaa0.js";const o={},r=a(`<h1 id="linux-0-11-boot目录bootsect-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录bootsect-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录bootsect.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>bootsect.s是磁盘启动的引导程序，其概括起来就是代码的搬运工，将代码搬到合适的位置。下图是对搬运过程的概括，可以有个印象，后面将详细讲解。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/bootsect_boot.png" alt="启动中内存分布变化" tabindex="0" loading="lazy"><figcaption>启动中内存分布变化</figcaption></figure><p>bootsect.s主要做了如下的三件事:</p><ul><li>搬运bootsect.s代码到0x9000:0x0000处</li><li>加载setup.s代码到0x9000:0x200处</li><li>加载system模块到0x1000:0x0000处</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="搬运bootsect-s代码到0x9000-0x0000处" tabindex="-1"><a class="header-anchor" href="#搬运bootsect-s代码到0x9000-0x0000处" aria-hidden="true">#</a> 搬运bootsect.s代码到0x9000:0x0000处</h3><p>下面是bootsect.s中开头1-50行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>!
! SYS_SIZE is the number of clicks (16 bytes) to be loaded.
! 0x3000 is 0x30000 bytes = 196kB, more than enough for current
! versions of linux
!
SYSSIZE = 0x3000
!
!	bootsect.s		(C) 1991 Linus Torvalds
!
! bootsect.s is loaded at 0x7c00 by the bios-startup routines, and moves
! iself out of the way to address 0x90000, and jumps there.
!
! It then loads &#39;setup&#39; directly after itself (0x90200), and the system
! at 0x10000, using BIOS interrupts. 
!
! NOTE! currently system is at most 8*65536 bytes long. This should be no
! problem, even in the future. I want to keep it simple. This 512 kB
! kernel size should be enough, especially as this doesn&#39;t contain the
! buffer cache as in minix
!
! The loader has been made as simple as possible, and continuos
! read errors will result in a unbreakable loop. Reboot by hand. It
! loads pretty fast by getting whole sectors at a time whenever possible.

.globl begtext, begdata, begbss, endtext, enddata, endbss
.text
begtext:
.data
begdata:
.bss
begbss:
.text

SETUPLEN = 4				! nr of setup-sectors
BOOTSEG  = 0x07c0			! original address of boot-sector
INITSEG  = 0x9000			! we move boot here - out of the way
SETUPSEG = 0x9020			! setup starts here
SYSSEG   = 0x1000			! system loaded at 0x10000 (65536).
ENDSEG   = SYSSEG + SYSSIZE		! where to stop loading

! ROOT_DEV:	0x000 - same type of floppy as boot.
!		0x301 - first partition on first drive etc
ROOT_DEV = 0x306

entry _start
_start:
	mov	ax,#BOOTSEG
	mov	ds,ax
	mov	ax,#INITSEG
	mov	es,ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中最关键的是下面这几行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	ax,#BOOTSEG 
	mov	ds,ax
	mov	ax,#INITSEG
	mov	es,ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里首先将<code>ax</code>寄存器设置为<code>0x07c0</code>， 接着将<code>ax</code>寄存器的值拷贝给<code>ds</code>，即<code>ds</code>目前为<code>0x07c0</code>。</p><p>接下来将<code>ax</code>寄存器设置为<code>0x9000</code>， 接着将<code>ax</code>寄存器的值拷贝给<code>es</code>，即<code>es</code>目前为<code>0x9000</code>。</p><p>下面是bootsect.s中的51-55行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>
	mov	cx,#256 #设置移动计数值256字
	sub	si,si   #源地址	ds:si = 0x07C0:0x0000
	sub	di,di   #目标地址 es:di = 0x9000:0x0000
	rep         #重复执行并递减cx的值
	movw        #从内存[si]处移动cx个字到[di]处			
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里首先将<code>cx</code>的值设置为<code>256</code>。</p><p>接下来<code>sub</code>指令后跟了两个相同的<code>si</code>寄存器，这其实会将寄存器<code>si</code>设置为0。<code>sub di,di</code>同理将<code>di</code>设置为0。</p><p>接下来使用<code>rep</code>前缀和<code>movsw</code>指令。</p><p>根据Intel手册，<code>movsw</code>的作用是从<code>DS:(E)SI</code>拷贝一个字到<code>ES:（E)DI</code>。<code>movsw</code>操作之后会对<code>si</code>和<code>si</code>进行递增或者递减，递增还是递减由<code>EFLAGS</code>寄存器中的方向位(DF: direction flag)来决定， DF=0，则进行递增， DF=1，则进行递减。</p><p>因此<code>rep movsw</code>的实际作用是从<code>ds:si</code>拷贝256个字(512字节)到<code>es:si</code>处。</p><p>接下来是bootsect.s的第56行，使用<code>jmpi</code>指令进行跳转。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	jmpi	go,INITSEG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>jmpi</code>是段间跳转指令，<code>jmpi</code>的格式是<code>jmpi 段内偏移， 段选择子</code>。</p><p>这句指令使得程序跳转到<code>0x9000</code> 偏移量为<code>go</code>处的代码执行。执行完之后<code>cs</code>寄存器的值将等于<code>0x9000</code>。</p><p>下面是bootsect.s的第57-62行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>go:	mov	ax,cs  #将ds，es，ss都设置成移动后代码所在的段处(0x9000)
	mov	ds,ax
	mov	es,ax
	mov	ss,ax
	mov	sp,#0xFF00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cs</code>寄存器的值为<code>0x9000</code>。接下来的操作就是将<code>ds</code>，<code>es</code>，<code>ss</code>都赋值为<code>0x9000</code>。同时将<code>sp</code>设置为<code>0xFF00</code>。</p><h3 id="加载setup-s代码到0x9000-0x200处" tabindex="-1"><a class="header-anchor" href="#加载setup-s代码到0x9000-0x200处" aria-hidden="true">#</a> 加载setup.s代码到0x9000:0x200处</h3><p>接下来这一部分用于加载setup.s的代码到0x9000:0200处。</p><p>下面这里是bootsect.s的67-77行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>load_setup:
	mov	dx,#0x0000		! drive 0, head 0
	mov	cx,#0x0002		! sector 2, track 0
	mov	bx,#0x0200		! address = 512, in INITSEG
	mov	ax,#0x0200+SETUPLEN	! service 2, nr of sectors
	int	0x13			! read it
	jnc	ok_load_setup		! ok - continue
	mov	dx,#0x0000
	mov	ax,#0x0000		! reset the diskette
	int	0x13
	j	load_setup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里利用了BIOS的<code>0x13</code>号中断，<code>0x13</code>中断和磁盘操作相关，这里使用了2号功能码。</p><p>0x13中断的2号功能的各项参数含义如下：</p><ul><li>AH = 02h</li><li>AL = number of sectors to read (must be nonzero)</li><li>CH = low eight bits of cylinder number</li><li>CL = sector number 1-63 (bits 0-5)</li><li>high two bits of cylinder (bits 6-7, hard disk only)</li><li>DH = head number</li><li>DL = drive number (bit 7 set for hard disk)</li><li>ES:BX -&gt; data buffer</li></ul><p>ax = 0x0204， 因此ah=0x02,al=0x04,代表这里进行的操作是都磁盘到内存，且要读取4个扇区。 bx = 0x200， 因此从磁盘中读取的数据将拷贝到0x9000:0x200处 cx = 0x0002, cx[5:0] = 0x2，表示起始扇区为2，{cx[7:6], cx[15:8]} = 0x0, 代表柱面为0。 dx = 0x0000， dh = 0x0, 磁头0， dl = 0x0, 驱动器0。</p>`,36),v=e("code",null,"0x13",-1),m={href:"http://www.ctyme.com/intr/int-13.htm",target:"_blank",rel:"noopener noreferrer"},u=a(`<p>如果读取成功则执行ok_load_setup。 如果不成功，则对驱动器进行复位，再次读取。</p><p>下面依旧是使用INT 0x13去获取一些磁盘驱动器的参数。</p><p>ah = 0x08 用于获取驱动器参数。 dl为驱动器号。</p><p>返回信息：</p><ul><li>如果出错则CF置为， ah=状态码</li><li>al = 0， al = 0</li><li>bl为驱动器的类型 AT/PS2</li><li>ch 最大柱面号的低8位</li><li>cl 0-5为每磁道最大扇区数， 6-7代表柱面号高2位</li><li>dh最大磁头数</li><li>dl驱动器数量</li><li>es:di 软驱磁盘参数表</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok_load_setup:
	mov	$0x00, %dl
	mov	$0x0800, %ax		# AH=8 is get drive parameters
	int	$0x13
	mov	$0x00, %ch
	#seg cs
	mov	%cx, %cs:sectors+0	# %cs means sectors is in %cs
	mov	$INITSEG, %ax
	mov	%ax, %es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面会使用BIOS中断0x10向终端中打印信息。</p><p>0x10中断号有多个功能</p><p>(1)读光标位置： 功能号:ah=0x03 输入：</p><ul><li>bh = 页号 输出：</li><li>ch = 扫描开始线</li><li>cl = 扫描结束线</li><li>dh = 行号</li><li>dl = 列号</li></ul><p>(1)打印字符串： 功能号:ah=0x013 输入：</p><ul><li>al = 放置光标的方式和规定属性</li><li>es:bp 字符串位置</li><li>cx = 显示的字符串字符数</li><li>bh = 显示页面号</li><li>bl = 字符属性</li><li>dh = 行号</li><li>dl = 列号</li></ul><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	mov	$<span class="token number">0x03</span><span class="token punctuation">,</span> <span class="token operator">%</span>ah		# read cursor pos
	xor	<span class="token operator">%</span>bh<span class="token punctuation">,</span> <span class="token operator">%</span>bh
	<span class="token keyword">int</span>	$<span class="token number">0x10</span>
	
	mov	$<span class="token number">30</span><span class="token punctuation">,</span> <span class="token operator">%</span>cx
	mov	$<span class="token number">0x0007</span><span class="token punctuation">,</span> <span class="token operator">%</span>bx		# page <span class="token number">0</span><span class="token punctuation">,</span> attribute <span class="token number">7</span> <span class="token punctuation">(</span>normal<span class="token punctuation">)</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">lea</span>	<span class="token expression">msg1<span class="token punctuation">,</span> <span class="token operator">%</span>bp</span></span>
	mov     $msg1<span class="token punctuation">,</span> <span class="token operator">%</span>bp
	mov	$<span class="token number">0x1301</span><span class="token punctuation">,</span> <span class="token operator">%</span>ax		# write string<span class="token punctuation">,</span> move cursor
	<span class="token keyword">int</span>	$<span class="token number">0x10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加载system模块到0x1000-0x0000处" tabindex="-1"><a class="header-anchor" href="#加载system模块到0x1000-0x0000处" aria-hidden="true">#</a> 加载system模块到0x1000:0x0000处</h3><p>接下来，要继续读system模块到内存中。</p><p>ax = 0x1000, es = 0x1000</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	mov	$SYSSEG<span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es		# segment of <span class="token number">0x010000</span>
	call	read_it
	call	kill_motor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>read_it实际上就是将system模块存放在0x1000:0x0000处。</p><p>test执行的是0x1000 &amp; 0x0fff = 0x0000,</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>read_it:
	mov	%es, %ax
	test	$0x0fff, %ax
die:	jne 	die			# es must be at 64kB boundary
	xor 	%bx, %bx		# bx is starting address within segment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来rp_read的过程实际是逐磁道读取磁盘中system模块的过程。如下图所示共两个磁道，两个磁头，每磁道八个扇区，读取顺序如下所示，首先读取0磁头0磁道，然后读取1磁头0磁道，接着读取0磁头1磁道，最后读取1磁头1磁道。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/boot_ok_read.png" alt="rp_read" tabindex="0" loading="lazy"><figcaption>rp_read</figcaption></figure><p>rp_read首先判断是否已经读入了所有的数据(system模块)。比较ax和ENDSEG的值，如果不相等，则跳转到ok1_read中执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>rp_read:
	mov 	%es, %ax
 	cmp 	$ENDSEG, %ax		# have we loaded all yet?
	jb	ok1_read
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ok1_read中，则主要计算了当前磁道上还有多少扇区没有读取完。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok1_read:
	#seg cs
	mov	%cs:sectors+0, %ax !获取每磁道的扇区数
	sub	sread, %ax         !减去当前磁道已读扇区数(bootsect + setup)
	mov	%ax, %cx           !cx = ax = 当前柱面未读扇区数
	shl	$9, %cx            !cx = cx * 512字节 + 段内偏移
	add	%bx, %cx
	jnc 	ok2_read       !调用ok2_read函数进行读取当前磁道上剩余扇区。
	je 	ok2_read
	xor 	%ax, %ax
	sub 	%bx, %ax
	shr 	$9, %ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ok2_read实际的作用就是将<strong>当前磁道上的所有扇区全部读完</strong>。更具体的，就是读取开始扇区cl和需读扇区数al的数据到es:bx开始处。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok2_read:
	call 	read_track   !读当前柱面上指定开始扇区和要读的扇区数
	mov 	%ax, %cx     !ax代表本次读取的扇区数，复制到cx中
	add 	sread, %ax   !ax = ax + sread
	#seg cs
	cmp 	%cs:sectors+0, %ax !如果当前磁道上还有扇区未读，则跳转到ok3_read
	jne 	ok3_read
	mov 	$1, %ax       !ax = 1
	sub 	head, %ax     !如果head = 0， ax = ax - head = 1,如果head = 1， ax = ax - head = 0, 即如果磁头号为0，则读取磁头面为1的扇区， 否则的话将读取下一个磁道上的数据。
	jne 	ok4_read
	incw    track 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果当前磁道上还有扇区没有读，则会直接进入ok3_read，再次读取。否则先进入ok4_read，移动到下一个磁道或者下一个磁头进行读取。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok4_read:
	mov	%ax, head        !保存当前的磁头号
	xor	%ax, %ax         !清除已读扇区数
ok3_read:
	mov	%ax, sread       !保存当前扇区已读扇区数
	shl	$9, %cx
	add	%cx, %bx
	jnc	rp_read
	mov	%es, %ax
	add	$0x1000, %ax
	mov	%ax, %es
	xor	%bx, %bx
	jmp	rp_read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来的read_track在ok2_read中被调用，其作用是读取当前磁道上的扇面到es:bx处。</p><p>回顾一下INT 0x13读取磁盘数据时的参数:</p><ul><li>ah = 0x02 功能号，代表读磁盘到内存</li><li>al = 需要读出的扇区总数</li><li>ch = 磁道(柱面)号的低8位</li><li>cl = 0-5位代表开始扇区， 6-7位代表磁道号的高2位代表柱面的高2位。</li><li>dh = 磁头号</li><li>dl = 驱动器号</li><li>es:bx = 指向数据缓冲区</li><li>如果出错，则CF标志位置位，ah中将存放出错码</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>read_track:
	push	%ax       !保存ax,bx,cx,dx寄存器
	push	%bx
	push	%cx
	push	%dx
	mov	track, %dx    !获取当前的磁道号
	mov	sread, %cx    !获取当前磁道上的已读扇区数
	inc	%cx           !cl = 开始读的扇区号
	mov	%dl, %ch      !ch = 当前磁道号
	mov	head, %dx     !dx = 当前磁头号， 目前磁头号还在dl中，后面会挪动到dh中。
	mov	%dl, %dh      !将磁头号从dl挪动到dh中
	mov	$0, %dl       !dl = 驱动器号
	and	$0x0100, %dx  !将dx与0x0100进行按位与，实际就是使得磁头号小于等于1。
	mov	$2, %ah       !ah = 2，读磁盘扇区的功能号
	int	$0x13         !0x13号中断， 读取磁盘数据。
	jc	bad_rt        !如果出错，则跳转运行bad_rt
	pop	%dx           !恢复dx,cx,bx,ax寄存器
	pop	%cx
	pop	%bx
	pop	%ax
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看到这里，我们再回到调用read_it的地方, 注意到其中的<code>ljmp $SETUPSEG, $0</code>，这便是跳转到了setup.s中进行执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	$SYSSEG, %ax
	mov	%ax, %es		# segment of 0x010000
	call	read_it     !读取磁盘上system模块
	call	kill_motor  !关闭驱动器马达

	#seg cs
	mov	%cs:root_dev+0, %ax
	cmp	$0, %ax
	jne	root_defined
	#seg cs
	mov	%cs:sectors+0, %bx
	mov	$0x0208, %ax		# /dev/ps0 - 1.2Mb
	cmp	$15, %bx
	je	root_defined
	mov	$0x021c, %ax		# /dev/PS0 - 1.44Mb
	cmp	$18, %bx
	je	root_defined
undef_root:
	jmp undef_root
root_defined:
	#seg cs
	mov	%ax, %cs:root_dev+0

	ljmp	$SETUPSEG, $0   !跳转到SETUPSEG模块进行执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,37),b={href:"https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md",target:"_blank",rel:"noopener noreferrer"},x=e("hr",null,null,-1),p=e("p",null,"文中如有表达不正确之处，欢迎大家与我交流，微信号codebuilding。",-1),h=e("figure",null,[e("img",{src:"https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function g(_,k){const n=c("ExternalLinkIcon");return t(),l("div",null,[r,e("p",null,[s("关于"),v,s("中断的更多详细功能，可以参考"),e("a",m,[s("这里"),i(n)]),s("。")]),u,e("p",null,[e("a",b,[s("https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md"),i(n)])]),x,p,h])}const S=d(o,[["render",g],["__file","Linux-0.11-boot-bootsect.html.vue"]]);export{S as default};
