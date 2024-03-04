import{_ as e,V as a,W as i,a0 as d}from"./framework-9a29aaa0.js";const s={},n=d(`<h1 id="第六讲-分支、条件、应用" tabindex="-1"><a class="header-anchor" href="#第六讲-分支、条件、应用" aria-hidden="true">#</a> 第六讲：分支、条件、应用</h1><h2 id="回顾" tabindex="-1"><a class="header-anchor" href="#回顾" aria-hidden="true">#</a> 回顾</h2><p>汇编中任何类型的非顺序控制流（仅从一个指令移动到下一个指令）都涉及使用多个条件和/或无条件跳转指令之一进行分支。这意味着 if-else 结构、switch-case 和任何类型的循环都需要使用跳转来实现。</p><h2 id="无条件跳转" tabindex="-1"><a class="header-anchor" href="#无条件跳转" aria-hidden="true">#</a> 无条件跳转</h2><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>jmp target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的<code>target:</code>就是在<code>.text</code>节中的一个标签。这会使得CPU不会执行<code>jmp</code>指令的下一条指令，而是跳转到标签处执行：</p><p>通常，我会使用本地标签（以 . 开头的标签）作为函数内部的标签。</p><p>在CPU内部，<code>jmp</code>指令只是修改<code>rip</code>寄存器，其中包含下一条要执行的指令的地址。通常，rip由CPU自动更新，以指向下面的指令。</p><h2 id="计算跳转" tabindex="-1"><a class="header-anchor" href="#计算跳转" aria-hidden="true">#</a> 计算跳转</h2><p>可以跳转到寄存器而不是标签的目标。这可以用于这样的事情：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, target
...
jmp rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您甚至可以在 .data 部分构建一组目标，然后跳转到其中一个：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>section .data

jmp_tbl:    qword   _start.label0, _start.label1, ...

section .text
_start:

    ...
    mov rax, qword [jmp_tbl + 1]
    jmp rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>稍后我们将使用“跳转表”技术来实现一种 switch-case。</p>`,14),r=[n];function c(l,t){return a(),i("div",null,r)}const o=e(s,[["render",c],["__file","Lecture6-branch-applications.html.vue"]]);export{o as default};
