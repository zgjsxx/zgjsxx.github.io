const e=JSON.parse('{"key":"v-6e2a9afe","path":"/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture3-register.html","title":"第三讲：数字表示","lang":"zh-CN","frontmatter":{"category":["汇编语言"],"description":"第三讲：数字表示 ;;; ;;; hello.s ;;; Prints \\"Hello, world!\\" ;;; section .data msg: db \\"Hello, world!\\", 10 MSGLEN: equ $-msg section .text ;; Program code goes here global _start _start: mov rax, 1 ; Syscall code in rax mov rdi, 1 ; 1st arg, file desc. to write to mov rsi, msg ; 2nd arg, addr. of message mov rdx, MSGLEN ; 3rd arg, num. of chars to print syscall ;; Terminate process mov rax, 60 ; Syscall code in rax mov rdi, 0 ; First parameter in rdi syscall ; End process","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/Assembly_language/fullerton_CSci241/Lecture3-register.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"第三讲：数字表示"}],["meta",{"property":"og:description","content":"第三讲：数字表示 ;;; ;;; hello.s ;;; Prints \\"Hello, world!\\" ;;; section .data msg: db \\"Hello, world!\\", 10 MSGLEN: equ $-msg section .text ;; Program code goes here global _start _start: mov rax, 1 ; Syscall code in rax mov rdi, 1 ; 1st arg, file desc. to write to mov rsi, msg ; 2nd arg, addr. of message mov rdx, MSGLEN ; 3rd arg, num. of chars to print syscall ;; Terminate process mov rax, 60 ; Syscall code in rax mov rdi, 0 ; First parameter in rdi syscall ; End process"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-26T07:20:37.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-26T07:20:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第三讲：数字表示\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-26T07:20:37.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"操作数","slug":"操作数","link":"#操作数","children":[]},{"level":2,"title":"数字的表示","slug":"数字的表示","link":"#数字的表示","children":[]},{"level":2,"title":"转换为10进制","slug":"转换为10进制","link":"#转换为10进制","children":[]},{"level":2,"title":"二进制算术","slug":"二进制算术","link":"#二进制算术","children":[]},{"level":2,"title":"寄存器和内存","slug":"寄存器和内存","link":"#寄存器和内存","children":[{"level":3,"title":"通用寄存器","slug":"通用寄存器","link":"#通用寄存器","children":[]},{"level":3,"title":"mov指令","slug":"mov指令","link":"#mov指令","children":[]},{"level":3,"title":"交换寄存器的值","slug":"交换寄存器的值","link":"#交换寄存器的值","children":[]},{"level":3,"title":"清除寄存器","slug":"清除寄存器","link":"#清除寄存器","children":[]}]},{"level":2,"title":"特殊用途的寄存器","slug":"特殊用途的寄存器","link":"#特殊用途的寄存器","children":[]}],"git":{"createdTime":1708675788000,"updatedTime":1708932037000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4}]},"readingTime":{"minutes":5.83,"words":1750},"filePathRelative":"posts/Program_language/Assembly_language/fullerton_CSci241/Lecture3-register.md","localizedDate":"2024年2月23日","excerpt":"<h1> 第三讲：数字表示</h1>\\n<div class=\\"language-x86asm line-numbers-mode\\" data-ext=\\"x86asm\\"><pre class=\\"language-x86asm\\"><code>;;; \\n;;; hello.s\\n;;; Prints \\"Hello, world!\\"\\n;;;\\n\\nsection .data\\n\\nmsg:            db      \\"Hello, world!\\", 10\\nMSGLEN:         equ     $-msg\\n\\nsection .text\\n\\n;; Program code goes here\\n\\nglobal _start\\n_start:\\n\\n    mov     rax,    1               ; Syscall code in rax\\n    mov     rdi,    1               ; 1st arg, file desc. to write to\\n    mov     rsi,    msg             ; 2nd arg, addr. of message\\n    mov     rdx,    MSGLEN          ; 3rd arg, num. of chars to print\\n    syscall\\n\\n    ;; Terminate process\\n    mov     rax,    60              ; Syscall code in rax\\n    mov     rdi,    0               ; First parameter in rdi\\n    syscall                         ; End process\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
