import{_ as e,V as n,W as i,a0 as s}from"./framework-9a29aaa0.js";const d={},a=s(`<h1 id="第七讲-函数和栈" tabindex="-1"><a class="header-anchor" href="#第七讲-函数和栈" aria-hidden="true">#</a> 第七讲 函数和栈</h1><h2 id="条件和循环的示例" tabindex="-1"><a class="header-anchor" href="#条件和循环的示例" aria-hidden="true">#</a> 条件和循环的示例</h2><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于一个 while 循环，如果 BUFLEN 为 0，则循环根本不会运行。</p><h2 id="计算-rax-的符号" tabindex="-1"><a class="header-anchor" href="#计算-rax-的符号" aria-hidden="true">#</a> 计算 rax 的符号</h2><p>如果 rax 为负，则将 rbx 设置为 -1；如果等于 0，则将 rbx 设置为 0；如果为正，则将 rbx 设置为 +1：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="嵌套循环" tabindex="-1"><a class="header-anchor" href="#嵌套循环" aria-hidden="true">#</a> 嵌套循环</h2><p>这会在 0 到 9 之间循环 rax，并在 0 到 15 之间循环 rbx（在其中）:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>  xor rax, rax            ; rax = 0  
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[a];function r(v,c){return n(),i("div",null,l)}const b=e(d,[["render",r],["__file","Lecture7-functions-and-the-stack.html.vue"]]);export{b as default};
