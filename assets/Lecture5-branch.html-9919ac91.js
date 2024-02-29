import{_ as d,V as e,W as c,a0 as o}from"./framework-9a29aaa0.js";const r={},a=o(`<hr><p>category:</p><ul><li>汇编语言</li></ul><hr><h1 id="第五讲" tabindex="-1"><a class="header-anchor" href="#第五讲" aria-hidden="true">#</a> 第五讲：</h1><h2 id="函数-分支-和-条件指令" tabindex="-1"><a class="header-anchor" href="#函数-分支-和-条件指令" aria-hidden="true">#</a> 函数 分支 和 条件指令</h2><ul><li>分支（也称为跳转、goto 语句等）跳转到程序中的新位置</li><li>比较比较两个操作数，然后适当地设置标志寄存器。只有一条比较指令，它执行所有可能的比较（等于、小于、等于零等）</li><li>条件分支通常执行分支或继续执行下一条指令，具体取决于其中一个标志的状态（之前通过比较操作设置）。</li><li>条件移动是否执行移动取决于标志之一的状态。</li></ul><p>函数调用和返回只是操作堆栈的分支的特殊形式。</p><h2 id="比较" tabindex="-1"><a class="header-anchor" href="#比较" aria-hidden="true">#</a> 比较</h2><p>有两个比较指令，其中 cmp 是第一个也是最直接的；它需要两个操作数，并且两个操作数的大小必须相同。第一个操作数不能是立即数，但第二个操作数可以是。其中一个操作数可以位于内存中，但不能同时位于内存中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp op1, op2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>比较指令在内部执行 op1 - op2 减法，丢弃结果，但相应地更新标志寄存器。例如，如果 op1 - op2 == 0，则零标志 ZF 将被设置；但如果 op1 - op2 == 0 则 op1 == op2，因此置零标志告诉我们原始操作数是相等的。类似地，如果 op1 &gt; op2，减法会设置进位标志。</p><h3 id="条件" tabindex="-1"><a class="header-anchor" href="#条件" aria-hidden="true">#</a> 条件</h3><p>可以使用标志的各种组合来确定 sub a、b 的两个操作数之间的关系：</p><ul><li>如果 <code>a == b</code> 则结果将为 0，这将设置 ZF = 1。因此我们可以通过查看零标志来检测相等性。 （ZF == 1 的条件代码是 e 或 z。）</li></ul><h3 id="内存比较" tabindex="-1"><a class="header-anchor" href="#内存比较" aria-hidden="true">#</a> 内存比较</h3><p>cmp 指令无法比较内存中的两个操作数。 cmps* 系列指令可以比较内存中的两个操作数，第一个操作数位于 <code>[rsi]</code>，第二个操作数位于 <code>[rdi]</code>。</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>cmpsb</code></td><td>比较 <code>byte [rsi]</code>和 <code>byte [rdi]</code></td></tr><tr><td><code>cmpsw</code></td><td>比较 <code>word [rsi]</code>和 <code>word [rdi]</code></td></tr><tr><td><code>cmpsd</code></td><td>比较 <code>dword [rsi]</code>和 <code>dword [rdi]</code></td></tr><tr><td><code>cmpsq</code></td><td>比较 <code>qword [rsi]</code>和 <code>qword [rdi]</code></td></tr></tbody></table><p><code>cmps*</code> 指令不带任何操作数；他们总是使用 <code>rsi</code> 和 <code>rdi</code>。</p>`,19),t=[a];function i(s,h){return e(),c("div",null,t)}const p=d(r,[["render",i],["__file","Lecture5-branch.html.vue"]]);export{p as default};
