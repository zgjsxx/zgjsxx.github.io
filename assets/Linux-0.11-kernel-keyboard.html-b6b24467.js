import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},o=t(`<ul><li><a href="#linux-011-kernel%E7%9B%AE%E5%BD%95keyboards%E8%AF%A6%E8%A7%A3">Linux-0.11 kernel目录keyboard.S详解</a><ul><li><a href="#%E6%A8%A1%E5%9D%97%E7%AE%80%E4%BB%8B">模块简介</a></li><li><a href="#%E6%96%B9%E6%B3%95%E8%AF%A6%E8%A7%A3">方法详解</a><ul><li><a href="#keyboard_interrupt">keyboard_interrupt:</a></li><li><a href="#do_self">do_self</a></li></ul></li></ul></li></ul><h1 id="linux-0-11-kernel目录keyboard-s详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-kernel目录keyboard-s详解" aria-hidden="true">#</a> Linux-0.11 kernel目录keyboard.S详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><p>该键盘驱动汇编程序主要包括键盘中断处理程序。</p><p>该程序首先根据键盘特殊键(例如Alt，Shift, Ctrl, Caps键)的状态设置程序后面要用到的状态标志变量mode的值。然后根据引起键盘中断的按键扫描码，调用已经编排成跳转表的相应扫描码处理子程序，把扫描码对应的字符放入读字符队列(<code>read_q</code>)中。接下来调用c处理函数<code>do_tty_interrupt</code>,该函数仅包含一个对行规程函数<code>copy_to_cooked</code>的调用。</p><p>这个行规程函数的主要作用就是把<code>read_q</code>读缓冲队列中的字符经过适当处理后放入规范模式队列(<code>secondary</code>)，并且在处理过程中，若相应终端设备设置了回显标志，还会把字符直接放入写队列<code>write_q</code>中，从而终端屏幕上会显示出刚刚键入的字符。</p><p>程序中使用mode表示特殊键的按下状态标志：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mode:	.byte 0		/* caps, alt, ctrl and shift mode */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><thead><tr><th>比特位</th><th>含义</th></tr></thead><tbody><tr><td>7</td><td>caps键被按下</td></tr><tr><td>6</td><td>caps键的状态</td></tr><tr><td>5</td><td>右alt键按下</td></tr><tr><td>4</td><td>左alt键按下</td></tr><tr><td>3</td><td>右ctrl按下</td></tr><tr><td>2</td><td>左ctrl按下</td></tr><tr><td>1</td><td>右shift键按下</td></tr><tr><td>0</td><td>左shift键按下</td></tr></tbody></table><p>使用<code>leds</code>来表示键盘指示灯的状态标志。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>leds:	.byte 2		/* num-lock, caps, scroll-lock mode (nom-lock on) */
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><table><thead><tr><th>比特位</th><th>含义</th></tr></thead><tbody><tr><td>2</td><td>caps-lock</td></tr><tr><td>1</td><td>num-lock 初始置1</td></tr><tr><td>0</td><td>scroll-lock</td></tr></tbody></table><h2 id="方法详解" tabindex="-1"><a class="header-anchor" href="#方法详解" aria-hidden="true">#</a> 方法详解</h2><h3 id="keyboard-interrupt" tabindex="-1"><a class="header-anchor" href="#keyboard-interrupt" aria-hidden="true">#</a> keyboard_interrupt:</h3><p>当键盘控制器接收到用户的一个按键操作时，就会向中断控制器发出一个键盘中断请求信号IRQ1。当CPU响应该请求时就会执行键盘中断处理程序。</p><p>该程序首先会从<code>0x60</code>端口读取当前按键的扫描码，判断是否是<code>0xe0</code>或者<code>0xe1</code>。如果是，则立即对键盘控制器做出应答，并向中断控制器发送终端结束EOI信号，以允许键盘控制器能继续产生中断信号。</p><p>程序的开始和其他中断处理函数类似，是一段保存寄存器上下文的操作。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	pushl %eax
	pushl %ebx
	pushl %ecx
	pushl %edx
	push %ds
	push %es
	movl $0x10,%eax
	mov %ax,%ds
	mov %ax,%es
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来将键盘扫描码读取到<code>al</code>中，判断其是否是<code>0xe0</code>还是<code>0xe1</code>。</p><p>如果扫描码是<code> 0xe0</code> 或者 <code>0xe1</code>，那说明这个键的扫描码是有多个字节的，需要先保存下来等待接下来的扫描码组合成完整的扫描码。</p><p>若是<code>0xe0</code>，则跳转到<code>set_e0</code>处执行,若是<code>0xe1</code>，则跳转到<code>set_e1</code>处执行。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	xor %al,%al		/* %eax is scan code */
	inb $0x60,%al
	cmpb $0xe0,%al
	je set_e0
	cmpb $0xe1,%al
	je set_e1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，如果是<code>0xe0</code>，则设置<code>e0 = 0</code>，如果是<code>0xe1</code>，则设置<code>e0 = 1</code>。</p><p><code>e0_e1</code>处的代码针对使用8255A的PC标准键盘电路进行硬件复位处理。端口0x61是8255A输出口B的地址，该输出端口的第7为用于禁止和允许对键盘数据的处理。处理扫描码的过程很简单，就是先禁止键盘，然后立即重新允许键盘。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>e0_e1:	inb $0x61,%al
	jmp 1f
1:	jmp 1f
1:	orb $0x80,%al
	jmp 1f
1:	jmp 1f
1:	outb %al,$0x61
	jmp 1f
1:	jmp 1f
1:	andb $0x7F,%al
	outb %al,$0x61
	movb $0x20,%al
	outb %al,$0x20
	pushl $0
	call do_tty_interrupt
	addl $4,%esp
	pop %es
	pop %ds
	popl %edx
	popl %ecx
	popl %ebx
	popl %eax
	iret
set_e0:	movb $1,e0
	jmp e0_e1
set_e1:	movb $2,e0
	jmp e0_e1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果收到的不是扫描码，则调用响应按键的处理程序。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>	je set_e1
	call key_table(,%eax,4)
	movb $0,e0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>key_table</code>的定义如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>key_table<span class="token operator">:</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 00-03 s0 esc 1 2 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 04-07 3 4 5 6 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 08-0B 7 8 9 0 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 0C-0F + &#39; bs tab */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 10-13 q w e r */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 14-17 t y u i */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 18-1B o p } ^ */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>ctrl<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 1C-1F enter ctrl a s */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 20-23 d f g h */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 24-27 j k l | */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>lshift<span class="token punctuation">,</span>do_self	<span class="token comment">/* 28-2B { para lshift , */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 2C-2F z x c v */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>do_self	<span class="token comment">/* 30-33 b n m , */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> do_self<span class="token punctuation">,</span>minus<span class="token punctuation">,</span>rshift<span class="token punctuation">,</span>do_self	<span class="token comment">/* 34-37 . - rshift * */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> alt<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>caps<span class="token punctuation">,</span>func		<span class="token comment">/* 38-3B alt sp caps f1 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> func<span class="token punctuation">,</span>func<span class="token punctuation">,</span>func<span class="token punctuation">,</span>func		<span class="token comment">/* 3C-3F f2 f3 f4 f5 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> func<span class="token punctuation">,</span>func<span class="token punctuation">,</span>func<span class="token punctuation">,</span>func		<span class="token comment">/* 40-43 f6 f7 f8 f9 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> func<span class="token punctuation">,</span>num<span class="token punctuation">,</span>scroll<span class="token punctuation">,</span>cursor		<span class="token comment">/* 44-47 f10 num scr home */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> cursor<span class="token punctuation">,</span>cursor<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>cursor	<span class="token comment">/* 48-4B up pgup - left */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> cursor<span class="token punctuation">,</span>cursor<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>cursor	<span class="token comment">/* 4C-4F n5 right + end */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> cursor<span class="token punctuation">,</span>cursor<span class="token punctuation">,</span>cursor<span class="token punctuation">,</span>cursor	<span class="token comment">/* 50-53 dn pgdn ins del */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>do_self<span class="token punctuation">,</span>func		<span class="token comment">/* 54-57 sysreq ? &lt; f11 */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> func<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 58-5B f12 ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 5C-5F ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 60-63 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 64-67 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 68-6B ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 6C-6F ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 70-73 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 74-77 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 78-7B ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 7C-7F ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 80-83 ? br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 84-87 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 88-8B br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 8C-8F br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 90-93 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 94-97 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 98-9B br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>unctrl<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* 9C-9F br unctrl br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* A0-A3 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* A4-A7 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>unlshift<span class="token punctuation">,</span>none		<span class="token comment">/* A8-AB br br unlshift br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* AC-AF br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* B0-B3 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>unrshift<span class="token punctuation">,</span>none		<span class="token comment">/* B4-B7 br br unrshift br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> unalt<span class="token punctuation">,</span>none<span class="token punctuation">,</span>uncaps<span class="token punctuation">,</span>none		<span class="token comment">/* B8-BB unalt br uncaps br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* BC-BF br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* C0-C3 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* C4-C7 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* C8-CB br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* CC-CF br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* D0-D3 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* D4-D7 br br br br */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* D8-DB br ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* DC-DF ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* E0-E3 e0 e1 ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* E4-E7 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* E8-EB ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* EC-EF ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* F0-F3 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* F4-F7 ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* F8-FB ? ? ? ? */</span>
	<span class="token punctuation">.</span><span class="token keyword">long</span> none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none<span class="token punctuation">,</span>none		<span class="token comment">/* FC-FF ? ? ? ? */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="do-self" tabindex="-1"><a class="header-anchor" href="#do-self" aria-hidden="true">#</a> do_self</h3><p><code>do_self</code>用于处理普通按键，即含义没有任何变化并且只有一个字符返回的键。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>do_self:
	lea alt_map,%ebx
	testb $0x20,mode		// 是否右边的alt被按下了
	jne 1f
	lea shift_map,%ebx     
	testb $0x03,mode        // 是否shift键同时按下了
	jne 1f
	lea key_map,%ebx
1:	movb (%ebx,%eax),%al
	orb %al,%al
	je none
	testb $0x4c,mode		/* ctrl or caps */
	je 2f
	cmpb $&#39;a,%al
	jb 2f
	cmpb $&#39;},%al
	ja 2f
	subb $32,%al
2:	testb $0x0c,mode		/* ctrl */
	je 3f
	cmpb $64,%al
	jb 3f
	cmpb $64+32,%al
	jae 3f
	subb $64,%al
3:	testb $0x10,mode		/* left alt */
	je 4f
	orb $0x80,%al
4:	andl $0xff,%eax
	xorl %ebx,%ebx
	call put_queue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),p=[o];function c(l,i){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","Linux-0.11-kernel-keyboard.html.vue"]]);export{d as default};
