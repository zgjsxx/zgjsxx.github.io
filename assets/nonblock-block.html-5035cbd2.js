import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const l={},o=e(`<h1 id="verilog" tabindex="-1"><a class="header-anchor" href="#verilog" aria-hidden="true">#</a> verilog</h1><p>a = 2, b = 1</p><p>b = 2, c = 1</p><div class="language-verilog line-numbers-mode" data-ext="verilog"><pre class="language-verilog"><code><span class="token important">always @</span><span class="token punctuation">(</span> <span class="token keyword">posedge</span> clk <span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    b<span class="token operator">&lt;=</span>a<span class="token punctuation">;</span>
    c<span class="token operator">&lt;=</span>b<span class="token punctuation">;</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>a = 2, b = 1</p><p>b = 2, c = 2</p><div class="language-verilog line-numbers-mode" data-ext="verilog"><pre class="language-verilog"><code><span class="token important">always @</span><span class="token punctuation">(</span><span class="token keyword">posedge</span> clk<span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    b<span class="token operator">=</span>a<span class="token punctuation">;</span>
    c<span class="token operator">=</span>b<span class="token punctuation">;</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),i=[o];function c(t,p){return s(),a("div",null,i)}const d=n(l,[["render",c],["__file","nonblock-block.html.vue"]]);export{d as default};
