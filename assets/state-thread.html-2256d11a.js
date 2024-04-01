import{_ as i,V as d,W as s,X as e,Y as a,$ as l,a0 as r,F as v}from"./framework-9a29aaa0.js";const c={},t=r(`<h1 id="state-thread" tabindex="-1"><a class="header-anchor" href="#state-thread" aria-hidden="true">#</a> state-thread</h1><p>.S代表可以使用预处理 .s代表不适用预处理器</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>#elif defined(__amd64__) || defined(__x86_64__)

    /****************************************************************/

    /*
     * Internal __jmp_buf layout
     */
    #define JB_RBX  0
    #define JB_RBP  1
    #define JB_R12  2
    #define JB_R13  3
    #define JB_R14  4
    #define JB_R15  5
    #define JB_RSP  6
    #define JB_PC   7

    .file &quot;md.S&quot;
    .text

    /* _st_md_cxt_save(__jmp_buf env) */
    .globl _st_md_cxt_save
        .type _st_md_cxt_save, @function
        .align 16
    _st_md_cxt_save:
        /*
         * Save registers.
         */
        movq %rbx, (JB_RBX*8)(%rdi)
        movq %rbp, (JB_RBP*8)(%rdi)
        movq %r12, (JB_R12*8)(%rdi)
        movq %r13, (JB_R13*8)(%rdi)
        movq %r14, (JB_R14*8)(%rdi)
        movq %r15, (JB_R15*8)(%rdi)
        /* Save SP */
        leaq 8(%rsp), %rdx
        movq %rdx, (JB_RSP*8)(%rdi)
        /* Save PC we are returning to */
        movq (%rsp), %rax
        movq %rax, (JB_PC*8)(%rdi)
        xorq %rax, %rax
        ret
    .size _st_md_cxt_save, .-_st_md_cxt_save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m={href:"https://zhuanlan.zhihu.com/p/484606752",target:"_blank",rel:"noopener noreferrer"};function _(u,b){const n=v("ExternalLinkIcon");return d(),s("div",null,[t,e("p",null,[e("a",m,[a("https://zhuanlan.zhihu.com/p/484606752"),l(n)])])])}const x=i(c,[["render",_],["__file","state-thread.html.vue"]]);export{x as default};
