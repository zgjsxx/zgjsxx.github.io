import{_ as e,V as i,W as n,a0 as s}from"./framework-9a29aaa0.js";const d={},l=s(`<h1 id="第三讲-数字表示" tabindex="-1"><a class="header-anchor" href="#第三讲-数字表示" aria-hidden="true">#</a> 第三讲：数字表示</h1><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;; 
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),r=[l];function a(v,c){return i(),n("div",null,r)}const t=e(d,[["render",a],["__file","Lecture3-register.html.vue"]]);export{t as default};
