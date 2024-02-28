import{_ as i,V as e,W as d,a0 as n}from"./framework-9a29aaa0.js";const s={},l=n(`<hr><p>category:</p><ul><li>汇编语言</li></ul><hr><h1 id="第四讲-算术运算和简单函数" tabindex="-1"><a class="header-anchor" href="#第四讲-算术运算和简单函数" aria-hidden="true">#</a> 第四讲：算术运算和简单函数</h1><p>今天我们将介绍：</p><ul><li>负值的二进制表示。</li><li>多字节数字的内存表示。</li><li>专用寄存器 <code>rif</code>、<code>rflags</code> 和其他一些寄存器。</li><li>算术指令<code>add</code>、<code>sub</code>、<code>inc</code>、<code>dec</code>。</li><li>算术指令对对标志寄存器 rflags 的影响。</li><li>我们将简要了解无符号乘法/除法/模指令 mul 和 div。</li><li>函数指令call和ret</li></ul><p>上次我们学过的指令：</p><ul><li>mov - 在寄存器、内存之间移动操作数值</li><li>inc - 增加寄存器或内存值。</li><li>syscall – 调用操作系统函数。</li></ul><h2 id="回顾" tabindex="-1"><a class="header-anchor" href="#回顾" aria-hidden="true">#</a> 回顾</h2><h3 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h3><h2 id="简单的函数" tabindex="-1"><a class="header-anchor" href="#简单的函数" aria-hidden="true">#</a> 简单的函数</h2><p>正如我们稍后将看到的，从汇编调用 C 函数，或者使我们的汇编函数可从 C/C++ 调用，需要一些额外的步骤来正确设置堆栈。然而，只要我们纯粹停留在&quot;汇编领域&quot;，我们就不需要担心额外的复杂性；我们基本上可以让函数按照我们喜欢的方式工作。唯一的要求是我们能够从函数返回并回到原来的位置。</p><p>处理函数的两条指令是call和ret。两者都在内部使用堆栈：</p><ul><li><p>call 接受一个地址（.text 部分中的标签）并执行两个步骤：将 rip（指令指针）压入堆栈，然后跳转到给定的地址。请记住，rip 指向要执行的下一条指令，因此压入堆栈的值实际上是函数的返回地址，即函数返回时应恢复执行的地址。</p></li><li><p>ret 弹出栈顶元素并跳转到该元素。 rip 自动更新为以下指令。</p></li></ul><p>它们协同工作如下（地址只是虚构的）：</p><table><thead><tr><th>地址</th><th>指令</th><th>地址</th><th>指令</th></tr></thead><tbody><tr><td>_start:</td><td></td><td>my_func:</td><td></td></tr><tr><td>0x100</td><td>call my_func</td><td>0x200</td><td>mov eax, ...</td></tr><tr><td>0x108</td><td>mov rbx,rax</td><td>0x208</td><td>...</td></tr><tr><td></td><td>...</td><td>0x280</td><td>...</td></tr></tbody></table><p>当 <code>my_func</code> 执行时，堆栈包含 0x108，即返回地址。当执行 ret 时，该地址将从堆栈中弹出，我们从该点恢复执行。（稍后，我们会看到这意味着如果您将堆栈用于其他任何用途，则必须确保在返回之前已弹出所有内容，因此此时堆栈上唯一的内容就是退货地址。）</p><p>尽管我们可以使用任何我们喜欢的&quot;调用约定&quot;，但在传递参数和返回结果方面，您应该尝试坚持最终成为调用函数的约定：</p><ul><li>将前六个参数传递到寄存器 rdi、rsi、rdx、rcx、r8 和 r9 中。请注意，这与系统调用约定（rcx 而不是 r10）略有不同。</li><li>以 rax 格式返回结果</li></ul><p>作为示例，让我们编写一个函数来打印字符串（以地址和长度形式给出）并在末尾添加换行符。这将结束对我们一直在使用的 write 系统调用的调用。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33),a=[l];function r(c,v){return e(),d("div",null,a)}const m=i(s,[["render",r],["__file","Lecture4-twps-complement-arithmetic-instructions.html.vue"]]);export{m as default};
