import{_ as a,V as t,W as l,X as e,Y as d,$ as n,a0 as i,F as c}from"./framework-9a29aaa0.js";const o={},r=i(`<ul><li><a href="#linux-011-boot%E7%9B%AE%E5%BD%95bootsects%E8%AF%A6%E8%A7%A3">Linux-0.11 boot目录bootsect.s详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E8%BF%87%E7%A8%8B%E8%AF%A6%E8%A7%A3">过程详解</a><ul><li><a href="#step1%E6%90%AC%E8%BF%90bootsects%E4%BB%A3%E7%A0%81%E5%88%B00x90000x0000%E5%A4%84">step1：搬运bootsect.s代码到<code>0x9000:0x0000</code>处</a></li><li><a href="#step2%E5%8A%A0%E8%BD%BDsetups%E4%BB%A3%E7%A0%81%E5%88%B00x90000x200%E5%A4%84">step2：加载setup.s代码到<code>0x9000:0x200</code>处</a></li><li><a href="#step3%E5%8A%A0%E8%BD%BDsystem%E6%A8%A1%E5%9D%97%E5%88%B00x10000x0000%E5%A4%84">step3：加载system模块到<code>0x1000:0x0000</code>处</a></li></ul></li><li><a href="#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0">参考文章</a></li></ul></li></ul><h1 id="linux-0-11-boot目录bootsect-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录bootsect-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录bootsect.s详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>bootsect.s是磁盘启动的引导程序，其概括起来就是代码的搬运工，将代码搬到合适的位置。下图是对搬运过程的概括，可以有个印象，后面将详细讲解。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/bootsect_boot.png" alt="启动中内存分布变化" tabindex="0" loading="lazy"><figcaption>启动中内存分布变化</figcaption></figure><p>bootsect.s主要做了如下的三件事:</p><ul><li>搬运bootsect.s代码到0x9000:0x0000处</li><li>加载setup.s代码到0x9000:0x200处</li><li>加载system模块到0x1000:0x0000处</li></ul><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><h3 id="step1-搬运bootsect-s代码到0x9000-0x0000处" tabindex="-1"><a class="header-anchor" href="#step1-搬运bootsect-s代码到0x9000-0x0000处" aria-hidden="true">#</a> step1：搬运bootsect.s代码到<code>0x9000:0x0000</code>处</h3><p>下面是bootsect.s中开头1-50行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>!
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cs</code>寄存器的值为<code>0x9000</code>。接下来的操作就是将<code>ds</code>，<code>es</code>，<code>ss</code>都赋值为<code>0x9000</code>。同时将<code>sp</code>设置为<code>0xFF00</code>。</p><h3 id="step2-加载setup-s代码到0x9000-0x200处" tabindex="-1"><a class="header-anchor" href="#step2-加载setup-s代码到0x9000-0x200处" aria-hidden="true">#</a> step2：加载setup.s代码到<code>0x9000:0x200</code>处</h3><p>接下来这一部分用于加载setup.s的代码到<code>0x9000:0x200</code>处。</p><p>下面这里是bootsect.s的67-77行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>load_setup:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里利用了BIOS的<code>0x13</code>号中断，<code>0x13</code>中断和磁盘操作相关，这里使用了2号功能码。</p><p>0x13中断的2号功能的各项参数含义如下：</p><ul><li>AH = 02h</li><li>AL = 要读取多少扇区，非0的数值</li><li>CH = 柱面的低8位</li><li>CL = CL[5：0]表示起始扇区，CL[7：6]是柱面的高2位</li><li>DH = 磁头号</li><li>DL = 驱动器号</li><li>ES:BX = 数据缓冲区的位置</li></ul><p>返回值:</p><ul><li>当出错时CF被设置。</li><li>成功操作时，CF被清楚。</li></ul><p><code>ax = 0x0204</code>， 因此<code>ah=0x02</code>, <code>al=0x04</code>,代表这里进行的操作是都磁盘到内存，且要读取4个扇区。 <code>bx = 0x200</code>， 因此从磁盘中读取的数据将拷贝到<code>0x9000:0x200</code>处 <code>cx = 0x0002</code>, <code>cx[5:0] = 0x2</code>，表示起始扇区为2，<code>{cx[7:6], cx[15:8]} = 0x0</code>, 代表柱面为0。 <code>dx = 0x0000</code>， <code>dh = 0x0</code>, 磁头号为0， <code>dl = 0x0</code>, 驱动器号为0。</p>`,39),v=e("code",null,"0x13",-1),m={href:"http://www.ctyme.com/intr/int-13.htm",target:"_blank",rel:"noopener noreferrer"},u=i(`<p>如果读取成功则执行<code>ok_load_setup</code>。 这里使用的是<code>jnc</code>跳转指令，它会根据CF的状态决定是否跳转。</p><p>如果不成功，则对驱动器进行复位，再次读取。复位操作仍然使用的是<code>0x13</code>中断，操作码为0。</p><ul><li>AH = 00h</li><li>DL = 驱动器号</li></ul><p>接下来是bootsect.s的79-90行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok_load_setup:

! Get disk drive parameters, specifically nr of sectors/track

	mov	dl,#0x00
	mov	ax,#0x0800		! AH=8 is get drive parameters
	int	0x13
	mov	ch,#0x00
	seg cs
	mov	sectors,cx
	mov	ax,#INITSEG
	mov	es,ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是使用<code>0x13</code>中断的8号功能码去获取一些磁盘驱动器的参数。</p><p>入参：</p><ul><li>ah：功能码，08h代表去获取驱动器的参数。</li><li>dl：为驱动器号。</li></ul><p>返回信息：</p><ul><li>CF：如果出错则CF置为1，如果成功则CF=0。如果出错，ah=状态码</li><li>ah = 0， al = 0</li><li>bl：驱动器的类型(AT/PS2)</li><li>ch：最大柱面号的低8位</li><li>cl: cl[5:0]代表每磁道最大扇区数， cl[7：6]代表最大柱面号高2位</li><li>dh:最大磁头数</li><li>dl:驱动器数量</li><li>es:di：软驱磁盘参数表</li></ul><p>在调用完0x13中断获取完磁盘参数后，首先对<code>ch</code>进行置零，因为<code>ch</code>中存放的是最大柱面，而我们下面要去获取扇区数，因此避免其干扰。</p><p>这下面使用<code>mov sectors,cx</code>将最大扇区数存在了sectors中。</p><p>最后由于中断返回值修改了<code>es</code>，因此需要进行恢复。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov	ax,#INITSEG
mov	es,ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是bootsect.s的第92-102行，主要使用BIOS中断<code>0x10</code>向终端中打印信息。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! Print some inane message

	mov	ah,#0x03		! read cursor pos
	xor	bh,bh
	int	0x10
	
	mov	cx,#24
	mov	bx,#0x0007		! page 0, attribute 7 (normal)
	mov	bp,#msg1
	mov	ax,#0x1301		! write string, move cursor
	int	0x10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>0x10</code>中断号有多个功能,具体含义如下：</p><ul><li><p>1.读光标位置，<code>ah=0x03</code></p><p>输入：</p><ul><li>bh = 页号</li></ul><p>输出：</p><ul><li>ch = 扫描开始线</li><li>cl = 扫描结束线</li><li>dh = 行号</li><li>dl = 列号</li></ul></li><li><p>2.打印字符串：<code>ah=0x013</code></p><p>输入：</p><ul><li>al = 放置光标的方式和规定属性</li><li>es:bp 字符串位置</li><li>cx = 显示的字符串字符数</li><li>bh = 显示页面号</li><li>bl = 字符属性</li><li>dh = 行号</li><li>dl = 列号</li></ul></li></ul><p>首先读取了目前光标所在的位置，存储在了<code>dx</code>中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	ah,#0x03		! read cursor pos
	xor	bh,bh
	int	0x10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着指定了要显示的字符串的长度为24， 页面号为0，字符属性为7，要显示的字符位置是<code>0x9000:msg</code>, 即<code>\\r\\nLoading system ...\\r\\n\\r\\n</code>,放置光标的方式和规定属性为0x1。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	cx,#24
	mov	bx,#0x0007		! page 0, attribute 7 (normal)
	mov	bp,#msg1
	mov	ax,#0x1301		! write string, move cursor
	int	0x10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step3-加载system模块到0x1000-0x0000处" tabindex="-1"><a class="header-anchor" href="#step3-加载system模块到0x1000-0x0000处" aria-hidden="true">#</a> step3：加载system模块到<code>0x1000:0x0000</code>处</h3><p>接下来，要继续读system模块到内存中。</p><p>下面是bootsect.s的104-110行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>! ok, we&#39;ve written the message, now
! we want to load the system (at 0x10000)

	mov	ax,#SYSSEG
	mov	es,ax		! segment of 0x010000
	call	read_it
	call	kill_motor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里实际会设置<code>ax=0x1000</code>, <code>es = 0x1000</code>，进而会调用<code>read_it</code>方法，稍后我们会详细理解<code>read_it</code>方法，这里我们先有个概念，<code>read_it</code>实际上作用就是将system模块存放在<code>0x1000:0x0000</code>处。</p><p><code>read_it</code>位于bootsect.s的第151行。</p><p>首先看151-155行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>read_it:
	mov ax,es
	test ax,#0x0fff
die:	jne die			! es must be at 64kB boundary
	xor bx,bx		! bx is starting address within segment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>test</code>指令执行AND运算，当AND运算的结果为零时，<code>test</code>设置零标志<code>ZF=1</code>。</p><p>而这里<code>0x1000 &amp; 0x0fff = 0x0000</code>,因此<code>ZF</code>会被设置。<code>jne</code>跳转的条件是<code>ZF == 0</code>，因此不会进行跳转。这里的作用主要是用来检查<code>es</code>的值要在\`\`\`\`64KB\`\`\`的边界处。</p><p>除此以外<code>xor bx，bx</code>将<code>bx</code>的寄存器设置为0。</p><p>接下来是第156-160行</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>rp_read:
	mov ax,es
	cmp ax,#ENDSEG		! have we loaded all yet?
	jb ok1_read
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>rp_read</code>的实际是逐磁道读取磁盘中system模块的过程。如下图所示共两个磁道，两个磁头，每磁道八个扇区，读取顺序如下所示，首先读取0磁头0磁道，然后读取1磁头0磁道，接着读取0磁头1磁道，最后读取1磁头1磁道。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/boot_ok_read.png" alt="rp_read" tabindex="0" loading="lazy"><figcaption>rp_read</figcaption></figure><p><code>rp_read</code>首先判断是否已经读入了所有的数据(system模块)。比较<code>ax</code>和<code>ENDSEG</code>的值，如果不相等，则需要继续读取，于是跳转到<code>ok1_read</code>中执行。</p><p><code>ok1_read</code>位于161-172行：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok1_read:
	seg cs
	mov ax,sectors
	sub ax,sread
	mov cx,ax
	shl cx,#9
	add cx,bx
	jnc ok2_read
	je ok2_read
	xor ax,ax
	sub ax,bx
	shr ax,#9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ok1_read</code>主要计算了当前磁道上还有多少扇区没有读取完，并将当期磁道上还剩下的扇区数存在了<code>ax</code>中， 将下一次读磁盘读到的字节数存到了<code>cx</code>中。</p><p>下面这几句便是计算的过程：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov ax,sectors
	sub ax,sread          ！当前磁道还有多少扇区没有读，下面调用read_track的时候会使用到该参数
	mov cx,ax
	shl cx,#9             ！计算这一次读会读多少字节
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来进行判断，读到的数据是否超过了64KB。如果没有超过，则会跳转到<code>ok2_read</code>执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	add cx,bx             ！计算是否会超过64KB，64KB = 65536 = 1_00000000_00000000
	jnc ok2_read
	je ok2_read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ok2_read/ok3_read/ok4_read位于173-196行。</p><p>ok2_read实际的作用就是将<strong>当前磁道上的所有扇区全部读完</strong>。更具体的，就是读取开始扇区<code>cl</code>和需读扇区数<code>al</code>的数据到<code>es:bx</code>开始处。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok2_read:
                          ! ax 先前已经设置
	call read_track
	mov cx,ax             ！cx = ax，本次读取的扇区数
	add ax,sread          ！当前磁道上已经读取的扇区数
	seg cs
	cmp ax,sectors        ！如果当前磁道上还有扇区未读，则跳转到ok3_read。
	jne ok3_read
	mov ax,#1             ！
	sub ax,head           ！判断当前磁头号
	jne ok4_read          ！如果是0磁头，则再去读1磁头上的扇区数据。如果是1磁头
	inc track             ！否则读取下一个磁道
ok4_read:
	mov	%ax, head         !保存当前的磁头号
	xor	%ax, %ax          !清除已读扇区数
ok3_read:
	mov	%ax, sread        !保存当前扇区已读扇区数
	shl	$9, %cx
	add	%cx, %bx
	jnc	rp_read           ！已经读取了64KB数据，调整当前段，为读取下一段数据做准备。
	mov	%es, %ax
	add	$0x1000, %ax      !刚开始是0x1000，读完64Kb之后，调整为0x2000，0x3000，最终到0x4000结束。
	mov	%ax, %es
	xor	%bx, %bx
	jmp	rp_read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ok2_read</code>的第一句话是调用了<code>read_track</code>方法：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>call read_track
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>read_track</code>的作用是读取当前磁道上的扇面到<code>es:bx</code>处。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>read_track:
	push ax            !保存ax,bx,cx,dx寄存器
	push bx            
	push cx            
	push dx
	mov dx,track       !获取当前的磁道号
	mov cx,sread       !获取当前磁道上的已读扇区数
	inc cx             !cl = 开始读的扇区号
	mov ch,dl          !ch = 当前磁道号
	mov dx,head        !dx = 当前磁头号， 目前磁头号还在dl中，后面会挪动到dh中。
	mov dh,dl          !将磁头号从dl挪动到dh中
	mov dl,#0          !dl = 驱动器号
	and dx,#0x0100     !将dx与0x0100进行按位与，实际就是使得磁头号小于等于1。
	mov ah,#2          !ah = 2，读磁盘扇区的功能号
	int 0x13           !0x13号中断， 读取磁盘数据。
	jc bad_rt          !如果出错，则跳转运行bad_rt
	pop dx             !恢复dx,cx,bx,ax寄存器
	pop cx
	pop bx
	pop ax
	ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>read_track</code>之后，会统计一些数据，看本磁道上的扇区是否全部读完，如果没有读完，则跳转到<code>ok3_read</code>进行再次读取。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov cx,ax             ！cx = ax，本次读取的扇区数
	add ax,sread          ！当前磁道上已经读取的扇区数
	seg cs
	cmp ax,sectors        ！如果当前磁道上还有扇区未读，则跳转到ok3_read。
	jne ok3_read
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果已经读完，则调整磁头和磁道，继续读取。这里指定了磁盘读取的顺序。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov ax,#1             ！
	sub ax,head           ！判断当前磁头号
	jne ok4_read          ！如果是0磁头，则再去读1磁头上的扇区数据。如果是1磁头
	inc track             ！否则读取下一个磁道
ok4_read:
	mov head,ax
	xor ax,ax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要分情况进行讨论：</p><ul><li>如果当前是0磁头0磁道，即<code>head=0</code>， <code>track=0</code>则<code>ax = 1</code>，<code>sub ax, head</code>之后，<code>ax = 1</code>， 由于相减不等于0，因此<code>ZF = 0</code>，<code>jne</code>会进行跳转， 于是<code>head=1</code>。</li><li>如果当前是1磁头0磁道，即<code>head=1</code>， <code>track=0</code>则<code>ax = 0</code>，<code>sub ax, head</code>之后，<code>ax = 0</code>， 由于相减等于0，因此<code>ZF = 1</code>，<code>jne</code>不会进行跳转， 于是<code>head=0</code>，<code>track=1</code>。</li><li>如果当前是0磁头1磁道，即<code>head=0</code>， <code>track=1</code>则<code>ax = 1</code>，<code>sub ax, head</code>之后，<code>ax = 1</code>， 由于相减不等于0，因此<code>ZF = 0</code>，<code>jne</code>会进行跳转， 于是<code>head=1</code>。</li></ul><p>总结起来读取顺序是首先读取0磁头0磁道，然后读取1磁头0磁道，接着读取0磁头1磁道，最后读取1磁头1磁道。</p><p>读到这里应该对整个读取的过程有了一个概念，整个过程的流程如下所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/read_disk.png" alt="read_disk" tabindex="0" loading="lazy"><figcaption>read_disk</figcaption></figure><p>看到这里，我们再回到调用<code>read_it</code>的地方, 我们看看当读取完system模块之后，还会做些什么操作。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	mov	ax,#SYSSEG
	mov	es,ax		! segment of 0x010000
	call	read_it
	call	kill_motor
! After that we check which root-device to use. If the device is
! defined (!= 0), nothing is done and the given device is used.
! Otherwise, either /dev/PS0 (2,28) or /dev/at0 (2,8), depending
! on the number of sectors that the BIOS reports currently.

	seg cs
	mov	ax,root_dev
	cmp	ax,#0
	jne	root_defined
	seg cs
	mov	bx,sectors
	mov	ax,#0x0208		! /dev/ps0 - 1.2Mb
	cmp	bx,#15
	je	root_defined
	mov	ax,#0x021c		! /dev/PS0 - 1.44Mb
	cmp	bx,#18
	je	root_defined
undef_root:
	jmp undef_root
root_defined:
	seg cs
	mov	root_dev,ax

! after that (everyting loaded), we jump to
! the setup-routine loaded directly after
! the bootblock:

	jmpi	0,SETUPSEG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里首先判断了<code>root_dev</code>是否进行了定义。如果定义了，则跳转到<code>root_defined</code>执行。</p><p>0x0306</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	seg cs
	mov	ax,root_dev
	cmp	ax,#0
	jne	root_defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要补充一下Linux-0.11对于设备号的定义：</p>`,67),x=e("p",{class:"katex-block"},[e("span",{class:"katex-display"},[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[e("semantics",null,[e("mrow",null,[e("mtext",null,"设备号"),e("mo",null,"="),e("mtext",null,"主设备号"),e("mo",null,"∗"),e("mn",null,"256"),e("mo",null,"+"),e("mtext",null,"次设备号")]),e("annotation",{encoding:"application/x-tex"}," 设备号 = 主设备号 * 256 + 次设备号 ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6833em"}}),e("span",{class:"mord cjk_fallback"},"设备号"),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),e("span",{class:"mrel"},"="),e("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6833em"}}),e("span",{class:"mord cjk_fallback"},"主设备号"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mbin"},"∗"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),e("span",{class:"mord"},"256"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),e("span",{class:"mbin"},"+"),e("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.6833em"}}),e("span",{class:"mord cjk_fallback"},"次设备号")])])])])],-1),b=i(`<p>主设备号： 1-内存，2-磁盘，3-硬盘， 4-ttyx，5-tty，6-并行口，7非命名管道</p><table><thead><tr><th>主设备号</th><th>设备名</th><th>含义</th></tr></thead><tbody><tr><td>0x300</td><td>/dev/hd0</td><td>代表第1块硬盘</td></tr><tr><td>0x301</td><td>/dev/hd1</td><td>代表第1块硬盘的第1个分区</td></tr><tr><td>0x302</td><td>/dev/hd2</td><td>代表第1块硬盘的第2个分区</td></tr><tr><td>0x303</td><td>/dev/hd3</td><td>代表第1块硬盘的第3个分区</td></tr><tr><td>0x304</td><td>/dev/hd4</td><td>代表第1块硬盘的第4个分区</td></tr><tr><td>0x305</td><td>/dev/hd5</td><td>代表第2块硬盘</td></tr><tr><td>0x306</td><td>/dev/hd6</td><td>代表第2块硬盘的第1个分区</td></tr><tr><td>0x307</td><td>/dev/hd7</td><td>代表第2块硬盘的第2个分区</td></tr><tr><td>0x308</td><td>/dev/hd8</td><td>代表第2块硬盘的第3个分区</td></tr><tr><td>0x309</td><td>/dev/hd9</td><td>代表第2块硬盘的第4个分区</td></tr></tbody></table><p>在Linux-0.11中，这里的<code>ROOT_DEV</code>定义为<code>0x306</code>,因为当年linus是在第2块硬盘上的安装的文件系统。在编译内核时，可以根据自己的环境修改该参数。</p><p>假设没有定义<code>ROOT_DEV</code>，就需要根据BIOS的每磁道扇区数来决定是使用/dev/PS0(0x0208)还是/dev/at0(0x021c)。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	seg cs
	mov	bx,sectors
	mov	ax,#0x0208		! /dev/ps0 - 1.2Mb
	cmp	bx,#15
	je	root_defined
	mov	ax,#0x021c		! /dev/PS0 - 1.44Mb
	cmp	bx,#18
	je	root_defined
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序的最后，因为所有的需要加载的内容都加载完了，于是执行<code>jmpi 0,SETUPSEG</code>跳转到了setup.s中进行执行。</p><p>文章的最后，我们通过一张图回顾一下bootsect.s所做的一些事情：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/bootsect_overview.png" alt="bootsect-overview" tabindex="0" loading="lazy"><figcaption>bootsect-overview</figcaption></figure><p>文中如有表达不正确之处，欢迎大家与我交流，微信号codebuilding。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/personal/wechat.jpg" alt="wechat" tabindex="0" loading="lazy"><figcaption>wechat</figcaption></figure><hr><h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>`,12),p={href:"https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md",target:"_blank",rel:"noopener noreferrer"};function h(g,_){const s=c("ExternalLinkIcon");return t(),l("div",null,[r,e("p",null,[d("关于"),v,d("中断的更多详细功能，可以参考"),e("a",m,[d("这里"),n(s)]),d("。")]),u,x,b,e("p",null,[e("a",p,[d("https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md"),n(s)])])])}const k=a(o,[["render",h],["__file","Linux-0.11-boot-bootsect.html.vue"]]);export{k as default};
