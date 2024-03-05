import{_ as n,V as e,W as s,a0 as i}from"./framework-9a29aaa0.js";const a={},d=i(`<h1 id="第七讲-函数和栈" tabindex="-1"><a class="header-anchor" href="#第七讲-函数和栈" aria-hidden="true">#</a> 第七讲 函数和栈</h1><h2 id="条件和循环的示例" tabindex="-1"><a class="header-anchor" href="#条件和循环的示例" aria-hidden="true">#</a> 条件和循环的示例</h2><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

buf:    db    &quot;Hello, world!&quot;, 10
BUFLEN: equ   $-buf

section .text
...

  mov rax, buf

.begin_loop:
  cmp rax, buf + BUFLEN
  je .end_loop

    ... ; Process byte [rax]

  jmp .begin_loop
.end_loop:
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于一个 <code>while</code> 循环，如果 <code>BUFLEN</code> 为 0，则循环根本不会运行。</p><h2 id="计算-rax-的符号" tabindex="-1"><a class="header-anchor" href="#计算-rax-的符号" aria-hidden="true">#</a> 计算 <code>rax</code> 的符号</h2><p>如果 <code>rax</code> 为负，则将 <code>rbx</code> 设置为 -1；如果等于 0，则将 rbx 设置为 0；如果为正，则将 <code>rbx</code> 设置为 +1：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>
  cmp rax, 0
  jl .negative
  jg .positive

.zero:              ; The zero label is never used, it&#39;s just for consistency
  xor rbx, rbx
  jmp .done

.negative:
  mov rbx, -1
  jmp .done

.positive
  mov rbx, +1
  jmp .done

.done:
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套循环" tabindex="-1"><a class="header-anchor" href="#嵌套循环" aria-hidden="true">#</a> 嵌套循环</h2><p>当<code>rax</code>在 0 到 9 之间 ，并且 <code>rbx</code> 在 0 到 15 之间时， 进入循环:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>  xor rax, rax            ; rax = 0  
.outer_loop:
    xor rbx, rbx            ; rbx = 0
.inner_loop:
        
      ... ; Use rax, rbx, loop body

      inc rbx
      cmp rbx, 16
      jb .inner_loop

    inc rax
    cmp rax, 10
    jb .outer_loop

  ... ; Rest of the program
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这等效于下面的C/C++代码：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> rax <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> rax <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token operator">++</span>rax<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> rbx <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> rax <span class="token operator">&lt;</span> <span class="token number">16</span><span class="token punctuation">;</span> <span class="token operator">++</span>rbx<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// loop body</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例-循环用户输入" tabindex="-1"><a class="header-anchor" href="#示例-循环用户输入" aria-hidden="true">#</a> 示例：循环用户输入</h2><p>我们想要编写一个程序，从用户处输入最多 256 个字节，然后将所有小写字母转为大写并打印出结果。在 C/C++ 中，其主循环如下所示：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">char</span> buffer<span class="token punctuation">[</span><span class="token number">256</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// Read input</span>

<span class="token keyword">unsigned</span> rdi <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span>rdi <span class="token operator">&lt;</span> <span class="token number">256</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span>rdi<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> <span class="token char">&#39;a&#39;</span> <span class="token operator">&amp;&amp;</span> buffer<span class="token punctuation">[</span>rdi<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token char">&#39;z&#39;</span><span class="token punctuation">)</span>
        buffer<span class="token punctuation">[</span>rdi<span class="token punctuation">]</span> <span class="token operator">-=</span> <span class="token number">32</span><span class="token punctuation">;</span>

    <span class="token operator">++</span>rdi<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// print buffer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-X86asm line-numbers-mode" data-ext="X86asm"><pre class="language-X86asm"><code>;;;;
;;;; sys_read.s
;;;; Read from stdin into a buffer.
;;;; 
section .bss

; Buffer of 256 bytes
BUFLEN:   equ           256
buf:      resb          BUFLEN

SYS_read:   equ         0
SYS_write:  equ         1
SYS_stdin:  equ         0
SYS_stdout: equ         1
SYS_exit:   equ         60

section .text

to_uppercase:

  ; rdi = addr of character
  cmp byte [rdi], &#39;a&#39;
  jb .done

  cmp byte [rdi], &#39;z&#39;
  ja .done

  sub byte [rdi], 32 ; Convert to upper-case

  .done:
  ret


global _start
_start:

  ; Read syscall
  mov rax, SYS_read
  mov rdi, SYS_stdin
  mov rsi, buf
  mov rdx, BUFLEN
  syscall

  mov rcx, rax          ; rax = number of bytes read
  mov rdi, buf          ; rdi = addr. of char to process
  .capitalize_loop:

    call to_uppercase

    inc rdi
    dec rcx
    jnz .capitalize_loop  ; No cmp; dec sets ZF for us 

  ; Write syscall
  mov rdx, rax          ; rax = number of bytes read
  mov rax, SYS_write
  mov rdi, SYS_stdout
  mov rsi, buf
  syscall

  ; Exit syscall
  mov rax, SYS_exit
  mov rdi, 0
  syscall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这引入了一个简单的函数 to_uppercase ，它处理将单个字符转换为大写。</p><h2 id="条件移动" tabindex="-1"><a class="header-anchor" href="#条件移动" aria-hidden="true">#</a> 条件移动</h2><p>由于条件跳转的代价比较大，因此增加了条件移动以解决该问题。条件移动只是一个 <code>mov</code>，它检查标志寄存器，并且仅在根据条件设置了标志时才执行 <code>mov</code>。条件代码与条件跳转相同：</p><table><thead><tr><th>操作</th><th>描述</th><th>标志</th></tr></thead><tbody><tr><td><code>cmove</code></td><td>如果<code>op1 == op2</code>则进行移动</td><td><code>ZF = 1</code></td></tr><tr><td><code>cmovne</code></td><td>如果<code>op1 != op2</code>则进行移动</td><td><code>ZF = 0</code></td></tr><tr><td><code>cmovl</code></td><td>如果<code>op1 &lt; op2</code>则进行移动, 有符号</td><td><code>SF != OF</code></td></tr><tr><td><code>cmovle</code></td><td>如果<code>op1 &lt;= op2</code>则进行移动， 有符号</td><td><code>ZF == 1 or SF != OF</code></td></tr><tr><td><code>cmovg</code></td><td>如果<code>op1 &gt; op2</code>则进行移动， 有符号</td><td><code>ZF == 0 and SF == OF</code></td></tr></tbody></table><h2 id="线性搜索" tabindex="-1"><a class="header-anchor" href="#线性搜索" aria-hidden="true">#</a> 线性搜索</h2><p>为了回顾循环和分支，我们将构建一个线性搜索函数。该函数将从头到尾循环遍历数组，搜索特定值。如果找到该值，它将返回该值在数组中的索引；如果不存在，则返回 -1（= 0xffffff…无符号）。</p><p>在 C/C++ 中这将是:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">unsigned</span> <span class="token function">linear_search</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span> buffer<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> length<span class="token punctuation">,</span> <span class="token keyword">char</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">!=</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> target<span class="token punctuation">)</span>
            <span class="token keyword">return</span> i<span class="token punctuation">;</span>

        <span class="token operator">++</span>i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在汇编中，我们将完成从随机数据文件加载数组的步骤，以便引入一些新的系统调用。我们将使用的现有系统调用是：</p><ul><li>read (0) – 从文件描述符中读取特定数量的字节</li><li>exit (60) – 结束进程</li></ul><p>我们将使用的新系统调用是:</p><ul><li><p>open (2) – 打开文件。此系统调用的参数是（以 null 结尾的）文件名、文件访问模式（只读、只写或读写）以及文件创建模式（除非创建新文件，否则将忽略该模式）。 open 返回 rax 中的文件描述符，如果出错则返回 -1。</p></li><li><p>close (3) – 关闭打开的文件描述符。参数是文件描述符（来自打开）。</p></li></ul><p><code>.data</code> 部分如下所示：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

TARGET:         equ     126

filename:       db      &quot;random.dat&quot;, 0         ; Filenames are nul-terminated

; 1M buffer to load the file
BUFLEN:         equ     1024*1024
buffer:         times BUFLEN    db 0

;; Syscalls
SYS_open:       equ     2
SYS_close:      equ     3
SYS_read:       equ     0
SYS_exit:       equ     60

;; File access mode
O_RDONLY:       equ     0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（文件 random.dat 存在于服务器上的 /usr/local/class/cs241/random.dat 中。它包含 1MB 的随机数据。）</p><p>我们程序的主要步骤是：</p><ul><li>打开文件 random.dat</li><li>如果文件打开成功，则从文件中读取 1MB 到缓冲区</li><li>关闭文件</li><li>对 TARGET 进行线性搜索</li><li>退出进程，以4返回的索引作为退出码</li></ul><p>步骤 1 只是将参数传递给 <code>open</code> 系统调用：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code> mov rax, SYS_open
    mov rdi, filename   ; nul-terminated filename
    mov rsi, O_RDONLY   ; access mode: read only
    mov rdx, 0          ; mode: ignored if file already exists
    syscall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤2：如果文件无法打开，rax将为-1，因此我们检查这一点，如果是这种情况则退出：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>  ; Check return value: -1 indicates error
    cmp rax, -1
    jne .read_file
    ; Otherwise file did not open correctly.
    ; Exit with status code 1
    mov rdi, 1
    jmp .exit

.read_file:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.exit</code> 是 <code>_start</code> 函数末尾的一个标签，它调用 <code>exit</code> 系统调用：</p><p><code>.read_file</code>: 标签标记步骤 2 第二部分的开始：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.read_file:
    ; File is open, rax = FD
    ; Read the entire file into the buffer.
    mov rdi, rax        ; rdi = FD
    mov rax, SYS_read
    mov rsi, buffer
    mov rdx, BUFLEN
    syscall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>rax</code> 包含 <code>open</code> 返回的文件描述符，但 <code>read</code> 期望 FD 位于 <code>rdi</code> 中，系统调用位于 <code>rax</code> 中，因此我们必须稍微调整一下。</p><p>第 3 步：读取文件后，我们可以将其关闭</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rax, SYS_close
    ; rdi still contains FD
    syscall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（rdi 在步骤 2 中设置为文件描述符，并且系统调用保证保留 rdi，因此我们不需要像使用 rcx 那样将其保存到不同的寄存器。）</p><p>对于第 4 步，我们设置 Linear_search 函数的参数，然后调用它：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rdi, buffer
    mov rsi, BUFLEN
    mov dl, TARGET
    call linear_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将 Linear_search 的返回值（在 rax 中）移至程序的退出代码（在 rdi 中）并调用 SYS_exit：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov rdi, rax    ; Return value is exit code
.exit:
    mov rax, SYS_exit
    syscall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，如果我们由于文件未打开而跳转到 .exit，则 rdi 将在步骤 2 开始时设置为 1。</p><p>剩下的就是编写 Linear_search 函数：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>linear_search:
    ; rdi = address of array
    ; rsi = length of array
    ; dl = target to search for
    ; Returns: rax = index of target, or -1 (0xffff...) if not found

    ... ; Function body

    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为参考，我们正在翻译的 C/C++ 代码是:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    unsigned i = 0;
    while(i != length) {
        if(buffer[i] == target)
            return i;

        ++i;
    }

    return -1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有一个 while 循环，因此我们将循环计数器（在 rax 中，因为这最终将成为我们的返回值）初始化为 0，然后检查条件:</p><div class="language-X86asm line-numbers-mode" data-ext="X86asm"><pre class="language-X86asm"><code>    mov rax, 0

.while:
    cmp rax, rsi
    jne .not_found

    ...

.not_found:
    mov rax, -1
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>.not_found 标签和以下代码对应于 while 循环结束后返回 -1。在循环内，我们需要将目标（在 dl 中）与当前数组元素进行比较。虽然我们可能会麻烦地将 rax 添加到 rdi 来获取当前元素的地址，但我们会简化该过程，只需将 rdi 与 rax 一起递增，因此 rdi 始终指向当前数组元素。因此，我们有</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>        cmp dl, byte [rdi]
        jne .continue       ; Not equal: next iteration
        ret                 ; Equal, return current rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>where .continue：标记 while 循环的尾端，我们在其中递增索引（和地址）并跳转到循环的开头：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    .continue:
        inc rax
        inc rdi
        jmp .while
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个函数如下所示:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>linear_search:
    ; rdi = address of array
    ; rsi = length of array
    ; dl = target to search for
    ; Returns: rax = index of target, or -1 (0xffff...) if not found

    mov rax, 0

    .while:
        cmp rax, rsi
        je .not_found

        cmp dl, byte [rdi]
        jne .continue       ; Not equal: next iteration
        ret                 ; Equal, return current rax

    .continue:
        inc rax
        inc rdi
        jmp .while
    .not_found:
    mov rax, -1
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,61),l=[d];function r(c,v){return e(),s("div",null,l)}const o=n(a,[["render",r],["__file","Lecture7-functions-and-the-stack.html.vue"]]);export{o as default};
