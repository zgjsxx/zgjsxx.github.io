import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/init.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/kernel.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;linux/module.h&gt;</span></span>
<span class="token function">MODULE_LICENSE</span><span class="token punctuation">(</span><span class="token string">&quot;GPL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">MODULE_VERSION</span><span class="token punctuation">(</span><span class="token string">&quot;4.15.0-133-generic&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> __init <span class="token function">start</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        <span class="token function">printk</span><span class="token punctuation">(</span>KERN_INFO <span class="token string">&quot;Loading module....\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printk</span><span class="token punctuation">(</span>KERN_INFO <span class="token string">&quot;Hello World....\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> __exit <span class="token function">end</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
        <span class="token function">printk</span><span class="token punctuation">(</span>KERN_INFO <span class="token string">&quot;Bye World....\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">module_init</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">module_exit</span><span class="token punctuation">(</span>end<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-makefile line-numbers-mode" data-ext="makefile"><pre class="language-makefile"><code>obj-m <span class="token operator">+=</span> learn.o
<span class="token target symbol">all</span><span class="token punctuation">:</span>
        make -C /lib/modules/<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> uname -r<span class="token punctuation">)</span>/build M<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>PWD<span class="token punctuation">)</span> modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">make</span>

<span class="token function">sudo</span> insmod learn.ko
lsmod <span class="token operator">|</span> <span class="token function">grep</span> learn
rmmod learn.ko
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),i=[p];function o(l,c){return s(),a("div",null,i)}const d=n(t,[["render",o],["__file","hello-world-driver.html.vue"]]);export{d as default};
