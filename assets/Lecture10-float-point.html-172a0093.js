import{_ as l,V as i,W as d,X as s,Y as n,$ as t,a0 as a,F as c}from"./framework-9a29aaa0.js";const r={},o=a('<h1 id="第十讲-浮点数" tabindex="-1"><a class="header-anchor" href="#第十讲-浮点数" aria-hidden="true">#</a> 第十讲：浮点数</h1><p>由于历史原因，x86-64 有两个独立的浮点系统，它们之间的功能有一些重叠，但也有一些不同的功能。这两个系统是：</p><ul><li>旧的 x87 协处理器指令集</li><li>较新的 XMM 矢量处理指令</li></ul><p>无论哪种方式，浮点运算都使用一组完全不同的寄存器以及一组完全不同的操作。浮点值以二进制表示，其方式与有符号或无符号值完全不同。</p><h2 id="浮点数的表示方法" tabindex="-1"><a class="header-anchor" href="#浮点数的表示方法" aria-hidden="true">#</a> 浮点数的表示方法</h2><p>我们可以使用三种浮点大小/表示形式，分别是 <code>float</code>（32 位）、<code>double</code>（64 位）和 <code>long double</code>（80 位，存储为 128 位，有 48 个未使用的填充位）。表示形式相似，唯一的区别是专用于数字每个部分的位数。实际的浮点格式（哪位执行什么操作）由名为 IEEE-754 的国际标准定义。</p><p>IEEE-754 浮点格式将小数值表示为三个字段的组合：</p><ul><li>符号位 s，如果值为负则设置</li><li>指数 s，表示为（有偏差的）有符号二进制值。该值存储为实际指数加上固定偏差值 b。对于 32 位浮点值，偏差为 127。这意味着指数 0 在内部存储为 01111111b，-1 为 01111110b，1 为 10000000b，依此类推。</li><li>小数部分称为尾数 m，通常在 [1,2) 范围内（即 ≥ 1 但 &lt; 2）。在标准化浮点值中，小数部分向左移动，因此第一个设置位被移出，因为该值的左侧几乎总是有一个隐式 1 位。（移动尾数需要增加/减少指数以保持相同的值。）</li></ul><p>0 作为特殊情况处理。</p><p>使用这些字段的浮点数的值为</p>',10),p=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mo",{stretchy:"false"},"("),s("mo",null,"−"),s("mn",null,"1"),s("mi",null,"s"),s("mo",{stretchy:"false"},")"),s("mo",{stretchy:"false"},"("),s("mn",null,"1"),s("mo",null,"+"),s("mi",null,"m"),s("mo",{stretchy:"false"},")"),s("msup",null,[s("mn",null,"2"),s("mrow",null,[s("mi",null,"e"),s("mo",null,"−"),s("mi",null,"b")])])]),s("annotation",{encoding:"application/x-tex"}," (-1s)(1 + m){2}^{e-b} ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"−"),s("span",{class:"mord"},"1"),s("span",{class:"mord mathnormal"},"s"),s("span",{class:"mclose"},")"),s("span",{class:"mopen"},"("),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"1.1491em","vertical-align":"-0.25em"}}),s("span",{class:"mord mathnormal"},"m"),s("span",{class:"mclose"},")"),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8991em"}},[s("span",{style:{top:"-3.113em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mathnormal mtight"},"e"),s("span",{class:"mbin mtight"},"−"),s("span",{class:"mord mathnormal mtight"},"b")])])])])])])])])])])])])],-1),m=a(`<p>例如，浮点数 0.75 在二进制中是</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0.110000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),u=s("p",null,[n("指数为 "),s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[s("semantics",null,[s("mrow",null,[s("msup",null,[s("mn",null,"2"),s("mn",null,"0")])]),s("annotation",{encoding:"application/x-tex"},"{2}^{0}")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8141em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.8141em"}},[s("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"0")])])])])])])])])])])]),n("。然而，IEEE-754 要求我们将尾数向左移动，直到周期左侧的位被设置：")],-1),v=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">1.10000000</span> <span class="token punctuation">(</span>mantissa, <span class="token operator">=</span> <span class="token number">1.5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要恢复其十进制值：</p><ul><li>找到尾数的十进制值 (0.5) 并加上 1.0。 （= 1.5）。</li><li>将尾数的十进制值乘以 2 指数</li><li>如果符号位为 1，则将十进制值乘以 -1。</li></ul><h2 id="二进制的表示" tabindex="-1"><a class="header-anchor" href="#二进制的表示" aria-hidden="true">#</a> 二进制的表示</h2><p>32位的浮点数的格式如下所示, 有1位是符号位， 有8位是指数位，有23位是尾数。</p><table class="tablestyle"><tr><th colspan="1" class="thstyle">s</th><th colspan="8" class="thstyle">exponent</th><th colspan="23" class="thstyle">mantissa</th></tr><tr><th class="thstyle">31</th><th class="thstyle">30</th><th class="thstyle">29</th><th class="thstyle">28</th><th class="thstyle">27</th><th class="thstyle">26</th><th class="thstyle">25</th><th class="thstyle">24</th><th class="thstyle">23</th><th class="thstyle">22</th><th class="thstyle">21</th><th class="thstyle">20</th><th class="thstyle">19</th><th class="thstyle">18</th><th class="thstyle">17</th><th class="thstyle">16</th><th class="thstyle">15</th><th class="thstyle">14</th><th class="thstyle">13</th><th class="thstyle">12</th><th class="thstyle">11</th><th class="thstyle">10</th><th class="thstyle">9</th><th class="thstyle">8</th><th class="thstyle">7</th><th class="thstyle">6</th><th class="thstyle">5</th><th class="thstyle">4</th><th class="thstyle">3</th><th class="thstyle">2</th><th class="thstyle">1</th><th class="thstyle">0</th></tr></table><p>指数位是进行了+127的偏移， 因此 指数 0 将存储为 <code>127 (= 01111111b)</code>。这使得指数的范围是-127 到 + 128。</p><p>请注意，符号位位于高位，这意味着我们可以相对轻松地执行一些浮点操作。例如，要将浮点值转换为其绝对值（符号 = 0），只需将其与 0111…11 进行按位与即可。类似地，要确定浮点值是否为负，只需执行加载符号标志的操作。(例如，<code>tst rax、rax</code>）</p><h2 id="尾数" tabindex="-1"><a class="header-anchor" href="#尾数" aria-hidden="true">#</a> 尾数</h2><p>尾数以二进制小数形式存储；最左端有一个隐含的 1 和小数点。因此:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>10000000000000000000000b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上以十进制表示:</p>`,12),h=s("p",{class:"katex-block"},[s("span",{class:"katex-display"},[s("span",{class:"katex"},[s("span",{class:"katex-mathml"},[s("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[s("semantics",null,[s("mrow",null,[s("mn",null,"1"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mn",null,"0")]),s("mo",null,"+"),s("mn",null,"1"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mrow",null,[s("mo",null,"−"),s("mn",null,"1")])]),s("mo",null,"+"),s("mn",null,"0"),s("mo",null,"×"),s("msub",null,[s("mn",null,"2"),s("mrow",null,[s("mo",null,"−"),s("mn",null,"2")])]),s("mo",null,"+"),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mi",{mathvariant:"normal"},"."),s("mo",null,"="),s("mn",null,"1.5")]),s("annotation",{encoding:"application/x-tex"}," 1 × {2}_{0} + 1 × {2}_{-1} + 0 × {2}_{-2} + ... = 1.5 ")])])]),s("span",{class:"katex-html","aria-hidden":"true"},[s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7944em","vertical-align":"-0.15em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"0")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.15em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"1"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8528em","vertical-align":"-0.2083em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"−"),s("span",{class:"mord mtight"},"1")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2083em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.7278em","vertical-align":"-0.0833em"}}),s("span",{class:"mord"},"0"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"×"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.8528em","vertical-align":"-0.2083em"}}),s("span",{class:"mord"},[s("span",{class:"mord"},[s("span",{class:"mord"},"2")]),s("span",{class:"msupsub"},[s("span",{class:"vlist-t vlist-t2"},[s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.3011em"}},[s("span",{style:{top:"-2.55em","margin-right":"0.05em"}},[s("span",{class:"pstrut",style:{height:"2.7em"}}),s("span",{class:"sizing reset-size6 size3 mtight"},[s("span",{class:"mord mtight"},[s("span",{class:"mord mtight"},"−"),s("span",{class:"mord mtight"},"2")])])])]),s("span",{class:"vlist-s"},"​")]),s("span",{class:"vlist-r"},[s("span",{class:"vlist",style:{height:"0.2083em"}},[s("span")])])])])]),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),s("span",{class:"mbin"},"+"),s("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.3669em"}}),s("span",{class:"mord"},"..."),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),s("span",{class:"mrel"},"="),s("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),s("span",{class:"base"},[s("span",{class:"strut",style:{height:"0.6444em"}}),s("span",{class:"mord"},"1.5")])])])])],-1),b=a(`<p><code>1.</code> 不与值一起存储，它是隐式的。</p><p>就像以二进制存储整数值时一样，我们将位乘以 2 的递增幂，然后将它们相加，这里我们将位乘以 2 的负幂和递减幂，然后将它们相加。</p><h2 id="指数" tabindex="-1"><a class="header-anchor" href="#指数" aria-hidden="true">#</a> 指数</h2><p>指数有效地允许我们将尾数中的位向左或向右“移动”，同时将（隐式）小数点保持在同一位置。例如，要表示值 1.0，我们将使用尾数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">0</span>.1000000000000000000000b <span class="token operator">=</span> <span class="token number">0.5</span> <span class="token punctuation">(</span><span class="token number">1.5</span> really<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但其指数为 10000000b = 1（无偏），</p><p><code>1.5 * 21 = 3.0</code> 或 <code>11.0000...b．</code></p><h2 id="_64位的表示方法" tabindex="-1"><a class="header-anchor" href="#_64位的表示方法" aria-hidden="true">#</a> 64位的表示方法</h2><p>64 位和 80 位表示使用相同的基本原理，只是指数和尾数字段的大小不同：</p><table><thead><tr><th>Size</th><th>C/C++ type</th><th>Exponent size</th><th>Mantissa size</th></tr></thead><tbody><tr><td>32-bit</td><td>float</td><td>8 bits</td><td>23 bits</td></tr><tr><td>64-bit</td><td>double</td><td>11 bits</td><td>52bits</td></tr></tbody></table><p>80 位 <code>long double</code>表示略有不同：它使用15位指数，63位尾数，并且m的最高位中的隐含1实际上被存储，作为指数和尾数之间的位。该位称为整数位，它允许 0 具有更自然的表示形式，即全 0 的尾数（在 IEEE-754 格式中，表示尾数 1.0）。</p><p>IEEE-754 标准也定义了 128 位和 256 位浮点表示形式，但我们不用关心它们。</p><h2 id="x87浮点数指令" tabindex="-1"><a class="header-anchor" href="#x87浮点数指令" aria-hidden="true">#</a> x87浮点数指令</h2><p>以 f 开头的浮点指令是较旧的 x87 浮点指令集的一部分。它们使用一组单独的浮点寄存器 ST(0) 到 ST(7)，它们被视为栈。这些指令中的大多数不带操作数，并且隐式地对该堆栈的顶部元素进行操作。在YASM中，FP寄存器写为<code>st0、st1</code>等。</p><p>这种奇怪组织的原因是，最初所有浮点运算都是由物理上独立的协处理器 CPU 处理的。协处理器是一个独立的芯片，连接到总线，因此它能够“监听”。浮点指令由 CPU 分派到协处理器。(协处理器是可选的；尝试在没有它的情况下使用 FP 代码会触发异常)。因此，ST(x) 寄存器并不“驻留在”主 CPU 上，而是驻留在协处理器上，因此，为了更快，浮点计算必须尽可能地驻留在协处理器上。</p><p>如今，FP 寄存器栈与其他所有内容都位于同一 CPU 上，但为了与旧代码兼容，它仍然被视为单独的。使用 x87 指令的一个缺点是函数的浮点参数在 xmm 寄存器中传递，因此需要一些工作才能将它们放入 x87 子系统使用的 ST 寄存器中。然而，有些操作仅受 x87 子系统支持，因此可能值得付出努力。</p><p>所有 x87 浮点指令均以 f 开头，并且它们与使用 xmm 的指令之间存在一些重叠。如果两者都支持您想要的操作，那么您可以选择使用哪一个；如今两者都得到了同样的优化。由于 xmm 寄存器用于参数/返回值，因此可能需要一些额外的工作才能将值移入或移出 FP 寄存器堆栈。</p><p>在内部，x87 子系统将每个值存储为 80 位精度。当以浮点数或双精度数形式移入或移出内存时，值会向上/向下转换。这意味着我们“免费”获得额外的精度。 （一般来说这是正确的：高精度和低精度浮点运算花费相同的时间，因此我们唯一关心的是空间使用情况。）</p><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3><p><code>emms</code> 用于通过重置其状态来初始化浮点协处理器。调用约定要求处理器在进入任何函数时处于 XMM 模式，因此为了安全起见，我们将始终在使用 x87 系统的任何函数的开头调用 <code>emms</code>。</p><h3 id="浮点寄存器栈" tabindex="-1"><a class="header-anchor" href="#浮点寄存器栈" aria-hidden="true">#</a> 浮点寄存器栈</h3><p>x87系统有 8 个独立的、可寻址的 80 位数据寄存器 <code>R0</code>~<code>R7</code>，这些寄存器合称为浮点寄存器栈。</p><p>我们使用<code>st0</code> ~ <code>st7</code>去使用浮点寄存器栈。<code>st</code>后方的数字代表的是到栈顶的距离，<code>st0</code>代表的是栈顶。大多数 x87 指令隐式使用 <code>st0</code> 作为其操作的目标（例如，<code>fsub</code> 将其结果写入 <code>st0</code>。）所有 ST 寄存器均由调用者保存(caller-preserved)。 x87 浮点代码基本上可以归结为管理这些寄存器。</p><p>浮点栈也有类似的<code>push</code>和<code>pop</code>操作：</p><p>浮点栈的pop操作会执行下面的两步：</p><ul><li>翻转所有的浮点寄存器。 让<code>st0</code>指向<code>st1</code>，让<code>st1</code>指向<code>st2</code>， 以此类推。</li><li>将<code>st0</code>标记为空闲。 <img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture10/pop.png" alt="pop" loading="lazy"></li></ul><p>浮点栈的push操作会执行下面的两步：</p><ul><li>反向翻转所有的浮点寄存器。</li><li>将<code>st0</code>标记为使用中。 <img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture10/push.png" alt="push" loading="lazy"></li></ul><p>上述过程，相对比较抽象，我们通过一个实际的例子来感受一下浮点寄存器栈<code>push</code>和<code>pop</code>的过程。</p><p>这里会使用<code>fld</code>指令和<code>fstp</code>指令， 可以将其暂时理解为<code>push</code>和<code>pop</code>。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>info float</code>命令非常形象的显示了压栈和出栈操作的过程。</p><p>在 x87 术语中，将值压入栈称为加载(loading)。从内存加载浮点数到浮点栈中有不同方法：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fld  dword [addr]   ; Push float from memory
fld  qword [addr]   ; Push double from memory
fld  st1            ; Push st1 to st0

fild dword [addr]   ; Push signed dword integer from memory
fild qword [addr]   ; Push signed qword integer from memory

fld1        ; Push +1.0
fldz        ; Push +0.0
fldpi       ; Push π 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，所有这些压栈操作不仅将 <code>st0</code> 设置为期望的值，还将旧的 <code>st0</code> 及其下面的所有内容向下移动。无法将值从寄存器中复制到 <code>st0</code>（下面的 <code>fst</code> 可以将 <code>st0</code> 复制到其他寄存器)。</p>`,39),g={href:"https://www.felixcloutier.com/x86/fld1:fldl2t:fldl2e:fldpi:fldlg2:fldln2:fldz",target:"_blank",rel:"noopener noreferrer"},x=a(`<p>请注意，没有加载浮点立即数的指令。要加载浮点常量，除了专用指令之外的浮点常量，您必须将其存储在内存中（通常在 <code>.data</code> 或 <code>.rodata</code> 中），然后从那里加载它。一些简单的常量可以从 fld1 和 fldz 指令支持的 1,0 中合成出来。</p><p>许多指令都有 -p 形式，它也会在执行操作后弹出栈。例如:</p><p><code>fst st3</code> 将 <code>ST(0)</code> 复制到 <code>ST(3)</code>，而 <code>fstp st3</code> 执行相同的操作，但随后弹出。</p><p>为了更方便地操作堆栈较低的值，fxch 指令将另一个 st 寄存器中的值与 st0 交换。例如:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fxch st3    ; Swap st0 with st3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="写入memory" tabindex="-1"><a class="header-anchor" href="#写入memory" aria-hidden="true">#</a> 写入memory</h3><p>将 FP 堆栈的结果写回内存称为存储。</p><p><code>fst</code>/<code>fstp</code>用于将浮点值从<code>st0</code>移动到栈中的其他位置，或从<code>st0</code>移动到内存中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fst  dword [addr]  ; Copy float st0 to [addr]
fst  st1           ; Copy st0 to st1
fstp st1           ; Copy st0 to st1 and then pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，对于存储到内存，需要大小限定符（dword 或 qword），以便汇编器知道是复制为 float 还是 double。</p><p>我们还可以通过四舍五入或截断来存储整数：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>fist   dword [addr]     ; Write float ST(0) as integer to addr
fistp  dword [addr]     ; Write float ST(0) as integer and then pop
fisttp qword [addr]     ; Write double as trunc. integer and then pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（64 位存储只能在 -p popping 变体中完成。）</p><p>舍入使用当前舍入模式，而截断只是丢弃任何小数部分，有效地向 0 舍入。</p><h3 id="算术运算" tabindex="-1"><a class="header-anchor" href="#算术运算" aria-hidden="true">#</a> 算术运算</h3><h2 id="xmm-浮点指令" tabindex="-1"><a class="header-anchor" href="#xmm-浮点指令" aria-hidden="true">#</a> XMM 浮点指令</h2><p>CPU 上的现代浮点单元及其专用寄存器与向量 (SIMD) 单元（以及旧的 x87 单元）共享资源。事实上，大多数现代浮点实际上是矢量化浮点代码。正如我们将要做的那样，真正的代码很少一次只对一个值进行操作。</p><h3 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h3><p>有 16 个浮点寄存器，名为 <code>xmm0</code>到 <code>xmm15</code>。这些寄存器的大小实际上均为 128 位，但我们将仅使用 32 位或 64 位部分，这对应于我们正在使用的浮点大小。一般来说，后缀 s 用于表示单精度（float），而后缀 d 用于表示双精度（double）。</p><p><code>xmm0</code> 到 <code>xmm7</code> 用于传递浮点参数。 <code>xmm8-15</code> 是临时（调用者保存的）寄存器。</p><h3 id="移动浮点值" tabindex="-1"><a class="header-anchor" href="#移动浮点值" aria-hidden="true">#</a> 移动浮点值</h3><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>movss dest, src         ; Move floats
movsd dest, src         ; Move doubles
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>两个专用的 mov 指令用于移动浮点值。像往常一样，两个操作数必须具有相同的大小，并且大小必须与指令匹配。目标和源可以是内存或（xmm）寄存器，但不能同时是内存。与普通的 <code>mov</code> 指令不同，源不能是立即数。要将常量浮点值加载到寄存器中，它必须已经存在于内存中。请注意，寄存器操作数必须是浮点寄存器。</p><h3 id="在-data-中存储浮点值" tabindex="-1"><a class="header-anchor" href="#在-data-中存储浮点值" aria-hidden="true">#</a> 在 <code>.data</code> 中存储浮点值</h3><p>使用<code>dd</code>（双字）存储32位浮点值，使用<code>dq</code>（四字）存储64位值。例如：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

pi:     dq      3.14159
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="浮点转换" tabindex="-1"><a class="header-anchor" href="#浮点转换" aria-hidden="true">#</a> 浮点转换</h3><p>存在用于在 32 位和 64 位格式之间进行转换以及将整数转换为浮点值的指令，反之亦然。</p><p>|指令|描述| |<code>cvtss2sd dest, src</code>|将 32 位浮点数转换为 64 位浮点数 src 可以是内存、浮点寄存器或通用寄存器| |<code>cvtsd2ss dest, src</code>|将 64 位浮点数转换为 32 位浮点数| |<code>cvtss2si dest, src</code>|将 32 位浮点数转换为 32 位有符号整数 dest 可以是浮点寄存器或通用寄存器| |<code>cvtsd2si dest, src </code>|将 64 位浮点数转换为 32 位整数| |<code>cvtsi2ss dest, src</code>|将 32 位有符号整数转换为 32 位浮点数| |<code>cvtsi2ss dest, src</code>|将 32 位有符号整数转换为 64 位浮点数|</p><p><strong>算术</strong></p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>addss dest, src         ; dest += src (float)
addsd dest, src         ; dest += src (double)
subss dest, src         ; dest -= src (float)
subsd dest, src         ; dest -= src (double)
mulss dest, src         ; dest *= src (float)
mulsd dest, src         ; dest *= src (double)
divss dest, src         ; dest /= src (float)
divsd dest, src         ; dest /= src (double)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有这些的三操作数版本都带有 v 前缀：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>vaddss dest, src1, src2  ; dest = src1 + src2
vaddsd dest, src1, src2  ; dest = src1 + src2
vsubss dest, src1, src2  ; dest = src1 + src2
vsubsd dest, src1, src2  ; dest = src1 + src2
vmulss dest, src1, src2  ; dest = src1 + src2
vmulsd dest, src1, src2  ; dest = src1 + src2
vdivss dest, src1, src2  ; dest = src1 + src2
vdivsd dest, src1, src2  ; dest = src1 + src2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dest</code>和<code>src</code>操作数必须是xmm寄存器； <code>src2</code> 可以是寄存器或内存。所有操作数的大小必须相同。</p><p>提供了许多更高级的数学运算作为说明：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>sqrtss dest, src</code><br> <code>sqrtsd dest, src</code></td><td><code>dest = sqrt(src)</code> 开根号</td></tr><tr><td><code>rcpss dest, src</code></td><td><code>dest = 1/src</code></td></tr><tr><td><code>rsqrtss dest, src</code></td><td><code>dest = 1/sqrt(src)</code></td></tr><tr><td><code>maxss dest, src</code><br> <code>maxsd dest, src</code></td><td>dest =maximum of dest, src</td></tr><tr><td><code>minss dest, src</code><br> <code>minsd dest, src</code></td><td>dest =minimum of dest, src</td></tr><tr><td><code>roundss dest, src, mode</code></td><td>Round src into dest using mode <br>mode = 0 ties go to even<br>mode = 1 round down<br>mode = 2 round up<br>mode = 3 round toward 0</td></tr></tbody></table><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2>`,37),k={href:"https://baseconvert.com/ieee-754-floating-point",target:"_blank",rel:"noopener noreferrer"},f={href:"https://polarisxu.studygolang.com/posts/basic/diagram-float-point/",target:"_blank",rel:"noopener noreferrer"},y={href:"http://www.infophysics.net/x87.pdf",target:"_blank",rel:"noopener noreferrer"};function w(E,_){const e=c("ExternalLinkIcon");return i(),d("div",null,[o,p,m,u,v,h,b,s("p",null,[n("还有一些其他可以推送的常量；请参阅了解"),s("a",g,[n("完整列表"),t(e)]),n("。")]),x,s("p",null,[n("浮点数工具： "),s("a",k,[n("https://baseconvert.com/ieee-754-floating-point"),t(e)])]),s("p",null,[n("浮点数： "),s("a",f,[n("https://polarisxu.studygolang.com/posts/basic/diagram-float-point/"),t(e)])]),s("p",null,[n("x87编程： "),s("a",y,[n("http://www.infophysics.net/x87.pdf"),t(e)])])])}const M=l(r,[["render",w],["__file","Lecture10-float-point.html.vue"]]);export{M as default};
