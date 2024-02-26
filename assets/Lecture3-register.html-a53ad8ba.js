import{_ as e,V as s,W as a,a0 as i}from"./framework-9a29aaa0.js";const n={},l=i(`<h1 id="第三讲-数字表示" tabindex="-1"><a class="header-anchor" href="#第三讲-数字表示" aria-hidden="true">#</a> 第三讲：数字表示</h1><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;; 
;;; hello.s
;;; Prints &quot;Hello, world!&quot;
;;;

section .data

msg:            db      &quot;Hello, world!&quot;, 10
MSGLEN:         equ     $-msg

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以进行汇编和连接。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>asm hello.s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者可以进行手动编译连接：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yasm <span class="token parameter variable">-g</span> dwarf2 <span class="token parameter variable">-f</span> elf64 hello.s <span class="token parameter variable">-l</span> hello.lst
ld <span class="token parameter variable">-g</span> <span class="token parameter variable">-o</span> hello hello.o
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="操作数" tabindex="-1"><a class="header-anchor" href="#操作数" aria-hidden="true">#</a> 操作数</h2><p>每条汇编指令都有许多&quot;操作数&quot;。最大的指令有三个操作数，大多数有两个或一个，有些（如系统调用）没有。每个操作数可以是以下内容之一（有一些限制，具体取决于具体指令）。</p><ul><li>register的名字，例如<code>rax</code>。</li><li>一个常量，例如 60 或 msg。</li><li>内存直接查找。</li><li>内存间接查找。<code>[rax]</code>可以给出一个内存中的值。该值的地址存储在rax寄存器中。有几种不同形式的内存间接操作数，它们允许以自然的方式访问数组和结构。我们稍后会看看这些。</li></ul>`,9),d=[l];function r(c,v){return s(),a("div",null,d)}const t=e(n,[["render",r],["__file","Lecture3-register.html.vue"]]);export{t as default};
