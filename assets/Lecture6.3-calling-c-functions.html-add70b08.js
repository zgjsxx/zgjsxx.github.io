import{_ as e,V as n,W as s,a0 as a}from"./framework-9a29aaa0.js";const i={},r=a(`<h2 id="函数调用规约" tabindex="-1"><a class="header-anchor" href="#函数调用规约" aria-hidden="true">#</a> 函数调用规约</h2><p>回顾一下，当我们调用一个函数时，我们必须选择一些寄存器用于参数，至少一个用于返回值，一些寄存器用于调用者保存（可供函数临时使用），一些寄存器用于被调用者已保存。我们对这些函数的选择是为了与标准 Unix C ABI 调用约定保持一致，因此，通过更多的工作，我们的函数将与 C 标准库兼容。、</p><p>调用函数的一般流程是这样的</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>...
    push r10        ; Push any caller-saved registers in use
    call func   
    pop r10         ; Restore after return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类似地，在函数中，我们有一个保存所有被调用者保存的寄存器的序言，以及一个恢复它们的序言</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>func:
    push r12        ; Push any callee-saved registers in use
    ...
    pop r12         ; Restore them before return
    ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d=[r];function l(c,t){return n(),s("div",null,d)}const v=e(i,[["render",l],["__file","Lecture6.3-calling-c-functions.html.vue"]]);export{v as default};
