import{_ as s,V as l,W as r,X as d,Y as e,$ as a,a0 as n,F as c}from"./framework-9a29aaa0.js";const v={},m=n(`<h1 id="第十九讲-宏定义" tabindex="-1"><a class="header-anchor" href="#第十九讲-宏定义" aria-hidden="true">#</a> 第十九讲： 宏定义</h1><p>就像 C/C++ 一样，YASM 有一个预处理器，它在实际进行汇编之前对汇编程序的文本进行操作。因为它在汇编时运行，所以它实际上可以是比汇编本身更丰富的“语言”。另一方面，因为它在汇编时运行，所以它不能引用任何运行时信息（寄存器或内存的内容）。基于文本的宏定义语言实际上在计算机科学中相当常见，因此值得深入了解至少一种（如果您还没有研究过 C/C++ 预处理器）。</p><h2 id="错误" tabindex="-1"><a class="header-anchor" href="#错误" aria-hidden="true">#</a> 错误</h2><p>我们可以使用 <code>%error</code> 宏停止汇编并打印消息：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%error Something went wrong.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="包含文件" tabindex="-1"><a class="header-anchor" href="#包含文件" aria-hidden="true">#</a> 包含文件</h2><p>就像在 C/C++ 中一样，我们可以在当前 <code>.s</code> 文件中包含另一个文件的内容：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%include &quot;file.s&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将直接包含 <code>file.s</code> 的内容。</p><p>请注意，有一种不同的机制可将二进制文件嵌入到汇编文件中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>data:     incbin &quot;file.data&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将二进制文件<code>file.dat</code>的内容包含到可执行文件中，标记为<code>data</code>。</p><h2 id="单行宏" tabindex="-1"><a class="header-anchor" href="#单行宏" aria-hidden="true">#</a> 单行宏</h2><p>从本质上讲，宏预处理器的工作原理是用一些其他文本替换一些文本。例如:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define accumulator     rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>表示每当看到<code>accumulator</code>时，都应该将其替换为文本 <code>rax</code>。因此，我们现在可以写类似的东西:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>add accumulator, 10   ; Equivalent to    add rax, 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>宏可以重新定义，我们可以做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define accumulator rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define accumulator rcx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>accumulator</code>将扩展到最新定义的内容。</p><p>我们可以用另一个宏来定义一个宏</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define increment   inc accumulator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，当我们写:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>increment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将首先扩展为 <code>inc accumulator</code>，然后扩展为 <code>inc rax</code>。请注意，<code>accumulator</code>的扩展不会在我们<code>%define increment</code>时发生，而是在我们使用<code>increment</code>时发生。这意味着在定义其他宏期间，宏扩展会暂时停止。如果稍后重新定义<code>accumulator</code>（如上所述），则<code>accumulator</code>将使用最新的定义，而不是定义时的定义。</p><p>另一方面，有时我们希望在定义时扩展定义，而不是等到使用时才扩展。如果使用 <code>%xdefine</code> 定义宏，则定义将在定义点立即展开。通过重新定义宏可以看出差异：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define a  1
%define b  a
%xdefine c a        ; Equivalent to %define x 1
...
%define a 2
mov rax, b          ; Expands to mov rax, 2
mov rcx, c          ; Expands to mov rax, 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果定义一个宏来扩展自身，例如 <code>%define x x</code>，使用它不会使汇编器进入无限循环。当我们稍后看到函数式宏时，这意味着递归是不可能的。请注意，这对于 <code>%xdefine</code> 宏来说不是问题。</p><p>通过使用 %undef 可以取消定义宏（因此使用其名称是错误的）：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%undef accumulator

...
mov rbx, accumulator 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二行将假设累加器是一个标签，如果没有这样定义，则给出错误。</p><h2 id="函数式宏" tabindex="-1"><a class="header-anchor" href="#函数式宏" aria-hidden="true">#</a> 函数式宏</h2><p>单行宏可以有参数</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define increment(r)    inc r
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要使用它，我们必须提供参数，无论何时使用 r，该参数都将被拼接到扩展中：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>increment(rax)              ; expands to inc rax
increment(qword [var])      ; expands to inc qword [var]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>多个参数之间用逗号分隔：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define swap(a,b)       xchg a, b
...
swap(rax, rdi)          ; Expands to xchg rax, rdi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YASM允许“宏重载”；多个宏具有相同的名称和不同数量的参数，具有不同的定义。</p><h2 id="区分大小写" tabindex="-1"><a class="header-anchor" href="#区分大小写" aria-hidden="true">#</a> 区分大小写</h2><p>宏默认区分大小写：<code>%define foo 1</code> 将扩展 <code>foo</code>，但不扩展 <code>Foo</code> 或 <code>FOO</code>。有些汇编器不区分大小写，因此为了兼容性，YASM 有 <code>%idefine</code> 和 <code>%xidefine</code> 定义不区分大小写的宏。</p><h2 id="连接宏扩展" tabindex="-1"><a class="header-anchor" href="#连接宏扩展" aria-hidden="true">#</a> 连接宏扩展</h2><p>有时我们需要通过一些宏扩展来形成单个字符串。例如，如果我们写：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define reg(b) r b

reg(ax)         ; Expands to r ax, which is *not* a register!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>a %+ b</code> 连接左右两侧的文本，“吃掉”其周围的任何空格。 <code>reg</code> 的正确定义是:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define reg(b) r %+ b

reg(ax)        ; Expands to rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="算术扩展宏" tabindex="-1"><a class="header-anchor" href="#算术扩展宏" aria-hidden="true">#</a> 算术扩展宏</h2><p>假设我们要定义一个包含一个数值的宏，然后能够递增它。我们可以尝试这样的事情：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%xdefine v 0
...
%xdefine v v+1      ; Now v expands to 0+1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是可行的，因为汇编器将在预处理器完成后执行算术 0+1 并计算出正确的值，但它很麻烦。经过很多几次增量后，我们才可以将 v 扩展到更大的数字 。</p><p>我们可以使用 <code>%assign</code> 来代替这样做。 <code>%assign</code> 的工作方式与 <code>%xdefine</code> 类似，只不过它评估其定义中的任何算术。所以我们可以使用：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%assign v 0
%assign v v+1       ; Now v expands to 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，v 的展开总是类似于数字的东西，而不是像 0+1 这样的字符串。</p><h2 id="字符串处理" tabindex="-1"><a class="header-anchor" href="#字符串处理" aria-hidden="true">#</a> 字符串处理</h2><p>YASM 的预处理器具有一些处理字符串文字的功能：“...”或“...”。您可以提取字符串文字的长度（字符数）：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%strlen len &quot;String&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这<code>%assign</code>将 len设置为6。请注意，以下内容将不起作用：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>string:     db  &quot;String&quot;

%strlen len string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 string 不是字符串，而是指向内存中字符串第一个字符的标签（地址）。另一方面，我们可以定义一个扩展为字符串文字的宏，然后询问其长度：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define string &quot;String&quot;
%strlen len string
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，您可以在字符串文字中添加“下标”来添加额外的单个字符：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%substr c &quot;String&quot; 2        ; Defines c to be &#39;r&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下标以 1 开头，而不是 0，因此最后一个字符的位置等于字符串的 %strlen。(TODO 这里描述前后不一致)</p><h2 id="多行宏" tabindex="-1"><a class="header-anchor" href="#多行宏" aria-hidden="true">#</a> 多行宏</h2><p>更复杂的宏将需要多行定义。这是通过使用 <code>%macro</code> 和 <code>%endmacro</code> 来完成的：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro swap 2
    mov r11, %1
    mov %1, %2
    mov %2, r11
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与单行宏不同，多行宏只知道参数的数量（上面的 2 个），而不知道它们的名称。参数的名称始终为 <code>%1</code>、<code>%2</code> 等。</p><p>要调用多行宏，请使用其名称，后跟其参数（不在括号中）</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>swap rax, rcx
; Expands into 
;   mov r11, rax
;   mov rax, rbx
;   mov rbx, r11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与单行宏一样，多行宏可以在参数数量上超载。您甚至可以定义与指令同名的多行宏：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro push 2
    push %1
    push %2
%endmacro
...
push rax            ; Normal push instruction
push rax, rbx       ; Expands to the above
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>汇编器会发出警告，但上面的代码工作得很好</p><h2 id="其余参数" tabindex="-1"><a class="header-anchor" href="#其余参数" aria-hidden="true">#</a> 其余参数</h2><p>您可以创建一个多行宏，它接受任意数量的参数。例如，</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro print 1+
  section .data
    %%string:   db      %1
    %%strlen:   equ     $-%%string

  section .text
    mov rax, 1
    mov rdi, 1
    mov rsi, %%string
    mov rdx, %%strlen
    syscall
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们暂时切换到 <code>.data</code> 部分以添加新的字符串常量，然后切换回 <code>.text</code> 并展开到打印它的系统调用。我们可以像这样使用它:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>print &quot;Hello world!&quot;, 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并且无论给出多少个参数，它们都会被放在<code>%1</code>中。</p><p>请注意，我们不能再使用 2、3 等参数来重载 <code>print</code>。这给定的定义有效地定义了从 1 到无穷大的所有参数计数的 <code>print</code> 的不同版本。</p><h2 id="默认参数" tabindex="-1"><a class="header-anchor" href="#默认参数" aria-hidden="true">#</a> 默认参数</h2><p>我们可以支持一个范围，并为任何省略的参数提供默认值：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro swap 2-3 r11
    mov %3, %1
    mov %1, %2
    mov %2, %3
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的<code>2-3</code>表示swap接受2-3个参数。如果提供两个参数，则r11则默认作为第三个参数。</p><p>如果我们将其用作交换 <code>rax</code>、<code>rbx</code>，则 <code>%3</code> 会扩展为默认值 <code>r11</code>。另一方面，如果我们提供第三个参数，例如 <code>swap rax、rbx、r15</code>，则提供的第三个参数<code>r15</code>将用于 <code>%3</code>。</p><p>如果我们创建一个具有 3-5 个参数的宏，那么我们必须提供 5-3 = 2 个默认值，这些默认值将成为参数 <code>%4</code> 和 <code>%5</code> 的默认值。如果省略默认值，则默认值将不扩展为任何内容。</p><p>默认参数可以与其余参数组合；你可以写 3-5+，这意味着 3 或更多，但任何超过 5 的都进入 <code>%5</code>。</p><p>您可以通过写入 <code>3-*</code>（三到无穷大）来指定无限的最大参数数量。当然，您无法为所有这些编写默认值。它和 + 之间的区别在于 + 将所有剩余参数分组为一个参数，同时这使得它们都可以单独访问。 <code>%0</code>表示的是提供的实际参数的数量。</p><h2 id="旋转参数列表" tabindex="-1"><a class="header-anchor" href="#旋转参数列表" aria-hidden="true">#</a> 旋转参数列表</h2><p>假设宏采用三个参数：<code>%1</code>、<code>%2</code>、<code>%3</code>。我们可以通过发出宏<code> %rotate 1</code> 来旋转列表。旋转后，原来的第二个参数会在第一个位置，第三个参数会在第二个位置，而第一个参数会一直旋转到3。这在重复宏中最有用，因为它允许我们访问所有参数而无需数字索引。例如，以下是推送的一个版本，它接受任意数量的参数并推送所有参数：例如，以下是推送的一个版本，它接受任意数量的参数并推送所有参数：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro push 2-*
  %rep %0
    push %1
    %rotate 1
  %endrep
%endmacro

push rax, rbx, rcx, qword [var]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里<code>%0</code>的值为4。</p><p>如果 n 为正数，<code>%rotate n</code> 将参数列表向左旋转 n 个空格（朝向参数 %1）。如果n为负数，则向右旋转。</p>`,94),o=d("code",null,"%rep ... %endrep",-1),u={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-macros.html#repeating-macros",target:"_blank",rel:"noopener noreferrer"},t=n(`<h2 id="宏局部名称" tabindex="-1"><a class="header-anchor" href="#宏局部名称" aria-hidden="true">#</a> 宏局部名称</h2><p>如果多行宏可以扩展为代码，我们可能希望扩展为包含标签的代码（例如，扩展为循环）。然而，如果宏被多次扩展，这将会导致问题；那么我们就会对同一个标签有多个定义。为了解决这个问题，我们可以使用宏局部标签。宏局部标签是名称以 <code>%%</code> 开头的普通标签。例如，</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro retz 0
    jnz     %%skip
    ret

  %%skip:
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每次扩展宏时，都会为标签 <code>%%skip</code> 生成一个新的唯一名称，因此所有扩展都不会相互干扰。</p><p>宏本地名称实际上不必用作标签。例如，我们可以使用它作为单行宏名称来创建一种&quot;局部变量&quot;：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro testmacro 0
    %assign %%v 0
    mov rax, %%v
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，变量<code>%%v</code>每次宏展开时都会获得不同的名称。</p><h2 id="串联多行参数" tabindex="-1"><a class="header-anchor" href="#串联多行参数" aria-hidden="true">#</a> 串联多行参数</h2><p>与需要特殊 <code>%+</code> 运算符来连接的单行参数不同，多行参数不需要这样的表示法：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro string_n 2
    string%1:   db  %2
%endmacro

string_n 7 &quot;Hello&quot;          ; Expands into string7: db &quot;Hello&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想在参数后面连接一些文本，我们可以写 <code>%{1}text</code>;这将扩展 <code>%1</code>，然后在扩展后立即添加文本，中间没有空格。</p><h2 id="条件码参数" tabindex="-1"><a class="header-anchor" href="#条件码参数" aria-hidden="true">#</a> 条件码参数</h2><p>YASM 对包含条件代码（<code>z</code>、<code>ge</code> 等）的参数有特殊支持。如果 <code>%1</code> 扩展为条件代码，则 <code>%-1</code> 扩展为该代码的否定。例如，z 变为 nz，ge 变为 l，等等。类似地，<code>%+1</code> 扩展为原始的、未更改的条件代码，只不过它强制参数实际上是条件代码，如果不是，则给出错误。</p><p>例如，上面的 <code>retz</code> 宏可以推广为允许任何条件代码（默认为 <code>z</code>）的宏，方法是：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro retcc 0-1 z
    j%-1    %%skip
    ret

  %%skip:
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件宏" tabindex="-1"><a class="header-anchor" href="#条件宏" aria-hidden="true">#</a> 条件宏</h2><p>通常，我们希望根据某些（汇编时）参数包含源文本的某些部分，并在其余时间排除它或用其他文本替换它。这可以通过条件宏来完成。最基本的条件宏反映了熟悉的 if-else if-else 语句：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%if&lt;condition&gt;
    ...
%elif&lt;condition&gt;
    ...
%else
    ...
%endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所期望的，0 个或超过 1 个 %elif-s 是允许的，最后的 %else 是可选的。请注意，条件立即出现在 %if/%elif 之后，中间没有空格。</p><h2 id="def-–-检查单行宏的定义" tabindex="-1"><a class="header-anchor" href="#def-–-检查单行宏的定义" aria-hidden="true">#</a> def – 检查单行宏的定义</h2><p>我们可以使用 %ifdef 来检查给定的（单行）宏是否已经被定义。例如，</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%ifdef DEBUG
    ... ; Debug build code
%else
    ... ; Production code
%endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>未定义可以使用条件 <code>ndef</code> 进行测试。</p><h2 id="检查多行定义的宏" tabindex="-1"><a class="header-anchor" href="#检查多行定义的宏" aria-hidden="true">#</a> 检查多行定义的宏</h2><p>宏检查是否定义了多行宏：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%ifmacro push 2+

    ; Multi-arg push is defined

%endif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数值表达式" tabindex="-1"><a class="header-anchor" href="#数值表达式" aria-hidden="true">#</a> 数值表达式</h2><p><code>%if expr</code> 将检查数值表达式 expr，如果其值非零则继续。您可以在表达式中使用普通的比较运算符。请注意，相等是=（单个等于），不等是&lt;&gt;。</p><h2 id="idn-–-文本比较" tabindex="-1"><a class="header-anchor" href="#idn-–-文本比较" aria-hidden="true">#</a> <code>idn</code> – 文本比较</h2><p>如果 t1 和 t2 扩展为相同的文本序列，则 <code>%ifidn t1, t2</code>返回真。</p><p><code>num、id、str</code> – 检查令牌类型</p><ul><li>如果 t 扩展为看起来像数字的内容，则 <code>%ifnum t</code> 成功。</li><li><code>%ifid t</code> 如果 t 扩展为看起来像标识符的东西（即标签或 equ），则成功</li><li>如果 t 扩展为看起来像字符串文字的内容，则 <code>%ifstr t</code> 成功。</li></ul><h2 id="重复宏" tabindex="-1"><a class="header-anchor" href="#重复宏" aria-hidden="true">#</a> 重复宏</h2><p>要重复某些文本一定次数，我们使用 <code>%rep</code>：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%rep 10
    inc rax
%endrep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将扩展为十个 <code>inc rax</code> 指令。 <code>%rep</code> 的参数可以是数值表达式。</p><p><code>%assign</code> 可以与 <code>%rep</code> 一起使用来创建循环变量：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%assign i 0
%rep 10
    mov qword [arr + i], i
    %assign i i+1
%endrep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将地址 <code>arr</code> 处的 10-qword 数组初始化为 0, 1, 2, 3, … 9</p><p>我们可以使用 <code>%exitrep</code> 提前停止 <code>%rep</code>：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data
data:

%assign i 1
%rep 100
    db i
    %assign i i*2
    %if i &gt; 1024
        %exitrep
    %endif
%endrep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将创建一个带有标签数据的数组，其初始化为 1, 2, 4, 8, ...。</p><h2 id="上下文堆栈" tabindex="-1"><a class="header-anchor" href="#上下文堆栈" aria-hidden="true">#</a> 上下文堆栈</h2><p>上下文堆栈是一种允许诸如宏本地标签之类的机制（如果宏多次扩展，这些标签不会中断）， 但被多个宏定义共享。例如，目前，一个宏中定义的宏局部标签不能以任何方式被另一个宏引用；它是看不见的。这使得定义更高级的宏（通常需要多个定义）变得困难或不可能。</p><p>为了解决这个问题，YASM 维护了一个“上下文”堆栈。可以创建堆栈顶部上下文本地的标签。新的上下文可以使用 %push 推入堆栈顶部，并可以使用 %pop 删除。由于使用了堆栈，因此可以嵌套精美的宏而不会相互破坏。</p><h2 id="上下文本地标签" tabindex="-1"><a class="header-anchor" href="#上下文本地标签" aria-hidden="true">#</a> 上下文本地标签</h2><p>要创建当前上下文本地的标签，我们编写 <code>%$name</code>。这也可以用于 <code>%define</code> 或 <code>%assign</code> 一个宏，其名称是当前上下文的本地宏：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%define %$lm 5
%assign %$i 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这可以防止变量干扰其他作用域。</p><p>请注意，当上下文被 <code>%pop-ed</code> 时，其所有本地标签/宏都是未定义的。</p><h2 id="示例-块-if-语句" tabindex="-1"><a class="header-anchor" href="#示例-块-if-语句" aria-hidden="true">#</a> 示例：块 IF 语句</h2><p>假设我们想定义一个宏，它允许我们编写一个更自然的 if-like 结构：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>IF rax, e, rcx
    ...
ENDIF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这扩展到类似的东西</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp rax, rcx
jne .endif
    ...
.endif:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了标签 <code>.endif</code> 应该为每个 IF-ENDIF 唯一生成之外。</p><p>我们需要定义两个%宏：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro IF 3
    %push if 
    cmp %1, %3
    j%-2 %$endif
%endmacro

%macro ENDIF 0
    %$endif:
    %pop
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>当我们调用 IF 宏时，它会将 if 上下文压入堆栈，让我们知道我们处于 if 内部。</p></li><li><p>它还执行比较，如果比较失败则跳转。</p></li><li><p><code>ENDIF</code> 宏创建作为 (2) 中跳转目标的标签，并从堆栈中删除 if 上下文（因为我们不再位于 if 内部）。</p></li></ul><p>这个宏可以工作，但是如果我们使用没有匹配 IF 的 ENDIF，它会严重失败。我们可以使用 %ifctx 条件来检查堆栈顶部的上下文，如果不在 IF 内，则发出错误：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro ENDIF 0
    %ifctx if
        %$endif:
        %pop
    %else
        %error Expected IF before ENDIF
    %endif
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用类似的技术来定义用于迭代的 DO-WHILE 宏：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro DO 0
    %push do_while
    %$do
%endmacro

%macro WHILE 3
    %ifctx do_while
        cmp %1, %3
        j%-2 %$do
    %else
        %error Expected DO before WHILE
    %endif
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这可以用作</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, 0
DO
    mov qword [arr + rax], rax
    inc rax

WHILE rax, le, 100 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些循环/if 甚至可以相互嵌套，只要它们使用不同的寄存器即可。</p><p>另一个例子：<code>PROC</code>/<code>ENDPROC</code>在微软汇编器中用于标记函数的开始/结束：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>PROC myfunction
    ... Stuff

ENDPROC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 MASM 中，需要这些来使函数内部的标签成为函数的本地标签； YASM不需要这个，因为我们有本地标签，但我们仍然可以定义它们以实现兼容性。我们甚至可以添加一些错误检查，这样没有 PROC 的 ENDPROC 或嵌套 PROC 就是一个汇编时错误:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>%macro PROC 1
    %ifnctx proc
        %push proc
        %{1}:
    %else
        %error Found PROC without preceding closing ENDPROC
    %endif
%endmacro

%macro ENDPROC 0
    %ifctx proc
        %pop 
    %else
        %error Found ENDPROC without preceding PROC
    %endif
%endmacro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,70),p={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-macros.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.tortall.net/projects/yasm/manual/html/manual.html#nasm-macro-context-local",target:"_blank",rel:"noopener noreferrer"};function x(h,g){const i=c("ExternalLinkIcon");return l(),r("div",null,[m,d("p",null,[o,e(" 稍后在"),d("a",u,[e("重复宏"),a(i)]),e("下讨论。")]),t,d("p",null,[e("原文链接： "),d("a",p,[e("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-macros.html"),a(i)])]),d("p",null,[e("yasm 介绍文档： "),d("a",b,[e("https://www.tortall.net/projects/yasm/manual/html/manual.html#nasm-macro-context-local"),a(i)])])])}const w=s(v,[["render",x],["__file","Lecture19-macros.html.vue"]]);export{w as default};
