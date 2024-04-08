import{_ as i,V as c,W as l,X as e,Y as n,$ as s,a0 as d,F as o}from"./framework-9a29aaa0.js";const t={},r=d(`<ul><li><a href="#%E7%AC%AC%E4%BA%94%E8%AE%B2-%E8%B7%B3%E8%BD%AC%E6%AF%94%E8%BE%83%E6%9D%A1%E4%BB%B6%E8%B7%B3%E8%BD%AC">第五讲 跳转、比较、条件跳转</a><ul><li><a href="#%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E7%A8%8B%E5%BA%8F%E7%9A%84%E7%BB%93%E6%9E%84">汇编语言程序的结构</a></li><li><a href="#%E8%B7%B3%E8%BD%AC">跳转</a></li><li><a href="#%E6%AF%94%E8%BE%83">比较</a><ul><li><a href="#cmp%E6%8C%87%E4%BB%A4"><code>cmp</code>指令</a></li><li><a href="#cmps%E6%8C%87%E4%BB%A4%E5%86%85%E5%AD%98%E4%B8%8E%E5%86%85%E5%AD%98%E7%9A%84%E6%AF%94%E8%BE%83"><code>cmps*</code>指令(内存与内存的比较)</a></li><li><a href="#test%E6%8C%87%E4%BB%A4"><code>test</code>指令</a></li><li><a href="#%E5%85%B6%E4%BB%96%E6%8C%87%E4%BB%A4">其他指令</a></li></ul></li><li><a href="#%E6%9D%A1%E4%BB%B6%E8%B7%B3%E8%BD%AC%E7%9A%84%E6%8C%87%E4%BB%A4">条件跳转的指令</a><ul><li><a href="#%E8%B7%B3%E8%BD%AC%E7%9B%AE%E6%A0%87">跳转目标</a></li><li><a href="#%E8%B7%B3%E8%BD%AC%E4%BC%98%E5%8C%96">跳转优化</a></li></ul></li><li><a href="#%E8%BD%AC%E6%8D%A2-cc-%E7%BB%93%E6%9E%84">转换 C/C++ 结构</a><ul><li><a href="#if-else-%E9%93%BE">if-else 链</a></li><li><a href="#%E5%B5%8C%E5%A5%97%E7%9A%84-if-else">嵌套的 <code>if-else</code></a></li><li><a href="#do-while%E5%BE%AA%E7%8E%AF"><code>do-while</code>循环</a></li><li><a href="#while-%E5%BE%AA%E7%8E%AF"><code>while</code> 循环</a></li><li><a href="#break%E5%92%8Ccontinue"><code>break</code>和<code>continue</code></a></li><li><a href="#switch-case%E8%AF%AD%E5%8F%A5"><code>switch-case</code>语句</a></li><li><a href="#%E5%B0%8F%E5%86%99%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%A4%A7%E5%86%99%E7%9A%84%E5%87%BD%E6%95%B0">小写转换为大写的函数</a></li></ul></li><li><a href="#%E9%99%84%E5%BD%95">附录</a><ul><li><a href="#%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%BA%90">课程资源</a></li></ul></li></ul></li></ul><h1 id="第五讲-跳转、比较、条件跳转" tabindex="-1"><a class="header-anchor" href="#第五讲-跳转、比较、条件跳转" aria-hidden="true">#</a> 第五讲 跳转、比较、条件跳转</h1><p>汇编语言没有专用的循环结构（如 <code>for</code>、<code>do</code>、<code>while</code> 等）。它只有下面这些特性：</p><ul><li>分支（也称为跳转、goto语句等）： 跳转到程序中的新位置。</li><li>比较： 比较两个操作数，然后适当地设置标志寄存器。只有一条比较指令，它执行所有可能的比较（等于、小于、等于零等）</li><li>条件跳转：根据标志寄存器的状态（由比较操作先前设置）进行跳转或正常继续执行下一条指令。</li><li>条件移动：根据标志寄存器的状态进行移动或不移动。</li></ul><p>后面会学习到<strong>函数调用</strong>和<strong>函数返回</strong>，它只是上述几种类型的特殊形式。</p><h2 id="汇编语言程序的结构" tabindex="-1"><a class="header-anchor" href="#汇编语言程序的结构" aria-hidden="true">#</a> 汇编语言程序的结构</h2><p>汇编语言程序的结构与高级语言（如C/C++）有着根本的不同。每一条指令在汇编语言中都对应着一条CPU操作。相比之下，在C/C++中，一条语句可能在编译过程中生成多个操作。这意味着汇编语言无法像C/C++那样拥有“条件语句”或“循环语句”；在C/C++中，这些都是复合语句，内部包含其他语句。这必然意味着if-else或while循环生成了多于一条的CPU操作。因此，在汇编语言中，循环和条件的工作方式有很大的不同。</p><p>汇编语言程序最终只是一系列指令。就是这样简单。它没有真正的区分不同的函数，也没有区分循环或if-else的“主体”与所在函数的其余部分。程序只是一大堆指令，因此我们需要对其进行一些结构化处理。通常的编程语言结构，如函数、条件语句、循环，都是我们自己去构建的。</p><p>汇编语言程序中的每条指令都有一个地址，即程序最终运行时它所在的内存位置。添加标签告诉汇编器该地址（标签后紧跟的指令的地址）很重要，重要到足以被保存并赋予一个名字。因此，当我们写下 <code>_start:</code> 时，<code>_start</code> 的“值”就是紧随其后的第一条指令的地址。对于局部标签（以 . 开头的标签）也是如此。</p><p>汇编语言程序中的正常控制流非常简单：每条指令按顺序执行，从第一条到最后一条。CPU总是知道程序中下一条要执行的指令：就是紧接在当前指令后面的那条指令。</p><p>汇编语言支持的唯一其他控制流类型是，跳转到一个地址（由CPU实现为改变<code>rip</code>，指令指针寄存器的值）。我们所有现有的控制流结构（<code>if-else</code>、<code>switch-case</code>、<code>while</code>、<code>do-while</code>）都必须被翻译成这种基本的概念，即要么跳过程序中的一些指令，要么向后跳转，以便一些程序中的地址被多次提供给CPU执行指令。</p><h2 id="跳转" tabindex="-1"><a class="header-anchor" href="#跳转" aria-hidden="true">#</a> 跳转</h2><p>跳转通常是指<code>jmp</code>指令，它可以使程序跳转到新位置来工作。<code>jmp</code>指令会通过修改<code>rip</code>从而加载指定位置的代码进行执行。我们只需要提供要跳转的目标就可以实现跳转：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>jmp target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>跳转标签</strong></p><p>跳转的目标必须是一个标签。标签由标识符后跟冒号组成：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>Target:
    ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除此以外，还有一种标签是<strong>本地标签</strong>。<strong>本地标签</strong>是名称以<strong>句号</strong>开头的标签。<strong>本地标签</strong>的全名需要添加靠的最近的非本地标签的名称。例如:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>my_function:
  ...
  .begin_loop:    ; Full name: my_function.begin_loop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这允许我们拥有具有相同名称的多个标签，只要它们位于不同的函数/代码块中。</p><p>标签只是一个地址，即下一条指令的地址（或数据，如果在 <code>.data</code> 部分中使用）。</p><p>**<code>jmp</code>**指令</p><p>要跳转到一个标签，请使用 <code>jmp</code> 指令：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>jmp target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，标签的值只是它在程序中的地址。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, Target 
jmp rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在寄存器中存储标签， 跳转到寄存器等。这有时称为<strong>计算跳转</strong>。例如，我们可以将一组标签存储在数组中（在 <code>.data</code> 部分），然后使用数组索引来确定要跳转到哪个标签。稍后将使用该技术来实现 <code>switch-case</code> 结构。</p><h2 id="比较" tabindex="-1"><a class="header-anchor" href="#比较" aria-hidden="true">#</a> 比较</h2><h3 id="cmp指令" tabindex="-1"><a class="header-anchor" href="#cmp指令" aria-hidden="true">#</a> <code>cmp</code>指令</h3><p>有两种比较指令，其中 <code>cmp</code> 是最为直接的比较， 它需要两个操作数，并且两个操作数的大小必须相同。第一个操作数不能是立即数，但第二个操作数可以。 其中一个操作数可以位于内存中，但不能同时位于内存中。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp op1, op2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>cmp</code>指令会在内部执行 <code>op1 - op2</code> ，并且丢弃结果，但会更新标志寄存器。例如，如果 <code>op1 - op2 == 0</code>，则零标志 ZF 将被设置，因此置零标志告诉我们原始操作数是相等的。类似地，如果 <code>op1 &gt; op2</code>，减法会设置进位标志。</p><p><strong>条件</strong></p><p>可以使用标志的各种组合来确定 <code>sub a, b</code> 的两个操作数之间的关系：</p><ul><li>如果 <code>a == b</code> 则结果将为 0，这将设置 <code>ZF = 1</code>。因此我们可以通过查看零标志来检测相等性。</li><li>如果 <code>a != b</code>, 那么结果将是非零的，因此 <code>ZF == 0</code>。</li><li>如果 <code>a &gt; b</code>, 无符号， 那么结果是非零的, 并且不需要额外的进位/借位，因此 ZF == 0 且 CF == 0。</li><li>如果 <code>a &gt;= b</code>, a和b都是无符号整数，那么不需要额外的进位/借位（结果可能为零也可能不是），因此 <code>CF == 0</code>。</li><li>如果 <code>a &lt; b</code>，a和b都是无符号整数，与<code>a &gt;= b</code>相反，因此 CF == 1（需要额外借位）。</li><li>如果，<code>a &lt;= b</code>，a和b都是无符号整数，与<code>a &gt; b</code>相反，因此 <code>ZF == 1</code> 或 \`\`\`CF == 1\`\`。</li><li>如果 <code>a &gt; b</code>，a和b都是有符号整数，那么事情就更有趣了：我们知道结果不会为 0，因此 <code>ZF == 0</code>，但结果的其余部分取决于溢出标志和符号标志： <ul><li>如果<code>a</code>和<code>b</code>具有相同的符号，则<code>OF == 0</code>（不可能溢出）。如果 <code>a &gt; b</code> 且两者均为正，则结果将为正 (<code>SF == 0</code>)。如果两者均为负数，则结果也将为正数（例如，-2 &gt; -10、-2 - -10 = +8）。所以在这种情况下我们有 <code>SF == OF</code>。</li><li>如果 a 和 b 的符号不同，则可能发生溢出。如果 a &gt; -b 那么我们正在做 a - -b = a + b：</li></ul><ul><li>如果a + b没有溢出，则符号为正，所以SF == OF == 0</li><li>如果 a + b 确实溢出，则符号为负，但 OF == 1，所以我们有 OF == SF == 1 不管怎样，我们再次得到 <code>SF == OF</code>。 因此，<code>a &gt; b</code> 有符号的最终条件是 <code>ZF == 0 且 SF == OF</code>。</li></ul></li><li>如果 <code>a &gt;= b</code>，有符号，那么我们只需忽略零标志：<code>SF == OF</code>。</li><li><code>a &lt; b\`\` 与</code>a &gt;= b<code>相反 ，因此 </code>SF != OF\`\`\`。</li><li><code>a &lt;= b</code> 与<code>a &gt; b</code> 相反，因此 <code>ZF == 1</code> 或 <code>SF != OF</code>。</li></ul><p>这些条件代码中的每一个都将在稍后的条件跳转指令中使用。对于有符号比较，我们通常使用术语“小于”和“大于”；对于无符号比较，我们说“低于”和“高于”。</p><h3 id="cmps-指令-内存与内存的比较" tabindex="-1"><a class="header-anchor" href="#cmps-指令-内存与内存的比较" aria-hidden="true">#</a> <code>cmps*</code>指令(内存与内存的比较)</h3><p><code>cmp</code> 指令无法直接比较内存中的两个操作数。 但是<code>cmps*</code> 系列指令可以比较内存中的两个操作数，第一个操作数位于 <code>[rsi]</code>，第二个操作数位于 <code>[rdi]</code>。</p><p><code>cmps*</code>的指令如下所示：</p><table><thead><tr><th>指令</th><th>描述</th></tr></thead><tbody><tr><td><code>cmpsb</code></td><td>比较 <code>byte [rsi]</code>和 <code>byte [rdi]</code></td></tr><tr><td><code>cmpsw</code></td><td>比较 <code>word [rsi]</code>和 <code>word [rdi]</code></td></tr><tr><td><code>cmpsd</code></td><td>比较 <code>dword [rsi]</code>和 <code>dword [rdi]</code></td></tr><tr><td><code>cmpsq</code></td><td>比较 <code>qword [rsi]</code>和 <code>qword [rdi]</code></td></tr></tbody></table><p><code>cmps*</code> 指令不带任何操作数；他们总是使用 <code>rsi</code> 和 <code>rdi</code>。</p><h3 id="test指令" tabindex="-1"><a class="header-anchor" href="#test指令" aria-hidden="true">#</a> <code>test</code>指令</h3><p><code>cmp</code> 执行减法并更新与 <code>sub</code> 相同的标志，而 <code>test</code> 执行二进制 AND 并仅更新 SF、ZF 和 PF 标志， CF 和 OF 标志被清除。这意味着<code>test</code>不能用于确定依赖于这些标志的任何条件（排序比较，例如大于、小于、高于、低于）或相等。因为它使用 AND 而不是减法，所以<code>test</code>的用途更加有限：</p><ul><li>判断寄存器是否等于0：</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code> test reg, reg
 jz target          ; or je target, jump if ZF == 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个数和自身相与，结果还是自身。因此结果等于0的唯一可能是 <code>reg = 0</code>。 <code>JE</code>和<code>JZ</code>仅在<code>ZF == 1</code>时跳跃。</p><ul><li><code>test reg, reg </code>还可用于确定寄存器的符号：如果 <code>SF == 1</code> 则 reg 为负数。因此，我们可以做：</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>test reg, reg
js target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code>reg &lt; 0</code>，则跳转到目标。（如果 reg 无符号，则在设置高位时将跳转。）</p><ul><li><p>类似地，如果 reg &lt;= 0，测试 reg、reg 和 jle 将跳转，尽管要弄清楚为什么这样做需要做一些工作：</p><ul><li>如果 ZF == 1 或 SF != OF，则 jle 跳转</li><li>测试总是设置 OF = 0，所以这实际上是 ZF == 1 或 SF == 1</li><li>ZF == 1 是上面用于 reg == 0 的条件</li><li>SF == 1 是上面用于 reg &lt; 0 的条件</li><li>所以 ZF == 1 或 SF == 1 相当于 reg &lt;= 0 当然，只有当 reg 是有符号值时这才有意义</li></ul></li><li><p>test reg, 00000010b 可用于测试寄存器中是否设置了特定位（或位组合）。如果 AND 的结果为 0，则该位未被设置，且 ZF == 1；如果该位被设置，则 ZF == 0。所以我们可以这样做</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>test reg, 00000010b
jnz target              ; jump if bit 2 is set
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这可能是<code>test</code>的最主要的用途。</p></li></ul><p><code>test</code> 的操作数受到一些限制：</p><ul><li>第二个操作数必须是寄存器或立即数，而不可以是内存。</li><li>第一个操作数可以是寄存器或内存。</li><li>两者尺寸必须相同</li></ul><p><code>test</code>指令不会修改两个操作数；仅更改标志寄存器</p><h3 id="其他指令" tabindex="-1"><a class="header-anchor" href="#其他指令" aria-hidden="true">#</a> 其他指令</h3><p>请记住，除了<code>cmp</code>和<code>test</code>以外，许多其他指令都会设置标志寄存器，</p><p>例如，假设您想要递减 <code>rcx</code>，然后跳转到某个位置，只要它不等于 0。这可以通过以下方式完成：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>dec rcx
jnz target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果结果为 0，<code>dec</code> 将设置 ZF，因此无需使用 <code>cmp</code> 或<code>test</code>。</p><p>另一个例子是，如果我们需要执行减法 <code>rax -= rbx</code>，然后根据 <code>rax</code> 是否为 0决定是否跳转。如果这样做会很浪费：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sub rax, rbx
cmp rax, 0
jz label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以直接这样做：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>sub rax, rbx
jz label
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="条件跳转的指令" tabindex="-1"><a class="header-anchor" href="#条件跳转的指令" aria-hidden="true">#</a> 条件跳转的指令</h2><p>条件分支指令检查<strong>标志寄存器</strong>来决定跳转到目标或者不跳转到目标。这些通常称为 <code>jcc</code>，其中 <code>cc</code> 是条件代码(conditional code)， <code>jcc</code>指令如下表所示：</p><p>|操作|描述|标志位的状态| |<code>je</code>|当<code>op1 == op2</code>时跳转| <code>ZF == 1</code>| |<code>jne</code>|当<code>op1 != op2</code>时跳转| <code>ZF == 0</code>| |<code>jl</code>|当<code>op1 &lt; op2</code>时跳转， 针对有符号的数据比较|<code>SF != OF</code>| |<code>jle</code>|当<code>op1 &lt;= op2</code>时跳转， 针对有符号的数据比较|<code>ZF ==1 or SF != OF</code>| |<code>jg</code>|当<code>op1 &gt; op2</code>时进行跳转， 针对有符号的数据比较|<code>ZF == 0 &amp;&amp; SF ==OF</code>| |<code>jge</code>|当<code>op1 &gt;= op2</code>时进行跳转， 针对有符号的数据比较|<code>SF ==OF</code>| |<code>jb</code>|当<code>op1 &lt; op2</code>时进行跳转， 针对无符号的数据比较|<code>CF == 1</code>| |<code>jbe</code>|当<code>op1 &lt;= op2</code>时进行跳转， 针对无符号的数据比较|<code>CF == 1 or ZF == 1</code>| |<code>ja</code>|当<code>op1 &gt; op2</code>时进行跳转， 针对无符号的数据比较|<code>CF ==0 &amp;&amp; ZF == 0</code>| |<code>jae</code>|当<code>op1 &gt;= op2</code>时进行跳转， 针对无符号的数据比较|<code>CF == 0</code>|</p><p>对于无符号数据的比较，&quot;a&quot;是&quot;above&quot;的缩写， &quot;b&quot;是&quot;below&quot;的缩写。 对于有符号的比较， &quot;g&quot;是&quot;greater&quot;的缩写， &quot;l&quot;是&quot;less&quot;的缩写。&quot;e&quot;是&quot;equal&quot;的缩写。</p><p>C/C++ 没有反向比较， 例如 <code>!&lt;</code>, <code>!&gt;=</code>，汇编支持这个语法。例如 <code>jnl</code>（不小于）就是 <code>jge</code> 的同义词。</p><p>下面是一些上述符号的同义词</p><p>|操作|描述| |<code>jna</code>|当<code>op1 &lt;= op2</code>时进行跳转， 针对无符号的数据比较| |<code>jnae</code>|当<code>op1 &lt; op2</code>时进行跳转， 针对无符号的数据比较| |<code>jnb</code>|当<code>op1 &gt;= op2</code>时进行跳转， 针对无符号的数据比较| |<code>jnbe</code>|当<code>op1 &gt; op2</code>时进行跳转， 针对无符号的数据比较| |<code>jng</code>|当<code>op1 &lt;= op2</code>时进行跳转， 针对有符号的数据比较| |<code>jnge</code>|当<code>op1 &lt; op2</code>时进行跳转， 针对有符号的数据比较| |<code>jnl</code>|当<code>op1 &gt;= op2</code>时进行跳转， 针对有符号的数据比较| |<code>jnle</code>|当<code>op1 &gt; op2</code>时进行跳转， 针对有符号的数据比较|</p><p>这些只是上述指令的别名（例如，<code>jna</code> 是 <code>jbe</code> 的别名）。</p><p>有一组跳转通过检查 <code>rcx</code> 寄存器来模拟循环操作：</p><table><thead><tr><th>操作</th><th>描述</th></tr></thead><tbody><tr><td>jcxz</td><td>当<code>cx == 0</code>时进行跳转</td></tr><tr><td>jecxz</td><td>当<code>ecx == 0</code>时进行跳转</td></tr><tr><td>jrcxz</td><td>当<code>rcx == 0</code>时进行跳转</td></tr></tbody></table><p>请注意，如果 <code>rcx</code> 等于 0，则这些跳转，而如果 <code>rcx</code> 不等于 0，则循环跳转。</p><p>最后，有一组直接引用标志寄存器名称的条件跳转：</p><table><thead><tr><th>操作</th><th>描述</th></tr></thead><tbody><tr><td><code>jc</code></td><td>当 <code>CF == 1</code>时跳转</td></tr><tr><td><code>jnc</code></td><td>当 <code>CF == 0</code>时跳转</td></tr><tr><td><code>jz</code></td><td>当 <code>ZF == 1</code>时跳转</td></tr><tr><td><code>jnz</code></td><td>当 <code>ZF == 0</code>时跳转</td></tr><tr><td><code>jo</code></td><td>当 <code>OF == 1</code>时跳转</td></tr><tr><td><code>jno</code></td><td>当 <code>OF == 0</code>时跳转</td></tr><tr><td><code>js</code></td><td>当 <code>SF == 1</code>时跳转</td></tr><tr><td><code>jns</code></td><td>当 <code>SF == 0</code>时跳转</td></tr><tr><td><code>jz</code></td><td>当 <code>ZF == 1</code>时跳转</td></tr><tr><td><code>jnz</code></td><td>当 <code>ZF == 0</code>时跳转</td></tr><tr><td><code>jp</code></td><td>当 <code>PF == 1</code>时跳转</td></tr><tr><td><code>jpo</code></td><td>当 <code>PF == 0</code>时跳转</td></tr><tr><td><code>jpe</code></td><td>当 <code>PF == 1</code>时跳转</td></tr><tr><td><code>jnp</code></td><td>当 <code>PF == 0</code>时跳转</td></tr></tbody></table><p>注意<code>JNP == JPO</code>，<code>JP =JPE</code>。</p><table><thead><tr><th>机器码</th><th>指令</th><th>描述</th></tr></thead><tbody><tr><td>7B cb</td><td>JNP</td><td>Jump short if not parity (PF=0).</td></tr><tr><td>7A cb</td><td>JP</td><td>Jump short if parity (PF=1).</td></tr><tr><td>7A cb</td><td>JPE</td><td>Jump short if parity even (PF=1).</td></tr><tr><td>7B cb</td><td>JPO</td><td>Jump short if parity odd (PF=0).</td></tr></tbody></table><p>例如，假设我们要实现以下代码:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>rcx <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    rax <span class="token operator">=</span> rbx<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用条件跳转，我们可以这样做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp rcx, 0
jne NotZero
mov rax, rbx
NotZero:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跳转目标" tabindex="-1"><a class="header-anchor" href="#跳转目标" aria-hidden="true">#</a> 跳转目标</h3><p>普通的<code>jmp</code>指令可以跳转到任意地址。条件跳转存储的是跳转目标距离当前指令的偏移量。偏移量是有符号 8 位或 32 位数值。在汇编语言中，我们编写一个标签，汇编器会计算相应的偏移量，写入指令中。</p><p><strong>条件跳转到计算目标</strong></p><p>通过无条件跳转，可以很容易地跳转到寄存器定义的目标：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>target:
...
mov rax, target
jmp rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为rax寄存器的值就是要跳转到的地址。由于条件跳转不使用绝对地址，而是使用当前地址的偏移量，因此计算条件跳转需要更多技巧。</p><p>最简单的方法是使条件跳转到固定目标，其中目标是到计算地址的普通跳转:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>jcc my_jmp_target

  ⋮

my_jmp_target:  jmp rax
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此方法比理想慢一些，因为它涉及两次跳跃。更快的方法是计算最终的 jcc 指令和各个跳转目标之间的距离，然后将这些距离存储到某个寄存器中。由于这些距离在组装时是固定的，因此在运行时计算它们的效率很低。一般的策略是给条件跳转指令本身加上标签，这样我们就可以访问它的地址：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>target1:

  ⋮
                mov rax, computed_jump - target1  ; Pick target to jump to
computed_jump:  jcc rax                           ; Jump 

  ⋮

target2:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>mov</code> 当然是条件结构的一部分，它要么：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, computed_jump - target1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rax, computed_jump - target2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>取决于某些条件。我们还可以存储一个compated_jump - target1、compated_jump - target2等偏移量的数组，然后对其进行索引.</p>`,96),p={href:"https://www.intel.cn/content/www/cn/zh/content-details/782158/intel-64-and-ia-32-architectures-software-developer-s-manual-combined-volumes-1-2a-2b-2c-2d-3a-3b-3c-3d-and-4.html",target:"_blank",rel:"noopener noreferrer"},u=d(`<p><strong>复合条件</strong></p><p>我们如何检查复合条件，例如 <code>rbx &gt;= 10 和 rbx &lt; 100</code>，并在复合条件为真时执行跳转？</p><ul><li>一种方法是执行多步跳转<div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp rbx, 10
jge .step1
jmp .else

.rax_ge_0:
cmp rbx, 100
jnge .else

    ; rbx &gt;= 0 and rbx &lt; 100

.else:

    ; condition failed.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>除最后一个条件外，每个条件都需要自己的 cmp 和条件跳转。 （因为 cmp 在进行比较之前重置标志，所以您无法“组合”多个比较。）</p><p>这实际上相当于转换</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code> <span class="token keyword">if</span><span class="token punctuation">(</span>rbx <span class="token operator">&gt;=</span> <span class="token number">10</span> <span class="token operator">and</span> rbx <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>into</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code> <span class="token keyword">if</span><span class="token punctuation">(</span>rbx <span class="token operator">&gt;=</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">if</span><span class="token punctuation">(</span>rbx <span class="token operator">&lt;=</span> <span class="token number">100</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>set** 检查特定条件标志（或标志组合）并将（字节）寄存器/内存设置为 1 或 0。然后可以使用正常和/或/非按位操作以及 z、nz 条件将它们组合起来可用于检查假/真。例如。，</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code> cmp rbx, 10
 setge al
 cmp rbx, 100
 setl  ah
 and al, ah      ; Sets the zero flag if al &amp;&amp; ah == 0
 jz .outside

    ; Inside

 .outside:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>set**</code> 支持与条件跳转相同的一组条件代码。</p><ul><li><p><code>lahf</code> 指令可用于将 CF、ZF、SF 和 PF 标志的值保存到 ah 寄存器中以供以后操作。因为这不包括 OF，所以带符号的比较不能与此方法一起使用。</p></li><li><p>上面的例子这样的范围检查实际上有一个使用减法的简单版本</p></li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code> sub rbx, 10
 cmp rbx, 100 - 10
 jae .outside
    ; Inside the range

 .outside:
    ; Outside the range 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是有效的，因为如果 <code>rbx &lt; 10</code> 减法将回绕到一个值，因此值 &lt; 10 和值 &gt;= 100 将跳转到 .outside。假设 rbx 是无符号的，这是可行的。</p><h3 id="跳转优化" tabindex="-1"><a class="header-anchor" href="#跳转优化" aria-hidden="true">#</a> 跳转优化</h3><p>条件跳转代价很大！（无条件跳转比正常的顺序控制流更昂贵，但不如条件跳转代价那么大）。处理器在检查标志寄存器之前不知道将采用什么指令，这意味着它执行的许多优化必须被延迟。</p><p>优化跳转的最佳方法是尽量减少它们的使用：尝试尽可能保持控制流的顺序。除此之外，尝试</p><ul><li>尽量使用距离短跳转, 跳转距离在 +-127 字节内</li><li>当一个条件语句大多数时候为真和假的场景不平衡时，适合使用条件跳转。因为这个时候处理器会进行分支预测，处理器会的使得少数场景进行跳转，而多数场景不进行跳转。 例如，在循环中，循环条件大多数时候为 true，只有在最后结束才为 false。处理器将学习这种行为并猜测循环将重复，因此大多数循环跳转都会很快。只有最后的跳转（跳出循环）才会很慢，因为这就是预测失败的地方。</li><li>通过条件移动和<code>setcc</code>指令来完全避免跳转跳转</li></ul><p><strong><code>setcc</code>和bool变量</strong></p><p>有时，在 C/C++ 中，我们依赖 bool → int 的隐式转换来避免编写 if/else。例如，要计算数组中负值的数量，我们可以这样做：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> p <span class="token operator">=</span> arr<span class="token punctuation">;</span> p <span class="token operator">&lt;</span> arr <span class="token operator">+</span> size<span class="token punctuation">)</span>
   c <span class="token operator">+=</span> <span class="token punctuation">(</span><span class="token operator">*</span>p <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是有效的，因为 bool值 true 转换为 1（从而成为 c += 1），而 false 转换为 0（成为 c += 0）。该代码实际上比等效代码更快：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> p <span class="token operator">=</span> arr<span class="token punctuation">;</span> p <span class="token operator">&lt;</span> arr <span class="token operator">+</span> size<span class="token punctuation">)</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">*</span>p <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token operator">++</span>c<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为计算条件分支对于 CPU 来说速度较慢。为了实现上述版本，我们可以使用 <code>setcc</code>指令，如果满足条件代码 cc，则将给定（字节）寄存器设置为 1，如果不满足，则将给定（字节）寄存器设置为 0。例如，仅当 <code>rbx &gt; 0</code> 时才增加 rax，我们可以这样做:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>mov rcx, 0

cmp rbx, 0
seta cl      ; Set cl = 1 if rbx &gt; 0
add rax, rcx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="转换-c-c-结构" tabindex="-1"><a class="header-anchor" href="#转换-c-c-结构" aria-hidden="true">#</a> 转换 C/C++ 结构</h2><h3 id="if-else-链" tabindex="-1"><a class="header-anchor" href="#if-else-链" aria-hidden="true">#</a> if-else 链</h3><p>经典的 C/C++ <code>if-else</code> 结构如下所示：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span><span class="token punctuation">(</span>condition1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment">// body1</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>condition2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment">// body2</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment">// else body</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在汇编中没有直接<code>if-else</code>的语句。我们需要使用<strong>比较</strong>，<strong>条件跳转</strong>和<strong>无条件跳转</strong>来构建。</p><ul><li>每一个<code>if</code>语句都需要<code>cmp</code>或者<code>test</code>指令（如果if表达式比较复杂，不是简单的数值比较，那么可能需要多个<code>cmp</code>或者<code>test</code>）。如果条件为假则进行条件跳转。跳转目标是链中的下一个 if。</li><li>每个 if 的主体在最后的 else 结束后以无条件跳转到标签结束。</li><li>else 的主体不需要跳转，因为它直接跳转到下面的代码。</li></ul><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp ...
jncc .elseif1 
  ; body 1

  jmp end_else

.elseif1:
cmp ...
jncc .elseif2
  ; body2

  jmp end_else

... ; other else-if comparisons and bodies

.else: 

  ; else body

.end_else:

...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，您应该尝试使用更具描述性的标签名称！</p><h3 id="嵌套的-if-else" tabindex="-1"><a class="header-anchor" href="#嵌套的-if-else" aria-hidden="true">#</a> 嵌套的 <code>if-else</code></h3><p>嵌套的 if-else，例如:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">if</span><span class="token punctuation">(</span>rax <span class="token operator">==</span> rbx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>rbx <span class="token operator">&lt;</span> rcx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的代码可以翻译成下面的汇编代码:</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>cmp rax, rbx      ; Or whatever you need for the outer condition
jne .end          ; Note: jump if NOT equal
cmp rbx, rcx      
jge .end

...               ; Actual body 

.end
...               ; Rest of program
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们依次测试每个条件，如果不满足条件，则跳转到嵌套 <code>if</code> 主体之后的标签。</p><h3 id="do-while循环" tabindex="-1"><a class="header-anchor" href="#do-while循环" aria-hidden="true">#</a> <code>do-while</code>循环</h3><p>在之前，我们已经学习过使用<code>loop</code>指令实现 <code>do-while</code> 循环的方式，只要您使用 <code>rcx</code> 作为循环变量，在循环中进行递减，当 <code>rcx == 0</code> 时循环结束。</p><p>通过条件跳转，我们可以构建一个更通用的 <code>do-while</code> 循环,在循坏开始时需要设置一个标签， 在循环结束时测试循环条件。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.do                 ; do {

  ...               ;   Loop body

  cmp rax, rbx      
  je .do            ; } while(rax == rbx);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while-循环" tabindex="-1"><a class="header-anchor" href="#while-循环" aria-hidden="true">#</a> <code>while</code> 循环</h3><p>实现 <code>while</code> 循环需要在循环开始时测试循环条件，如果失败则可能跳到循环末尾。</p><p>因此，我们需要在循环的开头和循环的结尾都有一个标签。(循环开头的标签用于满足循环条件时进入循环， 循环结尾的标签用于循环条件不成立时跳出循环):</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.while:         ; while(rax != rbx) {
  cmp rax, rbx
  je .end_whle

  ...           ;   Loop body

  jmp .while
.end_while:     ; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>for</code> 循环只是一种特殊的 <code>while</code> 循环，例如</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">for</span><span class="token punctuation">(</span>rax <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> rax <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token operator">++</span>rax<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将会编译为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  xor rax, rax      ; rax = 0
.for:     
  cmp rax, 100
  jge .end_for

  ...               ; Loop body

  inc rax
  jmp .for
.end_for:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="break和continue" tabindex="-1"><a class="header-anchor" href="#break和continue" aria-hidden="true">#</a> <code>break</code>和<code>continue</code></h3><p><code>break</code> 等价于跳转到循环结束后的位置， 而<code>continue</code> 等价于跳转到循环开头的位置。</p><p>下面是一个常见的<code>break</code>语句。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>if(condition)
  break; // Or continue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其可以通过条件跳转到循环结尾/开头来实现break/continue；无需模拟整个 <code>if</code> 结构。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>.loop_:     
    jmp .end_loop_ ; break
    jmp .loop_     ; continue
.end_loop_:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="switch-case语句" tabindex="-1"><a class="header-anchor" href="#switch-case语句" aria-hidden="true">#</a> <code>switch-case</code>语句</h3><p>与 <code>if-else</code> 不同，<code>switch-case</code> 没有对汇编的单一转换。根据 case 标签的数量及其值，编译器可能会将 <code>switch-case</code> 转换为如上所述的 if-else 链，或转换为基于表的跳转， 甚至是类似哈希表的结构。我们将研究第二种选择，构建一个跳转目标表，然后使用它来实现 <code>switch-case</code>：</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;;; 
;;;; switch_case.s
;;;; Implementing a switch-case statement as a jump table.
;;;;

section .data

jump_table: dq  _start.case0, _start.case1, _start.case2, _start.case3

section .text

global _start
_start:

  ; Switch on rcx = 0, 1, 2, 3, default
  mov rbx, qword [jump_table + 8*rcx]
  cmp rcx, 4
  jae .default
  jmp rbx

.case0:

  ...
  jmp .end_switch

.case1:

  ...
  jmp .end_switch 

.case2:

  ...
  jmp .end_switch

.case3:

  ...
  jmp .end_switch

.default:
  ...

.end_switch
  ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ul><li>在跳转表的定义中，我们必须使用.case标签的全名。如果我们只写.case0，它将引用（不存在的）标签jump_table.case0。</li><li>每个case都必须以跳转到switch末尾来结束。这就是为什么每一个案件都必须以break结束！ （如果省略跳跃，会发生什么？）</li><li>内存操作数 qword [jump_table + 8*rcx] 使用内存查找的扩展形式，我们稍后会介绍它：可以说内存操作数比 [addr] 更通用。在这种情况下，我们使用jump_table作为查找的位移，然后将rcx乘以8，因为每个表条目都是64位（8字节）。</li></ul><p>case 标签表的索引始终为 0, 1, 2, 3, ... 如果实际的 case 标签值与此不对应，那么我们必须以某种方式对其进行转换（编译器通常会这样做以供使用）。例如，如果我们的标签是 10、11、12、13，我们可以简单地减去 10 并将其用作我们的索引。如果标签是 10、20、30、40，我们可以除以 10 并减 1。如果标签是 3、1、2、0，我们可以对案例重新编号。</p><p>如果案例标签不适合任何模式，我们可能必须简单地循环遍历值数组才能找到正确的标签，甚至可能进行二分搜索（如果标签值集足够大）。在本例中，我们有两个数组，一个是标签值，另一个是标签目标。</p><h3 id="小写转换为大写的函数" tabindex="-1"><a class="header-anchor" href="#小写转换为大写的函数" aria-hidden="true">#</a> 小写转换为大写的函数</h3><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>;;; uppercase
;;; Converts byte [rdi] from uppercase to lowercase.
;;;
uppercase:
  ; rdi = addr. of byte to convert

  cmp byte [rdi], &#39;a&#39;
  jb .done
  cmp byte [rdi], &#39;z&#39;
  ja .done

  sub byte [rdi], 32 

  .done
  ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这相当于:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">*</span>rdi <span class="token operator">&gt;=</span> a<span class="token punctuation">)</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">*</span>rdi <span class="token operator">&lt;=</span> z<span class="token punctuation">)</span>
      <span class="token operator">*</span>rdi <span class="token operator">-=</span> <span class="token number">32</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这也可以通过使用基于减法的范围测试技巧来完成，前提是我们首先将值移入寄存器</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>uppercase:

  mov al, byte [rdi]
  sub al, &#39;a&#39;         ; Values below &#39;a&#39; will overflow
  cmp al, &#39;z&#39; - &#39;a&#39;
  ja .done

  sub byte [rdi], 32

  .done:
  ret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附录" tabindex="-1"><a class="header-anchor" href="#附录" aria-hidden="true">#</a> 附录</h2><h3 id="课程资源" tabindex="-1"><a class="header-anchor" href="#课程资源" aria-hidden="true">#</a> 课程资源</h3><p>原文链接：</p>`,73),v={href:"https://staffwww.fullcoll.edu/aclifton/cs241/lecture-branching-comparisons.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://staffwww.fullcoll.edu/aclifton/cs241/branching-conditions-applications.html",target:"_blank",rel:"noopener noreferrer"},b={href:"http://ics.p.lodz.pl/~dpuchala/LowLevelProgr/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.felixcloutier.com/x86/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.felixcloutier.com/x86/jcc",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.felixcloutier.com/x86/jmp",target:"_blank",rel:"noopener noreferrer"};function k(f,w){const a=o("ExternalLinkIcon");return c(),l("div",null,[r,e("p",null,[n("查询了"),e("a",p,[n("intel指令集"),s(a)]),n(" volume 2中关于jcc的部分，jcc后面不可以带register，因此课程中这里讲解的似乎不太正确。")]),u,e("p",null,[n("第五讲： "),e("a",v,[n("https://staffwww.fullcoll.edu/aclifton/cs241/lecture-branching-comparisons.html"),s(a)])]),e("p",null,[n("第六讲： "),e("a",m,[n("https://staffwww.fullcoll.edu/aclifton/cs241/branching-conditions-applications.html"),s(a)])]),e("p",null,[e("a",b,[n("http://ics.p.lodz.pl/~dpuchala/LowLevelProgr/"),s(a)])]),e("p",null,[e("a",h,[n("https://www.felixcloutier.com/x86/"),s(a)])]),e("p",null,[e("a",g,[n("https://www.felixcloutier.com/x86/jcc"),s(a)])]),e("p",null,[e("a",x,[n("https://www.felixcloutier.com/x86/jmp"),s(a)])])])}const E=i(t,[["render",k],["__file","Lecture5-branch.html.vue"]]);export{E as default};
