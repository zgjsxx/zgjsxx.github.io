import{_ as l,V as d,W as r,X as n,Y as e,$ as a,a0 as i,F as c}from"./framework-9a29aaa0.js";const o={},t=i('<hr><p>category:</p><ul><li>汇编语言</li></ul><hr><h1 id="第四讲-算术运算和简单函数" tabindex="-1"><a class="header-anchor" href="#第四讲-算术运算和简单函数" aria-hidden="true">#</a> 第四讲：算术运算和简单函数</h1><h2 id="回顾" tabindex="-1"><a class="header-anchor" href="#回顾" aria-hidden="true">#</a> 回顾</h2><h3 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h3><p>上一讲中，我们学习了我们可用的所有的通用寄存器：<code>rax</code>，<code>rbx</code>，<code>rcx</code>，<code>rdx</code>，<code>rdi</code>，<code>rsi</code>，<code>rbp</code>，<code>rsp</code>，<code>r8</code>至<code>r15</code>。</p><p>我们看到了如何以完整的 64 位 (qword) 宽度或低位双字、低位字或低位字节来访问其中的每一个：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture3/common_register.png" alt="common_register" tabindex="0" loading="lazy"><figcaption>common_register</figcaption></figure><p>我们看到许多指令（包括 <code>mov</code> 和 <code>xor</code>）在对寄存器的低位双字部分进行操作时，会隐式地将高位双字清零，并且我们研究了一些保留高位双字的策略。</p><p>我们查看了标志寄存器 <code>rflags</code>，它用于存储有关各种操作结果的信息。对我们来说最重要的标志是:</p><ul><li>CF – 进位标志，如果无符号运算的结果产生额外的进位/借位则设置</li><li>OF – 溢出标志，如果有符号运算的结果太大/太小而无法存储，则设置</li><li>ZF – 零标志，如果结果的所有位均为 0，则设置该标志。</li><li>SF – 符号标志，如果结果的高位被置位则置位</li></ul><p>我们看到 <code>mov</code> 指令是我们在寄存器、内存和立即（常量）值之间移动数据的基本工具。我们还看到了 <code>xchg</code> 指令，它交换操作数，使我们不必使用寄存器作为临时变量。</p><h2 id="负数" tabindex="-1"><a class="header-anchor" href="#负数" aria-hidden="true">#</a> 负数</h2><p>前面描述的所有算术运算符都假设输入值为正。那么如果输入有负数该如何处理？一般来说， 有四种处理办法：</p>',16),u=n("ul",null,[n("li",null,[n("p",null,[e("符号位(源码)： 在十进制中，我们用"),n("code",null,"-"),e("符号表示负数， 那么为什么不用一个位来表示这个数字是负数呢？其实，数字的最高位就是用来做这个事情。例如 00000011b 是 3，但 10000011b 是 -3。虽然这个办法对我们来说很容易理解，但是在实现时确有几个缺点：")]),n("ul",null,[n("li",null,"现在0有两种表示，一个是正数0，一个是负数0。"),n("li",null,"值的算术更加复杂，因为我们必须检查两个值的符号位。如果我们忘记并执行无符号运算，结果将是无意义的。"),n("li",null,"CPU 必须根据符号位的值在执行加法运算和执行减法运算之间切换。也就是说，CPU 无法将自己设置为执行加法/减法，直到它也知道正在操作的值。 浮点值使用符号位，部分原因是它们希望同时具有正零和负零。")])]),n("li",null,[n("p",null,'偏置表示法(biasd)。这表示所有值（不仅仅是负值）都叠加一个固定量。所以0不是0，而是0+127（=01111111b）什么的。 3是3+127=10000010b，-3是-3+127=01111100b。请注意，高位用作一种"正号位"；如果已设置，则该数字为正数（大于 0）。'),n("ul",null,[n("li",null,[n("p",null,"加法和减法（在某种程度上）正常工作，只是我们必须在执行正常运算后​​“消除”值的偏差。例如，添加 3 和 -3 得出："),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e("    "),n("span",{class:"token number"},"10000010"),e(`
+  01111100
─────────────
    `),n("span",{class:"token number"},"11111110"),e(),n("span",{class:"token operator"},"="),e(),n("span",{class:"token number"},"127"),e(),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"254"),e("-127"),n("span",{class:"token punctuation"},")"),e(` 
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])]),n("p",null,"我们必须再次从结果中减去127，因为添加了两个127的“副本”，所以最终的结果实际上是"),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e(),n("span",{class:"token number"},"11111110"),e(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,"01111111 ───────────── 01111111 = 0 (127-127)")])]),n("div",{class:"language-text line-numbers-mode","data-ext":"text"},[n("pre",{class:"language-text"},[n("code",null,`- 正数看起来很奇怪。零看起来很奇怪。
- 检测非负数 (≥ 0) 很棘手。

`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,"反码(Ones-complement)：这将负值表示为相应数字的二进制逆（翻转所有位）。所以 3 是 00000011b，而 -3 是 11111100b。请注意，我们可以通过检查高位来确定数字是否为负数。如果已设置，则该数字为负数。但高位不是符号位。我们不能通过简单地翻转高位来使负数变为正数，我们必须翻转所有位。 如果我们执行+3和-3的二进制加法，我们会得到:"),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e(`    00000011
+   `),n("span",{class:"token number"},"11111100"),e(`
─────────────
    `),n("span",{class:"token number"},"11111111"),e(),n("span",{class:"token operator"},"="),e(),n("span",{class:"token parameter variable"},"-0"),e(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])]),n("p",null,"与符号位表示一样，0 有两种表示形式，正数（如 00000000b）和负数（如 11111111b）。然而，我们可以使用普通的二进制加法来添加有符号数，并且当解释为补码数时，结果将是正确的。 减法有点困难："),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e("   "),n("span",{class:"token number"},"111111"),e(`  
    00000011   `),n("span",{class:"token operator"},"="),e(),n("span",{class:"token number"},"3"),e(`
 -  00000100   `),n("span",{class:"token operator"},"="),e(),n("span",{class:"token number"},"4"),e(`
─────────────
    `),n("span",{class:"token number"},"11111110"),e(),n("span",{class:"token operator"},"="),e("  "),n("span",{class:"token parameter variable"},"-1"),e(` 
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])]),n("p",null,"当借用的 1 到达最左边时，它会“环绕”并从答案的低位借用。这称为末端借用。当这种情况发生时，我们必须做出调整。")]),n("li",null,[n("p",null,[e("补码(Twos-complement)：将负数的值按位取反再加1。8位数字的的补码可以被定义为"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mn",null,"2"),n("mn",null,"8")]),n("mo",null,"−"),n("mi",null,"n")]),n("annotation",{encoding:"application/x-tex"},"{2}^{8}-n")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.8974em","vertical-align":"-0.0833em"}}),n("span",{class:"mord"},[n("span",{class:"mord"},[n("span",{class:"mord"},"2")]),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.8141em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mtight"},"8")])])])])])])])]),n("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),n("span",{class:"mbin"},"−"),n("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.4306em"}}),n("span",{class:"mord mathnormal"},"n")])])]),e("。 所以 3 是 00000011b 而 -3 是 11111101b。请注意，高位仍可用于检测负值。你可以认为补码是反码加上1。")]),n("ul",null,[n("li",null,[n("p",null,'所有的算术运算符都正常工作，无需传入值的符号。我们可以进行正常的加法，无论其中一个或两个输入是否为负，结果都会"有意义"。例如:'),n("div",{class:"language-text line-numbers-mode","data-ext":"text"},[n("pre",{class:"language-text"},[n("code",null,`   1111111
   00000011
+  11111101
─────────────
   00000000 
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,"所有算术运算都正常工作，无需知道传入值的符号。我们可以进行正常的加法，无论其中一个或两个输入是否为负，结果都会“有意义”。例如。"),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e("    "),n("span",{class:"token number"},"1111111"),e(`
    00000011
+  `),n("span",{class:"token number"},"11111101"),e(`
─────────────
    00000000 
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,"0 只有一种表示形式，而不是两种，而且就是 0b。")]),n("li",null,[n("p",null,"表示的值的范围（通过字节）为 -128 到 +127。")]),n("li",null,[n("p",null,"这里不需要在二进制补码中进行结束借用/进位。"),n("p",null,"x86-x64系统(以及许多其他系统)使用二进制补码，因为它不需要任何额外的电路来表示或操作负数。你只需进行“正常”的二进制加法，结果就是正确的。")])])])],-1),p={href:"https://zh.wikipedia.org/wiki/%E5%8E%9F%E7%A0%81",target:"_blank",rel:"noopener noreferrer"},v={href:"https://zh.wikipedia.org/wiki/%E4%B8%80%E8%A3%9C%E6%95%B8",target:"_blank",rel:"noopener noreferrer"},m={href:"https://zh.wikipedia.org/wiki/%E4%BA%8C%E8%A3%9C%E6%95%B8",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>乘法是一种非常昂贵的运算，我们通常不会费心尝试在数字表示“内部”进行它。相反，我们只是将两个操作数都设为正数，然后相乘，然后根据需要对结果取负。</p><p>另一个例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token number">11</span>  <span class="token number">1</span>
   01110110  <span class="token operator">=</span> <span class="token number">118</span>
 + <span class="token number">11100101</span>  <span class="token operator">=</span> <span class="token parameter variable">-27</span>
────────────
   01011011  <span class="token operator">=</span> <span class="token number">91</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个数(正数或者负数)进行取反：</p><ul><li>翻转每个比特</li><li>加1</li></ul><p>无论输入值是正值还是负值，这都有效。例如:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">11100101</span>  <span class="token operator">=</span> <span class="token parameter variable">-27</span>
00011010        <span class="token punctuation">(</span>flip all bits<span class="token punctuation">)</span>
00011011  <span class="token operator">=</span>  <span class="token number">27</span> <span class="token punctuation">(</span>add <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>00011011  <span class="token operator">=</span>  <span class="token number">27</span> 
<span class="token number">11100100</span>        <span class="token punctuation">(</span>flip all bits<span class="token punctuation">)</span>
<span class="token number">11100101</span>  <span class="token operator">=</span> <span class="token parameter variable">-27</span> <span class="token punctuation">(</span>add <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据尺寸的延展" tabindex="-1"><a class="header-anchor" href="#数据尺寸的延展" aria-hidden="true">#</a> 数据尺寸的延展</h3><p>假设我们有一个8位的数字，我们希望将其存储到16位的空间中。如果这个数字是无符号的，那么这很容易。直接将数字复制到低8位，然后用0填充到高8位。但是如果该值是有符号的（二进制补码）怎么办? 在这种情况下，为了获取等效的值，我们需要对扩展后的数字添加符号位，将原本的数字中的高位填充扩充后的数字的高位。如果高位原来为1，则高8位必须全部为1，否则应为0。</p><p>许多可以“混合”不同字长值的算术运算有两种形式：“零扩展”（用 0 填充）的无符号形式和符号扩展（复制高位）的有符号形式。</p><h3 id="内存中的表示" tabindex="-1"><a class="header-anchor" href="#内存中的表示" aria-hidden="true">#</a> 内存中的表示</h3><p>对于单字节值，使用上述表示法。然而，对于多字节值，有几个选项。考虑 16 位值。当我们将其放入内存地址 a 时，可以通过两种方式完成：</p><ul><li><p>我们可以将低字节（8 位）放入地址 a，将高字节放入 a+1。这称为小端字节序，因为低字节在前。</p></li><li><p>我们可以将低字节放入地址a+1，将高字节放入a。这称为大端字节序，因为高字节在前。</p></li></ul><p>如果大尾数法看起来很疯狂，请考虑一下这就是从左到右写入 16 位值的方式，假设内存地址向右增加：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>high byte	low byte

addr	    addr + <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Intel系统使用Little-endian，因此我们不需要担心big-endian。 Big-endian 由一些微控制器 (AVR32) 和一些 big-iron 处理器使用。如果您正在编写文件格式（或网络协议），那么您必须定义“标准”字节顺序，并且必须确保在必要时在软件中完成正确的翻译。但对于我们来说，如果要访问内存中一个16位值的高字节，可以在地址+1处找到。</p><h3 id="访问内存" tabindex="-1"><a class="header-anchor" href="#访问内存" aria-hidden="true">#</a> 访问内存</h3><p>在 64 位模式下，所有地址都是64位的，因此必须使用完整寄存器（<code>rax</code>、<code>rbx</code> 等）来存储地址。正如我们所见，<code>.data</code> 部分中用于定义字符串的标签实际上是该字符串的地址，因此我们可以将字符串 <code>my_text</code> 的地址加载到 <code>rax</code> 中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, my_text 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以将这种用法中的 <code>rax</code> 视为指针类型变量，保存某个变量的地址。</p><p>我们可以通过将内存地址放在方括号中来执行<strong>解引用</strong>操作：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov al, byte [my_text]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里并不严格要求带上字节限定符，但带上它是一个很好的做法。</p><p>下面展示一个容易犯错误的例子:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, [my_text] ; Read one *qword* from my_text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它读取的不是一个字节而是八个字节（qword）。</p><p>当你增加字节限定符,而不修改寄存器时进行汇编将会报错。因为<strong>限定符</strong>和<strong>寄存器的大小</strong>不匹配。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, byte [my_text] ; Read one byte from my_text
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是一个完整的例子：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

msg:    db      &quot;Hello, world!&quot;
MSGLEN: equ     $-msg

section .text

global _start
_start:
    mov rax, byte [newline]
    mov     rax,    60              ; Syscall code in rax
    mov     rdi,    0               ; First parameter in rdi
    syscall                         ; End process
    ; Normal exit syscall...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进行编译：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yasm <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-f</span> elf64 hello.s <span class="token parameter variable">-l</span> hello.lst
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>报错内容如下所示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>error: invalid size <span class="token keyword">for</span> operand <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里特别要注意<code>mov</code>要求源操作数和目的操作数大小相等。如果操作数的大小不相等，就需要使用<code>movzx</code>。</p><p>实际上，当我们正在处理一个字符串时，大概率我们会想要迭代它，而不仅仅是访问第一个字节。将地址 <code>my_text</code> 放入寄存器然后&quot;解引用&quot;会更有用：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rsi, my_text
mov al, byte [rsi]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以通过 <code>inc rsi</code> 来增加 <code>rsi</code>的值从而访问字符串中的下一个字节。因为 <code>my_text</code> 是立即数，所以我们不能递增它。 （同样，<code>[rsi]</code> 上的字节限定符不是必需的，因为它可以从 <code>al</code> 的大小推断出来。）</p><h2 id="简单的循环" tabindex="-1"><a class="header-anchor" href="#简单的循环" aria-hidden="true">#</a> 简单的循环</h2><p>因为做任何有趣的事情都需要循环，所以我们将介绍<code>loop</code>指令。<code>loop</code>采用单个操作数，一个要跳转到的标签（在内部，循环存储标签地址相对于当前指令地址的偏移量）。<code>loop</code>的操作是执行以下步骤：</p><ul><li>对<code>rcx</code>进行递减</li><li>如果<code>rcx != 0</code>,跳转到标签处。</li><li>如果<code>rcx == 0</code>，则往下继续执行。</li></ul><p>因此，基本循环的结构如下所示：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rcx, init       ; Initialize rcx &gt; 0

.start_loop:

    ; ... Perform loop operation using rcx

    loop .start_loop

    ; ... Continue after end of loop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这大致相当于 C/C++ 风格的 <code>do-while</code> 循环：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>rcx <span class="token operator">=</span> init<span class="token punctuation">;</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>

    <span class="token comment">// ... Perform loop operation</span>

    <span class="token operator">--</span>rcx<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span>rcx <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，因为 <code>rcx</code> 是允许系统调用会修改的寄存器之一，所以如果您在循环内执行任何系统调用，则需要在调用之前保存 \`\`\`rcx\`\`\`\`，然后在调用之后恢复它。</p><p>作为一个演示，我们可以修改&quot;Hello, world&quot;程序来反向打印&quot;Hello, world!&quot;，从末尾到开头一次打印一个字符。（我们仍然会使用 <code>write</code> 系统调用，我们只是告诉它打印单个字符而不是整个字符串。）</p><p>首先我们先考虑如何在C/C++语言中实现。下面时最基本的&quot;Hello, world!&quot;程序。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token operator">*</span> msg <span class="token operator">=</span> <span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">int</span> MSGLEN <span class="token operator">=</span> <span class="token number">13</span><span class="token punctuation">;</span> 

    cout<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>msg<span class="token punctuation">,</span>MSGLEN<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// equiv. to write syscall</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要一次写入一个字符，我们需要一个从字符串末尾开始的循环，一次向后写入一个字符，如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token operator">*</span> msg <span class="token operator">=</span> <span class="token string">&quot;Hello, world!&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">int</span> MSGLEN <span class="token operator">=</span> <span class="token number">13</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> c <span class="token operator">=</span> MSGLEN<span class="token punctuation">;</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>

        <span class="token keyword">char</span><span class="token operator">*</span> addr <span class="token operator">=</span> msg <span class="token operator">+</span> c <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        cout<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>addr<span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token operator">--</span>c<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span>c <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我特意以镜像循环指令执行的方式编写 do-while 循环，以便更容易转换为汇编。</p><p>我们原始的HelloWorld程序是这样的：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

msg:            db      10, &quot;Hello, world!&quot;
MSGLEN:          equ     $-msg

section .text

;; Program code goes here

global _start
_start:
    mov     rax,    1               ; Syscall code in rax
    mov     rdi,    1               ; 1st arg, file desc. to write to
    mov     rsi,    msg             ; 2nd arg, addr. of message
    mov     rdx,    MSGLEN          ; 3rd arg, num. of chars to print
    syscall

    ;; Terminate process
    mov     rax,    60              ; Syscall code in rax
    mov     rdi,    0               ; First parameter in rdi
    syscall                         ; End process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我已从文本中删除了尾随的 10 (\\n)，并将其移至开头，因此它仍会在“末尾”打印。</p><p>第一个系统调用将在循环内，因此我们可以添加：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

msg:            db      10, &quot;Hello, world!&quot;
MSGLEN:          equ     $-msg

section .text

;; Program code goes here

global _start
_start:
    mov     rdi,    1               ; 1st arg, file desc. to write to
    mov     rdx,    1               ; 3rd arg, num. of chars to print
.begin_loop
    mov     rax,    1               ; Syscall code in rax
    mov     rsi,    msg             ; 2nd arg, addr. of message

    ；other code
    
    syscall
    loop .begin_loop

    ;; Terminate process
    mov     rax,    60              ; Syscall code in rax
    mov     rdi,    0               ; First parameter in rdi
    syscall                         ; End process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，系统调用保留了 <code>rdi</code> 和 <code>rdx</code>，因此我们可以在循环外设置它们。然而，<code>rax</code>用于返回值，因此我们应该每次循环时都设置它，而<code>rsi</code>是字符串开头的地址，它会随着我们在字符串中移动而改变。</p><p>我们需要将 <code>rcx</code> 初始化为字符串的长度：</p><p>然后我们将 <code>rsi</code>（要写入的地址）设置为 <code>rcx + msg - 1</code></p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rsi, rcx
add rsi, msg-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>（<code>add a、b</code> 执行加法，<code>a += b</code> 和 <code>dec a</code> 减量 <code>--a</code>。两者都受到通常的限制：没有内存到内存的操作、两个操作数大小相同等。因为 <code>msg</code> 是常量，<code>msg-1</code> 在汇编时执行。）</p><p>最后，请注意，<code>rcx</code> 是允许系统调用会修改的寄存器之一（<code>r11</code> 是另一个），因此我们必须在系统调用之前将其保存到另一个安全的寄存器中，然后在系统调用之后恢复它：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov r15, rcx
syscall
mov rcx, r15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终形成的代码如下：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data
msg:            db      10, &quot;Hello, world!&quot;
MSGLEN:          equ     $-msg

section .text
global _start
_start:
    mov     rdi,    1               ; 1st arg, file desc. to write to
    mov     rdx,    1               ; 3rd arg, num. of chars to print
    mov rcx, MSGLEN                 ; loop counter = MSGLEN
.begin_loop
    ; Print 1 char at [msg + rcx - 1]
    mov     rax,    1               ; Syscall code in rax
    mov rsi, rcx                    ; rsi = addr to print
    add rsi, msg
    dec rsi                         ;[msg + rcx - 1]

    mov r15, rcx                    ; Save rcx before syscall
    syscall
    mov rcx, r15                    ; Restore rcx

    loop .begin_loop

    ;; Terminate process
    mov     rax,    60              ; Syscall code in rax
    mov     rdi,    0               ; First parameter in rdi
    syscall                         ; End process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yasm <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-f</span> elf64 hello2.s <span class="token parameter variable">-l</span> hello2.lst
ld <span class="token parameter variable">-g</span> <span class="token parameter variable">-o</span> hello2 hello2.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./hello
!dlrow ,olleH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="本地标签" tabindex="-1"><a class="header-anchor" href="#本地标签" aria-hidden="true">#</a> 本地标签</h2><p>当编写函数内部存在的循环或其他标签时，通过以句号开头将它们编写为本地标签非常有用。本地标签实际上是以最近的非本地标签命名的，因此 <code>.begin_loop</code> 的全名实际上是 <code>_start.begin_loop</code>。标签通常每个文件只能定义一次，因此如果没有本地标签，我们编写的其他函数就无法使用标签 <code>begin_loop</code>。</p><h2 id="负的rcx" tabindex="-1"><a class="header-anchor" href="#负的rcx" aria-hidden="true">#</a> 负的<code>rcx</code></h2><p>如果您好奇，让我们考虑一下如果 <code>rcx</code> 为负并且我们将其递减会发生什么。例如，如果 <code>rcx = 11111111 (= -1)</code>，并且我们递减：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token number">11111111</span>
 - 00000001
────────────
   <span class="token number">11111110</span>  <span class="token operator">=</span> <span class="token parameter variable">-2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，结果正是您所期望的（但与循环一起使用时不是特别有用）。</p><h2 id="loop的变化" tabindex="-1"><a class="header-anchor" href="#loop的变化" aria-hidden="true">#</a> <code>loop</code>的变化</h2><p>循环指令有两种变体，用于测试零标志 (ZF) 以及 rcx 的值：</p><ul><li><p><code>loope</code></p></li><li><p><code>loopne</code></p></li></ul><h2 id="包含文件" tabindex="-1"><a class="header-anchor" href="#包含文件" aria-hidden="true">#</a> 包含文件</h2><p>与 C/C++ 一样，yasm 有一种简单的机制将一个 .s 文件的内容包含到另一个文件中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%include &quot;source.s&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="算术运算" tabindex="-1"><a class="header-anchor" href="#算术运算" aria-hidden="true">#</a> 算术运算</h2><h2 id="简单的函数" tabindex="-1"><a class="header-anchor" href="#简单的函数" aria-hidden="true">#</a> 简单的函数</h2><p>正如我们稍后将看到的，从汇编调用 C 函数，或者使我们的汇编函数可从 C/C++ 调用，需要一些额外的步骤来正确设置堆栈。然而，只要我们纯粹停留在&quot;汇编领域&quot;，我们就不需要担心额外的复杂性；我们基本上可以让函数按照我们喜欢的方式工作。唯一的要求是我们能够从函数返回并回到原来的位置。</p><p>处理函数的两条指令是call和ret。两者都在内部使用堆栈：</p><ul><li><p>call 接受一个地址（.text 部分中的标签）并执行两个步骤：将 rip（指令指针）压入堆栈，然后跳转到给定的地址。请记住，rip 指向要执行的下一条指令，因此压入堆栈的值实际上是函数的返回地址，即函数返回时应恢复执行的地址。</p></li><li><p>ret 弹出栈顶元素并跳转到该元素。 rip 自动更新为以下指令。</p></li></ul><p>它们协同工作如下（地址只是虚构的）：</p><table><thead><tr><th>地址</th><th>指令</th><th>地址</th><th>指令</th></tr></thead><tbody><tr><td>_start:</td><td></td><td>my_func:</td><td></td></tr><tr><td>0x100</td><td>call my_func</td><td>0x200</td><td>mov eax, ...</td></tr><tr><td>0x108</td><td>mov rbx,rax</td><td>0x208</td><td>...</td></tr><tr><td></td><td>...</td><td>0x280</td><td>...</td></tr></tbody></table><p>当 <code>my_func</code> 执行时，堆栈包含 0x108，即返回地址。当执行 ret 时，该地址将从堆栈中弹出，我们从该点恢复执行。（稍后，我们会看到这意味着如果您将堆栈用于其他任何用途，则必须确保在返回之前已弹出所有内容，因此此时堆栈上唯一的内容就是退货地址。）</p><p>尽管我们可以使用任何我们喜欢的&quot;调用约定&quot;，但在传递参数和返回结果方面，您应该尝试坚持最终成为调用函数的约定：</p><ul><li>将前六个参数传递到寄存器 rdi、rsi、rdx、rcx、r8 和 r9 中。请注意，这与系统调用约定（rcx 而不是 r10）略有不同。</li><li>以 rax 格式返回结果</li></ul><p>作为示例，让我们编写一个函数来打印字符串（以地址和长度形式给出）并在末尾添加换行符。这将结束对我们一直在使用的 write 系统调用的调用。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

newline:    db      10

section .text

write_ln:

    ; rdi = address
    ; rsi = length

    mov rax, 1
    mov rdx, rsi
    mov rsi, rdi
    mov rdi, 1
    syscall

    mov rax, 1
    mov rdi, 1
    mov rsi, newline
    mov rdx, 1
    syscall

    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

msg:    db      &quot;Hello, world!&quot;
MSGLEN: equ     $-msg

section .text

    mov rdi, msg
    mov rsi, MSGLEN
    call write_ln

    ; Normal exit syscall...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>sys_write:

    <span class="token punctuation">;</span> rdi <span class="token operator">=</span> address
    <span class="token punctuation">;</span> rsi <span class="token operator">=</span> length

    mov rax, <span class="token number">1</span> 
    mov rdx, rsi
    mov rsi, rdi
    mov rdi, <span class="token number">1</span>
    syscall

    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数指针" tabindex="-1"><a class="header-anchor" href="#函数指针" aria-hidden="true">#</a> 函数指针</h3><p>传递给 call 的地址可以是寄存器，而不仅仅是标签：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov r11, my_function
call r11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于通过函数指针调用函数。</p><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2><p>原文中存在错误，原文中的write_ln是这样的，rdi表示的是字符串的地址，但是这里已经被立即数1进行了覆盖。并且rsi存放的内容也被rdi覆盖。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rax, 1 
    mov rdi, 1
    mov rsi, rdi
    mov rdx, rsi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此需要调整顺序：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rax, 1
    mov rdx, rsi
    mov rsi, rdi
    mov rdi, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录-1" tabindex="-1"><a class="header-anchor" href="#附录-1" aria-hidden="true">#</a> 附录</h2>`,106),h={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-arithmetic-functions.html",target:"_blank",rel:"noopener noreferrer"};function g(x,k){const s=c("ExternalLinkIcon");return d(),r("div",null,[t,u,n("p",null,[e("(这里原文中的介绍相对比较笼统，细节可以参考维基百科，"),n("a",p,[e("原码"),a(s)]),e("， "),n("a",v,[e("反码"),a(s)]),e("，"),n("a",m,[e("补码"),a(s)]),e("。")]),b,n("p",null,[e("原文链接： "),n("a",h,[e("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-arithmetic-functions.html"),a(s)])])])}const y=l(o,[["render",g],["__file","Lecture4-twos-complement-arithmetic-instructions.html.vue"]]);export{y as default};
