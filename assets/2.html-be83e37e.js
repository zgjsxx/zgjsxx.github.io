import{_ as t,V as p,W as e,X as n,Y as s,$ as c,a0 as o,F as u}from"./framework-9a29aaa0.js";const l={},i=n("h1",{id:"使用子模块实现三输入数的大小比较",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用子模块实现三输入数的大小比较","aria-hidden":"true"},"#"),s(" 使用子模块实现三输入数的大小比较")],-1),k={href:"https://www.nowcoder.com/practice/bfc9e2f37fe84c678f6fd04dbce0ad27?tpId=301&tqId=5000623&ru=%2Fpractice%2Fbfc9e2f37fe84c678f6fd04dbce0ad27&qru=%2Fta%2Fverilog-start%2Fquestion-ranking&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3DVerilog%25E7%25AF%2587%26topicId%3D301",target:"_blank",rel:"noopener noreferrer"},d=o(`<div class="language-verilog line-numbers-mode" data-ext="verilog"><pre class="language-verilog"><code><span class="token constant">\`timescale</span> <span class="token number">1</span>ns<span class="token operator">/</span><span class="token number">1</span>ns
<span class="token keyword">module</span> <span class="token function">main_mod</span><span class="token punctuation">(</span>
	<span class="token keyword">input</span> clk<span class="token punctuation">,</span>
	<span class="token keyword">input</span> rst_n<span class="token punctuation">,</span>
	<span class="token keyword">input</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>a<span class="token punctuation">,</span>
	<span class="token keyword">input</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>b<span class="token punctuation">,</span>
	<span class="token keyword">input</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>c<span class="token punctuation">,</span>
	
	<span class="token keyword">output</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span>d
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">wire</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> m<span class="token punctuation">,</span>n<span class="token punctuation">;</span>
sub_mod <span class="token function">mod_ab</span><span class="token punctuation">(</span>
	<span class="token punctuation">.</span><span class="token function">clk</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">rst_n</span><span class="token punctuation">(</span>rst_n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_a</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_b</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_c</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

sub_mod <span class="token function">mod_am</span><span class="token punctuation">(</span>
	<span class="token punctuation">.</span><span class="token function">clk</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">rst_n</span><span class="token punctuation">(</span>rst_n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_a</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_b</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_c</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

sub_mod <span class="token function">mod_mn</span><span class="token punctuation">(</span>
	<span class="token punctuation">.</span><span class="token function">clk</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">rst_n</span><span class="token punctuation">(</span>rst_n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_a</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_b</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">.</span><span class="token function">data_c</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">endmodule</span>


<span class="token keyword">module</span> <span class="token function">sub_mod</span><span class="token punctuation">(</span>
	<span class="token keyword">input</span> clk<span class="token punctuation">,</span>
	<span class="token keyword">input</span> rst_n<span class="token punctuation">,</span>
	<span class="token keyword">input</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> data_a<span class="token punctuation">,</span>
	<span class="token keyword">input</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> data_b<span class="token punctuation">,</span>
	<span class="token keyword">output</span> <span class="token keyword">reg</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> data_c 
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token important">always @</span><span class="token punctuation">(</span><span class="token keyword">posedge</span> clk <span class="token keyword">or</span> <span class="token keyword">negedge</span> rst_n<span class="token punctuation">)</span>
	<span class="token function">if</span><span class="token punctuation">(</span><span class="token operator">!</span>rst_n<span class="token punctuation">)</span>
		data_c <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">else</span> <span class="token function">if</span><span class="token punctuation">(</span>data_a <span class="token operator">&gt;</span> data_b<span class="token punctuation">)</span>
		data_c <span class="token operator">&lt;=</span> data_b<span class="token punctuation">;</span>
	<span class="token keyword">else</span>
		data_c <span class="token operator">&lt;=</span> data_a<span class="token punctuation">;</span>
	
<span class="token keyword">endmodule</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-verilog line-numbers-mode" data-ext="verilog"><pre class="language-verilog"><code><span class="token keyword">module</span> compare_tb<span class="token punctuation">;</span>
  <span class="token keyword">reg</span> rst_n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">reg</span> clk <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">reg</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">reg</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">reg</span> <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">:</span><span class="token number">0</span><span class="token punctuation">]</span> c <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">initial</span> <span class="token keyword">begin</span>
    rst_n <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token number">#100</span><span class="token punctuation">;</span>
    rst_n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token number">#300</span><span class="token punctuation">;</span>
    a <span class="token operator">=</span> <span class="token number">8&#39;d3</span><span class="token punctuation">;</span> <span class="token number">#0</span><span class="token punctuation">;</span>
    b <span class="token operator">=</span> <span class="token number">8&#39;d5</span><span class="token punctuation">;</span> <span class="token number">#0</span><span class="token punctuation">;</span>
    c <span class="token operator">=</span> <span class="token number">8&#39;d7</span><span class="token punctuation">;</span> <span class="token number">#0</span><span class="token punctuation">;</span>
    <span class="token number">#10000</span><span class="token punctuation">;</span>
    <span class="token kernel-function property">$finish</span><span class="token punctuation">;</span>
  <span class="token keyword">end</span>

  <span class="token important">always</span> <span class="token keyword">begin</span> <span class="token number">#5</span> clk <span class="token operator">=</span> <span class="token operator">!</span>clk<span class="token punctuation">;</span> <span class="token keyword">end</span>
  main_mod <span class="token function">compare_test</span><span class="token punctuation">(</span>
    <span class="token punctuation">.</span><span class="token function">clk</span><span class="token punctuation">(</span>clk<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token function">rst_n</span><span class="token punctuation">(</span>rst_n<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token function">a</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token function">b</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token function">c</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">initial</span>
  <span class="token keyword">begin</span>
    <span class="token kernel-function property">$dumpfile</span><span class="token punctuation">(</span><span class="token string">&quot;compare_test.vcd&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token kernel-function property">$dumpvars</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> compare_test<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">end</span>
<span class="token keyword">endmodule</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function r(v,m){const a=u("ExternalLinkIcon");return p(),e("div",null,[i,n("p",null,[n("a",k,[s("https://www.nowcoder.com/practice/bfc9e2f37fe84c678f6fd04dbce0ad27?tpId=301&tqId=5000623&ru=%2Fpractice%2Fbfc9e2f37fe84c678f6fd04dbce0ad27&qru=%2Fta%2Fverilog-start%2Fquestion-ranking&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3DVerilog%25E7%25AF%2587%26topicId%3D301"),c(a)])]),d])}const _=t(l,[["render",r],["__file","2.html.vue"]]);export{_ as default};
