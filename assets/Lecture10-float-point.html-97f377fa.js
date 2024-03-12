import{_ as i,V as t,W as d,X as s,Y as n,$ as l,a0 as a,F as c}from"./framework-9a29aaa0.js";const r={},p=a('<h1 id="第十讲-浮点数" tabindex="-1"><a class="header-anchor" href="#第十讲-浮点数" aria-hidden="true">#</a> 第十讲：浮点数</h1><p>由于历史原因，x86-64 有两个独立的浮点系统，它们之间的功能有一些重叠，但也有一些不同的功能。这两个系统是：</p><ul><li>旧的 x87 协处理器指令集</li><li>较新的 XMM 矢量处理指令</li></ul><p>无论哪种方式，浮点运算都使用一组完全不同的寄存器以及一组完全不同的操作。浮点值以二进制表示，其方式与有符号或无符号值完全不同。</p><h2 id="浮点数的表示方法" tabindex="-1"><a class="header-anchor" href="#浮点数的表示方法" aria-hidden="true">#</a> 浮点数的表示方法</h2><p>我们可以使用三种浮点大小/表示形式，分别是 <code>float</code>（32 位）、<code>double</code>（64 位）和 <code>long double</code>（80 位，存储为 128 位，有 48 个未使用的填充位）。表示形式相似，唯一的区别是专用于数字每个部分的位数。实际的浮点格式（哪位执行什么操作）由名为 IEEE-754 的国际标准定义。</p><p>IEEE-754 浮点格式将小数值表示为三个字段的组合：</p><ul><li>符号位 s，如果值为负则设置</li><li>指数 s，表示为（有偏差的）有符号二进制值。该值存储为实际指数加上固定偏差值 b。对于 32 位浮点值，偏差为 127。这意味着指数 0 在内部存储为 01111111b，-1 为 01111110b，1 为 10000000b，依此类推。</li><li>小数部分称为尾数 m，通常在 [1,2) 范围内（即 ≥ 1 但 &lt; 2）。在标准化浮点值中，小数部分向左移动，因此第一个设置位被移出，因为该值的左侧几乎总是有一个隐式 1 位。（移动尾数需要增加/减少指数以保持相同的值。）</li></ul><p>0 作为特殊情况处理。</p><p>使用这些字段的浮点数的值为</p>',10),m=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("mo",null,"−"),s("mn",null,"1"),s("mi",null,"s"),s("mo",{stretchy:"false"},")"),s("mo",{stretchy:"false"},"("),s("mn",null,"1"),s("mo",null,"+"),s("mi",null,"m"),s("mo",{stretchy:"false"},")"),s("msup",null,[s("mn",null,"2"),s("mrow",null,[s("mi",null,"e"),s("mo",null,"−"),s("mi",null,"b")])])]),s("annotation",{encoding:"application/x-tex"}," (-1s)(1 + m){2}^{e-b} ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"−"),s("span",{class:"mord"},"1"),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mclose"},")"),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.1491em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mclose"},")"),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8991em"}},[s("span",{style:{top:"-3.113em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mbin mtight"},"−"),s("span",{class:"mord mathnormal mtight"},"b")])])])])])])])])])])])])],-1),o=a(`<p>例如，浮点数 0.75 在二进制中是</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0.110000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),u=s("p",null,[n("指数为 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msup",null,[s("mn",null,"2"),s("mn",null,"0")])]),s("annotation",{encoding:"application/x-tex"},"{2}^{0}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8141em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8141em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"0")])])])])])])])])])])]),n("。然而，IEEE-754 要求我们将尾数向左移动，直到周期左侧的位被设置：")],-1),v=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1.10000000</span> <span class="token punctuation">(</span>mantissa, <span class="token operator">=</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要恢复其十进制值：</p><ul><li>找到尾数的十进制值 (0.5) 并加上 1.0。 （= 1.5）。</li><li>将尾数的十进制值乘以 2 指数</li><li>如果符号位为 1，则将十进制值乘以 -1。</li></ul><h2 id="二进制的表示" tabindex="-1"><a class="header-anchor" href="#二进制的表示" aria-hidden="true">#</a> 二进制的表示</h2><p>32位的浮点数的格式如下所示, 有1位是符号位， 有8位是指数位，有23位是尾数。</p><table class="tablestyle"><tr><th colspan="1" class="thstyle">s</th><th colspan="8" class="thstyle">exponent</th><th colspan="23" class="thstyle">mantissa</th></tr><tr><th class="thstyle">31</th><th class="thstyle">30</th><th class="thstyle">29</th><th class="thstyle">28</th><th class="thstyle">27</th><th class="thstyle">26</th><th class="thstyle">25</th><th class="thstyle">24</th><th class="thstyle">23</th><th class="thstyle">22</th><th class="thstyle">21</th><th class="thstyle">20</th><th class="thstyle">19</th><th class="thstyle">18</th><th class="thstyle">17</th><th class="thstyle">16</th><th class="thstyle">15</th><th class="thstyle">14</th><th class="thstyle">13</th><th class="thstyle">12</th><th class="thstyle">11</th><th class="thstyle">10</th><th class="thstyle">9</th><th class="thstyle">8</th><th class="thstyle">7</th><th class="thstyle">6</th><th class="thstyle">5</th><th class="thstyle">4</th><th class="thstyle">3</th><th class="thstyle">2</th><th class="thstyle">1</th><th class="thstyle">0</th></tr></table><p>指数位是进行了+127的偏移， 因此 指数 0 将存储为 <code>127 (= 01111111b)</code>。这使得指数的范围是-127 到 + 128。</p><p>请注意，符号位位于高位，这意味着我们可以相对轻松地执行一些浮点操作。例如，要将浮点值转换为其绝对值（符号 = 0），只需将其与 0111…11 进行按位与即可。类似地，要确定浮点值是否为负，只需执行加载符号标志的操作。(例如，<code>tst rax、rax</code>）</p><h2 id="尾数" tabindex="-1"><a class="header-anchor" href="#尾数" aria-hidden="true">#</a> 尾数</h2><p>尾数以二进制小数形式存储；最左端有一个隐含的 1 和小数点。因此:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>10000000000000000000000b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上以十进制表示:</p>`,12),b=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mn",null,"1"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mn",null,"0")]),s("mo",null,"+"),s("mn",null,"1"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mrow",null,[s("mo",null,"−"),s("mn",null,"1")])]),s("mo",null,"+"),s("mn",null,"0"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mrow",null,[s("mo",null,"−"),s("mn",null,"2")])]),s("mo",null,"+"),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mo",null,"="),s("mn",null,"1.5")]),s("annotation",{encoding:"application/x-tex"}," 1 × {2}_{0} + 1 × {2}_{-1} + 0 × {2}_{-2} + ... = 1.5 ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7944em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"0")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8528em","vertical-align":"-0.2083em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"−"),s("span",{class:"mord mtight"},"1")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2083em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"0"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8528em","vertical-align":"-0.2083em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"−"),s("span",{class:"mord mtight"},"2")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2083em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.3669em"}}),s("span",{class:"mord"},"..."),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1.5")])])])])],-1),h=a(`<p><code>1.</code> 不与值一起存储，它是隐式的。</p><p>就像以二进制存储整数值时一样，我们将位乘以 2 的递增幂，然后将它们相加，这里我们将位乘以 2 的负幂和递减幂，然后将它们相加。</p><h2 id="指数" tabindex="-1"><a class="header-anchor" href="#指数" aria-hidden="true">#</a> 指数</h2><p>指数有效地允许我们将尾数中的位向左或向右“移动”，同时将（隐式）小数点保持在同一位置。例如，要表示值 1.0，我们将使用尾数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0</span>.1000000000000000000000b <span class="token operator">=</span> <span class="token number">0.5</span> <span class="token punctuation">(</span><span class="token number">1.5</span> really<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但其指数为 10000000b = 1（无偏），</p><p><code>1.5 * 21 = 3.0</code> 或 <code>11.0000...b．</code></p><h2 id="_64位的表示方法" tabindex="-1"><a class="header-anchor" href="#_64位的表示方法" aria-hidden="true">#</a> 64位的表示方法</h2><p>64 位和 80 位表示使用相同的基本原理，只是指数和尾数字段的大小不同：</p><table><thead><tr><th>Size</th><th>C/C++ type</th><th>Exponent size</th><th>Mantissa size</th></tr></thead><tbody><tr><td>32-bit</td><td>float</td><td>8 bits</td><td>23 bits</td></tr><tr><td>64-bit</td><td>double</td><td>11 bits</td><td>52bits</td></tr></tbody></table><p>80 位 <code>long double</code>表示略有不同：它使用15位指数，63位尾数，并且m的最高位中的隐含1实际上被存储，作为指数和尾数之间的位。该位称为整数位，它允许 0 具有更自然的表示形式，即全 0 的尾数（在 IEEE-754 格式中，表示尾数 1.0）。</p><p>IEEE-754 标准也定义了 128 位和 256 位浮点表示形式，但我们不用关心它们。</p><h2 id="x87浮点数指令" tabindex="-1"><a class="header-anchor" href="#x87浮点数指令" aria-hidden="true">#</a> x87浮点数指令</h2><p>以 f 开头的浮点指令是较旧的 x87 浮点指令集的一部分。它们使用一组单独的浮点寄存器 ST(0) 到 ST(7)，它们被视为栈。这些指令中的大多数不带操作数，并且隐式地对该堆栈的顶部元素进行操作。在YASM中，FP寄存器写为<code>st0、st1</code>等。</p><p>这种奇怪组织的原因是，最初所有浮点运算都是由物理上独立的协处理器 CPU 处理的。协处理器是一个独立的芯片，连接到总线，因此它能够“监听”。浮点指令由 CPU 分派到协处理器。(协处理器是可选的；尝试在没有它的情况下使用 FP 代码会触发异常)。因此，ST(x) 寄存器并不“驻留在”主 CPU 上，而是驻留在协处理器上，因此，为了更快，浮点计算必须尽可能地驻留在协处理器上。</p><p>如今，FP 寄存器栈与其他所有内容都位于同一 CPU 上，但为了与旧代码兼容，它仍然被视为单独的。使用 x87 指令的一个缺点是函数的浮点参数在 xmm 寄存器中传递，因此需要一些工作才能将它们放入 x87 子系统使用的 ST 寄存器中。然而，有些操作仅受 x87 子系统支持，因此可能值得付出努力。</p><p>所有 x87 浮点指令均以 f 开头，并且它们与使用 xmm 的指令之间存在一些重叠。如果两者都支持您想要的操作，那么您可以选择使用哪一个；如今两者都得到了同样的优化。由于 xmm 寄存器用于参数/返回值，因此可能需要一些额外的工作才能将值移入或移出 FP 寄存器堆栈。</p><p>在内部，x87 子系统将每个值存储为 80 位精度。当以浮点数或双精度数形式移入或移出内存时，值会向上/向下转换。这意味着我们“免费”获得额外的精度。 （一般来说这是正确的：高精度和低精度浮点运算花费相同的时间，因此我们唯一关心的是空间使用情况。）</p><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3><p><code>emms</code> 用于通过重置其状态来初始化浮点协处理器。调用约定要求处理器在进入任何函数时处于 XMM 模式，因此为了安全起见，我们将始终在使用 x87 系统的任何函数的开头调用 <code>emms</code>。</p><h3 id="浮点寄存器栈" tabindex="-1"><a class="header-anchor" href="#浮点寄存器栈" aria-hidden="true">#</a> 浮点寄存器栈</h3><p>x87系统有 8 个独立的、可寻址的 80 位数据寄存器 <code>R0</code>~<code>R7</code>，这些寄存器合称为浮点寄存器栈。</p><p>我们使用<code>st0</code> ~ <code>st7</code>去使用浮点寄存器栈。<code>st</code>后方的数字代表的是到栈顶的距离，<code>st0</code>代表的是栈顶。大多数 x87 指令隐式使用 <code>st0</code> 作为其操作的目标（例如，<code>fsub</code> 将其结果写入 <code>st0</code>。）所有 ST 寄存器均由调用者保存(caller-preserved)。 x87 浮点代码基本上可以归结为管理这些寄存器。</p><p>浮点栈也有类似的<code>push</code>和<code>pop</code>操作：</p><p>浮点栈的pop操作会执行下面的两步：</p><ul><li><p>翻转所有的浮点寄存器。 让<code>st0</code>指向<code>st1</code>，让<code>st1</code>指向<code>st2</code>， 以此类推。</p></li><li><p>将<code>st0</code>标记为空闲。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture10/pop.png" alt="pop" tabindex="0" loading="lazy"><figcaption>pop</figcaption></figure></li></ul><p>浮点栈的push操作会执行下面的两步：</p><ul><li><p>反向翻转所有的浮点寄存器。</p></li><li><p>将<code>st0</code>标记为使用中。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture10/push.png" alt="push" tabindex="0" loading="lazy"><figcaption>push</figcaption></figure></li></ul><p>上述过程，相对比较抽象，我们通过一个实际的例子来感受一下浮点寄存器栈<code>push</code>和<code>pop</code>的过程。</p><p>这里会使用<code>fld</code>指令和<code>fstp</code>指令， 可以将其暂时理解为<code>push</code>和<code>pop</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

v1: dd 1.0
v2: dd 2.0

section .text
global _start
_start:
  fld dword [v1]
  fld dword [v2]

  fstp    dword [v1]
  fstp    dword [v2]

  mov     rax,    60              ; Syscall code in rax
  mov     rdi,    0               ; First parameter in rdi
  syscall                         ; End process

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yasm <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-f</span> elf64 hello.s <span class="token parameter variable">-l</span> hello.lst
ld <span class="token parameter variable">-g</span> <span class="token parameter variable">-o</span> hello hello.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用gdb进行调试， 使用<code>info float</code>显示寄存器栈的使用情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost lecture10<span class="token punctuation">]</span><span class="token comment"># gdb hello -q</span>
Reading symbols from hello<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> list
<span class="token number">1</span>       section .data
<span class="token number">2</span>
<span class="token number">3</span>       v1: <span class="token function">dd</span> <span class="token number">1.0</span>
<span class="token number">4</span>       v2: <span class="token function">dd</span> <span class="token number">2.0</span>
<span class="token number">5</span>
<span class="token number">6</span>       section .text
<span class="token number">7</span>       global _start
<span class="token number">8</span>       _start:
<span class="token number">9</span>         fld dword <span class="token punctuation">[</span>v1<span class="token punctuation">]</span>
<span class="token number">10</span>        fld dword <span class="token punctuation">[</span>v2<span class="token punctuation">]</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span>
<span class="token number">11</span>
<span class="token number">12</span>        fstp    dword <span class="token punctuation">[</span>v1<span class="token punctuation">]</span>
<span class="token number">13</span>        fstp    dword <span class="token punctuation">[</span>v2<span class="token punctuation">]</span>
<span class="token number">14</span>
<span class="token number">15</span>        mov     rax,    <span class="token number">60</span>              <span class="token punctuation">;</span> Syscall code <span class="token keyword">in</span> rax
<span class="token number">16</span>        mov     rdi,    <span class="token number">0</span>               <span class="token punctuation">;</span> First parameter <span class="token keyword">in</span> rdi
<span class="token number">17</span>        syscall                         <span class="token punctuation">;</span> End process
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span>
Line number <span class="token number">18</span> out of range<span class="token punctuation">;</span> hello.s has <span class="token number">17</span> lines.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> b <span class="token number">9</span>
Breakpoint <span class="token number">1</span> at 0x401000: <span class="token function">file</span> hello.s, line <span class="token number">9</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> r
Starting program: /home/work/assembly/lecture10/hello

Breakpoint <span class="token number">1</span>, _start <span class="token punctuation">(</span><span class="token punctuation">)</span> at hello.s:9
<span class="token number">9</span>         fld dword <span class="token punctuation">[</span>v1<span class="token punctuation">]</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info float
  R7: Empty   0x00000000000000000000
  R6: Empty   0x00000000000000000000
  R5: Empty   0x00000000000000000000
  R4: Empty   0x00000000000000000000
  R3: Empty   0x00000000000000000000
  R2: Empty   0x00000000000000000000
  R1: Empty   0x00000000000000000000
<span class="token operator">=</span><span class="token operator">&gt;</span>R0: Empty   0x00000000000000000000

Status Word:         0x0000
                       TOP: <span class="token number">0</span>
Control Word:        0x037f   IM DM ZM OM UM PM
                       PC: Extended Precision <span class="token punctuation">(</span><span class="token number">64</span>-bits<span class="token punctuation">)</span>
                       RC: Round to nearest
Tag Word:            0xffff
Instruction Pointer: 0x00:0x00000000
Operand Pointer:     0x00:0x00000000
Opcode:              0x0000
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> si
<span class="token number">10</span>        fld dword <span class="token punctuation">[</span>v2<span class="token punctuation">]</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info float
<span class="token operator">=</span><span class="token operator">&gt;</span>R7: Valid   0x3fff8000000000000000 +1
  R6: Empty   0x00000000000000000000
  R5: Empty   0x00000000000000000000
  R4: Empty   0x00000000000000000000
  R3: Empty   0x00000000000000000000
  R2: Empty   0x00000000000000000000
  R1: Empty   0x00000000000000000000
  R0: Empty   0x00000000000000000000

Status Word:         0x3800
                       TOP: <span class="token number">7</span>
Control Word:        0x037f   IM DM ZM OM UM PM
                       PC: Extended Precision <span class="token punctuation">(</span><span class="token number">64</span>-bits<span class="token punctuation">)</span>
                       RC: Round to nearest
Tag Word:            0x3fff
Instruction Pointer: 0x00:0x00401002
Operand Pointer:     0x00:0x00000000
Opcode:              0x0000
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> si
<span class="token number">12</span>        fstp    dword <span class="token punctuation">[</span>v1<span class="token punctuation">]</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info float
  R7: Valid   0x3fff8000000000000000 +1
<span class="token operator">=</span><span class="token operator">&gt;</span>R6: Valid   0x40008000000000000000 +2
  R5: Empty   0x00000000000000000000
  R4: Empty   0x00000000000000000000
  R3: Empty   0x00000000000000000000
  R2: Empty   0x00000000000000000000
  R1: Empty   0x00000000000000000000
  R0: Empty   0x00000000000000000000

Status Word:         0x3000
                       TOP: <span class="token number">6</span>
Control Word:        0x037f   IM DM ZM OM UM PM
                       PC: Extended Precision <span class="token punctuation">(</span><span class="token number">64</span>-bits<span class="token punctuation">)</span>
                       RC: Round to nearest
Tag Word:            0x0fff
Instruction Pointer: 0x00:0x00401007
Operand Pointer:     0x00:0x00000000
Opcode:              0x0000
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> si
<span class="token number">13</span>        fstp    dword <span class="token punctuation">[</span>v2<span class="token punctuation">]</span>
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info float
<span class="token operator">=</span><span class="token operator">&gt;</span>R7: Valid   0x3fff8000000000000000 +1
  R6: Empty   0x40008000000000000000
  R5: Empty   0x00000000000000000000
  R4: Empty   0x00000000000000000000
  R3: Empty   0x00000000000000000000
  R2: Empty   0x00000000000000000000
  R1: Empty   0x00000000000000000000
  R0: Empty   0x00000000000000000000

Status Word:         0x3800
                       TOP: <span class="token number">7</span>
Control Word:        0x037f   IM DM ZM OM UM PM
                       PC: Extended Precision <span class="token punctuation">(</span><span class="token number">64</span>-bits<span class="token punctuation">)</span>
                       RC: Round to nearest
Tag Word:            0x3fff
Instruction Pointer: 0x00:0x0040100e
Operand Pointer:     0x00:0x00000000
Opcode:              0x0000
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> si
<span class="token number">15</span>        mov     rax,    <span class="token number">60</span>              <span class="token punctuation">;</span> Syscall code <span class="token keyword">in</span> rax
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info float
  R7: Empty   0x3fff8000000000000000
  R6: Empty   0x40008000000000000000
  R5: Empty   0x00000000000000000000
  R4: Empty   0x00000000000000000000
  R3: Empty   0x00000000000000000000
  R2: Empty   0x00000000000000000000
  R1: Empty   0x00000000000000000000
<span class="token operator">=</span><span class="token operator">&gt;</span>R0: Empty   0x00000000000000000000

Status Word:         0x0000
                       TOP: <span class="token number">0</span>
Control Word:        0x037f   IM DM ZM OM UM PM
                       PC: Extended Precision <span class="token punctuation">(</span><span class="token number">64</span>-bits<span class="token punctuation">)</span>
                       RC: Round to nearest
Tag Word:            0xffff
Instruction Pointer: 0x00:0x00401015
Operand Pointer:     0x00:0x00000000
Opcode:              0x0000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>info float</code>命令非常形象的显示了压栈和出栈操作的过程。</p><h3 id="加载" tabindex="-1"><a class="header-anchor" href="#加载" aria-hidden="true">#</a> 加载</h3><p>在 x87 术语中，将值压入栈称为加载(loading)。从内存加载浮点数到浮点栈中有下面这些方法：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fld  dword [addr]   ; Push float from memory
fld  qword [addr]   ; Push double from memory
fld  st1            ; Push st1 to st0

fild dword [addr]   ; Push signed dword integer from memory
fild qword [addr]   ; Push signed qword integer from memory

fld1        ; Push +1.0
fldz        ; Push +0.0
fldpi       ; Push π 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，所有这些压栈操作不仅将 <code>st0</code> 设置为期望的值，还将旧的 <code>st0</code> 及其下面的所有内容向下移动。</p>`,40),g={href:"https://www.felixcloutier.com/x86/fld1:fldl2t:fldl2e:fldpi:fldlg2:fldln2:fldz",target:"_blank",rel:"noopener noreferrer"},x=a(`<p>没有加载浮点立即数的指令。要加载浮点常量，除了专用指令之外的浮点常量，您必须将其存储在内存中（通常在 <code>.data</code> 或 <code>.rodata</code> 中），然后从那里加载它。一些简单的常量可以从 <code>fld1</code> 和 <code>fldz</code> 指令支持的 1,0 中合成出来。</p><p>许多指令都有 -p 形式，它也会在执行操作后弹出栈。例如:</p><p><code>fst st3</code> 将 <code>ST(0)</code> 复制到 <code>ST(3)</code>，而 <code>fstp st3</code> 执行相同的操作，但随后执行pop操作。</p><p>为了更方便地操作堆栈较低的值，fxch 指令将另一个 st 寄存器中的值与 st0 交换。例如:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fxch st3    ; Swap st0 with st3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="写入memory" tabindex="-1"><a class="header-anchor" href="#写入memory" aria-hidden="true">#</a> 写入memory</h3><p>将 FP 栈的结果写回内存称为存储(store)。</p><p><code>fst</code>/<code>fstp</code>用于将浮点值从<code>st0</code>移动到栈中的其他位置，或从<code>st0</code>移动到内存中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fst  dword [addr]  ; Copy float st0 to [addr]
fst  st1           ; Copy st0 to st1
fstp st1           ; Copy st0 to st1 and then pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，对于存储到内存，需要大小限定符（dword 或 qword），以便汇编器知道是复制为 float 还是 double。</p><p>我们还可以通过四舍五入或截断来存储整数：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fist   dword [addr]     ; Write float ST(0) as integer to addr
fistp  dword [addr]     ; Write float ST(0) as integer and then pop
fisttp qword [addr]     ; Write double as trunc. integer and then pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（64 位存储只能在 -p popping 变体中完成。）</p><p>舍入使用当前舍入模式，而截断只是丢弃任何小数部分，有效地向 0 舍入。</p><h3 id="算术运算" tabindex="-1"><a class="header-anchor" href="#算术运算" aria-hidden="true">#</a> 算术运算</h3><p>大多数算术运算有几种形式：</p><ul><li>单个参数（<code>st</code> 寄存器或内存操作数），<code>st0</code> 作为隐式目标。例如:</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fmul st2       ; st0 = st0 * st2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>两个参数， 两者都是 ST 寄存器，其中之一是 st0。例如：</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fmul st2, st0  ; st2 = st2 * st0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>两个寄存器之一必须是 <code>st0</code>。您不能（例如）将 <code>st2</code> 乘以 <code>st3</code>。</p><p>没有三个参数的形式，因此不能直接执行 <code>st0 = st1 + st2</code>。</p><p>主要的算术运算有:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fadd      ; Addition
fsub      ; Subtraction
fmul      ; Multiplication
fdiv      ; Division
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有这些指令都有下面三种形式：</p><ul><li>op stx（st0 = st0 op stx，例如fadd st3, st0 = st0 + st3 ）、</li><li>op st0, stx（st0 = st0 op stx, 同上）</li><li>op stx, st0（stx = stx op st0， 例如fadd st3,st0 st3 = st3 + st0）</li></ul><p>除法和减法也有反向（<code>fsubr</code>，<code>fdivr</code>）形式可用，其计算的是<code>st0 = st(x) - st(0)</code>，而不是<code>st0 = st0 - st(x)）</code>。还有一些整数变体，它们将第二操作数读为内存的整数。</p><h3 id="浮点函数参数" tabindex="-1"><a class="header-anchor" href="#浮点函数参数" aria-hidden="true">#</a> 浮点函数参数</h3><p>因为 ABI 要求在 xmm 寄存器中传递普通浮点参数，所以需要一些工作才能将它们放入 FP 栈。我们必须将它们移动到内存中（通常是在堆栈上分配的本地空间），然后从那里加载到 FP 堆栈中。例如，在带有两个浮点参数的函数中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>func:
  ; xmm0 = argument 1
  ; xmm1 = argument 2

  push rbp
  mov rbp, rsp  

  movsd qword [rsp-8],  xmm0
  movsd qword [rsp-16], xmm1

  ; Switch to x87 mode
  emms

  fld qword [rsp-8]   ; Push xmm0 
  fld qword [rsp-16]  ; Push xmm1

  ; Now arg 1 is in st1, arg 2 is in st0

  ...

  add rsp, 16
  pop rbp
  ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，我们使用红色区域（rsp 上方的 128 个字节）来进行传输，以避免必须在栈上显式分配空间。这种&quot;临时内存&quot;的使用正是红色区域存在的原因。）</p><p>返回一个浮点值，当该值存在于 FP 堆栈中时，同样涉及到内存的往返，以便将其放入 xmm0 中。例如，返回 st0：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fstp    qword [rsp-8]   ; pop from st0 onto the top of the stack
movsd   xmm0, [rsp-8]   ; load top of stack into xmm0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里再次使用红色区域作为临时存储。</p><p>当从使用 x87 浮点的函数返回时，您需要释放（即标记为空）所有 FP 寄存器，通常通过执行</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fstp st0
fstp st1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="浮点数的比较" tabindex="-1"><a class="header-anchor" href="#浮点数的比较" aria-hidden="true">#</a> 浮点数的比较</h3><p><code>fcomi</code> 指令比较两个 FP 堆栈元素（其中第一个必须是 <code>st0</code>）并像无符号比较一样更新标志寄存器。x87 系统有自己的内部标志寄存器，原始 fcom 指令将更新该寄存器；然后将 x87 标志放入普通标志寄存器中， 然后就可以使用普通的条件跳转指令了。例如，将 <code>st0</code> 和 <code>st1</code> 中较大的一个复制到 <code>st0</code> 中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>  fcomi st0, st1   ; Compare st0, st1
  jge  .done       ; Jump to .done if st0 &gt;= st1
  fld  st1         ; Otherwise push st0 = st1

.done:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>fcmov__</code> 系列执行条件（浮点）移动，类似于 <code>cmov__</code> 系列。</p><p>例如，将 st0 和 st1 中较大的一个复制到 st1</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fcomi   st0, st1     ; Compare st0 with st1
fcmovl  st1          ; Set st0 = st1 if st0 &lt; st1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>讽刺的是，没有无条件 FP 移动指令可以执行相同的操作（将 st0 设置为另一个 st 寄存器的值）！我们能做的就是push.（XMM 浮点系统有一条指令可以查找两个值中的最大值。）</p><p><code>fcomip</code> 进行比较然后弹出。 <code>fucomi</code> 进行“无序”比较；当操作数之一为非数字时，无序比较的结果会有所不同：</p><p>操作数不是数字:</p><ul><li><p>在有序比较中，NaN 与其他数字之间的比较会导致浮点异常。</p></li><li><p>在无序比较中，NaN 与其他数字之间的比较始终给出真实结果。即，NaN 算作小于、大于、等于和不等于所有其他数字！</p></li></ul><p>通常我们更喜欢无序比较，因为它稍微快一些，并且意味着我们不必处理浮点异常。</p><p>要与常量 0.0 进行比较，请使用 <code>ftst</code>，它将 st0 与 0 进行比较。这样您就不必将常量 0 加载到其他寄存器之一进行比较。</p><h3 id="数学运算" tabindex="-1"><a class="header-anchor" href="#数学运算" aria-hidden="true">#</a> 数学运算</h3><p>x87 子系统具有许多常见数学函数的单指令。大部分这些功能在XMM 系统中是没有的，这也是去使用 x87 系统的原因之一。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>; Trig functions
fsin         ; st0 = sin(st0)
fcos         ; st0 = cos(st0)
fsincos      ; st0 = sin(st0), push cos(st0)
fptan        ; st0 = tan(st0), push 1.0
fpatan       ; st1 = atan(st1 / st0) and then pop

fsqrt        ; st0 = sqrt(st0)

fprem1       ; st0 = fmod(st0, st1) (fractional remainder)

fabs         ; st0 = |st0| (absolute value)

fyl2x        ; st1 = st1 × log₂(st0)
f2xm1        ; st0 = 2^st0 - 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用以 2 为底的对数/指数是因为考虑到浮点数使用的二进制格式，这些相对容易计算。可以通过使用熟悉的对数恒等式来使用其他底数。</p><h3 id="在-x87-和-xmm-模式之间切换" tabindex="-1"><a class="header-anchor" href="#在-x87-和-xmm-模式之间切换" aria-hidden="true">#</a> 在 x87 和 XMM 模式之间切换</h3><p>当使用x87系统时，我们必须发出<code>emms</code>指令来清除XMM状态。然而当使用 XMM 系统时，则不需要特定的初始化指令。</p><p><strong>浮点数的例子： 计算π</strong></p><p>这里我们将使用著名的 π 级数近似:</p>`,56),f=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",null,"="),s("mn",null,"4"),s("munder",null,[s("mo",null,"∑"),s("mrow",null,[s("mi",null,"i"),s("mo",null,"="),s("mn",null,"0")])]),s("mfrac",null,[s("mrow",null,[s("mo",null,"−"),s("msup",null,[s("mn",null,"1"),s("mi",null,"i")])]),s("mrow",null,[s("mn",null,"2"),s("mi",null,"i"),s("mo",null,"+"),s("mn",null,"1")])]),s("mo",null,"="),s("mn",null,"1"),s("mo",null,"−"),s("mfrac",null,[s("mn",null,"1"),s("mn",null,"3")]),s("mo",null,"+"),s("mfrac",null,[s("mn",null,"1"),s("mn",null,"5")]),s("mo",null,"−"),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},".")]),s("annotation",{encoding:"application/x-tex"}," =4\\sum _{i=0} {\\frac {-{1}^{i}} {2i+1}}=1-\\frac {1} {3}+\\frac {1} {5}-... ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.3669em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.7793em","vertical-align":"-1.2777em"}}),s("span",{class:"mord"},"4"),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mop op-limits"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.05em"}},[s("span",{style:{top:"-1.8723em","margin-left":"0em"}},[s("span",{class:"pstrut",style:{height:"3.05em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"i"),s("span",{class:"mrel mtight"},"="),s("span",{class:"mord mtight"},"0")])])]),s("span",{style:{top:"-3.05em"}},[s("span",{class:"pstrut",style:{height:"3.05em"}}),s("span",null,[s("span",{class:"mop op-symbol large-op"},"∑")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.2777em"}},[s("span")])])])]),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.5017em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"2"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},"1")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"−"),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"1")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8247em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])])])])])])])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7693em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"3")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"5")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.1056em"}}),s("span",{class:"mord"},"...")])])])])],-1),k=a(`<p>我们将继续这个系列，直到连续值之间的差异小于 0.000001（即 5 位精度），然后使用 C 标准库中的 <code>printf</code> 打印结果。</p><p>在本例中，我们将使用 x87 浮点系统，尽管因为 <code>printf</code> 期望其浮点参数位于 <code>xmm</code> 寄存器中，所以我们必须将正在计算的值从 x87 堆栈移动到内存中，然后从那里移动到<code>xmm0</code>。</p><p>在 C 语言中，我们要编写的函数如下所示:</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">double</span> <span class="token function">pi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">double</span> p <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>   <span class="token comment">// Current pi approximation</span>
    <span class="token keyword">double</span> pp <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>  <span class="token comment">// Previous pi approximation</span>
    <span class="token keyword">double</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>     <span class="token comment">// Sign: +1 or -1</span>
    <span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>     <span class="token comment">// Denominator: 1,3,5,...</span>

    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        pp <span class="token operator">=</span> p<span class="token punctuation">;</span>        
        p <span class="token operator">+=</span> s <span class="token operator">/</span> d<span class="token punctuation">;</span>
        s <span class="token operator">*=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        d <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>        
    <span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>p <span class="token operator">-</span> pp<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0.000001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">4</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，<code>p - pp == s / d</code>。</p><p>虽然可以通过一些技巧来编写此过程，使其完全在 x87 堆栈上运行，但为了获得最大速度，最简单的编写方法是将变量存储在堆栈上（在红色区域中），然后加载/根据需要存储它们。当然，我们必须将浮点常量 2 和 0.000001 保存在 <code>.data</code> 部分中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

ZERO:       dq      0.0
ONE:        dq      1.0
TWO:        dq      2.0
EPSILON:    dq      0.000001

section .text

pi:
    push    rbp
    mov     rbp, rsp

    ; In the red zone
    ; [rsp - 8]  = p = 0.0
    ; [rsp - 16] = s = 1
    ; [rsp - 24] = d = 1
    ; [rsp - 32] = s / d

    mov     rax, qword [ZERO]
    mov     qword [rsp - 8], rax

    mov     rax, qword [ONE]
    mov     qword [rsp - 16], rax
    mov     qword [rsp - 24], rax

.begin_loop:
    ; Update p += s / d
    fld     qword [rsp - 16]       ; = s
    fdiv    qword [rsp - 24]       ; = s / d
    fst     qword [rsp - 32]       ; Save s / d for later
    fadd    qword [rsp - 8]        ; = s / d + p
    fstp    qword [rsp - 8]        ; Write back 
    ffree   st0

    ; Update s = -s
    fld     qword [rsp - 16]        ; st0 = s
    fchs                            ; st0 = -st0
    fst     qword [rsp - 16]        ; Write back
    ffree st0

    ; Update d += 2
    fld     qword [TWO]
    fld     qword [rsp - 24]
    fadd    st0, st1                ; st0 += 2
    fstp    qword [rsp - 24]        ; Write back
    ffree   st0

    fld     qword [rsp - 32]
    fabs
    fld     qword [EPSILON]         ; st0 = 0.000001, st1 = |s / d|
    fucomi  st1                     ; Compare st0, st1
    ffree   st0                     ; Remove st0, st1 from the stack
    ffree   st1

    jb .begin_loop                  ; loop if 0.0000001 &gt; |s / d|

    ; Multiply result by 4
    fld qword [TWO]
    fld qword [rsp - 8]
    fmul st0, st1
    fmul st0, st1
    fstp qword [rsp - 8]
    ffree st0    

    ; Copy last p into xmm0
    movsd xmm0, qword [rsp - 8]

    pop rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于清除（<code>ffree</code>）堆栈元素的注意事项：确保 x87 堆栈上的元素不超过 8 个非常重要。如果你压入超过 8 个东西而不弹出，ST(8) 最终将回绕到 ST(0) 并且堆栈将被损坏。这通常会表现为值“神奇地”变成 NaN。例如，如果我们在循环结束时没有执行 ffree 指令，堆栈的大小将无限增长，直到最终覆盖自身。</p><h2 id="xmm-浮点指令" tabindex="-1"><a class="header-anchor" href="#xmm-浮点指令" aria-hidden="true">#</a> XMM 浮点指令</h2><p>CPU 上的现代浮点单元及其专用寄存器与向量 (SIMD) 单元（以及旧的 x87 单元）共享资源。事实上，大多数现代浮点实际上是矢量化浮点代码。正如我们将要做的那样，真正的代码很少一次只对一个值进行操作。</p><h3 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h3><p>有 16 个浮点寄存器，名为 <code>xmm0</code>到 <code>xmm15</code>。这些寄存器的大小实际上均为 128 位，但我们将仅使用 32 位或 64 位部分，这对应于我们正在使用的浮点大小。一般来说，后缀 s 用于表示单精度（float），而后缀 d 用于表示双精度（double）。</p><p><code>xmm0</code> 到 <code>xmm7</code> 用于传递浮点参数。 <code>xmm8-15</code> 是临时（调用者保存的）寄存器。</p><h3 id="移动浮点值" tabindex="-1"><a class="header-anchor" href="#移动浮点值" aria-hidden="true">#</a> 移动浮点值</h3><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movss dest, src         ; Move floats
movsd dest, src         ; Move doubles
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>两个专用的 <code>mov</code> 指令用于移动浮点值。像往常一样，两个操作数必须具有相同的大小，并且大小必须与指令匹配。目标和源可以是内存或（xmm）寄存器，但不能同时是内存。与普通的 <code>mov</code> 指令不同，源不能是立即数。要将常量浮点值加载到寄存器中，它必须已经存在于内存中。请注意，寄存器操作数必须是浮点寄存器。</p><h3 id="在-data-中存储浮点值" tabindex="-1"><a class="header-anchor" href="#在-data-中存储浮点值" aria-hidden="true">#</a> 在 <code>.data</code> 中存储浮点值</h3><p>使用<code>dd</code>（双字）存储32位浮点值，使用<code>dq</code>（四字）存储64位值。例如：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

pi:     dq      3.14159
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="浮点转换" tabindex="-1"><a class="header-anchor" href="#浮点转换" aria-hidden="true">#</a> 浮点转换</h3><p>存在用于在 32 位和 64 位格式之间进行转换以及将整数转换为浮点值的指令，反之亦然。</p><p>|指令|描述| |<code>cvtss2sd dest, src</code>|将 32 位浮点数转换为 64 位浮点数 src 可以是内存、浮点寄存器或通用寄存器| |<code>cvtsd2ss dest, src</code>|将 64 位浮点数转换为 32 位浮点数| |<code>cvtss2si dest, src</code>|将 32 位浮点数转换为 32 位有符号整数 dest 可以是浮点寄存器或通用寄存器| |<code>cvtsd2si dest, src </code>|将 64 位浮点数转换为 32 位整数| |<code>cvtsi2ss dest, src</code>|将 32 位有符号整数转换为 32 位浮点数| |<code>cvtsi2ss dest, src</code>|将 32 位有符号整数转换为 64 位浮点数|</p><h3 id="算术" tabindex="-1"><a class="header-anchor" href="#算术" aria-hidden="true">#</a> 算术</h3><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>addss dest, src         ; dest += src (float)
addsd dest, src         ; dest += src (double)
subss dest, src         ; dest -= src (float)
subsd dest, src         ; dest -= src (double)
mulss dest, src         ; dest *= src (float)
mulsd dest, src         ; dest *= src (double)
divss dest, src         ; dest /= src (float)
divsd dest, src         ; dest /= src (double)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有这些的三操作数版本都带有 <code>v</code> 前缀：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>vaddss dest, src1, src2  ; dest = src1 + src2
vaddsd dest, src1, src2  ; dest = src1 + src2
vsubss dest, src1, src2  ; dest = src1 + src2
vsubsd dest, src1, src2  ; dest = src1 + src2
vmulss dest, src1, src2  ; dest = src1 + src2
vmulsd dest, src1, src2  ; dest = src1 + src2
vdivss dest, src1, src2  ; dest = src1 + src2
vdivsd dest, src1, src2  ; dest = src1 + src2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dest</code>和<code>src</code>操作数必须是xmm寄存器； <code>src2</code> 可以是寄存器或内存。所有操作数的大小必须相同。</p><p>提供了许多更高级的数学运算作为说明：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>sqrtss dest, src</code><br> <code>sqrtsd dest, src</code></td><td><code>dest = sqrt(src)</code> 开根号</td></tr><tr><td><code>rcpss dest, src</code></td><td><code>dest = 1/src</code></td></tr><tr><td><code>rsqrtss dest, src</code></td><td><code>dest = 1/sqrt(src)</code></td></tr><tr><td><code>maxss dest, src</code><br> <code>maxsd dest, src</code></td><td>dest =maximum of dest, src</td></tr><tr><td><code>minss dest, src</code><br> <code>minsd dest, src</code></td><td>dest =minimum of dest, src</td></tr><tr><td><code>roundss dest, src, mode</code></td><td>Round src into dest using mode <br>mode = 0 ties go to even<br>mode = 1 round down<br>mode = 2 round up<br>mode = 3 round toward 0</td></tr></tbody></table><p>（但请注意，使用 x87 可用的三角函数此处不可用。）</p><h3 id="浮点比较" tabindex="-1"><a class="header-anchor" href="#浮点比较" aria-hidden="true">#</a> 浮点比较</h3><p>特殊的浮点比较指令用于比较两个浮点操作数，但是结果被写入普通标志寄存器，就像无符号比较一样。因此，条件跳转指令 <code>je</code>、<code>jne</code>、<code>ja</code>、<code>jae</code>、<code>jb</code> 和 <code>jb</code> 可用于在等于、不等于、大于、大于或等于、小于和小于时跳转。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>ucomiss dest, src           ; Compare dest and src (dest must be float reg.),
ucomisd dest, src           ; setting rif as for an unsigned comparison
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>浮点系统拥有自己的标志/状态寄存器，称为 <code>mxcsr</code>。这里的标志不是由浮点指令设置，而是由我们在浮点指令之前设置并控制全局行为，例如舍入模式、除以零是否应产生异常或仅产生无穷大等。</p><p>与 x87 一样，我们在这里执行无序比较，这意味着操作数之一为非数字的任何比较都会给出真实结果。</p><h3 id="函数的浮点参数" tabindex="-1"><a class="header-anchor" href="#函数的浮点参数" aria-hidden="true">#</a> 函数的浮点参数</h3><p>System-V 调用约定指定函数的前 8 个浮点参数在寄存器 <code>xmm0</code> 到 <code>xmm7</code> 中传递。结果（如果有）在 <code>xmm0</code> 中返回。所有浮点寄存器都是调用者保留的(caller-saved)，这意味着在调用任何函数之前必须将它们压入栈。</p><p>需要注意的重要一点是：如果您使用 <code>printf</code>，<code>%f</code> 格式说明符实际上需要一个双精度（64 位）参数，而不是浮点数。当我们在示例中使用 <code>printf</code> 时，我们必须使用 <code>cvtss2sd</code> 将浮点值转换为双精度值以进行打印。</p><p>像 <code>printf</code> 这样采用可变数量参数的函数需要进行额外的更改：<code>xmm</code> 寄存器中的参数数量必须在 <code>al</code> 中设置。</p><p><strong>浮点数的例子： 计算π</strong></p><p>这里我们将使用著名的 π 级数近似:</p>`,41),y=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",null,"="),s("mn",null,"4"),s("munder",null,[s("mo",null,"∑"),s("mrow",null,[s("mi",null,"i"),s("mo",null,"="),s("mn",null,"0")])]),s("mfrac",null,[s("mrow",null,[s("mo",null,"−"),s("msup",null,[s("mn",null,"1"),s("mi",null,"i")])]),s("mrow",null,[s("mn",null,"2"),s("mi",null,"i"),s("mo",null,"+"),s("mn",null,"1")])]),s("mo",null,"="),s("mn",null,"1"),s("mo",null,"−"),s("mfrac",null,[s("mn",null,"1"),s("mn",null,"3")]),s("mo",null,"+"),s("mfrac",null,[s("mn",null,"1"),s("mn",null,"5")]),s("mo",null,"−"),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},".")]),s("annotation",{encoding:"application/x-tex"}," =4\\sum _{i=0} {\\frac {-{1}^{i}} {2i+1}}=1-\\frac {1} {3}+\\frac {1} {5}-... ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.3669em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.7793em","vertical-align":"-1.2777em"}}),s("span",{class:"mord"},"4"),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mop op-limits"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.05em"}},[s("span",{style:{top:"-1.8723em","margin-left":"0em"}},[s("span",{class:"pstrut",style:{height:"3.05em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"i"),s("span",{class:"mrel mtight"},"="),s("span",{class:"mord mtight"},"0")])])]),s("span",{style:{top:"-3.05em"}},[s("span",{class:"pstrut",style:{height:"3.05em"}}),s("span",null,[s("span",{class:"mop op-symbol large-op"},"∑")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.2777em"}},[s("span")])])])]),s("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.5017em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"2"),s("span",{class:"mord mathnormal"},"i"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mord"},"1")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"−"),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"1")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8247em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"i")])])])])])])])])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.7693em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})])]),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"3")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"2.0074em","vertical-align":"-0.686em"}}),s("span",{class:"mord"},[s("span",{class:"mopen nulldelimiter"}),s("span",{class:"mfrac"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"1.3214em"}},[s("span",{style:{top:"-2.314em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"5")])]),s("span",{style:{top:"-3.23em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),s("span",{style:{top:"-3.677em"}},[s("span",{class:"pstrut",style:{height:"3em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},"1")])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.686em"}},[s("span")])])])]),s("span",{class:"mclose nulldelimiter"})]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"−"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.1056em"}}),s("span",{class:"mord"},"...")])])])])],-1),w=a(`<p>我们将继续这个系列，直到连续值之间的差异小于 0.000001（即 5 位精度），然后使用 C 标准库中的 <code>printf</code> 打印结果。</p><p>在 C 语言中，我们要编写的函数如下所示:</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">float</span> <span class="token function">pi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">float</span> p <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span>   <span class="token comment">// Current pi approximation    </span>
    <span class="token keyword">float</span> s <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>     <span class="token comment">// Sign: +1 or -1</span>
    <span class="token keyword">float</span> d <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>     <span class="token comment">// Denominator: 1,3,5,...</span>
    <span class="token keyword">float</span> rd<span class="token punctuation">;</span>        <span class="token comment">// 1 / d</span>

    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        rd <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> d<span class="token punctuation">;</span>
        p <span class="token operator">+=</span> s <span class="token operator">*</span> rd<span class="token punctuation">;</span>
        s <span class="token operator">*=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        d <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>        
    <span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token function">abs</span><span class="token punctuation">(</span>sd<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0.000001</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">4</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 x87 版本不同，没有指令翻转 <code>xmm</code> 寄存器的符号，或获取 <code>xmm</code> 寄存器的绝对值。因此，我们要克服一些困难：</p><ul><li>翻转符号对应于乘以-1。</li><li>我们不取绝对值，而是计算 1/d 并保存其值以供比较，然后再乘以交替符号。</li></ul><p>由于 xmm 寄存器同时用于整数和浮点数学，因此可以通过直接修改寄存器中的位来伪造绝对值和符号翻转：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>SIGN_BIT:   equ         (1 &lt;&lt; 63)

    pxor    xmm0, qword [SIGN_BIT]      ; Flip sign bit
    pandn   xmm0, qword [SIGN_BIT]      ; Clear sign bit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将其转换为汇编为我们提供了一个简单的循环：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

zero:   dd      0.0
one:    dd      1.0
two:    dd      2.0
four:   dd      4.0
negone: dd      -1.0
limit:  dd      0.000001


format: db      &quot;%f&quot;, 10, 0

section .text

extern printf

global main
main:

    push rbp
    mov rbp, rsp

    ;; Compute pi    
    call compute_pi
    ; Return value in xmm0  

    ;; Print result
    mov rdi, format
    mov al, 1
    cvtss2sd xmm0, xmm0 ; Convert to double for printf
    call printf

    mov rax, 0
    pop rbp
    ret

compute_pi:
    push rbp
    mov rbp, rsp

    movss xmm7, dword [one]  ; 1.0
    movss xmm0, dword [zero] ; p = 0
    movss xmm1, xmm7   ; s = 1
    movss xmm2, xmm7   ; d = 1
    ; xmm3 = t

.loop:
    movss xmm3, xmm7                ; t = 1
    divss xmm3, xmm2                ; t /= d
    vmulss xmm4, xmm1, xmm3         ; xmm4 = s * t
    addss xmm0, xmm4                ; p += s * t
    mulss xmm1, dword [negone]      ; s *= -1
    addss xmm2, dword [two]         ; d += 2

    ucomiss xmm3, dword [limit]     ; while(t &gt; limit)
    ja .loop

    ; Result is in xmm0
    mulss xmm0, dword [four]

    pop rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用 printf 时，我们必须做一个小的调整：采用可变数量参数的函数（如 printf）要求我们将 al 设置为 xmm 寄存器中传递的参数数量。它不必精确，但 al 应该 ≥ 用于参数的 xmm 寄存器的数量。到目前为止，我们从未在 xmm 中传递过任何内容，所以这并不重要。然而现在，我们必须在调用 printf 之前设置 al = 1，以便 printf 知道要使用多少个。</p><h2 id="浮点数的其他知识点" tabindex="-1"><a class="header-anchor" href="#浮点数的其他知识点" aria-hidden="true">#</a> 浮点数的其他知识点</h2><p>我们重点关注两种浮点格式，分别对应于 float（32 位）和 double（64 位）</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

zero:   dd      0.0
one:    dd      1.0
two:    dd      2.0
four:   dd      4.0
negone: dd      -1.0
limit:  dd      0.000001


format: db      &quot;%f&quot;, 10, 0

section .text

extern printf

global main
main:

    push rbp
    mov rbp, rsp

    ;; Compute pi    
    call compute_pi
    ; Return value in xmm0  

    ;; Print result
    mov rdi, format
    mov al, 1
    cvtss2sd xmm0, xmm0 ; Convert to double for printf
    call printf

    mov rax, 0
    pop rbp
    ret

compute_pi:
    push rbp
    mov rbp, rsp

    movss xmm7, dword [one]  ; 1.0
    movss xmm0, dword [zero] ; p = 0
    movss xmm1, xmm7   ; s = 1
    movss xmm2, xmm7   ; d = 1
    ; xmm3 = t

.loop:
    movss xmm3, xmm7          ; t = 1
    divss xmm3, xmm2          ; t /= d
    vmulss xmm4, xmm1, xmm3   ; xmm4 = s * t
    addss xmm0, xmm4          ; p += s * t
    mulss xmm1, dword [negone]      ; s *= -1
    addss xmm2, dword [two]         ; d += 2

    ucomiss xmm3, dword [limit]     ; while(t &gt; limit)
    ja .loop

    ; Result is in xmm0
    mulss xmm0, dword [four]

    pop rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>`,14),_={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-floating-point-simd.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://baseconvert.com/ieee-754-floating-point",target:"_blank",rel:"noopener noreferrer"},M={href:"https://polarisxu.studygolang.com/posts/basic/diagram-float-point/",target:"_blank",rel:"noopener noreferrer"},P={href:"http://www.infophysics.net/x87.pdf",target:"_blank",rel:"noopener noreferrer"};function R(q,C){const e=c("ExternalLinkIcon");return t(),d("div",null,[p,m,o,u,v,b,h,s("p",null,[n("还有一些其他可以推送的常量；请参阅了解"),s("a",g,[n("完整列表"),l(e)]),n("。")]),x,f,k,y,w,s("p",null,[n("课程原文："),s("a",_,[n("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-floating-point-simd.html"),l(e)])]),s("p",null,[n("浮点数工具： "),s("a",E,[n("https://baseconvert.com/ieee-754-floating-point"),l(e)])]),s("p",null,[n("浮点数： "),s("a",M,[n("https://polarisxu.studygolang.com/posts/basic/diagram-float-point/"),l(e)])]),s("p",null,[n("x87编程： "),s("a",P,[n("http://www.infophysics.net/x87.pdf"),l(e)])])])}const S=i(r,[["render",R],["__file","Lecture10-float-point.html.vue"]]);export{S as default};