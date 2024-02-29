import{_ as e,V as m,W as i,a0 as n}from"./framework-9a29aaa0.js";const s={},a=n(`<h1 id="第十一讲-指令级并行-simd-和流水线" tabindex="-1"><a class="header-anchor" href="#第十一讲-指令级并行-simd-和流水线" aria-hidden="true">#</a> 第十一讲：指令级并行, SIMD 和流水线</h1><p>如果 <code>xmm</code> 寄存器是 128 位宽，但浮点值是 32 或 64 位宽，那么剩下的位是什么？答案是，更多的浮点值！每个 <code>xmm</code> 寄存器都可以被视为打包到单个寄存器中的 4 个单精度或 2 个双精度浮点值的数组。 所有上述操作仅对寄存器中的“低”值进行操作（以数组表示法，<code>xmm[0]</code>）.他们通常只是复制其余元素不变。</p><div class="language-x86asm line-numbers-mode" data-ext="x86asm"><pre class="language-x86asm"><code>addps xmm0, xmm1
; 等同于:
;   xmm0[0] += xmm1[0]
;   xmm0[1] += xmm1[1]
;   xmm0[2] += xmm1[2]
;   xmm0[3] += xmm1[3]
; 但是是同时运行的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),d=[a];function c(l,r){return m(),i("div",null,d)}const o=e(s,[["render",c],["__file","Lecture11-instruction-level-parallelism.html.vue"]]);export{o as default};
