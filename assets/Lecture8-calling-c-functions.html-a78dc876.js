import{_ as i,V as a,W as d,X as n,Y as s,$ as l,a0 as r,F as c}from"./framework-9a29aaa0.js";const v={},t=r(`<ul><li><a href="#%E7%AC%AC%E5%85%AB%E8%AE%B2--%E6%A0%88%E7%9A%84%E7%BB%93%E6%9E%84-c%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E8%A7%84%E7%BA%A6">第八讲 ： 栈的结构 c函数调用规约</a><ul><li><a href="#%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E8%A7%84%E7%BA%A6">函数调用规约</a></li><li><a href="#%E6%A0%88%E6%93%8D%E4%BD%9C">栈操作</a></li><li><a href="#%E6%B1%87%E7%BC%96%E4%B8%AD%E7%9A%84%E6%8E%92%E5%BA%8F">汇编中的排序</a></li><li><a href="#%E6%A3%80%E6%9F%A5%E6%8E%92%E5%BA%8F%E6%83%85%E5%86%B5">检查排序情况</a></li><li><a href="#%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F">插入排序</a></li><li><a href="#%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE">二分查找</a></li><li><a href="#c-%E5%85%BC%E5%AE%B9%E5%87%BD%E6%95%B0">C 兼容函数</a></li><li><a href="#%E5%87%BD%E6%95%B0%E6%A8%A1%E6%9D%BF">函数模板</a></li><li><a href="#%E9%99%84%E5%BD%95">附录</a><ul><li><a href="#%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%BA%90">课程资源</a></li></ul></li></ul></li></ul><h1 id="第八讲-栈的结构-c函数调用规约" tabindex="-1"><a class="header-anchor" href="#第八讲-栈的结构-c函数调用规约" aria-hidden="true">#</a> 第八讲 ： 栈的结构 c函数调用规约</h1><h2 id="函数调用规约" tabindex="-1"><a class="header-anchor" href="#函数调用规约" aria-hidden="true">#</a> 函数调用规约</h2><p>回顾一下，当我们调用一个函数时，我们必须选择一些寄存器用于参数，至少一个用于返回值，一些寄存器用于调用者保存(caller-saved), 可供函数临时使用，一些寄存器用于被调用者已保存(callee-saved)。我们对这些函数的选择是为了与标准 Unix C ABI 调用约定保持一致，因此，通过更多的工作，我们的函数将与 C 标准库兼容。、</p><table><thead><tr><th>寄存器</th><th>使用</th></tr></thead><tbody><tr><td><code>rax</code></td><td>用于函数返回值</td></tr><tr><td><code>rbx</code></td><td>callee-preserved</td></tr><tr><td><code>rcx</code></td><td>函数第四个参数</td></tr><tr><td><code>rdx</code></td><td>函数第三个参数</td></tr><tr><td><code>rsi</code></td><td>函数第二个参数</td></tr><tr><td><code>rdi</code></td><td>函数第一个参数</td></tr><tr><td><code>rbp</code></td><td>callee-preserved</td></tr><tr><td><code>rsp</code></td><td>栈顶指针</td></tr><tr><td><code>r8</code></td><td>函数第五个参数</td></tr><tr><td><code>r9</code></td><td>函数第六个参数</td></tr><tr><td><code>r10</code></td><td>临时变量(caller-preserved)</td></tr><tr><td><code>r11</code></td><td>临时变量(caller-preserved)</td></tr><tr><td><code>r12-r15</code></td><td>Callee-preserved</td></tr></tbody></table><p>需要注意的是，所以的函数返回值和函数的入参都算作caller-preserved寄存器。例如，如果您的函数正在使用 <code>rcx</code> 并且您想要调用函数，则必须保留 <code>rcx</code>，即使该函数不使用它作为参数。</p><p>调用函数的一般流程是这样的：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>...
    push r10        ; Push any caller-saved registers in use
    call func   
    pop r10         ; Restore after return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，在函数中，我们会有保存所有call-preserved的寄存器，等函数执行完后再恢复它们。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>func:
    push r12        ; Push any callee-saved registers in use
    ...
    pop r12         ; Restore them before return
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们将看到的，使我们的函数与 C 兼容将需要对函数前导码/序言进行一些更改才能正确设置栈。</p><h2 id="栈操作" tabindex="-1"><a class="header-anchor" href="#栈操作" aria-hidden="true">#</a> 栈操作</h2><p>要手动向栈添加和删除元素，我们使用<code>push</code>和<code>pop</code>指令：</p><ul><li><p><code>push op</code>：将操作数 <code>op</code> 压入堆栈。这个操作将<code>rsp</code>减少<code>op</code>的大小， 然后执行 <code>mov [rsp] op</code>。<code>op</code> 不能是 64 位立即数，但可以是更小的立即数（8、16 或 32 位）。请注意，您不能推送字节大小的寄存器或内存操作数，但可以推送字节大小的立即数。</p></li><li><p><code>pop op</code>: 将栈顶值弹出到 <code>op</code> 中。即，执行 <code>mov op [rsp]</code>，然后将 <code>rsp</code> 增加 <code>op</code> 的大小。<code>op</code> 显然不能是立即数，并且必须是一个字或更大的。</p></li></ul><p>请注意，在 x86-64 中，堆栈从内存的末尾开始并向后增长，因此入栈会减少<code>rsp</code>，出栈会增加 <code>rsp</code>。因此，为了向下查看堆栈，我们将访问 <code>rsp</code> + 一段距离。</p><p>请注意，您可以在不使用这些指令的情况下随意修改堆栈。例如，如果您希望将前 8 个字节从堆栈中弹出，但不关心它们的值，您可以简单地执行以下操作</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>add rsp, 8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令会将 <code>rsp</code> 增长 8。</p><p>事实上，栈从进程地址空间的末尾开始并向后增长，这意味着如果您在任何时候查看 rsp，它可能会很大（大约 TB 级）。这并不意味着您的进程实际上可以使用那么多内存；而是意味着您的进程实际上可以使用那么多内存。正如我们稍后将看到的，系统有一种方法不分配未使用的内存部分。</p><h2 id="汇编中的排序" tabindex="-1"><a class="header-anchor" href="#汇编中的排序" aria-hidden="true">#</a> 汇编中的排序</h2><p>为了回顾一下，我们将开发几个 133 种算法到它们的汇编等价物中。这是我们正在处理的序言：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

; Load 1M of random data from random.dat

data:           incbin                  &quot;random.dat&quot;
DATLEN:         equ                     $-data

section .text
global _start
_start:
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们不需要麻烦地使用 <code>open/read</code> 系统调用，而是直接将随机数据编译到可执行文件中。</p><h2 id="检查排序情况" tabindex="-1"><a class="header-anchor" href="#检查排序情况" aria-hidden="true">#</a> 检查排序情况</h2><p>我们将实现一个排序算法，但我们需要一种方法来检查它是否正常工作。</p><p>因此，我们将编写一个函数 <code>is_sorted</code>，如果输入数组已排序，它将把 <code>rax</code> 设置为 1，如果没有排序，则将设置 <code>rax</code> 为 0。它将接收数组的地址（<code>rdi</code>）和长度（<code>rsi</code>）。我们将认为该数组由带符号的 qword（每个数组条目 8 个字节）组成。</p><p>在 C/C++ 中，我们可以用类似的方法检查这样的数组:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">bool</span> <span class="token function">is_sorted</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span> arr<span class="token punctuation">,</span> size_t length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    size_t i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

        <span class="token operator">++</span>i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非顺序执行有以下三种情况：</p><ul><li>如果 while 条件为假，我们跳转到最终的返回。</li><li>在循环结束时，我们（无条件）跳回到开头。</li><li>如果 if 条件为 false，则跳转到循环末尾的 i++。</li></ul><p>在汇编中，我们有这样的东西:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>is_sorted:

    ; rdi = address of array
    ; rsi = length (in bytes)
    ; Returns: rax = 1 if sorted

    sub rsi, 8          ; Last element
    mov rax, 0
.while:
        cmp rax, rsi
        je .done

        mov r8, qword [rax + rdi]
        mov r9, qword [rax + rdi + 8]
        cmp r8, r9
        jle .continue
        mov rax, 0        
        ret

    .continue:
        add rax, 8
        jmp .while

.done:
    mov rax, 1
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用内存操作数的扩展形式来简化数组查找。特别是，内存操作数可以由以下总和组成：</p><ul><li>常量地址</li><li>最多两个寄存器，其中一个称为基址寄存器，另一个称为索引寄存器</li><li>索引寄存器可以乘以 1、2、4 或 8。</li></ul><p>由于哪些寄存器可以作为基址和索引没有限制，所以实际上，其中一个寄存器可以相乘，而另一个则不能。</p><p>汇编代码和 C/C++ 代码之间有一个区别：汇编代码中的长度以字节数给出，而不是数组元素的数量。在汇编例程中，无论元素的实际大小如何，都以字节为单位给出长度是相当常见的。</p><h2 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序" aria-hidden="true">#</a> 插入排序</h2><p>我们将实现插入排序。在 C++ 中，插入排序如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">insertion_sort</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span> arr<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> j<span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        j <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;=</span> arr<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                std<span class="token operator">::</span><span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> arr<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token operator">--</span>j<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token operator">++</span>i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（我使用 while 循环编写此代码，以便更容易转换为汇编语言；用 C/C++ 编写它的自然方法是使用 for 循环。）</p><p>在汇编中， while 循环具有以下结构:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.while:
    cmp ...
    jcc .end_while

        ...

    jmp .while
.end_while
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了与我们的函数调用约定保持一致，我们的函数将接收 rdi 中的数组地址和 rsi 中的大小（无符号）。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>insertion_sort:
    ; rdi = addr of array
    ; rsi = length of array

    mov rax, 1          ; rax = outer loop index, unsigned

    .while_i:
        cmp rax, rsi
        je .done
        mov rbx, rax    ; rbx = inner loop index

        .while_j:
            cmp rbx, 0
            je .done_i

            mov r8, qword [rdi + 8*rbx]
            mov r9, qword [rdi + 8*rbx - 8]
            cmp r8,r9
            jge .done_i ; break

            ; swap
            mov qword [rdi + 8*rbx],     r9
            mov qword [rdi + 8*rbx - 8], r8

            dec rbx
            jmp .while_j

    .done_i:
        inc rax
        jmp .while_i

.done
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二分查找" tabindex="-1"><a class="header-anchor" href="#二分查找" aria-hidden="true">#</a> 二分查找</h2><p>实现二分搜索允许我们使用另一种条件操作：条件移动。条件跳转有点昂贵，因为 CPU 无法在跳转后预加载指令，直到它本身处理了条件跳转。条件移动是附加了条件代码的移动；仅当条件为真时才会发生移动。条件移动指令为 cmov**，其中 ** 是条件代码之一。</p><p>作为参考，C++ 中二分查找的实现是:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token function">binary_search</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span> arr<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> len<span class="token punctuation">,</span> <span class="token keyword">long</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> low <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> high <span class="token operator">=</span> len<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> mid<span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>low <span class="token operator">&lt;</span> high<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mid <span class="token operator">=</span> <span class="token punctuation">(</span>high <span class="token operator">-</span> low<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">+</span> low<span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>target <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span>
            high <span class="token operator">=</span> mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>target <span class="token operator">==</span> arr<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> mid<span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            low <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>low<span class="token punctuation">]</span> <span class="token operator">==</span> target<span class="token punctuation">)</span>
        <span class="token keyword">return</span> low<span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 0xffffffff... </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（通常我们会将条件写为 low &lt;= high 并跳过最后的 if，但是，如果 low 和 high 都是无符号的，那么如果 high == 0 并且我们执行 high - 1，我们会得到 high = 0xfffff...，并且所以条件永远不会是假的。）</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>binary_search:

    ; rdi = address of array
    ; rsi = length of array
    ; dl = target to search for

    mov rax, 0          ; rax = low = 0
    mov rbx, rsi        ; rbx = high = len-1
    dec rbx;

.while:
    cmp rax, rbx
    jae .not_found      ; Stop if rax &gt; rbx

    ; rcx = mid = (high - low)/2 + low
    mov rcx, rbx        ; rcx = high
    sub rcx, rax        ; rcx -= low
    shr rcx, 1          ; rcx /= 2
    add rcx, rax        ; rcx += low                        

    mov r14, rcx        ; r14 = mid+1
    inc r14
    mov r15, rcx        ; r15 = mid-1
    dec r15

    cmp rdx, qword [rdi + 8*rcx] ; compare target, arr[mid]
    cmovg rax, r14               ; target &gt; arr [mid] ===&gt; low = mid+1
    cmovl rbx, r15               ; target &lt; arr [mid] ===&gt; high = mid-1
    cmove rax, rcx               ; target == arr[mid] ===&gt; rax = mid (index)
    je .return                   ; target == arr[mid] ===&gt; return

    jmp .while
.not_found:
    cmp qword [rdi + 8*rax], rdx
    je .return

    mov rax, -1
.return:
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码部分</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>    mov r14, rcx        ; r14 = mid+1
    inc r14
    mov r15, rcx        ; r15 = mid-1
    dec r15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;;;
;;;; sort_search.s
;;;; Sorting and searching in assembly.
;;;;
section .data

data:           incbin                  &quot;random.dat&quot;
DATLEN:         equ                     ($-data) / 8

sorted:         dq      1,9,2,8,3,7,4,6,5
SORTLEN:        equ     ($-sorted)/8

section .text

;;; _start
;;; Program entry point
global _start
_start:

    mov rdi, data
    mov rsi, DATLEN
    call insertion_sort

    mov rdi, data
    mov rsi, DATLEN
    mov rdx, 10000
    call linear_search
    mov r10, rax ; Save index

    mov rdi, data
    mov rsi, DATLEN
    mov rdx, 10000
    call binary_search

    mov r8, 0
    mov r9, 1
    cmp rax, r10
    cmove rdi, r8
    cmovne rdi, r9  

    ; Exit with sorted-ness in exit code    
    mov rax, 60
    syscall 

;;; is_sorted
;;; Returns true if an array is sorted.
;;;
;;; rdi = address
;;; rsi = length
;;; Returns: rax = 1 if sorted, 0 otherwise.
is_sorted:

    ; rdi = address of array
    ; rsi = length
    ; Returns: rax = 1 if sorted

    dec rsi
    mov rax, 0
.while:
        cmp rax, rsi
        je .done

        mov r8, qword [8*rax + rdi]
        mov r9, qword [8*rax + rdi + 8]
        cmp r8, r9
        jle .continue
        mov rax, 0        
        ret

    .continue:
        inc rax
        jmp .while

.done:
    mov rax, 1
    ret

;;; insertion_sort
;;; Sorts and array of qwords
;;; rdi = address
;;; rsi = length
;;; Returns nothing
insertion_sort:
    ; rdi = addr of array
    ; rsi = length of array

    mov rax, 1          ; rax = outer loop index, unsigned

    .while_i:
        cmp rax, rsi
        je .done
        mov rbx, rax    ; rbx = inner loop index

        .while_j:
            cmp rbx, 0
            je .done_i

            mov r8, qword [rdi + 8*rbx]
            mov r9, qword [rdi + 8*rbx - 8]
            cmp r8,r9
            jge .done_i ; break

            ; swap
            mov qword [rdi + 8*rbx],     r9
            mov qword [rdi + 8*rbx - 8], r8

            dec rbx
            jmp .while_j

    .done_i:
        inc rax
        jmp .while_i

.done
    ret

;;; binary_search
;;; Does a binary search over an array for a target value
;;; rdi = address
;;; rsi = length
;;; rdx = target
;;; Returns: index of target or -1 (0xfffff...) if not found
binary_search:

    ; rdi = address of array
    ; rsi = length of array
    ; dl = target to search for

    mov rax, 0          ; rax = low = 0
    mov rbx, rsi        ; rbx = high = len-1
    dec rbx;

.while:
    cmp rax, rbx
    jae .not_found      ; Stop if rax &gt; rbx

    ; rcx = mid = (high - low)/2 + low
    mov rcx, rbx        ; rcx = high
    sub rcx, rax        ; rcx -= low
    shr rcx, 1          ; rcx /= 2
    add rcx, rax        ; rcx += low                        

    mov r14, rcx        ; r14 = mid+1
    inc r14
    mov r15, rcx        ; r15 = mid-1
    dec r15

    cmp rdx, qword [rdi + 8*rcx] ; compare target, arr[mid]
    cmovg rax, r14               ; target &gt; arr [mid] ===&gt; low = mid+1
    cmovl rbx, r15               ; target &lt; arr [mid] ===&gt; high = mid-1
    cmove rax, rcx               ; target == arr[mid] ===&gt; rax = mid (index)
    je .return                   ; target == arr[mid] ===&gt; return

    jmp .while
.not_found:
    cmp qword [rdi + 8*rax], rdx
    je .return

    mov rax, -1
.return:
    ret

;;; linear_search
;;; Does a linear search in an array.
;;; rdi = address
;;; rsi = length
;;; rdx = target
;;; Returns rax = index of target or -1 (0xffff...) if not found
linear_search:
    ; rdi = address of array
    ; rsi = length of array
    ; dl = target to search for
    ; Returns: rax = index of target, or -1 (0xffff...) if not found

    mov rax, 0  ; Index

    .while:
        cmp rax, rsi
        je .not_found

        cmp rdx, qword [rdi + 8*rax]
        jne .continue       ; Not equal: next iteration
        ret                 ; Equal, return current rax

    .continue:
        inc rax        
        jmp .while
    .not_found:
    mov rax, -1
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="c-兼容函数" tabindex="-1"><a class="header-anchor" href="#c-兼容函数" aria-hidden="true">#</a> C 兼容函数</h2><h2 id="函数模板" tabindex="-1"><a class="header-anchor" href="#函数模板" aria-hidden="true">#</a> 函数模板</h2><p>以下是一个函数模板，该函数保留被调用者保存的寄存器并使用 rbp 指向其堆栈帧的开头：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;; func_name(arguments...)
;; What the function does
;; 
;; Arguments:
;;   arg1 -- rdi
;;   arg2 -- si
;;   ... etc
;;   arg7 -- qword, stack [rbp + 16]
;; 
;; Return value: eax
;;
global func_name
func_name:

    ;; Preamble
    push rbp     ; Save calling function&#39;s rbp
    mov rbp, rsp ; rbp points to our stack frame

    push r12     ; Push any callee-saved registers you use

    ; If you need space for stack-based local variables, you can reserve it with
    ;   sub rsp, amount

    ; Realign rsp to 16*rsp + 8

    ;; Function body
    ...          

    ;; Epilogue

    ; Remove any alignment added

    ; If you reserved any space for stack-based local variables, you should 
    ; restore it with
    ;   add rsp, amount    

    pop r12      ; Restore callee-saved registers
    pop rbp      ; Restore caller&#39;s rbp
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2><h3 id="课程资源" tabindex="-1"><a class="header-anchor" href="#课程资源" aria-hidden="true">#</a> 课程资源</h3>`,59),o={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-stack-c-functions.html",target:"_blank",rel:"noopener noreferrer"};function u(p,m){const e=c("ExternalLinkIcon");return a(),d("div",null,[t,n("p",null,[s("原文链接："),n("a",o,[s("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-stack-c-functions.html"),l(e)])])])}const k=i(v,[["render",u],["__file","Lecture8-calling-c-functions.html.vue"]]);export{k as default};
