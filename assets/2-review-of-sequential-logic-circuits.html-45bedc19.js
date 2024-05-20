import{_ as e,V as i,W as t,a0 as a}from"./framework-9a29aaa0.js";const r={},o=a('<ul><li><a href="#%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84-%E6%97%B6%E5%BA%8F%E9%80%BB%E8%BE%91%E7%94%B5%E8%B7%AF%E5%9B%9E%E9%A1%BE">计算机基本架构-时序逻辑电路回顾</a><ul><li><a href="#d%E9%94%81%E5%AD%98%E5%99%A8d-latch">D锁存器(D-Latch)</a></li><li><a href="#d%E8%A7%A6%E5%8F%91%E5%99%A8d-flip-flop">D触发器(D-Flip-Flop)</a></li><li><a href="#%E5%AF%84%E5%AD%98%E5%99%A8">寄存器</a></li><li><a href="#%E7%A7%BB%E4%BD%8D%E5%AF%84%E5%AD%98%E5%99%A8">移位寄存器</a></li><li><a href="#%E8%AE%A1%E6%95%B0%E5%99%A8">计数器</a></li><li><a href="#%E6%91%A9%E5%B0%94%E7%8A%B6%E6%80%81%E6%9C%BA">摩尔状态机</a></li><li><a href="#%E7%B1%B3%E5%88%A9%E7%8A%B6%E6%80%81%E6%9C%BA">米利状态机</a></li><li><a href="#%E5%86%85%E5%AD%98">内存</a></li></ul></li></ul><h1 id="计算机基本架构-时序逻辑电路回顾" tabindex="-1"><a class="header-anchor" href="#计算机基本架构-时序逻辑电路回顾" aria-hidden="true">#</a> 计算机基本架构-时序逻辑电路回顾</h1><h2 id="d锁存器-d-latch" tabindex="-1"><a class="header-anchor" href="#d锁存器-d-latch" aria-hidden="true">#</a> D锁存器(D-Latch)</h2><h2 id="d触发器-d-flip-flop" tabindex="-1"><a class="header-anchor" href="#d触发器-d-flip-flop" aria-hidden="true">#</a> D触发器(D-Flip-Flop)</h2><h2 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h2><p>前面我们提到的触发器可以用于保存数据，但是其只能在一个时钟周期内保持住数据，当下一个时钟周期到来时，新的数据就会写入进去。</p><p>寄存器可以由一个触发器和一个2-1的多路选择器(Mux)构成。写使能引脚(WE)是2-1 Mux的选择输入端。当<code>WE = 1</code>时，将来自IN端口的新数据传输到触发器输入端口。当<code>WE = 0</code>时，任何尝试向寄存器写入新数据的操作都会被屏蔽，寄存器将保持旧值。</p><p>下图展示的就是一个单比特的寄存器的电路图。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/one-bit-register.png" alt="one-bit-register" tabindex="0" loading="lazy"><figcaption>one-bit-register</figcaption></figure><p>下图展示的是一个寄存器的时序图，描述了一位寄存器的操作。当WE输入为0时， IN端口的输入数据被屏蔽。在第二个时钟周期的中间，当WE输入变为1, 新数据被允许通过 2-1 MUX并在第三个时钟周期开始时更新寄存器的内容。在第三个时钟周期结束之前，WE输入转换为逻辑0，并导致寄存器输出OUT在第四个时钟周期期间保持为逻辑1。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/one-bit-register-timing-diagram.png" alt="one-bit-register-timing-diagram" tabindex="0" loading="lazy"><figcaption>one-bit-register-timing-diagram</figcaption></figure><p>从单比特寄存器推导出更复杂的寄存器是容易的。下图显示的是一个32比特的寄存器。32比特的寄存器拥有公共的时钟(clock)和写使能输入(WE)。因此，如果WE（写使能）输入为逻辑1，那么在时钟上升沿，输入端的32位数据将会被写入寄存器。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/32-bit-register.png" alt="32-bit-register" tabindex="0" loading="lazy"><figcaption>32-bit-register</figcaption></figure><h2 id="移位寄存器" tabindex="-1"><a class="header-anchor" href="#移位寄存器" aria-hidden="true">#</a> 移位寄存器</h2><p>移位寄存器是普通寄存器的特定版本，它可以根据设计需求专门用于向右或向左移动数据。</p><p>下图显示了一个四位移位寄存器的电路原理图，它在每个时钟上升沿将串行数据从IN端口向左移动。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/4-bit-shift-register.png" alt="4-bit-shift-register" tabindex="0" loading="lazy"><figcaption>4-bit-shift-register</figcaption></figure><p>下图是4bit的移位寄存器的时序图，在第一个周期中， SHIFT=0。因此，在这个周期内，IN端的变化不会影响寄存器的输出。SHIFT输入在第二个周期中间转换为逻辑1时，，它允许IN=1在第三个时钟周期时传递到OUT的低位<code>OUT[0]</code>。从第二个周期到第十三个周期，SHIFT保持在逻辑1，因此，在每个时钟的上升沿，IN节点的任何变化都会直接传递到<code>OUT[0]</code>节点。其他输出，例如<code>OUT[1]</code>， <code>OUT[2]</code>, <code>OUT[3]</code>则会有一个时钟周期的延迟，因为在移位寄存器中，较低位的输出连接到较高位的输入。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/timing-of-shift-register.png" alt="timing-of-shift-register" tabindex="0" loading="lazy"><figcaption>timing-of-shift-register</figcaption></figure><h2 id="计数器" tabindex="-1"><a class="header-anchor" href="#计数器" aria-hidden="true">#</a> 计数器</h2><p>计数器是一种特殊形式的寄存器，在设计上会在每个时钟上升沿进行递增（或递减）。</p><p>下图是一个典型的32位递增计数器，它有两个控制输入，<code>COUNT</code>和<code>LOAD</code>。当<code>COUNT = 1</code>，<code>LOAD = 0</code>时，选择3-1多路复用器的C端口，使计数器在时钟的上升沿递增计数。而当<code>COUNT = 0，LOAD = 1</code>时，选择L端口，在<code>IN[31:0]</code>端加载新数据。一旦加载完成，计数器输出<code>OUT[31:0]</code>在每个时钟的上升沿递增1，直到所有输出位都变为逻辑1。下一次递增会自动将计数器输出重置为逻辑0。当<code>LOAD = COUNT = 0</code>时，计数器选择3-1多路复用器的I端口。在这种组合下，它既不加载新数据也不递增计数，而是暂停，输出旧的值。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/counter.png" alt="counter" tabindex="0" loading="lazy"><figcaption>counter</figcaption></figure><p>下图是计数器的时序图。在第一个时钟边沿之前，LOAD输入为逻辑1，此刻将会把输入IN中的数字存入计数器之中。因此在第一个时钟的上升沿时，<code>OUT[31：0]=3</code>。此后<code>LOAD=0</code>，<code>COUNT=1</code>，这个状态下计数器将进行向上递增的过程。在第二个时钟上升沿到来时，<code>3+1=4</code>通过3-1MUX的C端口传递并抵达触发器的输入端，使得<code>OUT[31:0] = 4</code>。在三个时钟周期到来时，计数器执行相同的过程，增加1。随后<code>COUNT</code>的值转换为逻辑0，3-1MUX的I端口被激活，此时会阻止任何新的数据写入计数器。因此计数器在随后的几个周期中保持<code>OUT[31:0]=5</code>。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/computer-base/Fundamentals-of-Computer-Architecture-and-Design/2/timing-of-counter.png" alt="timing-of-counter" tabindex="0" loading="lazy"><figcaption>timing-of-counter</figcaption></figure><h2 id="摩尔状态机" tabindex="-1"><a class="header-anchor" href="#摩尔状态机" aria-hidden="true">#</a> 摩尔状态机</h2><h2 id="米利状态机" tabindex="-1"><a class="header-anchor" href="#米利状态机" aria-hidden="true">#</a> 米利状态机</h2><h2 id="内存" tabindex="-1"><a class="header-anchor" href="#内存" aria-hidden="true">#</a> 内存</h2>',28),c=[o];function n(d,g){return i(),t("div",null,c)}const h=e(r,[["render",n],["__file","2-review-of-sequential-logic-circuits.html.vue"]]);export{h as default};