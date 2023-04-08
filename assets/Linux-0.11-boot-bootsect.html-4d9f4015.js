import{_ as a,V as e,W as t,X as s,Y as i,$ as l,a0 as o,F as p}from"./framework-c954d91f.js";const c={},d=o(`<h1 id="linux-0-11-boot目录bootsect-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-boot目录bootsect-s详解" aria-hidden="true">#</a> Linux-0.11 boot目录bootsect.s详解</h1><p>搬运bootsect.s代码到0x9000:0x0000处</p><p>加载setup.s代码到0x9000:0x200处</p><p>加载system模块到0x1000:0x0000处</p><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>bootsect.s是磁盘启动的引导程序，其概括起来就是代码的搬运工，将代码搬到合适的位置。</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/kernel/Linux-0.11/Linux-0.11-boot/bootsect_boot.png" alt="启动中内存分布变化" tabindex="0" loading="lazy"><figcaption>启动中内存分布变化</figcaption></figure><h2 id="过程详解" tabindex="-1"><a class="header-anchor" href="#过程详解" aria-hidden="true">#</a> 过程详解</h2><p>将ax寄存器设置为0x07c0， 接着ax寄存器的值拷贝给ds，即ds目前也为0x07c0。</p><p>将ax寄存器设置为0x9000， 接着ax寄存器的值拷贝给es，即es目前也为0x9000。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov	$BOOTSEG, %ax	#将ds段寄存器设置为0x07c0
mov	%ax, %ds
mov	$INITSEG, %ax	#将es段寄存器设置为0x9000
mov	%ax, %es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来将ecx的值设置为256。接下来通过sub将si和di寄存器设置为0。</p><p>接下来使用rep和movsw从ds:si拷贝256个字(512字节)到es:si处。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov	$256, %cx		#设置移动计数值256字
sub	%si, %si		#源地址	ds:si = 0x07C0:0x0000
sub	%di, %di		#目标地址 es:si = 0x9000:0x0000
rep					#重复执行并递减cx的值
movsw				#从内存[si]处移动cx个字到[di]处
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来使用ljmp跳转到0x9000 偏移量为go处的代码执行。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>ljmp	$INITSEG<span class="token punctuation">,</span> $go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>cs寄存器的值为0x9000。接下来的操作就是将ds，es，ss都赋值为0x9000。同时将sp设置为0xFF00。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>go<span class="token operator">:</span>	mov	<span class="token operator">%</span>cs<span class="token punctuation">,</span> <span class="token operator">%</span>ax		#将ds，es，ss都设置成移动后代码所在的段处<span class="token punctuation">(</span><span class="token number">0x9000</span><span class="token punctuation">)</span>
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ds
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>ss
	mov	$<span class="token number">0xFF00</span><span class="token punctuation">,</span> <span class="token operator">%</span>sp		# arbitrary value <span class="token operator">&gt;&gt;</span><span class="token number">512</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来这一部分用于加载setup.s的代码到0x9000:0200处。</p><p>这里利用了BIOS的0x13号中断。</p><p>下面是关于BIOS INT 0x13在使用时的说明:</p><p>ah = 0x02 读磁盘到内存 al = 4 读4个扇区 ch: 柱面号的低8位， cl: 0-5位代表开始扇区， 6-7位 代表磁道号的高2位代表柱面的高2位。 dh 磁头号 dl 驱动器号。</p><p>如果读取成功则执行ok_load_setup。 如果不成功，则对驱动器进行复位，再次读取。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>load_setup:
	mov	$0x0000, %dx		# drive 0, head 0
	mov	$0x0002, %cx		# sector 2, track 0
	mov	$0x0200, %bx		# address = 512, in INITSEG
	.equ    AX, 0x0200+SETUPLEN
	mov     $AX, %ax		# service 2, nr of sectors
	int	$0x13			# read it
	jnc	ok_load_setup		# ok - continue
	mov	$0x0000, %dx
	mov	$0x0000, %ax		# reset the diskette
	int	$0x13
	jmp	load_setup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面依旧是使用INT 0x13去获取一些磁盘驱动器的参数。</p><p>ah = 0x08 用于获取驱动器参数。 dl为驱动器号。</p><p>返回信息：</p><ul><li>如果出错则CF置为， ah=状态码</li><li>al = 0， al = 0</li><li>bl为驱动器的类型 AT/PS2</li><li>ch 最大柱面号的低8位</li><li>cl 0-5为每磁道最大扇区数， 6-7代表柱面号高2位</li><li>dh最大磁头数</li><li>dl驱动器数量</li><li>es:di 软驱磁盘参数表</li><li></li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ok_load_setup:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，要继续读system模块到内存中。</p><p>ax = 0x1000, es = 0x1000</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	mov	$SYSSEG<span class="token punctuation">,</span> <span class="token operator">%</span>ax
	mov	<span class="token operator">%</span>ax<span class="token punctuation">,</span> <span class="token operator">%</span>es		# segment of <span class="token number">0x010000</span>
	call	read_it
	call	kill_motor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>read_it实际上就是将system模块存放在0x1000:0x0000处。</p><p>程序的最后，通过ljmp跳转到setup位置执行setup.s中的代码。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	ljmp	$SETUPSEG, $0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,43),r={href:"https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const n=p("ExternalLinkIcon");return e(),t("div",null,[d,s("p",null,[s("a",r,[i("https://github.com/Wangzhike/HIT-Linux-0.11/blob/master/1-boot/OS-booting.md"),l(n)])])])}const b=a(c,[["render",u],["__file","Linux-0.11-boot-bootsect.html.vue"]]);export{b as default};
