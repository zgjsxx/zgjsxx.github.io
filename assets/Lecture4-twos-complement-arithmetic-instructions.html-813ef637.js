import{_ as l,V as d,W as r,X as n,Y as e,$ as a,a0 as i,F as c}from"./framework-9a29aaa0.js";const t={},o=i('<hr><p>category:</p><ul><li>汇编语言</li></ul><hr><h1 id="第四讲-算术运算和简单函数" tabindex="-1"><a class="header-anchor" href="#第四讲-算术运算和简单函数" aria-hidden="true">#</a> 第四讲：算术运算和简单函数</h1><p>今天我们将介绍：</p><ul><li>负值的二进制表示。</li><li>多字节数字的内存表示。</li><li>专用寄存器 <code>rip</code>、<code>rflags</code> 和其他一些寄存器。</li><li>算术指令<code>add</code>、<code>sub</code>、<code>inc</code>、<code>dec</code>。</li><li>算术指令对对标志寄存器 rflags 的影响。</li><li>我们将简要了解无符号乘法/除法/模指令 mul 和 div。</li><li>函数指令call和ret</li></ul><p>上次我们学过的指令：</p><ul><li>mov - 在寄存器、内存之间移动操作数值</li><li>inc - 增加寄存器或内存值。</li><li>syscall – 调用操作系统函数。</li></ul><h2 id="回顾" tabindex="-1"><a class="header-anchor" href="#回顾" aria-hidden="true">#</a> 回顾</h2><h3 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h3><p>上一讲中，我们学习了我们可用的所有的通用寄存器：<code>rax</code>，<code>rbx</code>，<code>rcx</code>，<code>rdx</code>，<code>rdi</code>，<code>rsi</code>，<code>rbp</code>，<code>rsp</code>，<code>r8</code>至<code>r15</code>。</p><p>我们看到了如何以完整的 64 位 (qword) 宽度或低位双字、低位字或低位字节来访问其中的每一个：</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/language/assembly/fullerton_CSci241/lecture3/common_register.png" alt="common_register" tabindex="0" loading="lazy"><figcaption>common_register</figcaption></figure><p>我们看到许多指令（包括 <code>mov</code> 和 <code>xor</code>）在对寄存器的低位双字部分进行操作时，会隐式地将高位双字清零，并且我们研究了一些保留高位双字的策略。</p><p>我们查看了标志寄存器 <code>rflags</code>，它用于存储有关各种操作结果的信息。对我们来说最重要的标志是:</p><ul><li>CF – 进位标志，如果无符号运算的结果产生额外的进位/借位则设置</li><li>OF – 溢出标志，如果有符号运算的结果太大/太小而无法存储，则设置</li><li>ZF – 零标志，如果结果的所有位均为 0，则设置该标志。</li><li>SF – 符号标志，如果结果的高位被置位则置位</li></ul><p>我们看到 <code>mov</code> 指令是我们在寄存器、内存和立即（常量）值之间移动数据的基本工具。我们还看到了 <code>xchg</code> 指令，它交换操作数，使我们不必使用寄存器作为临时变量。</p><h2 id="负数" tabindex="-1"><a class="header-anchor" href="#负数" aria-hidden="true">#</a> 负数</h2><p>前面描述的所有算术运算符都假设输入值为正。那么如果输入有负数该如何处理？一般来说， 有四种处理办法：</p>',20),u=n("ul",null,[n("li",null,[n("p",null,[e("符号位(源码)： 在十进制中，我们用"),n("code",null,"-"),e("符号表示负数， 那么为什么不用一个位来表示这个数字是负数呢？其实，数字的最高位就是用来做这个事情。例如 00000011b 是 3，但 10000011b 是 -3。虽然这个办法对我们来说很容易理解，但是在实现时确有几个缺点：")]),n("ul",null,[n("li",null,"现在0有两种表示，一个是正数0，一个是负数0。"),n("li",null,"值的算术更加复杂，因为我们必须检查两个值的符号位。如果我们忘记并执行无符号运算，结果将是无意义的。"),n("li",null,"CPU 必须根据符号位的值在执行加法运算和执行减法运算之间切换。也就是说，CPU 无法将自己设置为执行加法/减法，直到它也知道正在操作的值。 浮点值使用符号位，部分原因是它们希望同时具有正零和负零。")])]),n("li",null,[n("p",null,'偏置表示法(biasd)。这表示所有值（不仅仅是负值）都叠加一个固定量。所以0不是0，而是0+127（=01111111b）什么的。 3是3+127=10000010b，-3是-3+127=01111100b。请注意，高位用作一种"正号位"；如果已设置，则该数字为正数（大于 0）。'),n("ul",null,[n("li",null,[n("p",null,"加法和减法（在某种程度上）正常工作，只是我们必须在执行正常运算后​​“消除”值的偏差。例如，添加 3 和 -3 得出："),n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e("    "),n("span",{class:"token number"},"10000010"),e(`
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
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,"0 只有一种表示形式，而不是两种，而且就是 0b。")]),n("li",null,[n("p",null,"表示的值的范围（通过字节）为 -128 到 +127。")]),n("li",null,[n("p",null,"这里不需要在二进制补码中进行结束借用/进位。"),n("p",null,"x86-x64系统(以及许多其他系统)使用二进制补码，因为它不需要任何额外的电路来表示或操作负数。你只需进行“正常”的二进制加法，结果就是正确的。")])])])],-1),m={href:"https://zh.wikipedia.org/wiki/%E5%8E%9F%E7%A0%81",target:"_blank",rel:"noopener noreferrer"},v={href:"https://zh.wikipedia.org/wiki/%E4%B8%80%E8%A3%9C%E6%95%B8",target:"_blank",rel:"noopener noreferrer"},p={href:"https://zh.wikipedia.org/wiki/%E4%BA%8C%E8%A3%9C%E6%95%B8",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>乘法是一种非常昂贵的运算，我们通常不会费心尝试在数字表示“内部”进行它。相反，我们只是将两个操作数都设为正数，然后相乘，然后根据需要对结果取负。</p><p>另一个例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>   <span class="token number">11</span>  <span class="token number">1</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据尺寸的延展" tabindex="-1"><a class="header-anchor" href="#数据尺寸的延展" aria-hidden="true">#</a> 数据尺寸的延展</h3><p>假设我们有一个8位的数字，我们希望将其存储到16位的空间中。如果这个数字是无符号的，那么这很容易。直接将数字复制到低8位，然后用0填充到高8位。但是如果该值是有符号的（二进制补码）怎么办? 在这种情况下，为了获取等效的值，我们需要对扩展后的数字添加符号位，将原本的数字中的高位填充扩充后的数字的高位。如果高位原来为1，则高8位必须全部为1，否则应为0。</p><p>许多可以“混合”不同字长值的算术运算有两种形式：“零扩展”（用 0 填充）的无符号形式和符号扩展（复制高位）的有符号形式。</p><h3 id="内存中的表示" tabindex="-1"><a class="header-anchor" href="#内存中的表示" aria-hidden="true">#</a> 内存中的表示</h3><h2 id="访问内存" tabindex="-1"><a class="header-anchor" href="#访问内存" aria-hidden="true">#</a> 访问内存</h2><h2 id="简单的循环" tabindex="-1"><a class="header-anchor" href="#简单的循环" aria-hidden="true">#</a> 简单的循环</h2><p>因为做任何有趣的事情都需要循环，所以我们将介绍<code>loop</code>指令。循环采用单个操作数，一个要跳转到的标签（在内部，循环存储标签地址相对于当前指令地址的偏移量）。循环的操作是执行以下步骤：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rcx, init       ; Initialize rcx &gt; 0

.start_loop:

    ; ... Perform loop operation using rcx

    loop .start_loop

    ; ... Continue after end of loop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这大致相当于 C/C++ 风格的 do-while 循环：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>rcx <span class="token operator">=</span> init<span class="token punctuation">;</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>

    <span class="token comment">// ... Perform loop operation</span>

    <span class="token operator">--</span>rcx<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span>rcx <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，因为 <code>rcx</code> 是允许系统调用破坏的寄存器之一，所以如果您在循环内执行任何系统调用，则需要在调用之前保存 rcx，然后在循环之后恢复它。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

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
    syscall

    loop .begin_loop

    ;; Terminate process
    mov     rax,    60              ; Syscall code in rax
    mov     rdi,    0               ; First parameter in rdi
    syscall                         ; End process
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="包含文件" tabindex="-1"><a class="header-anchor" href="#包含文件" aria-hidden="true">#</a> 包含文件</h2><p>与 C/C++ 一样，yasm 有一种简单的机制将一个 .s 文件的内容包含到另一个文件中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%include &quot;source.s&quot;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录-1" tabindex="-1"><a class="header-anchor" href="#附录-1" aria-hidden="true">#</a> 附录</h2>`,47),h={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-arithmetic-functions.html",target:"_blank",rel:"noopener noreferrer"};function g(x,k){const s=c("ExternalLinkIcon");return d(),r("div",null,[o,u,n("p",null,[e("(这里原文中的介绍相对比较笼统，细节可以参考维基百科，"),n("a",m,[e("原码"),a(s)]),e("， "),n("a",v,[e("反码"),a(s)]),e("，"),n("a",p,[e("补码"),a(s)]),e("。")]),b,n("p",null,[e("原文链接： "),n("a",h,[e("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-arithmetic-functions.html"),a(s)])])])}const _=l(t,[["render",g],["__file","Lecture4-twos-complement-arithmetic-instructions.html.vue"]]);export{_ as default};
